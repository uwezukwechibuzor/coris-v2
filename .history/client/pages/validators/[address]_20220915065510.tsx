import React, { useEffect, useState } from 'react'
import Layout from "../../components/layout/Layout";
import ValidatorsDetailsContent from '../../components/Validators/Details'
import {
  useGetChainValidatorDetailsQuery,
} from '../../lib/chainApi';
import { useRouter } from 'next/router'
import axios from 'axios';
import { chainValidatorsDetailsEndpoint, chainValidatorsSlashingSigningInfosDetailsEndpoint } from '../../lib/chainApiEndpoints';
import { Bech32, fromBase64 } from '@cosmjs/encoding';
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

   const validatorsDetails =  validatorDetails?.validator !== undefined?  validatorDetails?.validator: null

   const consensusPubkey = validatorsDetails?.consensus_pubkey?.key !== undefined ?  validatorsDetails?.consensus_pubkey?.key : ''
   const ed25519PubkeyRaw = fromBase64(consensusPubkey);
   const addressData = sha256(ed25519PubkeyRaw).slice(0, 20);
   const bech32Address = Bech32.encode("cosmosvalcons", addressData);
   
   const getChainValidatorsSlashingInfo  = await fetch(`https:${chainValidatorsSlashingSigningInfosDetailsEndpoint(query.address)}`);
   const validatorDetails = awaitgetChainValidatorsSlashingInfo.json();

  
   
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

