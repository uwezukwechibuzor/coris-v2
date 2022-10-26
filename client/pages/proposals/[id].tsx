import React, { useEffect, useState } from "react";
import ProposalDetailsContents from "../../components/Proposals/Details";
import Layout from "../../components/layout/Layout";
import { useRouter } from "next/router";
import {
  proposalDepositsEndpoint,
  proposalDetailsEndpoint,
  proposalVotingOptionsEndpoint,
} from "../../lib/chainApiEndpoints";
import axios from "axios";
import { BaseChainApi } from "../../lib/baseChainApi";

const isServerReq = (req) => !req.url.startsWith("/_next");

function ProposalDetails(props) {
  const [getProposalDetails, setProposalDetails] = useState(null);
  const [getProposalsVotingOptions, setProposalsVotingOptions] = useState(null);
  const [getDeposits, setDeposits] = useState(null);

  const router = useRouter();
  const query = router.query;

  //get proposals details
  useEffect(() => {
    axios
      .get(BaseChainApi() + proposalDetailsEndpoint(query.id))
      .then((response) => {
        setProposalDetails(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [query.id]);

  //get proposals voting options data
  useEffect(() => {
    axios
      .get(BaseChainApi() + proposalVotingOptionsEndpoint(query.id))
      .then((response) => {
        setProposalsVotingOptions(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [query.id]);

  //get all deposits on each proposals
  useEffect(() => {
    axios
      .get(BaseChainApi() + proposalDepositsEndpoint(query.id))
      .then((response) => {
        setDeposits(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [query.id]);

  const proposalsDetailsData = {
    type: "Type:",
    total: "Total:",
    proposalDetails: getProposalDetails,
    proposalsVotingOptions: getProposalsVotingOptions,
    deposits: getDeposits,
  };

  return (
    <>
      <ProposalDetailsContents {...proposalsDetailsData} />
    </>
  );
}

export default ProposalDetails;

ProposalDetails.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
