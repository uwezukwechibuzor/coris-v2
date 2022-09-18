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



export default DistributionParams