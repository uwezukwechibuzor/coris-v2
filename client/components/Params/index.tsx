import React from "react";
import styled from "styled-components";
import { UrbanistBoldBlack40px } from "../../styledMixins";
import { useAppSelector } from "../../lib/hooks";
import MintParams from "./Minting";
import GovParams from "./Gov";
import SlashingParams from "./Slashing";
import StakingParams from "./Staking";
import DistributionParams from "./Distribution";
import NodeInfoParams from "./NodeInfo";

function ParamsContent(props) {
  const darkMode = useAppSelector((state) => state.general.darkMode);

  const govMintingParams = props?.govMintingParams;
  const govSlashingParams = props?.govSlashingParams;
  const govStakingParams = props?.govStakingParams;
  const govDistributionParams = props?.govDistributionParams;
  const chainNodeInfo = props?.chainNodeInfo;

  const govParamtersData = {
    govVotingParams: props?.govVotingParams,
    govDepositParams: props?.govDepositParams,
    govTallyingParams: props?.govTallyingParams,
  };

  return (
    <>
      <Title className={darkMode ? "dark-mode" : ""}>Parameters</Title>
      <Grid>
        <MintParams {...govMintingParams} chain_id={props?.chain_id} />
        <GovParams {...govParamtersData} chain_id={props?.chain_id} />
        <SlashingParams {...govSlashingParams} chain_id={props?.chain_id} />
        <StakingParams
          govStakingParams={govStakingParams}
          chain_id={props?.chain_id}
        />
        <DistributionParams
          {...govDistributionParams}
          chain_id={props?.chain_id}
        />
        <NodeInfoParams {...chainNodeInfo} chain_id={props?.chain_id} />
      </Grid>
    </>
  );
}

const Grid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
  margin-bottom: 40px;
  @media screen and (max-width: 700px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Title = styled.h1`
  ${UrbanistBoldBlack40px}
  min-height: 48px;
  margin-top: 54px;
  letter-spacing: 0;
`;

export default ParamsContent;
