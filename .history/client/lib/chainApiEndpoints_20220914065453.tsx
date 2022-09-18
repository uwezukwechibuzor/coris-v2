import { chainURL } from "./interfaces/chainsURL";

export const inflationEndpoint = `${chainURL.cosmosChainREST}/cosmos/mint/v1beta1/inflation`;

export const communityPoolEndpoint = `${chainURL.cosmosChainREST}/cosmos/distribution/v1beta1/community_pool`;

export const chainActiveValidatorsEndpoint = √