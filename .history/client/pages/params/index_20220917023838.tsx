import React from 'react'
import ParamsContent from '../../components/Params'
import Layout from "../../components/layout/Layout";

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
     //get inflation data
     const inflationEndPoint = inflationEndpoint
     const getInflationData = isServerReq(req) ? await fetch(`https:${inflationEndPoint}`) : null
     const inflationData = await getInflationData.json()
   

    res.setHeader(
     'Cache-Control',
     'public, s-maxage=600, stale-while-revalidate=900'
   )
   //res.writeHead(307, { Location: '/_error' }).end()
 
   return {
     props: {
       inflationData: Object.assign({}, inflationData),
       commuintyPoolData: Object.assign({}, commuintyPoolData),
       chainActiveValidatorsData: Object.assign({}, chainActiveValidatorsData),
       poolData: Object.assign({}, poolData),
       chainAllValidators: Object.assign({}, chainAllValidators)
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




  const mintingParamsEndpoint = `${chainURL.cosmosChainREST}/cosmos/mint/v1beta1/params`;

const govParamsEndpoint = (params_type) => `${chainURL.cosmosChainREST}/cosmos/gov/v1beta1/params/${params_type}`;

const slashingParamsEndpoint = `${chainURL.cosmosChainREST}/cosmos/slashing/v1beta1/params`;

const stakingParamsEndpoint = `${chainURL.cosmosChainREST}/cosmos/staking/v1beta1/params`;

const distributionParamsEndpoint = `${chainURL.cosmosChainREST}/cosmos/distribution/v1beta1/params`;

const nodeInfoEndpoint = `${chainURL.cosmosChainREST}/node_info`;