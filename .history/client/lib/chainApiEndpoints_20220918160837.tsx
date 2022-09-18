import { chainURL } from "./interfaces/chainsURL";

export const inflationEndpoint = `${chainURL.cosmosChainREST}/cosmos/mint/v1beta1/inflation`;

export const communityPoolEndpoint = `${chainURL.cosmosChainREST}/cosmos/distribution/v1beta1/community_pool`;

export const chainActiveValidatorsEndpoint =  `${chainURL.cosmosChainREST}/cosmos/staking/v1beta1/validators?status=BOND_STATUS_BONDED&pagination.limit=500`;

export const allChainValidatorsEndpoint = `${chainURL.cosmosChainREST}/cosmos/staking/v1beta1/validators?pagination.limit=500`;

export const chainPoolEndpoint = `${chainURL.cosmosChainREST}/cosmos/staking/v1beta1/pool`;

export const chainBlockHeightDetailsEndpont = (height) => `${chainURL.cosmosChainREST}/blocks/${height}`;

export const chainBlockHeightTxsEndpoint = (height) =>  `${chainURL.cosmosChainREST}/cosmos/tx/v1beta1/txs?events=tx.height=${height}`;

export const chainTxsByHashEndpoint = (hash) =>  `${chainURL.cosmosChainREST}/cosmos/tx/v1beta1/txs/${hash}`

export const chainValidatorsDetailsEndpoint = (address) => `${chainURL.cosmosChainREST}/cosmos/staking/v1beta1/validators/${address}`;

export const chainValidatorsSlashingSigningInfosDetailsEndpoint = (cons_address) => `${chainURL.cosmosChainREST}/cosmos/slashing/v1beta1/signing_infos/${cons_address}`;

export const chainValidatorDelegationsEndpoint = (validator_addr) => `${chainURL.cosmosChainREST}/cosmos/staking/v1beta1/validators/${validator_addr}/delegations?pagination.key=hhhh&pagination.limit=500&pagination.reverse=true`;

export const chainValidatorUnDelegationsEndpoint = (validator_addr) => `${chainURL.cosmosChainREST}/cosmos/staking/v1beta1/validators/${validator_addr}/unbonding_delegations?pagination.key=hhhh&pagination.limit=500&pagination.reverse=true`;

export const chainValidatorReDelegationsEndpoint = (delegator_addr) => `${chainURL.cosmosChainREST}/cosmos/staking/v1beta1/delegators/${delegator_addr}/redelegations?pagination.limit=600`;

export const consensusStateEndpoint = `${chainURL.cosmosChainRPC}/consensus_state?`;

export const mintingParamsEndpoint = `${chainURL.cosmosChainREST}/cosmos/mint/v1beta1/params`;

export const govParamsEndpoint = (params_type) => `${chainURL.cosmosChainREST}/cosmos/gov/v1beta1/params/${params_type}`;

export const slashingParamsEndpoint = `${chainURL.cosmosChainREST}/cosmos/slashing/v1beta1/params`;

export  const stakingParamsEndpoint = `${chainURL.cosmosChainREST}/cosmos/staking/v1beta1/params`;

export const distributionParamsEndpoint = `${chainURL.cosmosChainREST}/cosmos/distribution/v1beta1/params`;

export const nodeInfoEndpoint = `${chainURL.cosmosChainREST}/node_info`;

export const proposalsEndpoint = `${chainURL.cosmosChainREST}/cosmos/gov/v1beta1/proposals?pagination.limit=500&pagination.reverse=true`;

export const proposalDetailsEndpoint = (proposal_id) =>  `${chainURL.cosmosChainREST}/cosmos/gov/v1beta1/proposals/${proposal_id}`

export const proposalVotingOptionsEndpoint = (id) =>  `${chainURL.cosmosChainREST}/cosmos/gov/v1beta1/proposals/${id}/votes`;

export const proposalDepositsEndpoint = (id) => `${chainURL.cosmosChainREST}/cosmos/gov/v1beta1/proposals/${id}/deposits`;

export const authAccountEndpoint = (address) => `${chainURL.cosmosChainREST}/cosmos/auth/v1beta1/accounts/${address}`;

export const accountBalanceEndpoint = (address) => `${chainURL.cosmosChainREST}/cosmos/auth/v1beta1/accounts/${address}`