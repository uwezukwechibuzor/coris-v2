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
  allTxsHandler,
  latestBlocksHandler,
} = require("../../../../data/handlers.js");
const corsMiddleware = require("../../../../corsMiddleware.js");
const API = process.env.CHIHUAHUA_REST_API;
const RPC = process.env.CHIHUAHUA_RPC_API;

//cron task for chihuahua
createCronJob(
  API,
  Model.chihuahuaTxsModel,
  Model.chihuahuaBlockModel
);

// Define a helper function to prefix the routes with "/chihuahua"
function chihuahuaRoute(path, handler) {
  return app.get(`/chihuahua${path}`, corsMiddleware, handler);
}

// Define the routes
chihuahuaRoute(
  "/blocks/latest",
  corsMiddleware,
  latestBlocksHandler(Model.chihuahuaBlockModel),
);
chihuahuaRoute("/txs", corsMiddleware, allTxsHandler(Model.chihuahuaTxsModel));
chihuahuaRoute("/all_validators", corsMiddleware, allValidatorsHandler(API));
chihuahuaRoute("/active_validators", corsMiddleware, activeValidatorsHandler(API));
chihuahuaRoute("/chain_validator_details", corsMiddleware, chainValidatorsDetailsHandler(API));
chihuahuaRoute("/chain_inflation", corsMiddleware, chainInflationHandler(API));
chihuahuaRoute("/chain_community_pool", corsMiddleware, chainCommunityPoolHandler(API));
chihuahuaRoute("/chain_pool", corsMiddleware, chainPoolHandler(API));
chihuahuaRoute("/block_height_details", corsMiddleware, chainBlockHeightDetailsHandler(API));
chihuahuaRoute("/block_height_txs", corsMiddleware, chainBlockHeightTxsHandler(API));
chihuahuaRoute("/chain_txs_hash", corsMiddleware, chainTxsByHashHandler(API));
chihuahuaRoute(
  "/chain_validator_slashing_signing_info_details",
  corsMiddleware,
  chainValidatorsSlashingSigningInfosDetailsHandler(API),
);
chihuahuaRoute(
  "/chain_validator_delegations",
  corsMiddleware,
  chainValidatorDelegationsHandler(API),
);
chihuahuaRoute(
  "/chain_validator_undelegations",
  corsMiddleware,
  chainValidatorUnDelegationsHandler(API),
);
chihuahuaRoute(
  "/chain_validator_redelegations",
  corsMiddleware,
  chainValidatorReDelegationsHandler(API),
);
chihuahuaRoute("/chain_consensus", corsMiddleware, chainConsensusStateHandler(RPC));
chihuahuaRoute("/chain_minting_params", corsMiddleware, chainMintingParamsHandler(API));
chihuahuaRoute("/chain_gov_params",  corsMiddleware, chainGovParamsHandler(API));
chihuahuaRoute("/chain_slashing_params", corsMiddleware, chainSlashingParamsHandler(API));
chihuahuaRoute("/chain_staking_params", corsMiddleware, chainStakingParamsHandler(API));
chihuahuaRoute(
  "/chain_distribution_params",
  corsMiddleware,
  chainDistributionParamsHandler(API),
);
chihuahuaRoute("/chain_node_info", corsMiddleware, chainNodeInfoHandler(API));
chihuahuaRoute("/chain_proposals", corsMiddleware, chainProposalsHandler(API));
chihuahuaRoute("/chain_proposal_details", corsMiddleware, chainProposalDetailsHandler(API));
chihuahuaRoute(
  "/chain_proposal_voting_options",
  corsMiddleware,
  chainProposalVotingOptionsHandler(API),
);
chihuahuaRoute(
  "/chain_proposal_tally_options",
  corsMiddleware,
  chainProposalTallyOptionsHandler(API),
);
chihuahuaRoute("/chain_proposal_deposits", corsMiddleware, chainProposalDepositsHandler(API));
chihuahuaRoute("/chain_auth_account", corsMiddleware, chainAuthAccountHandler(API));
chihuahuaRoute(
  "/chain_account_txs_by_events",
  corsMiddleware,
  chainAccountTxsByEventsHandler(API),
);
chihuahuaRoute("/chain_account_balance", corsMiddleware, chainAccountBalanceHandler(API));
chihuahuaRoute(
  "/chain_account_delegation_rewards",
  corsMiddleware,
  chainAccountDelegationRewardsHandler(API),
);
chihuahuaRoute(
  "/chain_account_delegations",
  corsMiddleware,
  chainAccountDelegationsHandler(API),
);
chihuahuaRoute(
  "/chain_account_redelegations",
  corsMiddleware,
  chainAccountReDelegationsHandler(API),
);
chihuahuaRoute(
  "/chain_account_undelegations",
  corsMiddleware,
  chainAccountUnDelegationsHandler(API),
);

module.exports = app;
