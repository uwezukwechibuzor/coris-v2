import React from 'react'
import Layout from "../../components/layout/Layout";
import { useRouter } from 'next/router'
import BlockHeightContent from '../../components/Blocks/Details';
import { chainActiveValidatorsEndpoint, chainBlockHeightDetailsEndpont, chainBlockHeightTxsEndpoint } from '../../lib/chainApiEndpoints';

const isServerReq = req => !req.url.startsWith('/_next');


function BlocksDetails(props) {
    //get blocks details from query
    const blockData = props.blockHeightDetails !== undefined? props.blockHeightDetails : null
    
    //get all transactions existing on each blocks
    const transactions =  props.blockHeightTxs !== undefined? props?.blockHeightTxs : null

    const activeValidators =  props.chainActiveValidatorsData !== undefined? props?.chainActiveValidatorsData : null
   
    const blockDetailsData = {
        title: "Block Details",
        blockData: blockData,
        txs: transactions,
        activeValidators: activeValidators
    };
    
    return (
        <>
        <BlockHeightContent {...blockDetailsData} />
        </>
    )
}

export async function getServerSideProps({ query, res, req }) {

    try {
       // Fetch data from external API
     //get inflation data
     const getBlockHeightDetails =  isServerReq(req) ?  await fetch(`https:${chainBlockHeightDetailsEndpont(query.height)}`) : null
     const blockHeightDetails = await getBlockHeightDetails.json();

     const getBlocksHeightTxs =  isServerReq(req) ?  await fetch(`https:${chainBlockHeightTxsEndpoint(query.height)}`) : null
     const blockHeightTxs = await getBlocksHeightTxs.json()

       //get chain active validators
    const getChainActiveValidators =  isServerReq(req) ?  await fetch(`https:${chainActiveValidatorsEndpoint}`)
    : null
    const chainActiveValidatorsData = await getChainActiveValidators.json()
     
    res.setHeader(
     'Cache-Control',
     'public, s-maxage=600, stale-while-revalidate=900'
   )
 
   return {
     props: {
        blockHeightDetails: blockHeightDetails,
        blockHeightTxs: blockHeightTxs,
        chainActiveValidatorsData: cha
     },
   }

 } catch (error) {
   return error
 }
} 

export default BlocksDetails

BlocksDetails.getLayout = function getLayout(page: any) {
    return <Layout>{page}</Layout>
  };

