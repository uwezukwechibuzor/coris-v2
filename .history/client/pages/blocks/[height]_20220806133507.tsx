import React from 'react'
import Layout from "../../components/layout/Layout";
import {
    useGetChainBlockHeightQuery
} from '../../lib/chainApi';
import { useRouter } from 'next/router'
import BlockHeightContent from '../../components/Blocks/Details';

function BlocksDetails(props) {
    const {query} = useRouter()
    const getBlockHeight = useGetChainBlockHeightQuery(query.height)
    //console.log(getBlockHeight)



    const blockDetailsData = {
        title: "Block Details",
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

