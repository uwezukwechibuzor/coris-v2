import React from 'react'
import ParamsContent from '../../components/Params'
import Layout from "../../components/layout/Layout";
import { govParamsEndpoint, mintingParamsEndpoint, slashingParamsEndpoint, stakingParamsEndpoint } from '../../lib/chainApiEndpoints';

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
     const  getGovMintingParams = isServerReq(req) ? await fetch(`https:${mintingParamsEndpoint}`) : null
     const govMintingParams = await getGovMintingParams.json();

     //governance params for voting
     const getGovVotingParams = isServerReq(req) ? await fetch(`https:${govParamsEndpoint('voting')}`) : null
     const govVotingParams = await getGovVotingParams.json(); 
     
     //governance params for deposits
     const getGovDepositParams = isServerReq(req) ? await fetch(`https:${govParamsEndpoint('deposit')}`) : null
     const govDepositParams = await getGovDepositParams.json();
     
     //governance params for tallying
     const getGovTallyingParams = isServerReq(req) ? await fetch(`https:${govParamsEndpoint('tallying')}`) : null
     const govTallyingParams = await getGovTallyingParams.json();
    
     //governance slashing params
    const getGovSlashingParams = isServerReq(req) ? await fetch(`https:${slashingParamsEndpoint}`) : null
    const govSlashingParams = await getGovSlashingParams.json();

    //governance staking params
    const getGovStakingParams =  isServerReq(req) ? await fetch(`https:${stakingParamsEndpoint}`) : null
    const govStakingParams = getGovStakingParams.json();

    //governance distribut
    

    res.setHeader(
     'Cache-Control',
     'public, s-maxage=600, stale-while-revalidate=900'
   )
   //res.writeHead(307, { Location: '/_error' }).end()
 
   return {
     props: {
        govMintingParams: Object.assign({}, govMintingParams),
        govVotingParams:  Object.assign({}, govVotingParams),
        govDepositParams: Object.assign({}, govDepositParams),
        govTallyingParams: Object.assign({}, govTallyingParams),
        govSlashingParams: Object.assign({}, govSlashingParams),
        govStakingParams: Object.assign({}, govStakingParams),

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



const distributionParamsEndpoint = `${chainURL.cosmosChainREST}/cosmos/distribution/v1beta1/params`;

const nodeInfoEndpoint = `${chainURL.cosmosChainREST}/node_info`;
