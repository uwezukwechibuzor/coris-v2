import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import HomePageContent from "../../components/Homepage";
import axios from "axios";
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

function Home(props) {
  const [getBlocks, setBlocks] = useState([]);
  const [getAllTxs, setAllTxs] = useState([]);
  const [getInflation, setInflation] = useState(null);
  const [getCommunityPool, setCommunityPool] = useState(null);
  const [getAllValidators, setAllValidators] = useState(null);
  const [getActiveValidators, setActiveValidators] = useState([]);
  const [getChainPool, setChainPool] = useState(null);
  const [coinData, setCoin]: any = useState([]);
  const [priceChart, setPriceChart]: any = useState([]);

  const queryTotalBlocks = 5;
  const queryTotalTxs = 5;

  const chain_id = props?.chain_id?.chain_id;

  useEffect(() => {
    const fetchBlocks = async () => {
      try {
        const response = await axios.get(
          BaseChainApi(chain_id) + latestBlocksEndpoint(queryTotalBlocks)
        );
        setBlocks(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBlocks();
  }, [chain_id, queryTotalBlocks]);

  useEffect(() => {
    const fetchAllTxs = async () => {
      try {
        const response = await axios.get(
          BaseChainApi(chain_id) + allTxsEndpoint(queryTotalTxs)
        );
        setAllTxs(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllTxs();
  }, [chain_id, queryTotalTxs]);

  useEffect(() => {
    const fetchInflation = async () => {
      try {
        const response = await axios.get(
          BaseChainApi(chain_id) + inflationEndpoint
        );
        setInflation(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchInflation();
  }, [chain_id]);

  useEffect(() => {
    const fetchCommunityPool = async () => {
      try {
        const response = await axios.get(
          BaseChainApi(chain_id) + communityPoolEndpoint
        );
        setCommunityPool(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCommunityPool();
  }, [chain_id]);

  useEffect(() => {
    const fetchActiveValidators = async () => {
      try {
        const response = await axios.get(
          BaseChainApi(chain_id) + chainActiveValidatorsEndpoint
        );
        setActiveValidators(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchActiveValidators();
  }, [chain_id]);

  useEffect(() => {
    const fetchAllValidators = async () => {
      try {
        const response = await axios.get(
          BaseChainApi(chain_id) + ChainAllValidatorsEndpoint
        );
        setAllValidators(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllValidators();
  }, [chain_id]);

  useEffect(() => {
    const fetchChainPool = async () => {
      try {
        const response = await axios.get(
          BaseChainApi(chain_id) + chainPoolEndpoint
        );
        setChainPool(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchChainPool();
  }, [chain_id]);

  const inflationValue = getInflation
    ? (getInflation?.inflation * 100).toFixed(2) + "%"
    : null;
  const communityPoolValue = getCommunityPool
    ? (getCommunityPool?.pool[0]?.amount / DENOM).toFixed(2)
    : null;
  const chainPoolValue = getChainPool ? getChainPool : null;

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const response = await axios.get(coinsAPI(chain_id));
        setCoin(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCoinData();
  }, [chain_id, coinData]);

  useEffect(() => {
    const fetchPriceChart = async () => {
      try {
        const response = await axios.get(coinsPriceChart(chain_id));
        const getPrice = response.data.prices;
        setPriceChart(getPrice);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPriceChart();
  }, [chain_id, priceChart]);

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
