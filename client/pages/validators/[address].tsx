import React, { useEffect, useState } from 'react'
import Layout from "../../components/layout/Layout";
import ValidatorsDetailsContent from '../../components/Validators/Details'
import { useRouter } from 'next/router'
import axios from 'axios';
import { chainPoolEndpoint, chainValidatorDelegationsEndpoint, chainValidatorsDetailsEndpoint, chainValidatorsSlashingSigningInfosDetailsEndpoint, chainValidatorUnDelegationsEndpoint } from '../../lib/chainApiEndpoints';
import { Bech32, fromBase64 } from '@cosmjs/encoding';
import { sha256 } from "@cosmjs/crypto";


const isServerReq = req => !req.url.startsWith('/_next');


function ValidatorsDetails(props) {
    
    const getValidatorDetails =  !props?.validatorDetails? null : props?.validatorDetails 
    const chainValidatorsSlashingInfo = !props?.chainValidatorsSlashingInfo ? null :  props?.chainValidatorsSlashingInfo
    const chainValidatorDelegations = !props?.chainValidatorDelegations ? null : props?.chainValidatorDelegations;
    const  chainValidatorUnDelegations  = !props?.chainValidatorUnDelegations ? null : props?.chainValidatorUnDelegations
    const poolData = !props?.poolData ? null : props?.poolData; 

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
    chainValidatorUnDelegations: chainValidatorUnDelegations,
    poolData
  }
 
    return (
        <ValidatorsDetailsContent {...data}/>
    )
}


export async function getServerSideProps({ctx, query, res, req }) {

  let  validatorDetails, chainValidatorsSlashingInfo, chainValidatorDelegations,  chainValidatorUnDelegations, poolData

  try {
     // Fetch data from external API
   //get inflation data
    const getChainValidatorsDetails = isServerReq(req) ? await fetch(chainValidatorsDetailsEndpoint(query.address)) : null
    !getChainValidatorsDetails.ok ? { props: { validatorDetails: Object.assign({}, null) }} : validatorDetails = await getChainValidatorsDetails.json();

   const validatorsDetails =  !validatorDetails?.validator? null : validatorDetails?.validator

   const consensusPubkey = validatorsDetails?.consensus_pubkey?.key !== undefined ?  validatorsDetails?.consensus_pubkey?.key : ''
   const ed25519PubkeyRaw = fromBase64(consensusPubkey);
   const addressData = sha256(ed25519PubkeyRaw).slice(0, 20);
   const bech32Address = Bech32.encode("umeevalcons", addressData);
   
   const getChainValidatorsSlashingInfo  = isServerReq(req) ? await fetch(chainValidatorsSlashingSigningInfosDetailsEndpoint(bech32Address)) : null
   !getChainValidatorsSlashingInfo.ok ? { props: { chainValidatorsSlashingInfo: Object.assign({}, null) }}
   : chainValidatorsSlashingInfo = await getChainValidatorsSlashingInfo.json();

   const getChainValidatorDelegations = isServerReq(req) ? await fetch(chainValidatorDelegationsEndpoint(query.address)) : null
   !getChainValidatorDelegations.ok ? { props: { chainValidatorDelegations: Object.assign({}, null) }}
   : chainValidatorDelegations = await getChainValidatorDelegations.json();

   const getChainValidatorUnDelegations = isServerReq(req) ? await fetch(chainValidatorUnDelegationsEndpoint(query.address)) : null
   !getChainValidatorUnDelegations.ok ? { props: { chainValidatorUnDelegations: Object.assign({}, null) }}
   : chainValidatorUnDelegations = await getChainValidatorUnDelegations.json();


   //get Pool
   const getPool = isServerReq(req) ?  await fetch(chainPoolEndpoint) : null
   !getPool.ok ? { props: { poolData: Object.assign({}, null) }} : poolData = await getPool.json()
   

  res.setHeader(
   'Cache-Control',
   'public, s-maxage=600, stale-while-revalidate=900'
 )
 
 if (!validatorDetails || !chainValidatorsSlashingInfo || !chainValidatorDelegations ||  !chainValidatorUnDelegations || !poolData) {
  return {
    props: {
      validatorDetails: Object.assign({}, null),
      chainValidatorsSlashingInfo: Object.assign({}, null),
      chainValidatorDelegations: Object.assign({}, null),
      chainValidatorUnDelegations: Object.assign({}, null),
      poolData: Object.assign({}, null),
    }
  }
 } else {
  return {
    props: {
      validatorDetails: Object.assign({}, validatorDetails),
      chainValidatorsSlashingInfo: Object.assign({}, chainValidatorsSlashingInfo),
      chainValidatorDelegations: Object.assign({}, chainValidatorDelegations),
      chainValidatorUnDelegations: Object.assign({}, chainValidatorUnDelegations),
      poolData: Object.assign({}, poolData),
    }
  }
 }


} catch (error) {
  
}
} 

export default ValidatorsDetails

ValidatorsDetails.getLayout = function getLayout(page: any) {
    return <Layout>{page}</Layout>
  };

