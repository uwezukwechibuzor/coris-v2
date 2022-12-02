import React, { useEffect, useState } from "react";
import ParamsContent from "../../../components/Params";
import Layout from "../../../components/layout/Layout";
import {
  distributionParamsEndpoint,
  govParamsEndpoint,
  mintingParamsEndpoint,
  nodeInfoEndpoint,
  slashingParamsEndpoint,
  stakingParamsEndpoint,
} from "../../../lib/chainApiEndpoints";
import { BaseChainApi } from "../../../lib/baseChainApi";
import axios from "axios";

function Params(props) {
  const [getMintingParams, setMintingParams] = useState({});
  const [getGovVotingParams, setGovVotingParams] = useState({});
  const [getGovDepositParams, setGovDepositParams] = useState({});
  const [getGovTallyingParams, setGovTallyingParams] = useState({});
  const [getSlashingParams, setSlashingParams] = useState({});
  const [getStakingParams, setStakingParams] = useState({});
  const [getDistributionParams, setDistributionParams] = useState({});
  const [getChainNodeInfo, setChainNodeInfo] = useState({});

  const chain_id = props?.chain_id?.chain_id;

  //fetch minting params
  useEffect(() => {
    axios
      .get(BaseChainApi(chain_id) + mintingParamsEndpoint)
      .then((response) => {
        setMintingParams(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [chain_id]);

  //fetch governance params
  useEffect(() => {
    axios
      .get(BaseChainApi(chain_id) + govParamsEndpoint("voting"))
      .then((response) => {
        setGovVotingParams(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [chain_id]);

  useEffect(() => {
    axios
      .get(BaseChainApi(chain_id) + govParamsEndpoint("deposit"))
      .then((response) => {
        setGovDepositParams(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [chain_id]);

  useEffect(() => {
    axios
      .get(BaseChainApi(chain_id) + govParamsEndpoint("tallying"))
      .then((response) => {
        setGovTallyingParams(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [chain_id]);

  //fetch slashing params
  useEffect(() => {
    axios
      .get(BaseChainApi(chain_id) + slashingParamsEndpoint)
      .then((response) => {
        setSlashingParams(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [chain_id]);

  //fetch staking params
  useEffect(() => {
    axios
      .get(BaseChainApi(chain_id) + stakingParamsEndpoint)
      .then((response) => {
        setStakingParams(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [chain_id]);

  //fetch Distribution params
  useEffect(() => {
    axios
      .get(BaseChainApi(chain_id) + distributionParamsEndpoint)
      .then((response) => {
        setDistributionParams(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [chain_id]);

  //fetch Chain Node Info
  useEffect(() => {
    axios
      .get(BaseChainApi(chain_id) + nodeInfoEndpoint)
      .then((response) => {
        setChainNodeInfo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [chain_id]);

  const paramsData = {
    govMintingParams: getMintingParams,
    govVotingParams: getGovVotingParams,
    govDepositParams: getGovDepositParams,
    govTallyingParams: getGovTallyingParams,
    govSlashingParams: getSlashingParams,
    govStakingParams: getStakingParams,
    govDistributionParams: getDistributionParams,
    chainNodeInfo: getChainNodeInfo,
  };
  return (
    <>
      <ParamsContent {...paramsData} chain_id={chain_id } />
    </>
  );
}

export default Params;

Params.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
