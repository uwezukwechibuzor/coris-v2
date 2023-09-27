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

const COSMOSHUB_REST_API = process.env.COSMOSHUB_REST_API;
const COSMOSHUB_RPC = process.env.COSMOSHUB_RPC;

let RESTAPI = [];
let RPC = [];

if (COSMOSHUB_REST_API) {
  try {
    RESTAPI = JSON.parse(COSMOSHUB_REST_API);
  } catch (error) {
    console.error("Error parsing COSMOSHUB_REST_API:", error);
  }
}

if (COSMOSHUB_RPC) {
  try {
    RPC = JSON.parse(COSMOSHUB_RPC);
  } catch (error) {
    console.error("Error parsing COSMOSHUB_RPC:", error);
  }
}

const cosmosHubCronOptions = {
  apiUrl: RESTAPI,
  txsModel: cosmosTxsModel,
  blockModel: cosmosBlockModel,
};
// cron task for cosmos
createCronJob(cosmosHubCronOptions);

function prefixedRoute(routePrefix, path, handler) {
  return app.get(`/${routePrefix}${path}`, corsMiddleware, handler);
}

// Define a generic route function
const defineRoutes = (routePrefix, options) => {
  const { blockModel, txsModel, api, rpc } = options;

  const routeMappings = [
    ["/blocks/latest", latestBlocksHandler(blockModel)],
    ["/txs", allTxsHandler(txsModel)],
    ["/all_validators", allValidatorsHandler(api)],
    ["/active_validators", activeValidatorsHandler(api)],
    ["/chain_validator_details", chainValidatorsDetailsHandler(api)],
    ["/chain_inflation", chainInflationHandler(api)],
    ["/chain_community_pool", chainCommunityPoolHandler(api)],
    ["/chain_pool", chainPoolHandler(api)],
    ["/block_height_details", chainBlockHeightDetailsHandler(api)],
    ["/block_height_txs", chainBlockHeightTxsHandler(api)],
    ["/chain_txs_hash", chainTxsByHashHandler(api)],
    [
      "/chain_validator_slashing_signing_info_details",
      chainValidatorsSlashingSigningInfosDetailsHandler(api),
    ],
    ["/chain_validator_delegations", chainValidatorDelegationsHandler(api)],
    ["/chain_validator_undelegations", chainValidatorUnDelegationsHandler(api)],
    ["/chain_validator_redelegations", chainValidatorReDelegationsHandler(api)],
    ["/chain_consensus", chainConsensusStateHandler(rpc)],
    ["/chain_minting_params", chainMintingParamsHandler(api)],
    ["/chain_gov_params", chainGovParamsHandler(api)],
    ["/chain_slashing_params", chainSlashingParamsHandler(api)],
    ["/chain_staking_params", chainStakingParamsHandler(api)],
    ["/chain_distribution_params", chainDistributionParamsHandler(api)],
    ["/chain_node_info", chainNodeInfoHandler(api)],
    ["/chain_proposals", chainProposalsHandler(api)],
    ["/chain_proposal_details", chainProposalDetailsHandler(api)],
    ["/chain_proposal_voting_options", chainProposalVotingOptionsHandler(api)],
    ["/chain_proposal_tally_options", chainProposalTallyOptionsHandler(api)],
    ["/chain_proposal_deposits", chainProposalDepositsHandler(api)],
    ["/chain_auth_account", chainAuthAccountHandler(api)],
    ["/chain_account_txs_by_events", chainAccountTxsByEventsHandler(api)],
    ["/chain_account_balance", chainAccountBalanceHandler(api)],
    [
      "/chain_account_delegation_rewards",
      chainAccountDelegationRewardsHandler(api),
    ],
    ["/chain_account_delegations", chainAccountDelegationsHandler(api)],
    ["/chain_account_redelegations", chainAccountReDelegationsHandler(api)],
    ["/chain_account_undelegations", chainAccountUnDelegationsHandler(api)],
  ];

  routeMappings.forEach(([route, handler]) => {
    prefixedRoute(routePrefix, route, handler);
  });
};

// Define options object
const options = {
  blockModel: cosmosBlockModel,
  txsModel: cosmosTxsModel,
  api: RESTAPI,
  rpc: RPC,
};

// Use the generic route function for "cosmos" prefix
defineRoutes("cosmos", options);

module.exports = app;
