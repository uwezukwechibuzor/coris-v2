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

const API = process.env.JUNO_REST_API;
const RPC = process.env.JUNO_RPC_API;

cron.schedule("*/3 * * * * *", function () {
  //cron to run at every 3sec to get latest blocks
  fetchLatestBlocksAndTxs(API, Model.junoTxsModel, Model.junoBlockModel);
});

// Define a helper function to prefix the routes with "/juno"
function junoRoute(path, handler) {
  return app.get(`/juno${path}`, corsMiddleware, handler);
}

// Define the routes
junoRoute("/blocks/latest", latestBlocksHandler(Model.junoBlockModel));
junoRoute("/txs", allTxsHandler(Model.junoTxsModel));
junoRoute("/all_validators", allValidatorsHandler(API));
junoRoute("/active_validators", activeValidatorsHandler(API));
junoRoute(
  "/chain_validator_details/:address",
  chainValidatorsDetailsHandler(API),
);
junoRoute("/chain_inflation", chainInflationHandler(API));
junoRoute("/chain_community_pool", chainCommunityPoolHandler(API));
junoRoute("/chain_pool", chainPoolHandler(API));
junoRoute("/block_height_details", chainBlockHeightDetailsHandler(API));
junoRoute("/block_height_txs", chainBlockHeightTxsHandler(API));
junoRoute("/chain_txs_hash", chainTxsByHashHandler(API));
junoRoute(
  "/chain_validator_slashing_signing_info_details/:cons_address",
  chainValidatorsSlashingSigningInfosDetailsHandler(API),
);
junoRoute(
  "/chain_validator_delegations/:validator_address",
  chainValidatorDelegationsHandler(API),
);
junoRoute(
  "/chain_validator_undelegations/:validator_address",
  chainValidatorUnDelegationsHandler(API),
);
junoRoute(
  "/chain_validator_redelegations/:delegator_address",
  chainValidatorReDelegationsHandler(API),
);
junoRoute("/chain_consensus", chainConsensusStateHandler(RPC));
junoRoute("/chain_minting_params", chainMintingParamsHandler(API));
junoRoute("/chain_gov_params", chainGovParamsHandler(API));
junoRoute("/chain_slashing_params", chainSlashingParamsHandler(API));
junoRoute("/chain_staking_params", chainStakingParamsHandler(API));
junoRoute("/chain_distribution_params", chainDistributionParamsHandler(API));
junoRoute("/chain_node_info", chainNodeInfoHandler(API));
junoRoute("/chain_proposals", chainProposalsHandler(API));
junoRoute("/chain_proposal_details", chainProposalDetailsHandler(API));
junoRoute(
  "/chain_proposal_voting_options",
  chainProposalVotingOptionsHandler(API),
);
junoRoute(
  "/chain_proposal_tally_options",
  chainProposalTallyOptionsHandler(API),
);
junoRoute("/chain_proposal_deposits", chainProposalDepositsHandler(API));
junoRoute("/chain_auth_account", chainAuthAccountHandler(API));
junoRoute(
  "/chain_account_txs_by_events/:address",
  chainAccountTxsByEventsHandler(API),
);
junoRoute("/chain_account_balance", chainAccountBalanceHandler(API));
junoRoute(
  "/chain_account_delegation_rewards",
  chainAccountDelegationRewardsHandler(API),
);
junoRoute("/chain_account_delegations", chainAccountDelegationsHandler(API));
junoRoute(
  "/chain_account_redelegations",
  chainAccountReDelegationsHandler(API),
);
junoRoute(
  "/chain_account_undelegations",
  chainAccountUnDelegationsHandler(API),
);

module.exports = app;
