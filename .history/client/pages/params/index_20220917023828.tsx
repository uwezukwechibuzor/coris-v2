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
