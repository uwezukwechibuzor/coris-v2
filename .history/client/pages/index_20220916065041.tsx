import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import HomePageContent from "../components/Homepage";
import Head from "next/head";
import Link from "next/link";
import axios from 'axios'
import { useGetChainAnnualProvisionsQuery, useGetChainCommunityPoolQuery, useGetChainInflationQuery} from "../lib/chainApi";
import { formatNumbers } from "../lib/Util/format";
import { GetServerSideProps } from "next";
import { allChainValidatorsEndpoint, chainActiveValidatorsEndpoint, chainPoolEndpoint, communityPoolEndpoint, inflationEndpoint } from "../lib/chainApiEndpoints";
import { DENOM } from "../lib/Util/constants";

function Home (props) {

  const [blocks, setBlocks] = useState([]);
  const [getAllTxs, setGetAllTxs] = useState([])

  
  const queryTotalBlocks = 7;
  const queryTotalTxs = 7;

  //fetch latest transactions
  let getAPi = process.env.NEXT_PUBLIC_GetBlocks
  useEffect(() => {
      axios.get(`${getAPi}/blocks/latest?limit=${queryTotalBlocks}`).then((response) => {
          setBlocks(response.data)
      }).catch((error) => {
          console.log(error)
      })
  }, [blocks])

 //get all latest transactions
 useEffect(() => {
  axios.get(`${getAPi}/txs?limit=${queryTotalTxs}`).then((response) => {
      setGetAllTxs(response.data)
  }).catch((error) => {
      console.log(error)
  })
}, [getAllTxs])


  //get inflation percentage
  const inflation = (props.inflationData.inflation*100).toFixed(2)+'%'

  //get Community Pool
  const communityPool = ((props.commuintyPoolData?.pool[0]?.amount)/DENOM).toFixed(2)+'%';
  
  //active validators
  const activeValidators = props?.chainActiveValidatorsData 
  const chainAllValidators = props?.chainAllValidators?.validators
  
  //get Pool
  const poolData = props?.poolData

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
    getBlocks: blocks,  
    getAllTxs: getAllTxs,
    activeValidators: activeValidators,
    chainAllValidators: chainAllValidators,
    poolData: poolData
  }

  return (
   <> 
   <HomePageContent {...homePageData} />
  </>
  );
}

export async function getServerSideProps({ res }) {

     try {
        // Fetch data from external API
      //get inflation data
      const inflationEndPoint = inflationEndpoint
      const getInflationData = await fetch(`https:${inflationEndPoint}`)
      const inflationData = await getInflationData.json()
    
     //get community pool
     const getCommunityPool =  await fetch(`https:${communityPoolEndpoint}`)
     const commuintyPoolData = await getCommunityPool.json();
    
     //get chain active validators
     const getChainActiveValidators = await fetch(`https:${chainActiveValidatorsEndpoint}`)
     const chainActiveValidatorsData = await getChainActiveValidators.json()
    
     //get Pool
     const getPool =  await fetch(`https:${chainPoolEndpoint}`)
     const poolData = await getPool.json()
    
     const getAllChainValidators =  await fetch(`https:${allChainValidatorsEndpoint}`)
     const chainAllValidators = await getAllChainValidators.json();

     res.setHeader(
      'Cache-Control',
      'public, s-maxage=600, stale-while-revalidate=900'
    )
    res.writeHead(307, { Location: '/' }).end()
  
    return {
      props: {
        inflationData,
        commuintyPoolData,
        chainActiveValidatorsData,
        poolData,
        chainAllValidators
      },
    }

  } catch (error) {
    return console.log("getServerSideProps error", error)
  }
} 
     
export default Home



Home.getLayout = function getLayout(page: any) {
  return <Layout>{page}{}</Layout>
};
