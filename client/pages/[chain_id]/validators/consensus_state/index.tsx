import Layout from "../../../../components/layout/Layout";
import ConsensusDetails from "../../../../components/Validators/Consensus";
import { BaseChainApi } from "../../../../lib/baseChainApi";
import { consensusStateEndpoint } from "../../../../lib/chainApiEndpoints";
import { allValidators, chainPool } from "../../../../lib/commonQueries";
import { fetcher } from "../../../../lib/Util/fetcher";
import useSWR from "swr";
import { swrOptions } from "../../../../lib/Util/swrOptions ";

function ValidatorsConsensusState(props) {
  const chain_id = props?.chain_id?.chain_id;

  const getChainPool = chainPool(chain_id);

  const getAllValidators = allValidators(chain_id);

  //consensus state for the validators
  const { data: getConsensusState } = useSWR(
    BaseChainApi(chain_id) + consensusStateEndpoint,
    fetcher,
    swrOptions
  );

  const validatorsDetails = {
    validators: getAllValidators,
    totalBondedTokens: getChainPool?.pool?.bonded_tokens,
    consensusState: getConsensusState,
    chain_id: chain_id,
  };

  return (
    <>
      <ConsensusDetails {...validatorsDetails} />
    </>
  );
}

export default ValidatorsConsensusState;

ValidatorsConsensusState.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
