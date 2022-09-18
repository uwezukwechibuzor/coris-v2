import React from 'react'
import ProposalDetailsContents from '../../components/Proposals/Details'
import Layout from "../../components/layout/Layout";
import { useRouter } from 'next/router'
import { useGetChainProposalDetailsQuery } from '../../lib/chainApi';

function ProposalDetails(props) {
    const {query} = useRouter()
    const getProposalDetails =  useGetChainProposalDetailsQuery(query.id)
    console.log(getProposalDetails)

    const proposalsDetailsData = {
        type: "Type:",
        total: "Total:",
        proposalDetails: getProposalDetails.isLoading === false? getProposalDetails : null
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