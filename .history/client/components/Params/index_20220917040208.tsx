import React from 'react'
import styled from "styled-components";
import { useGetChainDistributionParamsQuery, useGetChainGovParamsQuery, useGetChainMintingParamsQuery, useGetChainNodeInfoQuery, useGetChainSlashingParamsQuery, useGetChainStakingParamsQuery } from '../../lib/chainApi';
import {
  UrbanistNormalBlack24px,
  UrbanistBoldBlack40px,
} from "../../styledMixins";
import { useAppSelector } from '../../lib/hooks';
import MintParams from './Minting';
import GovParams from './Gov';
import SlashingParams from './Slashing';
import StakingParams from './Staking';
import DistributionParams from './Distribution';
import NodeInfoParams from './NodeInfo';

function ParamsContent(props) {
  console.log(props)
  const darkMode = useAppSelector(state => state.general.darkMode)

  const govMintingParams = props?.govMintingParams;
  const govSlashingParams = props?.govSlashingParams;
  const  govStakingParams = props?.govStakingParams;
  const govDistributionParams = props?.govDistributionParams;
  const chainNodeInfo = props?.chainNodeInfo


  const govParamtersData = {
    govVotingParams = props?.govVotingParams;
    const govDepositParams = props?.govDepositParams;
    const govTallyingParams = props?.govTallyingParams
  }

  return (
    <>
      <Title className={darkMode ? 'dark-mode' : ''}>Parameters</Title>
      <Grid>
        <MintParams {...govMintingParams} />
        <GovParams {...govParamtersData} />
        <SlashingParams {...govSlashingParams} />
       <StakingParams {...govStakingParams}/>
       <DistributionParams {...govDistributionParams  } />
       <NodeInfoParams {...chainNodeInfo} /> 
      </Grid>
    </>
  )
}



const Grid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
  margin-bottom: 40px;
  @media screen and (max-width: 700px){
    grid-template-columns: repeat(1, 1fr);
  }
`

const Title = styled.h1`
  ${UrbanistBoldBlack40px}
  min-height: 48px;
  margin-top: 54px;
  letter-spacing: 0;
`;

export default ParamsContent