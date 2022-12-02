import axios from "axios";
import { useEffect, useState } from "react";
import Layout from "../../../../components/layout/Layout";
import ConsensusDetails from "../../../../components/Validators/Consensus";
import { BaseChainApi } from "../../../../lib/baseChainApi";
import {
  ChainAllValidatorsEndpoint,
  chainPoolEndpoint,
  consensusStateEndpoint,
} from "../../../../lib/chainApiEndpoints";

function ValidatorsConsensusState(props) {
  const [getChainPool, setChainPool] = useState(null);
  const [getConsensusState, setConsensusState] = useState(null);
  const [getAllValidators, setAllValidators] = useState(null);

  const chain_id = props?.chain_id?.chain_id;

  //all validators
  useEffect(() => {
    axios
      .get(BaseChainApi(chain_id) + ChainAllValidatorsEndpoint)
      .then((response) => {
        setAllValidators(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [chain_id]);

  //get total bonded tokens
  useEffect(() => {
    axios
      .get(BaseChainApi(chain_id) + chainPoolEndpoint)
      .then((response) => {
        setChainPool(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [chain_id]);

  //consensus state for the validators
  useEffect(() => {
    axios
      .get(BaseChainApi(chain_id) + consensusStateEndpoint)
      .then((response) => {
        setConsensusState(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [getConsensusState, chain_id]);

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
