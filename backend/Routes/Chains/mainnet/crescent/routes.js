const express = require("express");
const cors = require("cors");
const Model = require("../../../../Model/Models.jsx");
const app = express();
const cron = require("node-cron");
require("dotenv").config();
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
const fetchLatestBlocksAndTxs = require("../../../../data/chainQueries/latestBlocksAndTxs.js");

const API = process.env.CRESCENT_REST_API;
const RPC = process.env.CRESCENT_RPC_API;

cron.schedule("*/3 * * * * *", function () {
  //cron to run at every 3sec to get latest blocks
  fetchLatestBlocksAndTxs(
    API,
    Model.crescentTxsModel,
    Model.crescentBlockModel
  );
});

app.use(
  cors({
    origin: "*",
  })
);

//return blocks by specifying the limit
app.get("/crescent/blocks/latest", async function (req, res) {
  try {
    const limit = req.query.limit;
    const blocks = await Model.crescentBlockModel
      .find({}, {}, { sort: { _id: -1 } })
      .limit(limit);
    res.json(blocks);
    //console.log(blocks)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get all transactions
app.get("/crescent/txs", async function (req, res) {
  try {
    const limit = req.query.limit;
    const txs = await Model.crescentTxsModel
      .find({}, {}, { sort: { _id: -1 } })
      .limit(limit);
    res.json(txs);
    //console.log(blocks)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Define a helper function to prefix the routes with "/crescent"
function crescentRoute(path, handler) {
  return app.get(`/crescent${path}`, handler);
}

// Define the routes
crescentRoute("/all_validators", allValidatorsHandler(API));
crescentRoute("/active_validators", activeValidatorsHandler(API));
crescentRoute(
  "/chain_validator_details/:address",
  chainValidatorsDetailsHandler(API)
);
crescentRoute("/chain_inflation", chainInflationHandler(API));
crescentRoute("/chain_community_pool", chainCommunityPoolHandler(API));
crescentRoute("/chain_pool", chainPoolHandler(API));
crescentRoute("/block_height_details", chainBlockHeightDetailsHandler(API));
crescentRoute("/block_height_txs", chainBlockHeightTxsHandler(API));
crescentRoute("/chain_txs_hash", chainTxsByHashHandler(API));
crescentRoute(
  "/chain_validator_slashing_signing_info_details/:cons_address",
  chainValidatorsSlashingSigningInfosDetailsHandler(API)
);
crescentRoute(
  "/chain_validator_delegations/:validator_address",
  chainValidatorDelegationsHandler(API)
);
crescentRoute(
  "/chain_validator_undelegations/:validator_address",
  chainValidatorUnDelegationsHandler(API)
);
crescentRoute(
  "/chain_validator_redelegations/:delegator_address",
  chainValidatorReDelegationsHandler(API)
);
crescentRoute("/chain_consensus", chainConsensusStateHandler(RPC));
crescentRoute("/chain_minting_params", chainMintingParamsHandler(API));
crescentRoute("/chain_gov_params", chainGovParamsHandler(API));
crescentRoute("/chain_slashing_params", chainSlashingParamsHandler(API));
crescentRoute("/chain_staking_params", chainStakingParamsHandler(API));
crescentRoute(
  "/chain_distribution_params",
  chainDistributionParamsHandler(API)
);
crescentRoute("/chain_node_info", chainNodeInfoHandler(API));
crescentRoute("/chain_proposals", chainProposalsHandler(API));
crescentRoute("/chain_proposal_details", chainProposalDetailsHandler(API));
crescentRoute(
  "/chain_proposal_voting_options",
  chainProposalVotingOptionsHandler(API)
);
crescentRoute(
  "/chain_proposal_tally_options",
  chainProposalTallyOptionsHandler(API)
);
crescentRoute("/chain_proposal_deposits", chainProposalDepositsHandler(API));
crescentRoute("/chain_auth_account", chainAuthAccountHandler(API));
crescentRoute(
  "/chain_account_txs_by_events/:address",
  chainAccountTxsByEventsHandler(API)
);
crescentRoute("/chain_account_balance", chainAccountBalanceHandler(API));
crescentRoute(
  "/chain_account_delegation_rewards",
  chainAccountDelegationRewardsHandler(API)
);
crescentRoute(
  "/chain_account_delegations",
  chainAccountDelegationsHandler(API)
);
crescentRoute(
  "/chain_account_redelegations",
  chainAccountReDelegationsHandler(API)
);
crescentRoute(
  "/chain_account_undelegations",
  chainAccountUnDelegationsHandler(API)
);

module.exports = app;
