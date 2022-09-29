import React from 'react'
import Layout from "../../components/layout/Layout";

import {
  useGetChainTxDetailsQuery
  } from '../../lib/chainApi';
import { useRouter } from 'next/router'
import TransactionContents from '../../components/Transaction';

function TransactionDetails(props) {
    const {query} = useRouter()
    
    const getTxDetails = useGetChainTxDetailsQuery(query.hash)
    const transactionDetails = getTxDetails.isLoading === false && getTxDetails.isSuccess === true? getTxDetails?.data : null
   
    return (
       <>
       <TransactionContents txDetails={transactionDetails} />
       </>
    )
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

export default TransactionDetails

TransactionDetails.getLayout = function getLayout(page: any) {
    return <Layout>{page}</Layout>
  };