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
     const getInflationData = await fetch(`https:${inflationEndPoint}`)
     const inflationData = await getInflationData.json()

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

