import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import BlocksContent from "../../components/Blocks";
import axios from 'axios'
import { useGetChainTxsQuery } from "../../lib/chainApi";

function Blocks () {
  
  const [getBlocks, setBlocks] = useState([])
  const [getAllTxs, setGetAllTxs] = useState([])


  const queryTotalBlocks = 20;
  const queryTotalTxs = 20;

  //get 20 latest blocks 
  let getAPi = process.env.NEXT_PUBLIC_GetBlocks
  useEffect(() => {
    axios.get(`${getAPi}/blocks/latest?limit=${queryTotalBlocks}`).
      then((response) => {
          setBlocks(response.data)
      }).catch((error) => {
          console.log(error)
      })
  }, [getBlocks])
  

   //get all latest transactions
   useEffect(() => {
       axios.get(`${getAPi}/txs?limit=${queryTotalTxs}`).then((response) => {
           setGetAllTxs(response.data)
       }).catch((error) => {
           console.log(error)
       })
   }, [getAllTxs])
   //console.log(getAllTxs)
 

  return (
   <> 
  <BlocksContent getBlocks={getBlocks} getAllTxs={getAllTxs} />
  </>
  );
}

export async function getServerSideProps({  res }) {

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
 
  //get all validators on the chain
  const getAllChainValidators =  await fetch(`https:${allChainValidatorsEndpoint}`)
  const chainAllValidators = await getAllChainValidators.json();

  //get Pool
  const getPool =  await fetch(`https:${chainPoolEndpoint}`)
  const poolData = await getPool.json()


  res.setHeader(
   'Cache-Control',
   'public, s-maxage=10, stale-while-revalidate=59'
 )

 return {
   props: {
     inflationData,
     commuintyPoolData,
     chainActiveValidatorsData,
     chainAllValidators,
     poolData 
   },
 }

} catch (error) {
   
}
  } 

export default Blocks

Blocks.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>
};