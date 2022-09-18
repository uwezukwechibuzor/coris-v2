import React from 'react'
import ParamsContent from '../../components/Params'
import Layout from "../../components/layout/Layout";
import { mintingParamsEndpoint } from '../../lib/chainApiEndpoints';

const isServerReq = req => !req.url.startsWith('/_next');

function Params() {
    
    return (
     <>
      <ParamsContent />
     </>
    )
}

export async function getServerSideProps({ res, req }) {

    try {
       // Fetch data from external API
       //minting params
     const  getMintingParams = isServerReq(req) ? await fetch(`https:${mintingParamsEndpoint}`) : null
     const mintingParams = await getMintingParams.json();

     const getGovVotingParams = isServerReq(req) ? await fetch(`https:${ govParamsEndpoint }`) : null
   

    res.setHeader(
     'Cache-Control',
     'public, s-maxage=600, stale-while-revalidate=900'
   )
   //res.writeHead(307, { Location: '/_error' }).end()
 
   return {
     props: {
        mintingParams: Object.assign({}, mintingParams),
     },
   }

 } catch (error) {
   return error
 }
} 

export default Params

Params.getLayout = function getLayout(page: any) {
    return <Layout>{page}</Layout>
  };


const slashingParamsEndpoint = `${chainURL.cosmosChainREST}/cosmos/slashing/v1beta1/params`;

const stakingParamsEndpoint = `${chainURL.cosmosChainREST}/cosmos/staking/v1beta1/params`;

const distributionParamsEndpoint = `${chainURL.cosmosChainREST}/cosmos/distribution/v1beta1/params`;

const nodeInfoEndpoint = `${chainURL.cosmosChainREST}/node_info`;
