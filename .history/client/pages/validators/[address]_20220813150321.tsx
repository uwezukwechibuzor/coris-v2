import React, { useEffect, useState } from 'react'
import Layout from "../../components/layout/Layout";
import ValidatorsDetailsContent from '../../components/Validators/Details'
import {
  useGetChainValidatorDetailsQuery,
} from '../../lib/chainApi';
import { useRouter } from 'next/router'
import axios from 'axios';

function ValidatorsDetails(props) {
    const {query} = useRouter()
    const getValidatorDetails =  useGetChainValidatorDetailsQuery(query.address)

    //get uptime by blocks
    //get blocks
  const [getUptimeByBlocksHeights, setUptimeByBlocksHeights] = useState([])
  const queryTotalBlocks = 100
  let getBlocksAPi = process.env.NEXT_PUBLIC_GetBlocks
      axios.get(`${getBlocksAPi}/blocks?limit=${queryTotalBlocks}`).then((response) => {
          setUptimeByBlocksHeights(response.data)
      }).catch((error) => {
          console.log(error)
      })
  
   
  const get100BlockHeight = getUptimeByBlocksHeights.map(get100BlockHeight => get100BlockHeight)

    return (
        <ValidatorsDetailsContent {...getValidatorDetails} get100BlockHeight={get100BlockHeight}/>
    )
}

export default ValidatorsDetails

ValidatorsDetails.getLayout = function getLayout(page: any) {
    return <Layout>{page}</Layout>
  };
