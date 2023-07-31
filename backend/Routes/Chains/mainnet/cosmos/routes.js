const express = require("express");
const Model = require("../../../../Model/Models.jsx");
const app = express();
const createCronJob = require("../../../../cron.js");
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
const corsMiddleware = require("../../../../corsMiddleware.js");
const API = process.env.COSMOS_REST_API;
const RPC = process.env.COSMOS_RPC_API;

// cron task for cosmos
createCronJob(
  API, 
  Model.cosmosTxsModel, 
  Model.cosmosBlockModel
);

// Define a helper function to prefix the routes with "/cosmos"
function cosmosRoute(path, handler) {
  return app.get(`/cosmos${path}`, corsMiddleware, handler);
}

// Define the routes
cosmosRoute("/blocks/latest", corsMiddleware, latestBlocksHandler(Model.cosmosBlockModel));
cosmosRoute("/txs", corsMiddleware, allTxsHandler(Model.cosmosTxsModel));
cosmosRoute("/all_validators", corsMiddleware, allValidatorsHandler(API));
cosmosRoute("/active_validators", corsMiddleware, activeValidatorsHandler(API));
cosmosRoute("/chain_validator_details", corsMiddleware, chainValidatorsDetailsHandler(API));
cosmosRoute("/chain_inflation", corsMiddleware, chainInflationHandler(API));
cosmosRoute("/chain_community_pool", corsMiddleware, chainCommunityPoolHandler(API));
cosmosRoute("/chain_pool", corsMiddleware, chainPoolHandler(API));
cosmosRoute("/block_height_details", corsMiddleware, chainBlockHeightDetailsHandler(API));
cosmosRoute("/block_height_txs", corsMiddleware, chainBlockHeightTxsHandler(API));
cosmosRoute("/chain_txs_hash", corsMiddleware, chainTxsByHashHandler(API));
cosmosRoute(
  "/chain_validator_slashing_signing_info_details",
  corsMiddleware,
  chainValidatorsSlashingSigningInfosDetailsHandler(API),
);
cosmosRoute(
  "/chain_validator_delegations",
  corsMiddleware,
  chainValidatorDelegationsHandler(API),
);
cosmosRoute(
  "/chain_validator_undelegations",
  corsMiddleware,
  chainValidatorUnDelegationsHandler(API),
);
cosmosRoute(
  "/chain_validator_redelegations",
  corsMiddleware,
  chainValidatorReDelegationsHandler(API),
);
cosmosRoute("/chain_consensus", corsMiddleware, chainConsensusStateHandler(RPC));
cosmosRoute("/chain_minting_params", corsMiddleware, chainMintingParamsHandler(API));
cosmosRoute("/chain_gov_params", corsMiddleware, chainGovParamsHandler(API));
cosmosRoute("/chain_slashing_params", corsMiddleware, chainSlashingParamsHandler(API));
cosmosRoute("/chain_staking_params", corsMiddleware, chainStakingParamsHandler(API));
cosmosRoute("/chain_distribution_params", corsMiddleware, chainDistributionParamsHandler(API));
cosmosRoute("/chain_node_info", corsMiddleware, chainNodeInfoHandler(API));
cosmosRoute("/chain_proposals", corsMiddleware, chainProposalsHandler(API));
cosmosRoute("/chain_proposal_details", corsMiddleware, chainProposalDetailsHandler(API));
cosmosRoute(
  "/chain_proposal_voting_options",
  corsMiddleware,
  chainProposalVotingOptionsHandler(API),
);
cosmosRoute(
  "/chain_proposal_tally_options",
  corsMiddleware,
  chainProposalTallyOptionsHandler(API),
);
cosmosRoute("/chain_proposal_deposits", corsMiddleware, chainProposalDepositsHandler(API));
cosmosRoute("/chain_auth_account", corsMiddleware, chainAuthAccountHandler(API));
cosmosRoute(
  "/chain_account_txs_by_events",
  corsMiddleware,
  chainAccountTxsByEventsHandler(API),
);
cosmosRoute("/chain_account_balance", corsMiddleware, chainAccountBalanceHandler(API));
cosmosRoute(
  "/chain_account_delegation_rewards",
  corsMiddleware,
  chainAccountDelegationRewardsHandler(API),
);
cosmosRoute("/chain_account_delegations", corsMiddleware, chainAccountDelegationsHandler(API));
cosmosRoute(
  "/chain_account_redelegations",
  corsMiddleware,
  chainAccountReDelegationsHandler(API),
);
cosmosRoute(
  "/chain_account_undelegations",
  corsMiddleware,
  chainAccountUnDelegationsHandler(API),
);

module.exports = app;
