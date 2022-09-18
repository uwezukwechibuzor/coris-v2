import React from 'react'
import ProposalDetailsContents from '../../components/Proposals/Details'
import Layout from "../../components/layout/Layout";
import { useRouter } from 'next/router'
import { useGetChainProposalDetailsQuery, useGetChainProposalsVotingOptionsQuery } from '../../lib/chainApi';

function ProposalDetails(props) {
    const {query} = useRouter()
    const getProposalDetails =  useGetChainProposalDetailsQuery(query.id)
    const getProposalsVotingOptions = useGetChainProposalsVotingOptionsQuery(query.id)
    console.log(getProposalsVotingOptions)
    const proposalsDetailsData = {
        type: "Type:",
        total: "Total:",
        proposalDetails: getProposalDetails,
        proposalVotingOptions: getProposalsVotingOptions
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