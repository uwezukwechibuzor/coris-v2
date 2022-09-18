import React from 'react'
import ParamsContent from '../../components/Params'
import Layout from "../../components/layout/Layout";
import { distributionParamsEndpoint, govParamsEndpoint, mintingParamsEndpoint, nodeInfoEndpoint, slashingParamsEndpoint, stakingParamsEndpoint } from '../../lib/chainApiEndpoints';

const isServerReq = req => !req.url.startsWith('/_next');

function Params(props) {

  
    
   const govMintingParams = props?.govMintingParams;
   const govVotingParams = props?.govVotingParams;
   const govDepositParams = props?.govDepositParams;
   const govTallyingParams = props?.govTallyingParams
   const govSlashingParams = props?.govSlashingParams;
   const  govStakingParams = props?.govStakingParams;
   const govDistributionParams = props?.govDistributionParams;
   const chainNodeInfo = props?.chainNodeInfo
    
   const paramsData = {
    const govMintingParams: govMintingParams,
    const govVotingParams: govVotingParams,
    const govDepositParams = props?.govDepositParams;
    const govTallyingParams = props?.govTallyingParams
    const govSlashingParams = props?.govSlashingParams;
    const  govStakingParams = props?.govStakingParams;
    const govDistributionParams = props?.govDistributionParams;
    const chainNodeInfo = props?.chainNodeInfo
   }
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
     const  govMintingParams = await getGovMintingParams.json();

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

    //governance distribution params
    const getGovDistributionParams = isServerReq(req) ? await fetch(`https:${distributionParamsEndpoint}`) : null
    const govDistributionParams = getGovDistributionParams.json()

    //get chain node info
    const  getChainNodeInfo  =  isServerReq(req) ? await fetch(`https:${nodeInfoEndpoint}`) : null
    const chainNodeInfo = getChainNodeInfo.json()
    

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
        govDistributionParams: Object.assign({}, govDistributionParams),
        chainNodeInfo : Object.assign({}, chainNodeInfo ),
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

