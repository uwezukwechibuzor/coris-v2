const express = require("express");
const cors = require("cors");
const Model = require("../../../../Model/Models.jsx");
const app = express();
const cron = require("node-cron");
const fetch = require("node-fetch");
require("dotenv").config();
var endPoints = require("../../../../data/endpoints.jsx");
const {
  allValidatorsHandler,
  activeValidatorsHandler,
  chainValidatorsDetailsHandler,
  chainInflationHandler,
  chainCommunityPoolHandler,
  chainPoolHandler,
  chainBlockHeightDetailsHandler,
  chainBlockHeightTxsHandler,
  chainTxsByHashHandler,
  chainValidatorsSlashingSigningInfosDetailsHandler,
  chainValidatorDelegationsHandler,
  chainValidatorUnDelegationsHandler,
  chainValidatorReDelegationsHandler,
  chainConsensusStateHandler,
  chainMintingParamsHandler,
  chainGovParamsHandler,
  chainSlashingParamsHandler,
  chainStakingParamsHandler,
  chainDistributionParamsHandler,
  chainNodeInfoHandler,
  chainProposalsHandler,
  chainProposalDetailsHandler,
  chainProposalVotingOptionsHandler,
  chainProposalTallyOptionsHandler,
  chainProposalDepositsHandler,
  chainAuthAccountHandler,
  chainAccountTxsByEventsHandler,
  chainAccountBalanceHandler,
  chainAccountDelegationRewardsHandler,
  chainAccountDelegationsHandler,
  chainAccountReDelegationsHandler,
  chainAccountUnDelegationsHandler,
} = require("../../../../data/handlers.js");

const API = process.env.JUNO_REST_API;
const RPC = process.env.JUNO_RPC_API;

cron.schedule("*/3 * * * * *", function () {
  //cron to run at every 5sec to get latest blocks
  getBlocksAsync();
});

async function getBlocksAsync() {
  try {
    let response = await fetch(`${API}${endPoints.latestBlocks}`);
    if (!response.ok) throw new Error("unexpected response");

    const block = await response.json();

    //get transactions data in each blocks
    const getTxs = await fetch(
      `${API}/${endPoints.chainBlockHeightTxs(block.block.header.height)}`,
    );
    if (!getTxs.ok) throw new Error("unexpected response");

    const txData = await getTxs.json();
    txData.tx_responses.map((tx) => {
      const transactionsData = new Model.junoTxsModel({
        txHash: tx.txhash,
        messages: tx.tx.body.messages,
        result: tx.code,
        fee: tx.tx.auth_info.fee.amount,
        height: tx.height,
        time: tx.timestamp,
      });

      //save the data
      transactionsData.save((err) => {
        try {
          if (err) {
            throw "TxsData can not be duplicated";
          }
        } catch (e) {
          console.log(e);
        }
      });
    });

    //saving latest blocks
    const blockData = new Model.junoBlockModel({
      height: block.block.header.height,
      hash: block.block_id.hash,
      proposer: block.block.header.proposer_address,
      noTxs: block.block.data.txs.length,
      time: block.block.header.time,
      signatures: block.block.last_commit.signatures.map((validatorDetails) => {
        return { validator_address: validatorDetails.validator_address };
      }),
    });
    //console.log(blockData)
    blockData.save((err) => {
      try {
        if (err) {
          throw "blockdata can not be duplicated";
        }
      } catch (e) {
        console.log(e);
      }
    });
  } catch (err) {
    console.error(err);
    // Handle errors here
  }
}

app.use(
  cors({
    origin: "*",
  }),
);

//return blocks by specifying the limit
app.get("/juno/blocks/latest", async function (req, res) {
  try {
    const limit = req.query.limit;
    const blocks = await Model.junoBlockModel
      .find({}, {}, { sort: { _id: -1 } })
      .limit(limit);
    res.json(blocks);
    //console.log(blocks)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get all transactions
app.get("/juno/txs", async function (req, res) {
  try {
    const limit = req.query.limit;
    const txs = await Model.junoTxsModel
      .find({}, {}, { sort: { _id: -1 } })
      .limit(limit);
    res.json(txs);
    //console.log(blocks)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Define a helper function to prefix the routes with "/juno"
function junoRoute(path, handler) {
  return app.get(`/juno${path}`, handler);
}

// Define the routes
junoRoute("/all_validators", allValidatorsHandler(API));
junoRoute("/active_validators", activeValidatorsHandler(API));
junoRoute(
  "/chain_validator_details/:address",
  chainValidatorsDetailsHandler(API),
);
junoRoute("/chain_inflation", chainInflationHandler(API));
junoRoute("/chain_community_pool", chainCommunityPoolHandler(API));
junoRoute("/chain_pool", chainPoolHandler(API));
junoRoute("/block_height_details", chainBlockHeightDetailsHandler(API));
junoRoute("/block_height_txs", chainBlockHeightTxsHandler(API));
junoRoute("/chain_txs_hash", chainTxsByHashHandler(API));
junoRoute(
  "/chain_validator_slashing_signing_info_details/:cons_address",
  chainValidatorsSlashingSigningInfosDetailsHandler(API),
);
junoRoute(
  "/chain_validator_delegations/:validator_address",
  chainValidatorDelegationsHandler(API),
);
junoRoute(
  "/chain_validator_undelegations/:validator_address",
  chainValidatorUnDelegationsHandler(API),
);
junoRoute(
  "/chain_validator_redelegations/:delegator_address",
  chainValidatorReDelegationsHandler(API),
);
junoRoute("/chain_consensus", chainConsensusStateHandler(RPC));
junoRoute("/chain_minting_params", chainMintingParamsHandler(API));
junoRoute("/chain_gov_params", chainGovParamsHandler(API));
junoRoute("/chain_slashing_params", chainSlashingParamsHandler(API));
junoRoute("/chain_staking_params", chainStakingParamsHandler(API));
junoRoute("/chain_distribution_params", chainDistributionParamsHandler(API));
junoRoute("/chain_node_info", chainNodeInfoHandler(API));
junoRoute("/chain_proposals", chainProposalsHandler(API));
junoRoute("/chain_proposal_details", chainProposalDetailsHandler(API));
junoRoute(
  "/chain_proposal_voting_options",
  chainProposalVotingOptionsHandler(API),
);
junoRoute(
  "/chain_proposal_tally_options",
  chainProposalTallyOptionsHandler(API),
);
junoRoute("/chain_proposal_deposits", chainProposalDepositsHandler(API));
junoRoute("/chain_auth_account", chainAuthAccountHandler(API));
junoRoute(
  "/chain_account_txs_by_events/:address",
  chainAccountTxsByEventsHandler(API),
);
junoRoute("/chain_account_balance", chainAccountBalanceHandler(API));
junoRoute(
  "/chain_account_delegation_rewards",
  chainAccountDelegationRewardsHandler(API),
);
junoRoute("/chain_account_delegations", chainAccountDelegationsHandler(API));
junoRoute(
  "/chain_account_redelegations",
  chainAccountReDelegationsHandler(API),
);
junoRoute(
  "/chain_account_undelegations",
  chainAccountUnDelegationsHandler(API),
);

module.exports = app;
