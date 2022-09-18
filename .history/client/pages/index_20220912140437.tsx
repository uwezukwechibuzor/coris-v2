import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import HomePageContent from "../components/Homepage";
import Head from "next/head";
import Link from "next/link";
import axios from 'axios'
import { useGetChainAnnualProvisionsQuery, useGetChainCommunityPoolQuery, useGetChainInflationQuery} from "../lib/chainApi";
import { formatNumbers } from "../lib/Util/format";

function Home () {

  const [blocks, setBlocks] = useState([]);
  
  const queryTotalBlocks = 7

  //fetch latest transactions
  let getBlocksAPi = process.env.NEXT_PUBLIC_GetBlocks
  useEffect(() => {
      axios.get(`${getBlocksAPi}/blocks/latest?limit=${queryTotalBlocks}`).then((response) => {
          setBlocks(response.data)
      }).catch((error) => {
          console.log(error)
      })
  }, [blocks])


 



  //check if fetching is still loading
  //get inflation percentage
  const getInflation = useGetChainInflationQuery()
  const inflation = getInflation?.isLoading == false? (getInflation?.data?.inflation*100).toFixed(2)+'%' : null;

  //get annual provisions 
  const getAnnualProvisions = useGetChainAnnualProvisionsQuery()
  const annualProvisions = getAnnualProvisions?.isLoading == false? (Number(getAnnualProvisions?.data?.annual_provisions).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits:2})) : null;

  //get Community Pool
  const getCommunityPool = useGetChainCommunityPoolQuery()
  const communityPool = getCommunityPool.isLoading == false? formatNumbers(getCommunityPool?.data?.pool[0]?.amount) + ' ' +getCommunityPool?.data?.pool[0]?.denom  : null
  
  const homePageData = {
    title: "Overview",
    text2: "13:00",
    text3: "17:00",
    text4: "21:00",
    text5: "28:00",
    time: "3:59AM",
    price: "$376",
    apr: "Annual Provisions",
    aprValue: annualProvisions,
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
    getBlocks: blocks,  
  }

  return (
   <> 
   <HomePageContent {...homePageData} />
  </>
  );
}


export default Home

Home.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>
};
