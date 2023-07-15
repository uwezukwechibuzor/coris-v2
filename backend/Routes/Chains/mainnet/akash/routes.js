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

const API = process.env.AKASH_REST_API;
const RPC = process.env.AKASH_RPC_API;

cron.schedule("*/3 * * * * *", function () {
  //cron to run at every 3sec to get latest blocks
  fetchLatestBlocksAndTxs(API, Model.akashTxsModel, Model.akashBlockModel);
});

// Define a helper function to prefix the routes with "/akash"
function akashRoute(path, handler) {
  return app.get(`/akash${path}`, corsMiddleware, handler);
}

// Define the routes
akashRoute("/blocks/latest", latestBlocksHandler(Model.akashBlockModel));
akashRoute("/txs", allTxsHandler(Model.akashTxsModel));
akashRoute("/all_validators", allValidatorsHandler(API));
akashRoute("/active_validators", activeValidatorsHandler(API));
akashRoute(
  "/chain_validator_details/:address",
  chainValidatorsDetailsHandler(API),
);
akashRoute("/chain_inflation", chainInflationHandler(API));
akashRoute("/chain_community_pool", chainCommunityPoolHandler(API));
akashRoute("/chain_pool", chainPoolHandler(API));
akashRoute("/block_height_details", chainBlockHeightDetailsHandler(API));
akashRoute("/block_height_txs", chainBlockHeightTxsHandler(API));
akashRoute("/chain_txs_hash", chainTxsByHashHandler(API));
akashRoute(
  "/chain_validator_slashing_signing_info_details/:cons_address",
  chainValidatorsSlashingSigningInfosDetailsHandler(API),
);
akashRoute(
  "/chain_validator_delegations/:validator_address",
  chainValidatorDelegationsHandler(API),
);
akashRoute(
  "/chain_validator_undelegations/:validator_address",
  chainValidatorUnDelegationsHandler(API),
);
akashRoute(
  "/chain_validator_redelegations/:delegator_address",
  chainValidatorReDelegationsHandler(API),
);
akashRoute("/chain_consensus", chainConsensusStateHandler(RPC));
akashRoute("/chain_minting_params", chainMintingParamsHandler(API));
akashRoute("/chain_gov_params", chainGovParamsHandler(API));
akashRoute("/chain_slashing_params", chainSlashingParamsHandler(API));
akashRoute("/chain_staking_params", chainStakingParamsHandler(API));
akashRoute("/chain_distribution_params", chainDistributionParamsHandler(API));
akashRoute("/chain_node_info", chainNodeInfoHandler(API));
akashRoute("/chain_proposals", chainProposalsHandler(API));
akashRoute("/chain_proposal_details", chainProposalDetailsHandler(API));
akashRoute(
  "/chain_proposal_voting_options",
  chainProposalVotingOptionsHandler(API),
);
akashRoute(
  "/chain_proposal_tally_options",
  chainProposalTallyOptionsHandler(API),
);
akashRoute("/chain_proposal_deposits", chainProposalDepositsHandler(API));
akashRoute("/chain_auth_account", chainAuthAccountHandler(API));
akashRoute(
  "/chain_account_txs_by_events/:address",
  chainAccountTxsByEventsHandler(API),
);
akashRoute("/chain_account_balance", chainAccountBalanceHandler(API));
akashRoute(
  "/chain_account_delegation_rewards",
  chainAccountDelegationRewardsHandler(API),
);
akashRoute("/chain_account_delegations", chainAccountDelegationsHandler(API));
akashRoute(
  "/chain_account_redelegations",
  chainAccountReDelegationsHandler(API),
);
akashRoute(
  "/chain_account_undelegations",
  chainAccountUnDelegationsHandler(API),
);

module.exports = app;
