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
  const [get100BlocksHeights, set100BlocksHeights] = useState([])
  const queryTotalBlocks = 100
  let get100BlockHeight
  let getBlocksAPi = process.env.NEXT_PUBLIC_GetBlocks
  useEffect(() => {
      axios.get(`${getBlocksAPi}/blocks?limit=${queryTotalBlocks}`).then((response) => {
          set100BlocksHeights(response.data)
           get100BlockHeight = get100BlocksHeights.map(get100BlockHeight => get100BlockHeight?.height)
      }).catch((error) => {
          console.log(error)
      })
  }, [get100BlocksHeights])
   
  console.loh

    return (
        <ValidatorsDetailsContent {...getValidatorDetails} get100BlockHeight={get100BlockHeight} />
    )
}

export default ValidatorsDetails

ValidatorsDetails.getLayout = function getLayout(page: any) {
    return <Layout>{page}</Layout>
  };
