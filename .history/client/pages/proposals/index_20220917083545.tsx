import React from 'react'
import ProposalsContent from '../../components/Proposals'
import Layout from "../../components/layout/Layout";
import { useGetChainProposalsQuery } from '../../lib/chainApi';
import { proposalsEndpoint } from '../../lib/chainApiEndpoints';

const isServerReq = req => !req.url.startsWith('/_next');

function Proposals() {
     
    const getProposals = props?.proposalsData
   
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
   //get proposals data
   const getProposals = isServerReq(req) ? await fetch(`https:${proposalsEndpoint}`) : null
   const proposalsData = await getProposals.json()
 

  res.setHeader(
   'Cache-Control',
   'public, s-maxage=600, stale-while-revalidate=900'
 )
 //res.writeHead(307, { Location: '/_error' }).end()

 return {
   props: {
    proposalsData: Object.assign({},  proposalsData),
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
  
  