export const coinsAPI = (coinID) =>
  `https://api.coingecko.com/api/v3/coins/${coinID}`;
export const coinsPriceChart = (coinID) =>
  `https://api.coingecko.com/api/v3/coins/${coinID}/market_chart?vs_currency=usd&days=1`;
export const cosmosEcoSystem_API = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=cosmos-ecosystem&order=market_cap_desc&per_page=50&page=1&sparkline=false`;
