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

  //fetch minting params
  useEffect(() => {
    axios
      .get(BaseChainApi() + mintingParamsEndpoint)
      .then((response) => {
        setMintingParams(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //fetch governance params
  useEffect(() => {
    axios
      .get(BaseChainApi() + govParamsEndpoint("voting"))
      .then((response) => {
        setGovVotingParams(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(BaseChainApi() + govParamsEndpoint("deposit"))
      .then((response) => {
        setGovDepositParams(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(BaseChainApi() + govParamsEndpoint("tallying"))
      .then((response) => {
        setGovTallyingParams(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //fetch slashing params
  useEffect(() => {
    axios
      .get(BaseChainApi() + slashingParamsEndpoint)
      .then((response) => {
        setSlashingParams(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //fetch staking params
  useEffect(() => {
    axios
      .get(BaseChainApi() + stakingParamsEndpoint)
      .then((response) => {
        setStakingParams(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //fetch Distribution params
  useEffect(() => {
    axios
      .get(BaseChainApi() + distributionParamsEndpoint)
      .then((response) => {
        setDistributionParams(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //fetch Chain Node Info
  useEffect(() => {
    axios
      .get(BaseChainApi() + nodeInfoEndpoint)
      .then((response) => {
        setChainNodeInfo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
      <ParamsContent {...paramsData} />
    </>
  );
}

export default Params;

Params.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
