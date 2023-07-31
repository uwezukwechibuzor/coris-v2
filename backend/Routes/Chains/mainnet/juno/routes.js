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
const API = process.env.JUNO_REST_API;
const RPC = process.env.JUNO_RPC_API;

// cron task for juno
createCronJob(
  API, 
  Model.junoTxsModel, 
  Model.junoBlockModel
);

// Define a helper function to prefix the routes with "/juno"
function junoRoute(path, handler) {
  return app.get(`/juno${path}`, corsMiddleware, handler);
}

// Define the routes
junoRoute("/blocks/latest", corsMiddleware, latestBlocksHandler(Model.junoBlockModel));
junoRoute("/txs", corsMiddleware, allTxsHandler(Model.junoTxsModel));
junoRoute("/all_validators", corsMiddleware, allValidatorsHandler(API));
junoRoute("/active_validators", corsMiddleware, activeValidatorsHandler(API));
junoRoute("/chain_validator_details", corsMiddleware, chainValidatorsDetailsHandler(API));
junoRoute("/chain_inflation", corsMiddleware, chainInflationHandler(API));
junoRoute("/chain_community_pool", corsMiddleware, chainCommunityPoolHandler(API));
junoRoute("/chain_pool", corsMiddleware, chainPoolHandler(API));
junoRoute("/block_height_details", corsMiddleware, chainBlockHeightDetailsHandler(API));
junoRoute("/block_height_txs", corsMiddleware, chainBlockHeightTxsHandler(API));
junoRoute("/chain_txs_hash", corsMiddleware, chainTxsByHashHandler(API));
junoRoute(
  "/chain_validator_slashing_signing_info_details",
  corsMiddleware,
  chainValidatorsSlashingSigningInfosDetailsHandler(API),
);
junoRoute(
  "/chain_validator_delegations",
  corsMiddleware,
  chainValidatorDelegationsHandler(API),
);
junoRoute(
  "/chain_validator_undelegations",
  corsMiddleware,
  chainValidatorUnDelegationsHandler(API),
);
junoRoute(
  "/chain_validator_redelegations",
  corsMiddleware,
  chainValidatorReDelegationsHandler(API),
);
junoRoute("/chain_consensus", corsMiddleware, chainConsensusStateHandler(RPC));
junoRoute("/chain_minting_params", corsMiddleware, chainMintingParamsHandler(API));
junoRoute("/chain_gov_params", corsMiddleware, chainGovParamsHandler(API));
junoRoute("/chain_slashing_params", corsMiddleware, chainSlashingParamsHandler(API));
junoRoute("/chain_staking_params", corsMiddleware, chainStakingParamsHandler(API));
junoRoute("/chain_distribution_params", corsMiddleware, chainDistributionParamsHandler(API));
junoRoute("/chain_node_info", corsMiddleware, chainNodeInfoHandler(API));
junoRoute("/chain_proposals", corsMiddleware, chainProposalsHandler(API));
junoRoute("/chain_proposal_details", corsMiddleware, chainProposalDetailsHandler(API));
junoRoute(
  "/chain_proposal_voting_options",
  corsMiddleware,
  chainProposalVotingOptionsHandler(API),
);
junoRoute(
  "/chain_proposal_tally_options",
  corsMiddleware,
  chainProposalTallyOptionsHandler(API),
);
junoRoute("/chain_proposal_deposits", corsMiddleware, chainProposalDepositsHandler(API));
junoRoute("/chain_auth_account", corsMiddleware, chainAuthAccountHandler(API));
junoRoute("/chain_account_txs_by_events", corsMiddleware, chainAccountTxsByEventsHandler(API));
junoRoute("/chain_account_balance", corsMiddleware, chainAccountBalanceHandler(API));
junoRoute(
  "/chain_account_delegation_rewards",
  corsMiddleware,
  chainAccountDelegationRewardsHandler(API),
);
junoRoute("/chain_account_delegations", corsMiddleware, chainAccountDelegationsHandler(API));
junoRoute(
  "/chain_account_redelegations",
  corsMiddleware,
  chainAccountReDelegationsHandler(API),
);
junoRoute(
  "/chain_account_undelegations",
  corsMiddleware,
  chainAccountUnDelegationsHandler(API),
);

module.exports = app;
