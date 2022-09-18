import React from 'react'
import Layout from "../../components/layout/Layout";
import {
    useGetChainBlockHeightQuery
} from '../../lib/chainApi';
import { useRouter } from 'next/router'
import BlockHeightContent from '../../components/Blocks/Details';

function BlocksDetails() {
    const {query} = useRouter()
    const getBlockData = useGetChainBlockHeightQuery(query.height)
    const blockData = getBlockData.isLoading == false && getBlockData.isSuccess == true? getBlockData?.data : null
    
    console.log(blockData)
   


    const blockDetailsData = {
        title: "Block Details",
        blockData: 
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

