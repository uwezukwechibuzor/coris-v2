import React, { useEffect, useState } from 'react'
import Layout from "../../components/layout/Layout";
import ValidatorsDetailsContent from '../../components/Validators/Details'
import {
  useGetChainValidatorDetailsQuery,
} from '../../lib/chainApi';
import { useRouter } from 'next/router'
import axios from 'axios';
import { chainValidatorsDetailsEndpoint } from '../../lib/chainApiEndpoints';
import { Bech32, fromBase64} from "@cosmjs/encoding";
import { sha256 } from "@cosmjs/crypto";

function ValidatorsDetails(props) {
    

    const getValidatorDetails =  props?.validatorDetails
    
    //get uptime by blocks
    //get blocks
  const [getUptimeByBlocksHeights, setUptimeByBlocksHeights] = useState([])
  const queryTotalBlocks = 100
  let getBlocksAPi = process.env.NEXT_PUBLIC_GetBlocks
  useEffect(() => {
      axios.get(`${getBlocksAPi}/blocks/latest?limit=${queryTotalBlocks}`).then((response) => {
          setUptimeByBlocksHeights(response.data)
      }).catch((error) => {
          console.log(error)
      })
    }, [getUptimeByBlocksHeights])
   
  const uptimeByBlocksHeights = getUptimeByBlocksHeights.map(uptimeByBlocksHeights => uptimeByBlocksHeights)

  const data = {
    getValidatorDetails: getValidatorDetails,
    getUptimeByBlocksHeights:uptimeByBlocksHeights
  }
 
    return (
        <ValidatorsDetailsContent {...data}/>
    )
}


export async function getServerSideProps({ query, res }) {

  try {
     // Fetch data from external API
   //get inflation data
   const getChainValidatorsDetails = await fetch(`https:${chainValidatorsDetailsEndpoint(query.address)}`);
   const validatorDetails = await getChainValidatorsDetails.json();

  
   
  res.setHeader(
   'Cache-Control',
   'public, s-maxage=10, stale-while-revalidate=59'
 )

 return {
   props: {
     validatorDetails,
   },
 }

} catch (error) {
   
}
} 

export default ValidatorsDetails

ValidatorsDetails.getLayout = function getLayout(page: any) {
    return <Layout>{page}</Layout>
  };
function sha256(ed25519PubkeyRaw: Uint8Array) {
  throw new Error('Function not implemented.');
}

