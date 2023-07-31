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
const API = process.env.AKASH_REST_API;
const RPC = process.env.AKASH_RPC_API;

//cron task for akash
createCronJob(
  API,
  Model.akashTxsModel,
  Model.akashBlockModel
);

// Define a helper function to prefix the routes with "/akash"
function akashRoute(path, handler) {
  return app.get(`/akash${path}`, corsMiddleware, handler);
}

// Define the routes
akashRoute("/blocks/latest", corsMiddleware, latestBlocksHandler(Model.akashBlockModel));
akashRoute("/txs", corsMiddleware, allTxsHandler(Model.akashTxsModel));
akashRoute("/all_validators", corsMiddleware, allValidatorsHandler(API));
akashRoute("/active_validators", corsMiddleware, activeValidatorsHandler(API));
akashRoute("/chain_validator_details", corsMiddleware, chainValidatorsDetailsHandler(API));
akashRoute("/chain_inflation", corsMiddleware, chainInflationHandler(API));
akashRoute("/chain_community_pool", corsMiddleware, chainCommunityPoolHandler(API));
akashRoute("/chain_pool", corsMiddleware, chainPoolHandler(API));
akashRoute("/block_height_details", corsMiddleware, chainBlockHeightDetailsHandler(API));
akashRoute("/block_height_txs", corsMiddleware, chainBlockHeightTxsHandler(API));
akashRoute("/chain_txs_hash", corsMiddleware, chainTxsByHashHandler(API));
akashRoute(
  "/chain_validator_slashing_signing_info_details",
  corsMiddleware,
  chainValidatorsSlashingSigningInfosDetailsHandler(API),
);
akashRoute(
  "/chain_validator_delegations",
  corsMiddleware,
  chainValidatorDelegationsHandler(API),
);
akashRoute(
  "/chain_validator_undelegations",
  corsMiddleware,
  chainValidatorUnDelegationsHandler(API),
);
akashRoute(
  "/chain_validator_redelegations",
  corsMiddleware,
  chainValidatorReDelegationsHandler(API),
);
akashRoute("/chain_consensus", corsMiddleware, chainConsensusStateHandler(RPC));
akashRoute("/chain_minting_params", corsMiddleware, chainMintingParamsHandler(API));
akashRoute("/chain_gov_params", corsMiddleware, chainGovParamsHandler(API));
akashRoute("/chain_slashing_params", corsMiddleware, chainSlashingParamsHandler(API));
akashRoute("/chain_staking_params", corsMiddleware, chainStakingParamsHandler(API));
akashRoute("/chain_distribution_params", corsMiddleware, chainDistributionParamsHandler(API));
akashRoute("/chain_node_info", corsMiddleware, chainNodeInfoHandler(API));
akashRoute("/chain_proposals", corsMiddleware, chainProposalsHandler(API));
akashRoute("/chain_proposal_details", corsMiddleware, chainProposalDetailsHandler(API));
akashRoute(
  "/chain_proposal_voting_options",
  corsMiddleware,
  chainProposalVotingOptionsHandler(API),
);
akashRoute(
  "/chain_proposal_tally_options",
  corsMiddleware,
  chainProposalTallyOptionsHandler(API),
);
akashRoute("/chain_proposal_deposits", corsMiddleware, chainProposalDepositsHandler(API));
akashRoute("/chain_auth_account", corsMiddleware, chainAuthAccountHandler(API));
akashRoute("/chain_account_txs_by_events", corsMiddleware, chainAccountTxsByEventsHandler(API));
akashRoute("/chain_account_balance", corsMiddleware, chainAccountBalanceHandler(API));
akashRoute(
  "/chain_account_delegation_rewards",
  corsMiddleware,
  chainAccountDelegationRewardsHandler(API),
);
akashRoute("/chain_account_delegations", corsMiddleware, chainAccountDelegationsHandler(API));
akashRoute(
  "/chain_account_redelegations",
  corsMiddleware,
  chainAccountReDelegationsHandler(API),
);
akashRoute(
  "/chain_account_undelegations",
  corsMiddleware,
  chainAccountUnDelegationsHandler(API),
);

module.exports = app;
