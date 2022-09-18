import React, { useEffect, useState } from 'react'
import Layout from "../../components/layout/Layout";
import ValidatorsDetailsContent from '../../components/Validators/Details'
import {
  useGetChainValidatorDetailsQuery,
} from '../../lib/chainApi';
import { useRouter } from 'next/router'
import axios from 'axios';
import { chainPoolEndpoint, chainValidatorDelegationsEndpoint, chainValidatorReDelegationsEndpoint, chainValidatorsDetailsEndpoint, chainValidatorsSlashingSigningInfosDetailsEndpoint, chainValidatorUnDelegationsEndpoint } from '../../lib/chainApiEndpoints';
import { Bech32, fromBase64 } from '@cosmjs/encoding';
import { sha256 } from "@cosmjs/crypto";


function ValidatorsDetails(props) {
    

    const getValidatorDetails =  props?.validatorDetails
    const chainValidatorsSlashingInfo = props?.chainValidatorsSlashingInfo
    const chainValidatorDelegations = props?.chainValidatorDelegations;
    const  chainValidatorUnDelegations  = props?.chainValidatorUnDelegations
    const poolData = props?.poolData; 

    

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


//get reledelegations from the delegations
var relegation = []
chainValidatorDelegations?.delegation_responses?.map(async (delegator) => {
  const delegatorsAddress = delegator?.delegation?.delegator_address

  const getChainValidatorReDelegations = await fetch(`https:${chainValidatorReDelegationsEndpoint(delegatorsAddress)}`);
  const chainValidatorReDelegations = await getChainValidatorReDelegations.json();
    chainValidatorReDelegations.redelegation_responses.map(redelegation => {
       relegation.push(redelegation)
    })
})



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
     relegation,
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

