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
  
  const darkMode = useAppSelector(state => state.general.darkMode)

  const getMintingParams = useGetChainMintingParamsQuery(),
    //pass the params type to the gov 
    getGovVotingParams = useGetChainGovParamsQuery('voting'),
    getGovDepositParams = useGetChainGovParamsQuery('deposit'),
    getGovTallyingParams = useGetChainGovParamsQuery('tallying'),
    getSlashingParams = useGetChainSlashingParamsQuery(),
    getStakingParams = useGetChainStakingParamsQuery(),
    getDistributionParams = useGetChainDistributionParamsQuery(),
    getNodeInfo = useGetChainNodeInfoQuery();


  const govParamtersData = {
    govVotingParamsData: getGovVotingParams,
    govDepositParamsData: getGovDepositParams,
    govTallyingParamsData: getGovTallyingParams
  }

  return (
    <>
      <Title className={darkMode ? 'dark-mode' : ''}>Parameters</Title>
      <Grid>
        <MintParams {...getMintingParams} />
        <GovParams {...govParamtersData} />
        <SlashingParams {... getSlashingParams} />
       <StakingParams {...getStakingParams}/>
       <DistributionParams {... getDistributionParams } />
       <NodeInfoParams {...getNodeInfo} /> 
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