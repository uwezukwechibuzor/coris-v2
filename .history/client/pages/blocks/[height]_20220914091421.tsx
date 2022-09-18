import React from 'react'
import Layout from "../../components/layout/Layout";
import {
    useGetChainBlockHeightQuery, useGetChainTxsQuery
} from '../../lib/chainApi';
import { useRouter } from 'next/router'
import BlockHeightContent from '../../components/Blocks/Details';

function BlocksDetails() {
    const {query} = useRouter()

    //get blocks details from query
    const getBlockData = useGetChainBlockHeightQuery(query.height)
    const blockData = getBlockData.isLoading == false && getBlockData.isSuccess == true? getBlockData?.data : null
    
    //get all transactions existing on each blocks
    const getAllTxsOnBlockHeight = useGetChainTxsQuery(query.height) 
    const transactions = getAllTxsOnBlockHeight.isLoading == false && getAllTxsOnBlockHeight.isSuccess == true? getAllTxsOnBlockHeight?.data : null
   console.log(transactions)
   
    const blockDetailsData = {
        title: "Block Details",
        blockData: blockData,
        txs: transactions
    };
    
    return (
        <>
        <BlockHeightContent {...blockDetailsData} />
        </>
    )
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

export default BlocksDetails

BlocksDetails.getLayout = function getLayout(page: any) {
    return <Layout>{page}</Layout>
  };

