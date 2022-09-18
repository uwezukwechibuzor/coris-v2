import React from 'react'
import styled from "styled-components";
import {
  UrbanistSemiBoldSoap24px,
  UrbanistSemiBoldBlueBell24px,
  UrbanistNormalBlack24px,
  UrbanistBoldBlack20px,
  UrbanistSemiBoldBlack24px,
  UrbanistBoldBlack40px,
  UrbanistLightBlack15px,
  UrbanistMediumBlack18px,
  ValignTextMiddle,
} from "../../../styledMixins";

function DistributionParams(props) {
    const {
        communityTax,
        baseProposerReward,
        bonusProposerReward,
        withdrawalAdressEnabled,
        percent11,
        percent12,
        percent13,
        place1,
        distributionParamsData
      } = props;
 
    return (
      <>
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
      </>       
    )
}

const MintDenom = styled.div`
  ${ValignTextMiddle}
  height: 29px;
  letter-spacing: 0;
`;

const InflationRateChange = styled.div`
  ${ValignTextMiddle}
  height: 29px;
  margin-top: 16px;
  letter-spacing: 0;
`;

const Percent = styled.div`
  ${ValignTextMiddle}
  height: 29px;
  margin-top: 16px;
  min-width: 37px;
  letter-spacing: 0;
`;

const FlexRow5 = styled.div`
  height: 228px;
  display: flex;
  padding: 31px 16px;
  align-items: flex-start;
  min-width: 660px;
  background-color: var(--white);
  border-radius: 20px;
  box-shadow: 0px 7px 30px #0015da29;
`;

const FlexCol11 = styled.div`
  ${UrbanistNormalBlack24px}
  width: 288px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 164px;
`;

const FlexCol12 = styled.div`
  ${UrbanistSemiBoldBlack24px}
  width: 49px;
  margin-left: 291px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  min-height: 164px;
`;

const Percent3 = styled.div`
  ${ValignTextMiddle}
  height: 29px;
  min-width: 31px;
  letter-spacing: 0;
`;

const Percent4 = styled.div`
  ${ValignTextMiddle}
  height: 29px;
  margin-top: 16px;
  min-width: 31px;
  letter-spacing: 0;
`;

const Place = styled.div`
  ${ValignTextMiddle}
  height: 29px;
  margin-top: 16px;
  min-width: 49px;
  letter-spacing: 0;
`;

export default DistributionParams