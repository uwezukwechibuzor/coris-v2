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


const isServerReq = req => !req.url.startsWith('/_next');


function ValidatorsDetails(props) {
    
    const getValidatorDetails =  props?.validatorDetails
    const chainValidatorsSlashingInfo = props?.chainValidatorsSlashingInfo
    const chainValidatorDelegations = props?.chainValidatorDelegations;
    const  chainValidatorUnDelegations  = props?.chainValidatorUnDelegations
    const poolData = props?.poolData !== undefined?  props?.poolData : null; 

    

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

  try {
     // Fetch data from external API
   //get inflation data
   const getChainValidatorsDetails = isServerReq(req) ? await fetch(`https:${chainValidatorsDetailsEndpoint(query.address)}`) : null
   const validatorDetails = await getChainValidatorsDetails.json();

   const validatorsDetails =  validatorDetails?.validator !== undefined?  validatorDetails?.validator: null

   const consensusPubkey = validatorsDetails?.consensus_pubkey?.key !== undefined ?  validatorsDetails?.consensus_pubkey?.key : ''
   const ed25519PubkeyRaw = fromBase64(consensusPubkey);
   const addressData = sha256(ed25519PubkeyRaw).slice(0, 20);
   const bech32Address = Bech32.encode("cosmosvalcons", addressData);
   
   const getChainValidatorsSlashingInfo  = isServerReq(req) ? await fetch(`https:${chainValidatorsSlashingSigningInfosDetailsEndpoint(bech32Address)}`) : null
   const chainValidatorsSlashingInfo = await getChainValidatorsSlashingInfo.json();
  
   const getChainValidatorDelegations = isServerReq(req) ? await fetch(`https:${chainValidatorDelegationsEndpoint(query.address)}`) : null
   const chainValidatorDelegations = await getChainValidatorDelegations.json();
  
   const getChainValidatorUnDelegations = isServerReq(req) ? await fetch(`https:${chainValidatorUnDelegationsEndpoint(query.address)}`) : null
   const chainValidatorUnDelegations = await getChainValidatorUnDelegations.json();


  //get Pool
  const getPool = isServerReq(req) ?  await fetch(`https:${chainPoolEndpoint}`) : null
  const poolData = await getPool.json()
   

  res.setHeader(
   'Cache-Control',
   'public, s-maxage=600, stale-while-revalidate=900'
 )

 if (!validatorDetails || !chainValidatorsSlashingInfo || )

 return {
   props: {
     validatorDetails: {} || Object.assign({}, validatorDetails),
     chainValidatorsSlashingInfo: {} || Object.assign({}, chainValidatorsSlashingInfo),
     chainValidatorDelegations: {} || Object.assign({}, chainValidatorDelegations),
     chainValidatorUnDelegations: {} || Object.assign({}, chainValidatorUnDelegations),
     poolData: {} || Object.assign({}, poolData),
   }
 }

} catch (error) {
  
}
} 

export default ValidatorsDetails

ValidatorsDetails.getLayout = function getLayout(page: any) {
    return <Layout>{page}</Layout>
  };

