const express = require("express");
const { createCronJob } = require("../../../../cron.js");
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
  allTxsHandler,
  latestBlocksHandler,
} = require("../../../../data/chainQueries/cosmos/handlers.js");

const corsMiddleware = require("../../../../corsMiddleware.js");
const {
  createBlockchainModels,
} = require("../../../../Model/cosmos-chains/Models.jsx");

const { BlockModel: cosmosBlockModel, TxsModel: cosmosTxsModel } =
  createBlockchainModels("cosmos");

// cron task for cosmos
createCronJob(process.env.COSMOS_REST_API, cosmosTxsModel, cosmosBlockModel);

function prefixedRoute(routePrefix, path, handler) {
  return app.get(`/${routePrefix}${path}`, corsMiddleware, handler);
}

// Define a generic route function
const defineRoutes = (routePrefix, blockModel, txsModel, api, rpc) => {
  prefixedRoute(routePrefix, "/blocks/latest", latestBlocksHandler(blockModel));
  prefixedRoute(routePrefix, "/txs", allTxsHandler(txsModel));
  prefixedRoute(routePrefix, "/all_validators", allValidatorsHandler(api));
  prefixedRoute(
    routePrefix,
    "/active_validators",
    activeValidatorsHandler(api)
  );
  prefixedRoute(
    routePrefix,
    "/chain_validator_details",
    chainValidatorsDetailsHandler(api)
  );
  prefixedRoute(routePrefix, "/chain_inflation", chainInflationHandler(api));
  prefixedRoute(
    routePrefix,
    "/chain_community_pool",
    chainCommunityPoolHandler(api)
  );
  prefixedRoute(routePrefix, "/chain_pool", chainPoolHandler(api));
  prefixedRoute(
    routePrefix,
    "/block_height_details",
    chainBlockHeightDetailsHandler(api)
  );
  prefixedRoute(
    routePrefix,
    "/block_height_txs",
    chainBlockHeightTxsHandler(api)
  );
  prefixedRoute(routePrefix, "/chain_txs_hash", chainTxsByHashHandler(api));
  prefixedRoute(
    routePrefix,
    "/chain_validator_slashing_signing_info_details",
    chainValidatorsSlashingSigningInfosDetailsHandler(api)
  );
  prefixedRoute(
    routePrefix,
    "/chain_validator_delegations",
    chainValidatorDelegationsHandler(api)
  );
  prefixedRoute(
    routePrefix,
    "/chain_validator_undelegations",
    chainValidatorUnDelegationsHandler(api)
  );
  prefixedRoute(
    routePrefix,
    "/chain_validator_redelegations",
    chainValidatorReDelegationsHandler(api)
  );
  prefixedRoute(
    routePrefix,
    "/chain_consensus",
    chainConsensusStateHandler(rpc)
  );
  prefixedRoute(
    routePrefix,
    "/chain_minting_params",
    chainMintingParamsHandler(api)
  );
  prefixedRoute(routePrefix, "/chain_gov_params", chainGovParamsHandler(api));
  prefixedRoute(
    routePrefix,
    "/chain_slashing_params",
    chainSlashingParamsHandler(api)
  );
  prefixedRoute(
    routePrefix,
    "/chain_staking_params",
    chainStakingParamsHandler(api)
  );
  prefixedRoute(
    routePrefix,
    "/chain_distribution_params",
    chainDistributionParamsHandler(api)
  );
  prefixedRoute(routePrefix, "/chain_node_info", chainNodeInfoHandler(api));
  prefixedRoute(routePrefix, "/chain_proposals", chainProposalsHandler(api));
  prefixedRoute(
    routePrefix,
    "/chain_proposal_details",
    chainProposalDetailsHandler(api)
  );
  prefixedRoute(
    routePrefix,
    "/chain_proposal_voting_options",
    chainProposalVotingOptionsHandler(api)
  );
  prefixedRoute(
    routePrefix,
    "/chain_proposal_tally_options",
    chainProposalTallyOptionsHandler(api)
  );
  prefixedRoute(
    routePrefix,
    "/chain_proposal_deposits",
    chainProposalDepositsHandler(api)
  );
  prefixedRoute(
    routePrefix,
    "/chain_auth_account",
    chainAuthAccountHandler(api)
  );
  prefixedRoute(
    routePrefix,
    "/chain_account_txs_by_events",
    chainAccountTxsByEventsHandler(api)
  );
  prefixedRoute(
    routePrefix,
    "/chain_account_balance",
    chainAccountBalanceHandler(api)
  );
  prefixedRoute(
    routePrefix,
    "/chain_account_delegation_rewards",
    chainAccountDelegationRewardsHandler(api)
  );
  prefixedRoute(
    routePrefix,
    "/chain_account_delegations",
    chainAccountDelegationsHandler(api)
  );
  prefixedRoute(
    routePrefix,
    "/chain_account_redelegations",
    chainAccountReDelegationsHandler(api)
  );
  prefixedRoute(
    routePrefix,
    "/chain_account_undelegations",
    chainAccountUnDelegationsHandler(api)
  );
};

// Use the generic route function for "cosmos" prefix
defineRoutes(
  "cosmos",
  cosmosBlockModel,
  cosmosTxsModel,
  process.env.COSMOS_REST_API,
  process.env.COSMOS_RPC_API
);

module.exports = app;
