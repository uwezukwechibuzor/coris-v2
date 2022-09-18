import React from 'react'
import Layout from "../../components/layout/Layout";

import { useRouter } from 'next/router'
import TransactionContents from '../../components/Transaction';
import { chainTxsByHashEndpoint } from '../../lib/chainApiEndpoints';

function TransactionDetails(props) {
  
    const transactionDetails = props.chainTxsByHash !== undefined?  props.chainTxsByHash : null
   
    return (
       <>
       <TransactionContents txDetails={transactionDetails} />
       </>
    )
}

export async function getServerSideProps({ query, res }) {

  try {
     // Fetch data from external API
   //get inflation data
   const getChainTxsByHash = await fetch(`https:${chainTxsByHashEndpoint(query.hash)}`);
   const chainTxsByHash = await getChainTxsByHash.json();

  res.setHeader(
   'Cache-Control',
   'public, s-maxage=600, stale-while-revalidate=900'
 )

 return {
   props: {
    chainTxsByHash: Object.assign({}, chainTxsByHash), 
   },
 }

} catch (error) {
   
}
  } 

export default TransactionDetails

TransactionDetails.getLayout = function getLayout(page: any) {
    return <Layout>{page}</Layout>
  };
