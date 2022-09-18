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

export async function getServerSideProps({ query, res }) {

  try {
     // Fetch data from external API
   //get inflation data
   const getBlockHeightDetails = await fetch(`https:${chainBlockHeightDetailsEndpont(query.height)}`);
   const blockHeightDetails = await getBlockHeightDetails.json();

  res.setHeader(
   'Cache-Control',
   'public, s-maxage=10, stale-while-revalidate=59'
 )

 return {
   props: {
      blockHeightDetails,
      blockHeightTxs,
      chainActiveValidatorsData
   },
 }

} catch (error) {
   
}
  } 




export default TransactionDetails

TransactionDetails.getLayout = function getLayout(page: any) {
    return <Layout>{page}</Layout>
  };
