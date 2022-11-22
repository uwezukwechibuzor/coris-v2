import React, { useEffect, useState } from "react";
import ProposalsContent from "../../../components/Proposals";
import Layout from "../../../components/layout/Layout";
import {
  proposalsEndpoint,
  proposalTallyOptionsEndpoint,
} from "../../../lib/chainApiEndpoints";
import axios from "axios";
import { BaseChainApi } from "../../../lib/baseChainApi";

function Proposals(props) {
  const [getProposals, setProposals] = useState(null);
  const [getFirstFourActiveProposalsTally, setFirstFourActiveProposalsTally] = useState([]);

  const chain_id = props?.chain_id?.chain_id;

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

  //get proposals in Array form
  const getFirstFourActiveProposals = getProposals?.proposals?.map(
    (proposals) => {
      return proposals;
    }
  );

  //get the first four proposals
  const getFirstFourActiveProposalsSlice =  getFirstFourActiveProposals
  ?.slice(0, 4)
 for (const i in  getFirstFourActiveProposalsSlice) {
   axios
   .get(
     BaseChainApi() + proposalTallyOptionsEndpoint( getFirstFourActiveProposalsSlice[i]?.proposal_id)
   )
   .then((response) => {
    if (getFirstFourActiveProposalsTally.length === 0) {
      getFirstFourActiveProposalsSlice[i].tally = response.data
        let arr = []
        arr.push(getFirstFourActiveProposalsSlice)
        setFirstFourActiveProposalsTally(arr)
    } 
   })
   .catch((error) => {
     console.log(error);
   });
 }


  const proposalsData = {
    id: "#ID",
    title2: "Title",
    status: "Status",
    votingStart: "Voting Start",
    votingEnd: "Voting End",
    totalDeposit: "Total Deposit",
    proposalsData: getProposals,
    getFirstFourActiveProposalsTally: getFirstFourActiveProposalsTally,
  };

  return (
    <>
      <ProposalsContent {...proposalsData} chain_id={chain_id} />
    </>
  );
}

export default Proposals;

Proposals.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
