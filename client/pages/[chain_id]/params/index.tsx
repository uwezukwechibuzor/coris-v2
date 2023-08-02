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
import useSWR from "swr";
import { fetcher } from "../../../lib/Util/fetcher";

function Params(props) {
  const chain_id = props?.chain_id?.chain_id;

  // fetch minting params
  const { data: getMintingParams } = useSWR(
    BaseChainApi(chain_id) + mintingParamsEndpoint,
    fetcher
  );

  // fetch governance params
  const { data: getGovVotingParams } = useSWR(
    BaseChainApi(chain_id) + govParamsEndpoint("voting"),
    fetcher
  );

  const { data: getGovDepositParams } = useSWR(
    BaseChainApi(chain_id) + govParamsEndpoint("deposit"),
    fetcher
  );

  const { data: getGovTallyingParams } = useSWR(
    BaseChainApi(chain_id) + govParamsEndpoint("tallying"),
    fetcher
  );

  // fetch slashing params
  const { data: getSlashingParams } = useSWR(
    BaseChainApi(chain_id) + slashingParamsEndpoint,
    fetcher
  );

  // fetch staking params
  const { data: getStakingParams } = useSWR(
    BaseChainApi(chain_id) + stakingParamsEndpoint,
    fetcher
  );

  // fetch Distribution params
  const { data: getDistributionParams } = useSWR(
    BaseChainApi(chain_id) + distributionParamsEndpoint,
    fetcher
  );

  //fetch Chain Node Info
  const { data: getChainNodeInfo } = useSWR(
    BaseChainApi(chain_id) + nodeInfoEndpoint,
    fetcher
  );

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
      <ParamsContent {...paramsData} chain_id={chain_id} />
    </>
  );
}

export default Params;

Params.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
