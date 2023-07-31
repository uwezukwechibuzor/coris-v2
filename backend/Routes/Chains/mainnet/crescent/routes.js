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
const API = process.env.CRESCENT_REST_API;
const RPC = process.env.CRESCENT_RPC_API;

// cron task for cresent
createCronJob(
  API,
  Model.crescentTxsModel,
  Model.crescentBlockModel
);

// Define a helper function to prefix the routes with "/crescent"
function crescentRoute(path, handler) {
  return app.get(`/crescent${path}`, corsMiddleware, handler);
}

// Define the routes
crescentRoute("/blocks/latest", corsMiddleware, latestBlocksHandler(Model.crescentBlockModel));
crescentRoute("/txs", corsMiddleware, allTxsHandler(Model.crescentTxsModel));
crescentRoute("/all_validators", corsMiddleware, allValidatorsHandler(API));
crescentRoute("/active_validators", corsMiddleware, activeValidatorsHandler(API));
crescentRoute("/chain_validator_details", corsMiddleware, chainValidatorsDetailsHandler(API));
crescentRoute("/chain_inflation", corsMiddleware, chainInflationHandler(API));
crescentRoute("/chain_community_pool", corsMiddleware, chainCommunityPoolHandler(API));
crescentRoute("/chain_pool", corsMiddleware, chainPoolHandler(API));
crescentRoute("/block_height_details", corsMiddleware, chainBlockHeightDetailsHandler(API));
crescentRoute("/block_height_txs", corsMiddleware, chainBlockHeightTxsHandler(API));
crescentRoute("/chain_txs_hash", corsMiddleware, chainTxsByHashHandler(API));
crescentRoute(
  "/chain_validator_slashing_signing_info_details",
  corsMiddleware,
  chainValidatorsSlashingSigningInfosDetailsHandler(API),
);
crescentRoute(
  "/chain_validator_delegations",
  corsMiddleware,
  chainValidatorDelegationsHandler(API),
);
crescentRoute(
  "/chain_validator_undelegations",
  corsMiddleware,
  chainValidatorUnDelegationsHandler(API),
);
crescentRoute(
  "/chain_validator_redelegations",
  corsMiddleware,
  chainValidatorReDelegationsHandler(API),
);
crescentRoute("/chain_consensus", corsMiddleware, chainConsensusStateHandler(RPC));
crescentRoute("/chain_minting_params", corsMiddleware, chainMintingParamsHandler(API));
crescentRoute("/chain_gov_params", corsMiddleware, chainGovParamsHandler(API));
crescentRoute("/chain_slashing_params", corsMiddleware, chainSlashingParamsHandler(API));
crescentRoute("/chain_staking_params", corsMiddleware, chainStakingParamsHandler(API));
crescentRoute(
  "/chain_distribution_params",
  corsMiddleware,
  chainDistributionParamsHandler(API),
);
crescentRoute("/chain_node_info", corsMiddleware, chainNodeInfoHandler(API));
crescentRoute("/chain_proposals", corsMiddleware, chainProposalsHandler(API));
crescentRoute("/chain_proposal_details", corsMiddleware, chainProposalDetailsHandler(API));
crescentRoute(
  "/chain_proposal_voting_options",
  corsMiddleware,
  chainProposalVotingOptionsHandler(API),
);
crescentRoute(
  "/chain_proposal_tally_options",
  corsMiddleware,
  chainProposalTallyOptionsHandler(API),
);
crescentRoute("/chain_proposal_deposits", corsMiddleware, chainProposalDepositsHandler(API));
crescentRoute("/chain_auth_account", corsMiddleware, chainAuthAccountHandler(API));
crescentRoute(
  "/chain_account_txs_by_events",
  corsMiddleware,
  chainAccountTxsByEventsHandler(API),
);
crescentRoute("/chain_account_balance", corsMiddleware, chainAccountBalanceHandler(API));
crescentRoute(
  "/chain_account_delegation_rewards",
  corsMiddleware,
  chainAccountDelegationRewardsHandler(API),
);
crescentRoute(
  "/chain_account_delegations",
  corsMiddleware,
  chainAccountDelegationsHandler(API),
);
crescentRoute(
  "/chain_account_redelegations",
  corsMiddleware,
  chainAccountReDelegationsHandler(API),
);
crescentRoute(
  "/chain_account_undelegations",
  corsMiddleware,
  chainAccountUnDelegationsHandler(API),
);

module.exports = app;
