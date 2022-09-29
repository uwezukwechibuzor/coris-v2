import React from 'react'
import Layout from "../../components/layout/Layout";

import {
  useGetChainTxDetailsQuery
  } from '../../lib/chainApi';
import { useRouter } from 'next/router'
import TransactionContents from '../../components/Transaction';

function TransactionDetails(props: any) {
    const {query} = useRouter()
    
    const getTxDetails = useGetChainTxDetailsQuery(query.hash)
    const transactionDetails = getTxDetails.isLoading === false && getTxDetails.isSuccess === true? getTxDetails?.data : null
   
    return (
       <>
       <TransactionContents txDetails={transactionDetails} />
       </>
    )
}

export default TransactionDetails

TransactionDetails.getLayout = function getLayout(page: any) {
    return <Layout>{page}</Layout>
  };