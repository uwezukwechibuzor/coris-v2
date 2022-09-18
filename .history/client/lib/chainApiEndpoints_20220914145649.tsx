import { chainURL } from "./interfaces/chainsURL";

export const inflationEndpoint = `${chainURL.cosmosChainREST}/cosmos/mint/v1beta1/inflation`;

export const communityPoolEndpoint = `${chainURL.cosmosChainREST}/cosmos/distribution/v1beta1/community_pool`;

export const chainActiveValidatorsEndpoint =  `${chainURL.cosmosChainREST}/cosmos/staking/v1beta1/validators?status=BOND_STATUS_BONDED&pagination.limit=500`;

export const allChainValidatorsEndpoint = `${chainURL.cosmosChainREST}/cosmos/staking/v1beta1/validators?pagination.limit=500`;

export const chainPoolEndpoint = `${chainURL.cosmosChainREST}/cosmos/staking/v1beta1/pool`;

export const chainBlockHeightDetailsEndpont = (height) => `${chainURL.cosmosChainREST}/blocks/${height}`;

export const chainBlockHeightTxsEndpoint = (height) =>  `${chainURL.cosmosChainREST}/cosmos/tx/v1beta1/txs?events=tx.height=${height}`;

export const chainTsx
