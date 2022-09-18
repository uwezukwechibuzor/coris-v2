import React, { useEffect, useState } from 'react'
import Layout from "../../components/layout/Layout";
import ValidatorsDetailsContent from '../../components/Validators/Details'
import {
  useGetChainValidatorDetailsQuery,
} from '../../lib/chainApi';
import { useRouter } from 'next/router'
import axios from 'axios';
import { chainPoolEndpoint, chainValidatorDelegationsEndpoint, chainValidatorsDetailsEndpoint, chainValidatorsSlashingSigningInfosDetailsEndpoint, chainValidatorUnDelegationsEndpoint } from '../../lib/chainApiEndpoints';
import { Bech32, fromBase64 } from '@cosmjs/encoding';
import { sha256 } from "@cosmjs/crypto";


function ValidatorsDetails(props) {
    

    const getValidatorDetails =  props?.validatorDetails
    const chainValidatorsSlashingInfo = props?.chainValidatorsSlashingInfo
    const chainValidatorDelegations = props?.chainValidatorDelegations;
    const  chainValidatorUnDelegations  = props?.chainValidatorUnDelegations 

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
    getUptimeByBlocksHeights:uptimeByBlocksHeights,
    chainValidatorsSlashingInfo: chainValidatorsSlashingInfo,
    chainValidatorDelegations:  chainValidatorDelegations,
    chainValidatorUnDelegations: chainValidatorUnDelegations
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
   
   const getChainValidatorsSlashingInfo  = await fetch(`https:${chainValidatorsSlashingSigningInfosDetailsEndpoint(bech32Address)}`);
   const chainValidatorsSlashingInfo = await getChainValidatorsSlashingInfo.json();
  
   const getChainValidatorDelegations = await fetch(`https:${chainValidatorDelegationsEndpoint(query.address)}`);
   const chainValidatorDelegations = await getChainValidatorDelegations.json();
  
 const getChainValidatorUnDelegations = await fetch(`https:${chainValidatorUnDelegationsEndpoint(query.address)}`);
 const chainValidatorUnDelegations = await getChainValidatorUnDelegations.json();

  //get Pool
  const getPool =  await fetch(`https:${chainPoolEndpoint}`)
  const poolData = await getPool.json()
   
  res.setHeader(
   'Cache-Control',
   'public, s-maxage=10, stale-while-revalidate=59'
 )

 return {
   props: {
     validatorDetails,
     chainValidatorsSlashingInfo,
     chainValidatorDelegations,
     chainValidatorUnDelegations,
     poolData
   },
 }

} catch (error) {
   
}
} 

export default ValidatorsDetails

ValidatorsDetails.getLayout = function getLayout(page: any) {
    return <Layout>{page}</Layout>
  };

