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
    
    get
    const getDeposits = useGetChainProposalsDepositsQuery(query.id)

    const proposalsDetailsData = {
        type: "Type:",
        total: "Total:",
        proposalDetails: getProposalDetails,
        proposalsVotingOptions: getProposalsVotingOptions
    };

    return (
        <>
        <ProposalDetailsContents {...proposalsDetailsData} />
        </>
    )
}

export default ProposalDetails

ProposalDetails.getLayout = function getLayout(page: any) {
    return <Layout>{page}</Layout>
  };