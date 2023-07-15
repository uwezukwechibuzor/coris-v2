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

const API = process.env.UMEE_REST_API;
const RPC = process.env.UMEE_RPC_API;

cron.schedule("*/3 * * * * *", function () {
  //cron to run at every 3sec to get latest blocks
  fetchLatestBlocksAndTxs(API, Model.umeeTxsModel, Model.umeeBlockModel);
});

// Define a helper function to prefix the routes with "/umee"
function umeeRoute(path, handler) {
  return app.get(`/umee${path}`, corsMiddleware, handler);
}

// Define the routes
umeeRoute("/blocks/latest", latestBlocksHandler(Model.umeeBlockModel));
umeeRoute("/txs", allTxsHandler(Model.umeeTxsModel));
umeeRoute("/all_validators", allValidatorsHandler(API));
umeeRoute("/active_validators", activeValidatorsHandler(API));
umeeRoute(
  "/chain_validator_details/:address",
  chainValidatorsDetailsHandler(API),
);
umeeRoute("/chain_inflation", chainInflationHandler(API));
umeeRoute("/chain_community_pool", chainCommunityPoolHandler(API));
umeeRoute("/chain_pool", chainPoolHandler(API));
umeeRoute("/block_height_details", chainBlockHeightDetailsHandler(API));
umeeRoute("/block_height_txs", chainBlockHeightTxsHandler(API));
umeeRoute("/chain_txs_hash", chainTxsByHashHandler(API));
umeeRoute(
  "/chain_validator_slashing_signing_info_details/:cons_address",
  chainValidatorsSlashingSigningInfosDetailsHandler(API),
);
umeeRoute(
  "/chain_validator_delegations/:validator_address",
  chainValidatorDelegationsHandler(API),
);
umeeRoute(
  "/chain_validator_undelegations/:validator_address",
  chainValidatorUnDelegationsHandler(API),
);
umeeRoute(
  "/chain_validator_redelegations/:delegator_address",
  chainValidatorReDelegationsHandler(API),
);
umeeRoute("/chain_consensus", chainConsensusStateHandler(RPC));
umeeRoute("/chain_minting_params", chainMintingParamsHandler(API));
umeeRoute("/chain_gov_params", chainGovParamsHandler(API));
umeeRoute("/chain_slashing_params", chainSlashingParamsHandler(API));
umeeRoute("/chain_staking_params", chainStakingParamsHandler(API));
umeeRoute("/chain_distribution_params", chainDistributionParamsHandler(API));
umeeRoute("/chain_node_info", chainNodeInfoHandler(API));
umeeRoute("/chain_proposals", chainProposalsHandler(API));
umeeRoute("/chain_proposal_details", chainProposalDetailsHandler(API));
umeeRoute(
  "/chain_proposal_voting_options",
  chainProposalVotingOptionsHandler(API),
);
umeeRoute(
  "/chain_proposal_tally_options",
  chainProposalTallyOptionsHandler(API),
);
umeeRoute("/chain_proposal_deposits", chainProposalDepositsHandler(API));
umeeRoute("/chain_auth_account", chainAuthAccountHandler(API));
umeeRoute(
  "/chain_account_txs_by_events/:address",
  chainAccountTxsByEventsHandler(API),
);
umeeRoute("/chain_account_balance", chainAccountBalanceHandler(API));
umeeRoute(
  "/chain_account_delegation_rewards",
  chainAccountDelegationRewardsHandler(API),
);
umeeRoute("/chain_account_delegations", chainAccountDelegationsHandler(API));
umeeRoute(
  "/chain_account_redelegations",
  chainAccountReDelegationsHandler(API),
);
umeeRoute(
  "/chain_account_undelegations",
  chainAccountUnDelegationsHandler(API),
);

module.exports = app;
