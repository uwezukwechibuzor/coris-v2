import Layout from "../../components/layout/Layout";
import HomePageContent from "../../components/Homepage";
import useSWR from "swr";
import {
  chainActiveValidatorsEndpoint,
  chainPoolEndpoint,
  communityPoolEndpoint,
  inflationEndpoint,
  latestBlocksEndpoint,
  allTxsEndpoint,
  ChainAllValidatorsEndpoint,
} from "../../lib/chainApiEndpoints";
import { DENOM } from "../../lib/Util/constants";
import { BaseChainApi } from "../../lib/baseChainApi";
import { coinsAPI, coinsPriceChart } from "../../lib/coingeckoAPI";
import { fetcher } from "../../lib/Util/fetcher";
import { swrOptions } from "../../lib/Util/swrOptions ";

function Home(props) {
  const queryTotalBlocks = 5;
  const queryTotalTxs = 5;

  const chain_id = props?.chain_id?.chain_id;

  // Fetch latest blocks data
  const { data: getBlocks } = useSWR(
    BaseChainApi(chain_id) + latestBlocksEndpoint(queryTotalBlocks),
    fetcher,
    swrOptions
  );

  // Fetch all transactions data
  const { data: getAllTxs } = useSWR(
    BaseChainApi(chain_id) + allTxsEndpoint(queryTotalTxs),
    fetcher,
    swrOptions
  );

  // Fetch inflation data
  const { data: getInflation } = useSWR(
    BaseChainApi(chain_id) + inflationEndpoint,
    fetcher
  );

  // Fetch community pool data
  const { data: getCommunityPool } = useSWR(
    BaseChainApi(chain_id) + communityPoolEndpoint,
    fetcher
  );

  // Fetch active validators data
  const { data: getActiveValidators } = useSWR(
    BaseChainApi(chain_id) + chainActiveValidatorsEndpoint,
    fetcher
  );

  // Fetch all validators data
  const { data: getAllValidators } = useSWR(
    BaseChainApi(chain_id) + ChainAllValidatorsEndpoint,
    fetcher
  );

  // Fetch chain pool data
  const { data: getChainPool } = useSWR(
    BaseChainApi(chain_id) + chainPoolEndpoint,
    fetcher
  );

  // Fetch coin data
  const { data: coinData } = useSWR(coinsAPI(chain_id), fetcher);

  const inflationValue = getInflation
    ? (getInflation?.inflation * 100).toFixed(2) + "%"
    : null;
  const communityPoolValue = getCommunityPool
    ? (getCommunityPool?.pool[0]?.amount / DENOM).toFixed(2)
    : null;
  const chainPoolValue = getChainPool ? getChainPool : null;

  // Fetch price chart data
  const { data } = useSWR(coinsPriceChart(chain_id), fetcher, swrOptions);
  const priceChart = data ? data?.prices : [];

  const homePageData = {
    title: "Overview",
    supply: "Supply",
    inflation: "Inflation",
    inflationValue: inflationValue,
    communityPool: "Community pool",
    communityPoolValue: communityPoolValue,
    latestBlocks: "Latest Blocks",
    viewAll: "View all",
    getBlocks: getBlocks,
    getAllTxs: getAllTxs,
    activeValidators: getActiveValidators,
    chainAllValidators: getAllValidators,
    poolData: chainPoolValue,
    coinData: coinData,
    priceChart: priceChart,
    chain_id: chain_id,
  };

  return (
    <>
      <HomePageContent {...homePageData} />
    </>
  );
}

export default Home;

Home.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
