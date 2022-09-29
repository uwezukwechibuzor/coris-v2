import React from 'react'
import ProposalDetailsContents from '../../components/Proposals/Details'
import Layout from "../../components/layout/Layout";
import { useRouter } from 'next/router'
import { useGetChainProposalDetailsQuery, useGetChainProposalsDepositsQuery, useGetChainProposalsVotingOptionsQuery } from '../../lib/chainApi';

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
     const getBlockHeightDetails =  isServerReq(req) ?  await fetch(`https:${chainBlockHeightDetailsEndpont(query.height)}`) : null
     const blockHeightDetails = await getBlockHeightDetails.json();

     const getBlocksHeightTxs =  isServerReq(req) ?  await fetch(`https:${chainBlockHeightTxsEndpoint(query.height)}`) : null
     const blockHeightTxs = await getBlocksHeightTxs.json()

       //get chain active validators
    const getChainActiveValidators =  isServerReq(req) ?  await fetch(`https:${chainActiveValidatorsEndpoint}`)
    : null
    const chainActiveValidatorsData = await getChainActiveValidators.json()
     
    res.setHeader(
     'Cache-Control',
     'public, s-maxage=600, stale-while-revalidate=900'
   )
 
   return {
     props: {
        blockHeightDetails: Object.assign({}, blockHeightDetails),
        blockHeightTxs: Object.assign({}, blockHeightTxs),
        chainActiveValidatorsData: Object.assign({}, chainActiveValidatorsData)
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