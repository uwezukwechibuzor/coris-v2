export const DENOM = 1000000;

export const assetSymbol = (chain_id) => {
  let getSymbol = "ATOM";
  if (chain_id === "cosmos") {
    getSymbol = "ATOM";
  } else if (chain_id === "agoric") {
    getSymbol = "BLD";
  } else if (chain_id === "akash-network") {
    getSymbol = "AKT";
  } else if (chain_id === "chihuahua") {
    getSymbol = "HUAHUA";
  } else if (chain_id === "crescent-network") {
    getSymbol = "CRE";
  } else if (chain_id === "juno-network") {
    getSymbol = "JUNO";
  } else if (chain_id === "stargaze") {
    getSymbol = "STARS";
  }
  return getSymbol;
};
