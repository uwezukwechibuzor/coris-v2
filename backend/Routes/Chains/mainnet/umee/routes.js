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

const API = process.env.UMEE_REST_API;
const RPC = process.env.UMEE_RPC_API;

cron.schedule("*/3 * * * * *", function () {
  //cron to run at every 5sec to get latest blocks
  getBlocksAsync();
});

async function getBlocksAsync() {
  try {
    let response = await fetch(`${API}${endPoints.latestBlocksRecentVersion}`);
    if (!response.ok) throw new Error("unexpected response");

    const block = await response.json();

    //get transactions data in each blocks
    const getTxs = await fetch(
      `${API}/${endPoints.chainBlockHeightTxs(block.block.header.height)}`
    );
    if (!getTxs.ok) throw new Error("unexpected response");

    const txData = await getTxs.json();
    txData.tx_responses.map((tx) => {
      const transactionsData = new Model.umeeTxsModel({
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
    const blockData = new Model.umeeBlockModel({
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
  })
);

//return blocks by specifying the limit
app.get("/umee/blocks/latest", async function (req, res) {
  try {
    const limit = req.query.limit;
    const blocks = await Model.umeeBlockModel
      .find({}, {}, { sort: { _id: -1 } })
      .limit(limit);
    res.json(blocks);
    //console.log(blocks)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get all transactions
app.get("/umee/txs", async function (req, res) {
  try {
    const limit = req.query.limit;
    const txs = await Model.umeeTxsModel
      .find({}, {}, { sort: { _id: -1 } })
      .limit(limit);
    res.json(txs);
    //console.log(blocks)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Define a helper function to prefix the routes with "/umee"
function umeeRoute(path, handler) {
  return app.get(`/umee${path}`, handler);
}

// Define the routes
umeeRoute("/all_validators", allValidatorsHandler(API));
umeeRoute("/active_validators", activeValidatorsHandler(API));
umeeRoute(
  "/chain_validator_details/:address",
  chainValidatorsDetailsHandler(API)
);
umeeRoute("/chain_inflation", chainInflationHandler(API));
umeeRoute("/chain_community_pool", chainCommunityPoolHandler(API));
umeeRoute("/chain_pool", chainPoolHandler(API));
umeeRoute("/block_height_details", chainBlockHeightDetailsHandler(API));
umeeRoute("/block_height_txs", chainBlockHeightTxsHandler(API));
umeeRoute("/chain_txs_hash", chainTxsByHashHandler(API));
umeeRoute(
  "/chain_validator_slashing_signing_info_details/:cons_address",
  chainValidatorsSlashingSigningInfosDetailsHandler(API)
);
umeeRoute(
  "/chain_validator_delegations/:validator_address",
  chainValidatorDelegationsHandler(API)
);
umeeRoute(
  "/chain_validator_undelegations/:validator_address",
  chainValidatorUnDelegationsHandler(API)
);
umeeRoute(
  "/chain_validator_redelegations/:delegator_address",
  chainValidatorReDelegationsHandler(API)
);
umeeRoute("/chain_consensus", chainConsensusStateHandler(RPC));
umeeRoute("/chain_minting_params", chainMintingParamsHandler(API));
umeeRoute("/chain_gov_params", chainGovParamsHandler(API));
umeeRoute("/chain_slashing_params", chainSlashingParamsHandler(API));
umeeRoute("/chain_staking_params", chainStakingParamsHandler(API));
umeeRoute("/chain_distribution_params", chainDistributionParamsHandler(API));
umeeRoute("/chain_node_info", chainNodeInfoHandler(API));
umeeRoute("/chain_proposals", chainProposalsHandler(API));
umeeRoute("/chain_proposal_details", chainProposalDetailsHandler(API));
umeeRoute(
  "/chain_proposal_voting_options",
  chainProposalVotingOptionsHandler(API)
);
umeeRoute(
  "/chain_proposal_tally_options",
  chainProposalTallyOptionsHandler(API)
);
umeeRoute("/chain_proposal_deposits", chainProposalDepositsHandler(API));
umeeRoute("/chain_auth_account", chainAuthAccountHandler(API));
umeeRoute(
  "/chain_account_txs_by_events/:address",
  chainAccountTxsByEventsHandler(API)
);
umeeRoute("/chain_account_balance", chainAccountBalanceHandler(API));
umeeRoute(
  "/chain_account_delegation_rewards",
  chainAccountDelegationRewardsHandler(API)
);
umeeRoute("/chain_account_delegations", chainAccountDelegationsHandler(API));
umeeRoute(
  "/chain_account_redelegations",
  chainAccountReDelegationsHandler(API)
);
umeeRoute(
  "/chain_account_undelegations",
  chainAccountUnDelegationsHandler(API)
);

module.exports = app;
