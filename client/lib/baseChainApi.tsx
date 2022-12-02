import { chainURL } from "./Util/chainsURL";

export const BaseChainApi = (chain_id) => {
  let getApi = chainURL.COSMOS_API;
  if (chain_id === "cosmos") {
    getApi = chainURL.COSMOS_API;
  } else if (chain_id === "agoric") {
    getApi = chainURL.AGORIC_API;
  } else if (chain_id === "akash-network") {
    getApi = chainURL.AKASH_API;
  } else if (chain_id === "chihuahua") {
    getApi = chainURL.CHIHUAHUA_API;
  } else if (chain_id === "crescent-network") {
    getApi = chainURL.CRESCENT_API;
  } else if (chain_id === "juno-network") {
    getApi = chainURL.JUNO_API;
  } else if (chain_id === "stargaze") {
    getApi = chainURL.STARGAZE_API;
  }
  return getApi;
};
