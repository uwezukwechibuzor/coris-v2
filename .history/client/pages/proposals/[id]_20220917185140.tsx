import React from 'react'
import ProposalDetailsContents from '../../components/Proposals/Details'
import Layout from "../../components/layout/Layout";
import { useRouter } from 'next/router'
import { useGetChainProposalDetailsQuery, useGetChainProposalsDepositsQuery, useGetChainProposalsVotingOptionsQuery } from '../../lib/chainApi';
import { proposalDepositsEndpoint, proposalDetailsEndpoint, proposalVotingOptionsEndpoint } from '../../lib/chainApiEndpoints';

const isServerReq = req => !req.url.startsWith('/_next');


function ProposalDetails(props) {
    const {query} = useRouter()

    //get proposals details
    const getProposalDetails =  useGetChainProposalDetailsQuery(query.id)

    //get proposals voting options data
    const getProposalsVotingOptions = useGetChainProposalsVotingOptionsQuery(query.id)
    
    //get all deposits on each proposals
    const getDeposits = useGetChainProposalsDepositsQuery(query.id)

    const proposalsDetailsData = {
        type: "Type:",
        total: "Total:",
        proposalDetails: getProposalDetails,
        proposalsVotingOptions: getProposalsVotingOptions,
        deposits: getDeposits
    };

    return (
        <>
        <ProposalDetailsContents {...proposalsDetailsData} />
        </>
    )
}


export async function getServerSideProps({ query, res, req }) {

    try {
       // Fetch data from external API
     //get inflation data
     const getProposalDetails =  isServerReq(req) ?  await fetch(`https:${proposalDetailsEndpoint(query.id)}`) : null
     const proposalDetails = await getProposalDetails.json();
     
     const getProposalsVotingOptions =  isServerReq(req) ?  await fetch(`https:${proposalVotingOptionsEndpoint(query.id)}`) : null
     const proposalVotingOptions = await getProposalsVotingOptions.json();
    
    
     const getProposalDeposits =  isServerReq(req) ?  await fetch(`https:${proposalDepositsEndpoint(query.id)}`) : null
     const proposalDeposits = await getProposalDeposits.json();

     
    res.setHeader(
     'Cache-Control',
     'public, s-maxage=600, stale-while-revalidate=900'
   )
 
   return {
     props: {
        proposalDetails: Object.assign({},  proposalDetails),
        proposalVotingOptions : Object.assign({}, proposalVotingOptions),
        proposalVotingOptions : Object.assign({}, proposalVotingOptions),
     },
   }

 } catch (error) {
   return error
 }
} 


export default ProposalDetails

ProposalDetails.getLayout = function getLayout(page: any) {
    return <Layout>{page}</Layout>
  };