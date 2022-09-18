import React from 'react'
import ProposalsContent from '../../components/Proposals'
import Layout from "../../components/layout/Layout";
import { useGetChainProposalsQuery } from '../../lib/chainApi';

const isServerReq = req => !req.url.startsWith('/_next');

function Proposals() {
     
    const getProposals = useGetChainProposalsQuery()
   console.log(getProposals)
    const proposalsData = {
        id: "#ID",
        title2: "Title",
        status: "Status",
        votingStart: "Voting Start",
        votingEnd: "Voting End",
        totalDeposit: "Total Deposit",
        proposalsData: getProposals
      };
    
    return (
        <>
        <ProposalsContent {...proposalsData} />
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
 
  //get community pool
  const getCommunityPool = isServerReq(req) ? await fetch(`https:${communityPoolEndpoint}`) : null
  const commuintyPoolData = await getCommunityPool.json();
 
  //get chain active validators
  const getChainActiveValidators = isServerReq(req) ? await fetch(`https:${chainActiveValidatorsEndpoint}`) : null
  const chainActiveValidatorsData = await getChainActiveValidators.json()
 
  //get Pool
  const getPool = isServerReq(req) ? await fetch(`https:${chainPoolEndpoint}`) : null
  const poolData = await getPool.json() 
 
  const getAllChainValidators = isServerReq(req) ? await fetch(`https:${allChainValidatorsEndpoint}`) : null
  const chainAllValidators = await getAllChainValidators.json();

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


export default Proposals

Proposals.getLayout = function getLayout(page: any) {
    return <Layout>{page}</Layout>
  };
  
  