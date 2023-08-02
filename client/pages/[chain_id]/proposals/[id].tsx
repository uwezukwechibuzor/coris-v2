import ProposalDetailsContents from "../../../components/Proposals/Details";
import Layout from "../../../components/layout/Layout";
import { useRouter } from "next/router";
import {
  proposalDepositsEndpoint,
  proposalDetailsEndpoint,
  proposalTallyOptionsEndpoint,
  proposalVotingOptionsEndpoint,
} from "../../../lib/chainApiEndpoints";
import { BaseChainApi } from "../../../lib/baseChainApi";
import useSWR from "swr";
import { fetcher } from "../../../lib/Util/fetcher";

function ProposalDetails(props) {
  const chain_id = props?.chain_id?.chain_id;

  const router = useRouter();
  const query = router.query;

  //get proposals details
  const { data: getProposalDetails } = useSWR(
    query.id
      ? BaseChainApi(chain_id) + proposalDetailsEndpoint(query.id)
      : null,
    fetcher
  );

  //get proposals voting options data
  const { data: getProposalsVotingOptions } = useSWR(
    query.id
      ? BaseChainApi(chain_id) + proposalVotingOptionsEndpoint(query.id)
      : null,
    fetcher
  );

  //get proposals tally options
  const { data: getTally } = useSWR(
    query.id
      ? BaseChainApi(chain_id) + proposalTallyOptionsEndpoint(query.id)
      : null,
    fetcher
  );

  //get all deposits on each proposals
  const { data: getDeposits } = useSWR(
    query.id
      ? BaseChainApi(chain_id) + proposalDepositsEndpoint(query.id)
      : null,
    fetcher
  );

  const proposalsDetailsData = {
    type: "Type:",
    total: "Total:",
    proposalDetails: getProposalDetails,
    proposalsVotingOptions: getProposalsVotingOptions,
    deposits: getDeposits,
    getTally: getTally,
    chain_id: chain_id,
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
