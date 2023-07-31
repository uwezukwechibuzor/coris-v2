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
const API = process.env.UMEE_REST_API;
const RPC = process.env.UMEE_RPC_API;

// cron task for umee
createCronJob(
  API, 
  Model.umeeTxsModel, 
  Model.umeeBlockModel
);
// Define a helper function to prefix the routes with "/umee"
function umeeRoute(path, handler) {
  return app.get(`/umee${path}`, corsMiddleware, handler);
}

// Define the routes
umeeRoute("/blocks/latest", corsMiddleware, latestBlocksHandler(Model.umeeBlockModel));
umeeRoute("/txs", corsMiddleware, allTxsHandler(Model.umeeTxsModel));
umeeRoute("/all_validators", corsMiddleware, allValidatorsHandler(API));
umeeRoute("/active_validators", corsMiddleware, activeValidatorsHandler(API));
umeeRoute("/chain_validator_details", corsMiddleware, chainValidatorsDetailsHandler(API));
umeeRoute("/chain_inflation", corsMiddleware, chainInflationHandler(API));
umeeRoute("/chain_community_pool", corsMiddleware, chainCommunityPoolHandler(API));
umeeRoute("/chain_pool", corsMiddleware, chainPoolHandler(API));
umeeRoute("/block_height_details", corsMiddleware, chainBlockHeightDetailsHandler(API));
umeeRoute("/block_height_txs", corsMiddleware, chainBlockHeightTxsHandler(API));
umeeRoute("/chain_txs_hash", corsMiddleware, chainTxsByHashHandler(API));
umeeRoute(
  "/chain_validator_slashing_signing_info_details",
  corsMiddleware,
  chainValidatorsSlashingSigningInfosDetailsHandler(API),
);
umeeRoute(
  "/chain_validator_delegations",
  corsMiddleware,
  chainValidatorDelegationsHandler(API),
);
umeeRoute(
  "/chain_validator_undelegations",
  corsMiddleware,
  chainValidatorUnDelegationsHandler(API),
);
umeeRoute(
  "/chain_validator_redelegations",
  corsMiddleware,
  chainValidatorReDelegationsHandler(API),
);
umeeRoute("/chain_consensus", corsMiddleware, chainConsensusStateHandler(RPC));
umeeRoute("/chain_minting_params", corsMiddleware, chainMintingParamsHandler(API));
umeeRoute("/chain_gov_params", corsMiddleware, chainGovParamsHandler(API));
umeeRoute("/chain_slashing_params", corsMiddleware, chainSlashingParamsHandler(API));
umeeRoute("/chain_staking_params", corsMiddleware, chainStakingParamsHandler(API));
umeeRoute("/chain_distribution_params", corsMiddleware, chainDistributionParamsHandler(API));
umeeRoute("/chain_node_info", corsMiddleware, chainNodeInfoHandler(API));
umeeRoute("/chain_proposals", corsMiddleware, chainProposalsHandler(API));
umeeRoute("/chain_proposal_details", corsMiddleware, chainProposalDetailsHandler(API));
umeeRoute(
  "/chain_proposal_voting_options", 
  corsMiddleware,
  chainProposalVotingOptionsHandler(API),
);
umeeRoute(
  "/chain_proposal_tally_options",
  corsMiddleware,
  chainProposalTallyOptionsHandler(API),
);
umeeRoute("/chain_proposal_deposits", corsMiddleware, chainProposalDepositsHandler(API));
umeeRoute("/chain_auth_account", corsMiddleware, chainAuthAccountHandler(API));
umeeRoute("/chain_account_txs_by_events", corsMiddleware, chainAccountTxsByEventsHandler(API));
umeeRoute("/chain_account_balance", corsMiddleware, chainAccountBalanceHandler(API));
umeeRoute(
  "/chain_account_delegation_rewards", 
  corsMiddleware,
  chainAccountDelegationRewardsHandler(API),
);
umeeRoute("/chain_account_delegations", corsMiddleware, chainAccountDelegationsHandler(API));
umeeRoute(
  "/chain_account_redelegations",
  corsMiddleware,
  chainAccountReDelegationsHandler(API),
);
umeeRoute(
  "/chain_account_undelegations",
  corsMiddleware,
  chainAccountUnDelegationsHandler(API),
);

module.exports = app;
