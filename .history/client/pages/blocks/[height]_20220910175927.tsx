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
    
    //console.log(transactions)
    const testingData = [12002144, 12002145, 12002146, 12002144]

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

export default BlocksDetails

BlocksDetails.getLayout = function getLayout(page: any) {
    return <Layout>{page}</Layout>
  };

