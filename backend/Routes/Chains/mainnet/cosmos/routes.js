const express = require("express");
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
  latestBlocksHandler,
  allTxsHandler,
} = require("../../../../data/handlers.js");
const fetchLatestBlocksAndTxs = require("../../../../data/chainQueries/latestBlocksAndTxs.js");
const corsMiddleware = require("../../../../corsMiddleware.js");

const API = process.env.COSMOS_REST_API;
const RPC = process.env.COSMOS_RPC_API;

cron.schedule("*/3 * * * * *", function () {
  //cron to run at every 3sec to get latest blocks
  fetchLatestBlocksAndTxs(API, Model.cosmosTxsModel, Model.cosmosBlockModel);
});

// Define a helper function to prefix the routes with "/cosmos"
function cosmosRoute(path, handler) {
  return app.get(`/cosmos${path}`, corsMiddleware, handler);
}

// Define the routes
cosmosRoute("/blocks/latest", latestBlocksHandler(Model.cosmosBlockModel));
cosmosRoute("/txs", allTxsHandler(Model.cosmosTxsModel));
cosmosRoute("/all_validators", allValidatorsHandler(API));
cosmosRoute("/active_validators", activeValidatorsHandler(API));
cosmosRoute(
  "/chain_validator_details/:address",
  chainValidatorsDetailsHandler(API),
);
cosmosRoute("/chain_inflation", chainInflationHandler(API));
cosmosRoute("/chain_community_pool", chainCommunityPoolHandler(API));
cosmosRoute("/chain_pool", chainPoolHandler(API));
cosmosRoute("/block_height_details", chainBlockHeightDetailsHandler(API));
cosmosRoute("/block_height_txs", chainBlockHeightTxsHandler(API));
cosmosRoute("/chain_txs_hash", chainTxsByHashHandler(API));
cosmosRoute(
  "/chain_validator_slashing_signing_info_details/:cons_address",
  chainValidatorsSlashingSigningInfosDetailsHandler(API),
);
cosmosRoute(
  "/chain_validator_delegations/:validator_address",
  chainValidatorDelegationsHandler(API),
);
cosmosRoute(
  "/chain_validator_undelegations/:validator_address",
  chainValidatorUnDelegationsHandler(API),
);
cosmosRoute(
  "/chain_validator_redelegations/:delegator_address",
  chainValidatorReDelegationsHandler(API),
);
cosmosRoute("/chain_consensus", chainConsensusStateHandler(RPC));
cosmosRoute("/chain_minting_params", chainMintingParamsHandler(API));
cosmosRoute("/chain_gov_params", chainGovParamsHandler(API));
cosmosRoute("/chain_slashing_params", chainSlashingParamsHandler(API));
cosmosRoute("/chain_staking_params", chainStakingParamsHandler(API));
cosmosRoute("/chain_distribution_params", chainDistributionParamsHandler(API));
cosmosRoute("/chain_node_info", chainNodeInfoHandler(API));
cosmosRoute("/chain_proposals", chainProposalsHandler(API));
cosmosRoute("/chain_proposal_details", chainProposalDetailsHandler(API));
cosmosRoute(
  "/chain_proposal_voting_options",
  chainProposalVotingOptionsHandler(API),
);
cosmosRoute(
  "/chain_proposal_tally_options",
  chainProposalTallyOptionsHandler(API),
);
cosmosRoute("/chain_proposal_deposits", chainProposalDepositsHandler(API));
cosmosRoute("/chain_auth_account", chainAuthAccountHandler(API));
cosmosRoute(
  "/chain_account_txs_by_events/:address",
  chainAccountTxsByEventsHandler(API),
);
cosmosRoute("/chain_account_balance", chainAccountBalanceHandler(API));
cosmosRoute(
  "/chain_account_delegation_rewards",
  chainAccountDelegationRewardsHandler(API),
);
cosmosRoute("/chain_account_delegations", chainAccountDelegationsHandler(API));
cosmosRoute(
  "/chain_account_redelegations",
  chainAccountReDelegationsHandler(API),
);
cosmosRoute(
  "/chain_account_undelegations",
  chainAccountUnDelegationsHandler(API),
);

module.exports = app;
