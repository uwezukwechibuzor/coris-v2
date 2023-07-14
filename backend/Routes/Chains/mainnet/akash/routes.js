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

const API = process.env.AKASH_REST_API;
const RPC = process.env.AKASH_RPC_API;

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
      const transactionsData = new Model.akashTxsModel({
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
    const blockData = new Model.akashBlockModel({
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
app.get("/akash/blocks/latest", async function (req, res) {
  try {
    const limit = req.query.limit;
    const blocks = await Model.akashBlockModel
      .find({}, {}, { sort: { _id: -1 } })
      .limit(limit);
    res.json(blocks);
    //console.log(blocks)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get all transactions
app.get("/akash/txs", async function (req, res) {
  try {
    const limit = req.query.limit;
    const txs = await Model.akashTxsModel
      .find({}, {}, { sort: { _id: -1 } })
      .limit(limit);
    res.json(txs);
    //console.log(blocks)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Define a helper function to prefix the routes with "/akash"
function akashRoute(path, handler) {
  return app.get(`/akash${path}`, handler);
}

// Define the routes
akashRoute("/all_validators", allValidatorsHandler(API));
akashRoute("/active_validators", activeValidatorsHandler(API));
akashRoute(
  "/chain_validator_details/:address",
  chainValidatorsDetailsHandler(API),
);
akashRoute("/chain_inflation", chainInflationHandler(API));
akashRoute("/chain_community_pool", chainCommunityPoolHandler(API));
akashRoute("/chain_pool", chainPoolHandler(API));
akashRoute("/block_height_details", chainBlockHeightDetailsHandler(API));
akashRoute("/block_height_txs", chainBlockHeightTxsHandler(API));
akashRoute("/chain_txs_hash", chainTxsByHashHandler(API));
akashRoute(
  "/chain_validator_slashing_signing_info_details/:cons_address",
  chainValidatorsSlashingSigningInfosDetailsHandler(API),
);
akashRoute(
  "/chain_validator_delegations/:validator_address",
  chainValidatorDelegationsHandler(API),
);
akashRoute(
  "/chain_validator_undelegations/:validator_address",
  chainValidatorUnDelegationsHandler(API),
);
akashRoute(
  "/chain_validator_redelegations/:delegator_address",
  chainValidatorReDelegationsHandler(API),
);
akashRoute("/chain_consensus", chainConsensusStateHandler(RPC));
akashRoute("/chain_minting_params", chainMintingParamsHandler(API));
akashRoute("/chain_gov_params", chainGovParamsHandler(API));
akashRoute("/chain_slashing_params", chainSlashingParamsHandler(API));
akashRoute("/chain_staking_params", chainStakingParamsHandler(API));
akashRoute("/chain_distribution_params", chainDistributionParamsHandler(API));
akashRoute("/chain_node_info", chainNodeInfoHandler(API));
akashRoute("/chain_proposals", chainProposalsHandler(API));
akashRoute("/chain_proposal_details", chainProposalDetailsHandler(API));
akashRoute(
  "/chain_proposal_voting_options",
  chainProposalVotingOptionsHandler(API),
);
akashRoute(
  "/chain_proposal_tally_options",
  chainProposalTallyOptionsHandler(API),
);
akashRoute("/chain_proposal_deposits", chainProposalDepositsHandler(API));
akashRoute("/chain_auth_account", chainAuthAccountHandler(API));
akashRoute(
  "/chain_account_txs_by_events/:address",
  chainAccountTxsByEventsHandler(API),
);
akashRoute("/chain_account_balance", chainAccountBalanceHandler(API));
akashRoute(
  "/chain_account_delegation_rewards",
  chainAccountDelegationRewardsHandler(API),
);
akashRoute("/chain_account_delegations", chainAccountDelegationsHandler(API));
akashRoute(
  "/chain_account_redelegations",
  chainAccountReDelegationsHandler(API),
);
akashRoute(
  "/chain_account_undelegations",
  chainAccountUnDelegationsHandler(API),
);

module.exports = app;
