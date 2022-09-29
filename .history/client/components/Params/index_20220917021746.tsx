import React from 'react'
import styled from "styled-components";
import { useGetChainDistributionParamsQuery, useGetChainGovParamsQuery, useGetChainMintingParamsQuery, useGetChainNodeInfoQuery, useGetChainSlashingParamsQuery, useGetChainStakingParamsQuery } from '../../lib/chainApi';
import {
  UrbanistNormalBlack24px,
  UrbanistBoldBlack40px,
} from "../../styledMixins";
import { periodsInDays, periodsInMinutes } from '../../lib/Util/format';
import { useAppSelector } from '../../lib/hooks';
import MintParams from './Minting';
import GovParams from './Gov';
import SlashingParams from './Slashing';
import StakingParams from './Staking';

function ParamsContent() {
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


  const distributionParamtersData = {
    communityTax: "Community Tax",
    baseProposerReward: "Base Proposer Reward",
    bonusProposerReward: "Bonus Proposer Reward",
    withdrawalAdressEnabled: "Withdrawal Adress Enabled",
    distributionParamsData: getDistributionParams
  }

  const nodeInfoParametersData = {
    cosmosSdkVersion: "Cosmos SDK Version",
    tendermintVersion: "Tendermint Version",
    binaryVersion: "Binary Version",
    nodeInfoData: getNodeInfo
  }

  const parametersData = {
    title: "Parameters",
    mintingParameters: "Minting Parameters",
    governanceParameters: "Governance Parameters",
    slashingParameters: "Slashing Parameters",
    stakingParameters: "Staking Parameters",
    distributionParameters1: "Distribution Parameters",
    distributionParameters2: "NodeInfo Parameters",
  };

  //console.log("params", getGovDepositParams)

  return (
    <>
      <Title className={darkMode ? 'dark-mode' : ''}>{parametersData.title}</Title>
      <Grid>
        <MintParams {...getMintingParams} />
        <GovParams {...govParamtersData} />
        <SlashingParams {... getSlashingParams} />
       <StakingParams />
       
        <GridItem>
          <FlexColumn>
            <span>Distribution Parameters</span>
            <Card className={darkMode ? 'dark-mode w-100' : 'w-100'}>
              <FlexBetween>
                <span>Community Tax</span>
                <strong>{distributionParamtersData.distributionParamsData?.data?.params?.community_tax ? distributionParamtersData.distributionParamsData.data.params.community_tax * 100 + '%' : null}</strong>
              </FlexBetween>
              <FlexBetween>
                <span>Base Proposer Reward</span>
                <strong>{distributionParamtersData.distributionParamsData?.data?.params?.base_proposer_reward ? distributionParamtersData.distributionParamsData.data.params.base_proposer_reward * 100 + '%' : null}</strong>
              </FlexBetween>
              <FlexBetween>
                <span>Bonus Proposer Reward</span>
                <strong>{distributionParamtersData.distributionParamsData?.data?.params?.bonus_proposer_reward ? distributionParamtersData.distributionParamsData.data.params.bonus_proposer_reward * 100 + '%' : null}</strong>
              </FlexBetween>
              <FlexBetween>
                <span>Withdrawal Address Enabled</span>
                <strong>{distributionParamtersData.distributionParamsData?.data?.params?.withdraw_addr_enabled ? distributionParamtersData.distributionParamsData?.data?.params?.withdraw_addr_enabled === true ? 'true' : 'false' : null}</strong>
              </FlexBetween>
            </Card>
          </FlexColumn>
        </GridItem>
        <GridItem>
          <FlexColumn>
            <span>Node Info</span>
            <Card className={darkMode ? 'dark-mode w-100' : 'w-100'}>
              <FlexBetween>
                <span>Cosmos SDK Version</span>
                <strong>{nodeInfoParametersData.nodeInfoData?.data?.application_version?.cosmos_sdk_version ? nodeInfoParametersData.nodeInfoData.data.application_version.cosmos_sdk_version : null}</strong>
              </FlexBetween>
              <FlexBetween>
                <span>Tendermint Version</span>
                <strong>{nodeInfoParametersData.nodeInfoData?.data?.node_info?.version ? nodeInfoParametersData.nodeInfoData.data.node_info.version : null}</strong>
              </FlexBetween>
              <FlexBetween>
                <span>Binary Version</span>
                <strong>{nodeInfoParametersData.nodeInfoData?.data?.application_version?.cosmos_sdk_version ? nodeInfoParametersData.nodeInfoData.data.application_version.version : null}</strong>
              </FlexBetween>
            </Card>
          </FlexColumn>
        </GridItem>
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
const GridItem = styled.div`
  display:block;
`
const Card = styled.div`
  box-shadow: 0px 7px 30px #0015da29;
  border-radius: 20px;
  height: 100%;
  margin-top: 10px;
  padding: 20px 10px;
  &.dark-mode{
    background-color:#19172d !important;
    box-shadow: 0px -1px 20px 0px #23232329 !important;
  }
`
const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`
const FlexBetween = styled.div`
  display: flex;
  justify-content:space-between;
  padding: 5px 0px;
`




















const Title = styled.h1`
  ${UrbanistBoldBlack40px}
  min-height: 48px;
  margin-top: 54px;
  letter-spacing: 0;
`;

const ParametersContainer = styled.div`
  ${UrbanistNormalBlack24px}
  height: 29px;
  margin-top: 16px;
  display: flex;
  align-items: flex-start;
  min-width: 933px;
`;

const MiningParameters = styled.div`
  min-height: 29px;
  min-width: 197px;
  letter-spacing: 0;
`;

const GovernanceParameters = styled.div`
  min-height: 29px;
  margin-left: 479px;
  letter-spacing: 0;
`;

const OverlapGroupContainer = styled.div`
  margin-top: 9px;
  display: flex;
  align-items: flex-start;
  min-width: 1336px;
`;

const IngParametersContainer = styled.div`
  ${UrbanistNormalBlack24px}
  height: 29px;
  margin-top: 31px;
  display: flex;
  align-items: flex-start;
  min-width: 883px;
`;

const SlashingParameters = styled.div`
  min-height: 29px;
  min-width: 215px;
  letter-spacing: 0;
`;

const StakingParameters = styled.div`
  min-height: 29px;
  margin-left: 461px;
  letter-spacing: 0;
`;

const DistributionParametersContainer = styled.div`
  ${UrbanistNormalBlack24px}
  height: 29px;
  margin-top: 31px;
  display: flex;
  align-items: flex-start;
  min-width: 921px;
`;

const DistributionParameters = styled.div`
  min-height: 29px;
  min-width: 245px;
  letter-spacing: 0;
`;

const DistributionParameters1 = styled.div`
  min-height: 29px;
  margin-left: 431px;
  letter-spacing: 0;
`;

export default ParamsContent