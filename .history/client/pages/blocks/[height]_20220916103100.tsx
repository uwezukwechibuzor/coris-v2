import React from 'react'
import Layout from "../../components/layout/Layout";
import { useRouter } from 'next/router'
import BlockHeightContent from '../../components/Blocks/Details';
import { chainActiveValidatorsEndpoint, chainBlockHeightDetailsEndpont, chainBlockHeightTxsEndpoint } from '../../lib/chainApiEndpoints';



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

export async function getServerSideProps({ query, res }) {

    try {
       // Fetch data from external API
     //get inflation data
     const getBlockHeightDetails = await fetch(`https:${chainBlockHeightDetailsEndpont(query.height)}`);
     const blockHeightDetails = await getBlockHeightDetails.json();

     const getBlocksHeightTxs = await fetch(`https:${chainBlockHeightTxsEndpoint(query.height)}`);
     const blockHeightTxs = await getBlocksHeightTxs.json()

       //get chain active validators
    const getChainActiveValidators = await fetch(`https:${chainActiveValidatorsEndpoint}`)
    const chainActiveValidatorsData = await getChainActiveValidators.json()
     
    res.setHeader(
     'Cache-Control',
     'public, s-maxage=600, stale-while-revalidate=900'
   )
 
   return {
     props: {
        blockHeightDetails,
        blockHeightTxs,
        chainActiveValidatorsData
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

export default BlocksDetails

BlocksDetails.getLayout = function getLayout(page: any) {
    return <Layout>{page}</Layout>
  };

