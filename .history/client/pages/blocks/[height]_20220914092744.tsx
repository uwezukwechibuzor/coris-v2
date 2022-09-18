import React from 'react'
import Layout from "../../components/layout/Layout";
import {
    useGetChainBlockHeightQuery, useGetChainTxsQuery
} from '../../lib/chainApi';
import { useRouter } from 'next/router'
import BlockHeightContent from '../../components/Blocks/Details';
import { chainBlockHeightDetailsEndpont } from '../../lib/chainApiEndpoints';

function BlocksDetails(props) {
    

    //get blocks details from query
    const blockData = getBlockData  == false && getBlockData.isSuccess == true? getBlockData?.data : null
    
    //get all transactions existing on each blocks
    const getAllTxsOnBlockHeight = useGetChainTxsQuery(query.height) 
    const transactions = getAllTxsOnBlockHeight.isLoading == false && getAllTxsOnBlockHeight.isSuccess == true? getAllTxsOnBlockHeight?.data : null
   
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

export async function getServerSideProps({ query, res }) {

    try {
       // Fetch data from external API
     //get inflation data
     const getBlockHeightDetails = await fetch(`https:${chainBlockHeightDetailsEndpont(query.height)}`)
     const blockHeightDetails = await getBlockHeightDetails.json()
     
    res.setHeader(
     'Cache-Control',
     'public, s-maxage=10, stale-while-revalidate=59'
   )
 
   return {
     props: {
        blockHeightDetails,
     },
   }

 } catch (error) {
     
 }
    } 

export default BlocksDetails

BlocksDetails.getLayout = function getLayout(page: any) {
    return <Layout>{page}</Layout>
  };

