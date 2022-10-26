import React, { useEffect, useState } from "react";
import ProposalsContent from "../../components/Proposals";
import Layout from "../../components/layout/Layout";
import { proposalsEndpoint } from "../../lib/chainApiEndpoints";
import axios from "axios";
import { BaseChainApi } from "../../lib/baseChainApi";

function Proposals(props) {
  const [getProposals, setProposals] = useState([]);

  useEffect(() => {
    axios
      .get(BaseChainApi() + proposalsEndpoint)
      .then((response) => {
        setProposals(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const proposalsData = {
    id: "#ID",
    title2: "Title",
    status: "Status",
    votingStart: "Voting Start",
    votingEnd: "Voting End",
    totalDeposit: "Total Deposit",
    proposalsData: getProposals,
  };

  return (
    <>
      <ProposalsContent {...proposalsData} />
    </>
  );
}

export default Proposals;

Proposals.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
