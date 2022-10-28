import axios from "axios";
import { useEffect, useState } from "react";
import Layout from "../../../../components/layout/Layout";
import ConsensusDetails from "../../../../components/Validators/Consensus";
import { BaseChainApi } from "../../../../lib/baseChainApi";
import {
  chainPoolEndpoint,
  consensusStateEndpoint,
} from "../../../../lib/chainApiEndpoints";

function ValidatorsConsensusState(props) {
  const [getChainPool, setChainPool] = useState(null);
  const [getConsensusState, setConsensusState] = useState(null);

  //get all chain validators from props
  const getAllValidators = props?.getAllValidators;
  const chain_id = props?.chain_id?.chain_id;

  //get total bonded tokens
  useEffect(() => {
    axios
      .get(BaseChainApi() + chainPoolEndpoint)
      .then((response) => {
        setChainPool(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //consensus state for the validators
  useEffect(() => {
    axios
      .get(BaseChainApi() + consensusStateEndpoint)
      .then((response) => {
        setConsensusState(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [getConsensusState]);

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
