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

const API = process.env.CHIHUAHUA_REST_API;
const RPC = process.env.CHIHUAHUA_RPC_API;

cron.schedule("*/3 * * * * *", function () {
  //cron to run at every 3sec to get latest blocks
  fetchLatestBlocksAndTxs(
    API,
    Model.chihuahuaTxsModel,
    Model.chihuahuaBlockModel
  );
});

app.use(
  cors({
    origin: "*",
  })
);

//return blocks by specifying the limit
app.get("/chihuahua/blocks/latest", async function (req, res) {
  try {
    const limit = req.query.limit;
    const blocks = await Model.chihuahuaBlockModel
      .find({}, {}, { sort: { _id: -1 } })
      .limit(limit);
    res.json(blocks);
    //console.log(blocks)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get all transactions
app.get("/chihuahua/txs", async function (req, res) {
  try {
    const limit = req.query.limit;
    const txs = await Model.chihuahuaTxsModel
      .find({}, {}, { sort: { _id: -1 } })
      .limit(limit);
    res.json(txs);
    //console.log(blocks)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Define a helper function to prefix the routes with "/chihuahua"
function chihuahuaRoute(path, handler) {
  return app.get(`/chihuahua${path}`, handler);
}

// Define the routes
chihuahuaRoute("/all_validators", allValidatorsHandler(API));
chihuahuaRoute("/active_validators", activeValidatorsHandler(API));
chihuahuaRoute(
  "/chain_validator_details/:address",
  chainValidatorsDetailsHandler(API)
);
chihuahuaRoute("/chain_inflation", chainInflationHandler(API));
chihuahuaRoute("/chain_community_pool", chainCommunityPoolHandler(API));
chihuahuaRoute("/chain_pool", chainPoolHandler(API));
chihuahuaRoute("/block_height_details", chainBlockHeightDetailsHandler(API));
chihuahuaRoute("/block_height_txs", chainBlockHeightTxsHandler(API));
chihuahuaRoute("/chain_txs_hash", chainTxsByHashHandler(API));
chihuahuaRoute(
  "/chain_validator_slashing_signing_info_details/:cons_address",
  chainValidatorsSlashingSigningInfosDetailsHandler(API)
);
chihuahuaRoute(
  "/chain_validator_delegations/:validator_address",
  chainValidatorDelegationsHandler(API)
);
chihuahuaRoute(
  "/chain_validator_undelegations/:validator_address",
  chainValidatorUnDelegationsHandler(API)
);
chihuahuaRoute(
  "/chain_validator_redelegations/:delegator_address",
  chainValidatorReDelegationsHandler(API)
);
chihuahuaRoute("/chain_consensus", chainConsensusStateHandler(RPC));
chihuahuaRoute("/chain_minting_params", chainMintingParamsHandler(API));
chihuahuaRoute("/chain_gov_params", chainGovParamsHandler(API));
chihuahuaRoute("/chain_slashing_params", chainSlashingParamsHandler(API));
chihuahuaRoute("/chain_staking_params", chainStakingParamsHandler(API));
chihuahuaRoute(
  "/chain_distribution_params",
  chainDistributionParamsHandler(API)
);
chihuahuaRoute("/chain_node_info", chainNodeInfoHandler(API));
chihuahuaRoute("/chain_proposals", chainProposalsHandler(API));
chihuahuaRoute("/chain_proposal_details", chainProposalDetailsHandler(API));
chihuahuaRoute(
  "/chain_proposal_voting_options",
  chainProposalVotingOptionsHandler(API)
);
chihuahuaRoute(
  "/chain_proposal_tally_options",
  chainProposalTallyOptionsHandler(API)
);
chihuahuaRoute("/chain_proposal_deposits", chainProposalDepositsHandler(API));
chihuahuaRoute("/chain_auth_account", chainAuthAccountHandler(API));
chihuahuaRoute(
  "/chain_account_txs_by_events/:address",
  chainAccountTxsByEventsHandler(API)
);
chihuahuaRoute("/chain_account_balance", chainAccountBalanceHandler(API));
chihuahuaRoute(
  "/chain_account_delegation_rewards",
  chainAccountDelegationRewardsHandler(API)
);
chihuahuaRoute(
  "/chain_account_delegations",
  chainAccountDelegationsHandler(API)
);
chihuahuaRoute(
  "/chain_account_redelegations",
  chainAccountReDelegationsHandler(API)
);
chihuahuaRoute(
  "/chain_account_undelegations",
  chainAccountUnDelegationsHandler(API)
);

module.exports = app;
