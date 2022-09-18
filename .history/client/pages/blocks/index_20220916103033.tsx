import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import BlocksContent from "../../components/Blocks";
import axios from 'axios'
import { useGetChainTxsQuery } from "../../lib/chainApi";
import { chainActiveValidatorsEndpoint } from "../../lib/chainApiEndpoints";

const isServerReq = req => !req.url.startsWith('/_next');


function Blocks (props) {
  
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

   //active validators
   const activeValidators = props?.chainActiveValidatorsData
 

  return (
   <> 
  <BlocksContent getBlocks={getBlocks} getAllTxs={getAllTxs} activeValidators={activeValidators} />
  </>
  );
}

export async function getServerSideProps({  res }) {
  
  try {
     // Fetch data from external API
  //get chain active validators
  const getChainActiveValidators =  isServerReq(req) ? await fetch(`https:${chainActiveValidatorsEndpoint}`)
: null  const chainActiveValidatorsData = await getChainActiveValidators.json()

  res.setHeader(
   'Cache-Control',
   'public, s-maxage=600, stale-while-revalidate=900'
 )

 return {
   props: {
     chainActiveValidatorsData,
   },
 }

} catch (error) {
  return {
    redirect: {
        destination: '/500',
        statusCode: 307
    }
}
}
} 

export default Blocks

Blocks.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>
};