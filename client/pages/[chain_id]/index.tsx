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
import { chainPool, getLatestBlocks, latestTxs } from "../../lib/commonQueries";

function Home(props) {
  const queryTotalBlocks = 5;
  const queryTotalTxs = 5;

  const chain_id = props?.chain_id?.chain_id;

  const getBlocks = getLatestBlocks(chain_id, queryTotalBlocks);

  const getAllTxs = latestTxs(chain_id, queryTotalTxs);

  const getChainPool = chainPool(chain_id);
  const chainPoolValue = getChainPool ? getChainPool : null;

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

  // Fetch coin data
  const { data: coinData } = useSWR(coinsAPI(chain_id), fetcher);

  // Fetch price chart data
  const { data } = useSWR(coinsPriceChart(chain_id), fetcher, swrOptions);
  const priceChart = data ? data?.prices : [];

  // Fetch inflation data
  const { data: getInflation } = useSWR(
    BaseChainApi(chain_id) + inflationEndpoint,
    fetcher
  );
  const inflationValue = getInflation
    ? (getInflation?.inflation * 100).toFixed(2) + "%"
    : null;

  // Fetch community pool data
  const { data: getCommunityPool } = useSWR(
    BaseChainApi(chain_id) + communityPoolEndpoint,
    fetcher
  );
  const communityPoolValue = getCommunityPool
    ? (getCommunityPool?.pool[0]?.amount / DENOM).toFixed(2)
    : null;

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
