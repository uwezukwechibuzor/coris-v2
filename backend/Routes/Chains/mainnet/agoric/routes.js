const express = require("express");
const Model = require("../../../../Model/Models.jsx");
const createCronJob = require("../../../../cron.js");
const app = express();
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
const API = process.env.AGORIC_REST_API;
const RPC = process.env.AGORIC_RPC_API;

//cron task for agoric
createCronJob(
  API,
  Model.agoricTxsModel,
  Model.agoricBlockModel
);

// Define a helper function to prefix the routes with "/agoric"
function agoricRoute(path, handler) {
  return app.get(`/agoric${path}`, corsMiddleware, handler);
}

// Define the routes
agoricRoute("/blocks/latest", corsMiddleware, latestBlocksHandler(Model.agoricBlockModel));
agoricRoute("/txs", corsMiddleware, allTxsHandler(Model.agoricTxsModel));
agoricRoute("/all_validators", corsMiddleware, allValidatorsHandler(API));
agoricRoute("/active_validators", corsMiddleware, activeValidatorsHandler(API));
agoricRoute("/chain_validator_details", corsMiddleware, chainValidatorsDetailsHandler(API));
agoricRoute("/chain_inflation", corsMiddleware, chainInflationHandler(API));
agoricRoute("/chain_community_pool", corsMiddleware, chainCommunityPoolHandler(API));
agoricRoute("/chain_pool", corsMiddleware, chainPoolHandler(API));
agoricRoute("/block_height_details", corsMiddleware, chainBlockHeightDetailsHandler(API));
agoricRoute("/block_height_txs", corsMiddleware, chainBlockHeightTxsHandler(API));
agoricRoute("/chain_txs_hash", corsMiddleware, chainTxsByHashHandler(API));
agoricRoute(
  "/chain_validator_slashing_signing_info_details",
  corsMiddleware,
  chainValidatorsSlashingSigningInfosDetailsHandler(API)
);
agoricRoute(
  "/chain_validator_delegations",
  corsMiddleware,
  chainValidatorDelegationsHandler(API)
);
agoricRoute(
  "/chain_validator_undelegations",
  corsMiddleware,
  chainValidatorUnDelegationsHandler(API)
);
agoricRoute(
  "/chain_validator_redelegations",
  corsMiddleware,
  chainValidatorReDelegationsHandler(API)
);
agoricRoute("/chain_consensus", corsMiddleware, chainConsensusStateHandler(RPC));
agoricRoute("/chain_minting_params", corsMiddleware, chainMintingParamsHandler(API));
agoricRoute("/chain_gov_params", corsMiddleware, chainGovParamsHandler(API));
agoricRoute("/chain_slashing_params", corsMiddleware, chainSlashingParamsHandler(API));
agoricRoute("/chain_staking_params", corsMiddleware, chainStakingParamsHandler(API));
agoricRoute("/chain_distribution_params", corsMiddleware, chainDistributionParamsHandler(API));
agoricRoute("/chain_node_info", corsMiddleware, chainNodeInfoHandler(API));
agoricRoute("/chain_proposals", corsMiddleware, chainProposalsHandler(API));
agoricRoute("/chain_proposal_details", corsMiddleware, chainProposalDetailsHandler(API));
agoricRoute(
  "/chain_proposal_voting_options",
  corsMiddleware,
  chainProposalVotingOptionsHandler(API)
);
agoricRoute(
  "/chain_proposal_tally_options",
  corsMiddleware,
  chainProposalTallyOptionsHandler(API)
);
agoricRoute("/chain_proposal_deposits", corsMiddleware, chainProposalDepositsHandler(API));
agoricRoute("/chain_auth_account", corsMiddleware, chainAuthAccountHandler(API));
agoricRoute(
  "/chain_account_txs_by_events",
  corsMiddleware,
  chainAccountTxsByEventsHandler(API)
);
agoricRoute("/chain_account_balance", corsMiddleware, chainAccountBalanceHandler(API));
agoricRoute(
  "/chain_account_delegation_rewards",
  corsMiddleware,
  chainAccountDelegationRewardsHandler(API)
);
agoricRoute("/chain_account_delegations", corsMiddleware, chainAccountDelegationsHandler(API));
agoricRoute(
  "/chain_account_redelegations",
  corsMiddleware,
  chainAccountReDelegationsHandler(API)
);
agoricRoute(
  "/chain_account_undelegations",
  corsMiddleware,
  chainAccountUnDelegationsHandler(API)
);

module.exports = app;
