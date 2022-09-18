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

const consens