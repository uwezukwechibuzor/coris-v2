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
const API = process.env.STARGAZE_REST_API;
const RPC = process.env.STARGAZE_RPC_API;

// cron task for stargaze
createCronJob(
  API,
  Model.stargazeTxsModel,
  Model.stargazeBlockModel
);

// Define a helper function to prefix the routes with "/stargaze"
function stargazeRoute(path, handler) {
  return app.get(`/stargaze${path}`, corsMiddleware, handler);
}

// Define the routes
stargazeRoute("/blocks/latest", corsMiddleware, latestBlocksHandler(Model.stargazeBlockModel));
stargazeRoute("/txs", corsMiddleware, allTxsHandler(Model.stargazeTxsModel));
stargazeRoute("/all_validators", corsMiddleware, allValidatorsHandler(API));
stargazeRoute("/active_validators", corsMiddleware, activeValidatorsHandler(API));
stargazeRoute("/chain_validator_details", corsMiddleware, chainValidatorsDetailsHandler(API));
stargazeRoute("/chain_inflation", corsMiddleware, chainInflationHandler(API));
stargazeRoute("/chain_community_pool", corsMiddleware, chainCommunityPoolHandler(API));
stargazeRoute("/chain_pool", chainPoolHandler(API));
stargazeRoute("/block_height_details", corsMiddleware, chainBlockHeightDetailsHandler(API));
stargazeRoute("/block_height_txs", corsMiddleware, chainBlockHeightTxsHandler(API));
stargazeRoute("/chain_txs_hash", corsMiddleware, chainTxsByHashHandler(API));
stargazeRoute(
  "/chain_validator_slashing_signing_info_details",
  corsMiddleware,
  chainValidatorsSlashingSigningInfosDetailsHandler(API),
);
stargazeRoute(
  "/chain_validator_delegations",
  corsMiddleware,
  chainValidatorDelegationsHandler(API),
);
stargazeRoute(
  "/chain_validator_undelegations",
  corsMiddleware,
  chainValidatorUnDelegationsHandler(API),
);
stargazeRoute(
  "/chain_validator_redelegations",
  corsMiddleware,
  chainValidatorReDelegationsHandler(API),
);
stargazeRoute("/chain_consensus", corsMiddleware, chainConsensusStateHandler(RPC));
stargazeRoute("/chain_minting_params", corsMiddleware, chainMintingParamsHandler(API));
stargazeRoute("/chain_gov_params", corsMiddleware, chainGovParamsHandler(API));
stargazeRoute("/chain_slashing_params", corsMiddleware, chainSlashingParamsHandler(API));
stargazeRoute("/chain_staking_params", corsMiddleware, chainStakingParamsHandler(API));
stargazeRoute(
  "/chain_distribution_params",
  corsMiddleware,
  chainDistributionParamsHandler(API),
);
stargazeRoute("/chain_node_info", corsMiddleware, chainNodeInfoHandler(API));
stargazeRoute("/chain_proposals", corsMiddleware,chainProposalsHandler(API));
stargazeRoute("/chain_proposal_details", corsMiddleware, chainProposalDetailsHandler(API));
stargazeRoute(
  "/chain_proposal_voting_options",
  corsMiddleware,
  chainProposalVotingOptionsHandler(API),
);
stargazeRoute(
  "/chain_proposal_tally_options",
  corsMiddleware,
  chainProposalTallyOptionsHandler(API),
);
stargazeRoute("/chain_proposal_deposits", corsMiddleware, chainProposalDepositsHandler(API));
stargazeRoute("/chain_auth_account", corsMiddleware, chainAuthAccountHandler(API));
stargazeRoute(
  "/chain_account_txs_by_events",
  corsMiddleware,
  chainAccountTxsByEventsHandler(API),
);
stargazeRoute("/chain_account_balance", corsMiddleware, chainAccountBalanceHandler(API));
stargazeRoute(
  "/chain_account_delegation_rewards",
  corsMiddleware,
  chainAccountDelegationRewardsHandler(API),
);
stargazeRoute(
  "/chain_account_delegations",
  corsMiddleware,
  chainAccountDelegationsHandler(API),
);
stargazeRoute(
  "/chain_account_redelegations",
  corsMiddleware,
  chainAccountReDelegationsHandler(API),
);
stargazeRoute(
  "/chain_account_undelegations",
  corsMiddleware,
  chainAccountUnDelegationsHandler(API),
);

module.exports = app;
