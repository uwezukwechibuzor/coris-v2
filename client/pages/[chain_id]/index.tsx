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
} from "../../lib/chainApiEndpoints";
import { DENOM } from "../../lib/Util/constants";
import { BaseChainApi } from "../../lib/baseChainApi";
import { coinsAPI, coinsPriceChart } from "../../lib/coingeckoAPI";

function Home(props) {
  //console.log(props)
  const [getBlocks, setBlocks] = useState([]);
  const [getAllTxs, setAllTxs] = useState([]);
  const [getInflation, setInflation] = useState(null);
  const [getCommunityPool, setCommunityPool] = useState(null);
  const [getActiveValidators, setActiveValidators] = useState([]);
  const [getChainPool, setChainPool] = useState(null);
  const [coinData, setCoin]: any = useState([]);
  const [priceChart, setPriceChart]: any = useState([]);

  //get all chain validators from props
  const getAllValidators = props?.getAllValidators;

  const queryTotalBlocks = 5;
  const queryTotalTxs = 5;

  let coinID;

  props?.chain_id?.chain_id === "cosmos"
    ? (coinID = "cosmos")
    : (coinID = "umee");

  const chain_id = props?.chain_id?.chain_id;

  //fetch latest Blocks
  useEffect(() => {
    axios
      .get(BaseChainApi() + latestBlocksEndpoint(queryTotalBlocks))
      .then((response) => {
        setBlocks(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [getBlocks]);

  //get all latest transactions
  useEffect(() => {
    axios
      .get(BaseChainApi() + allTxsEndpoint(queryTotalTxs))
      .then((response) => {
        setAllTxs(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [getAllTxs]);

  //get inflation percentage
  useEffect(() => {
    axios
      .get(BaseChainApi() + inflationEndpoint)
      .then((response) => {
        setInflation(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //get Community Pool
  useEffect(() => {
    axios
      .get(BaseChainApi() + communityPoolEndpoint)
      .then((response) => {
        setCommunityPool(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //active validators
  useEffect(() => {
    axios
      .get(BaseChainApi() + chainActiveValidatorsEndpoint)
      .then((response) => {
        setActiveValidators(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //get Pool
  useEffect(() => {
    axios
      .get(BaseChainApi() + chainPoolEndpoint)
      .then((response) => {
        setChainPool(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //checks for these states
  const inflation = getInflation
    ? (getInflation?.inflation * 100).toFixed(2) + "%"
    : null;
  const communityPool = getCommunityPool
    ? (getCommunityPool?.pool[0]?.amount / DENOM).toFixed(2)
    : null;
  const chainPool = getChainPool ? getChainPool : null;

  //function to get coin details
  useEffect(() => {
    axios
      .get(coinsAPI(coinID))
      .then((response) => {
        setCoin(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //get price data and pass to price chart component
  useEffect(() => {
    axios
      .get(coinsPriceChart(coinID))
      .then((response) => {
        const getPrice = response.data.prices;
        setPriceChart(getPrice);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const homePageData = {
    title: "Overview",
    text2: "13:00",
    text3: "17:00",
    text4: "21:00",
    text5: "28:00",
    time: "3:59AM",
    price: "$376",
    apr: "Annual Provisions",
    place1: "Supply",
    address1: "1 453 930 716.2345 CORIS",
    percent1: "100%",
    percent2: "40%",
    inflation: "Inflation",
    inflationValue: inflation,
    communityPool: "Community pool",
    communityPoolValue: communityPool,
    phone1: "1 234 567 890",
    phone2: "1 234 567 890",
    place3: "supply",
    percent4: "75%",
    latestBlocks: "Latest Blocks",
    viewAll: "View all",
    getBlocks: getBlocks,
    getAllTxs: getAllTxs,
    activeValidators: getActiveValidators,
    chainAllValidators: getAllValidators,
    poolData: chainPool,
    coinData: coinData,
    priceChart: priceChart,
    chain_id: chain_id
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