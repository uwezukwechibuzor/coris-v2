import React from "react";
import styled from "styled-components";
import { useAppSelector } from "../../../lib/hooks";

function DistributionParams(props) {
  const darkMode = useAppSelector((state) => state.general.darkMode);

  const distributionParamsData = props;

  return (
    <>
      <GridItem>
        <FlexColumn>
          <span>Distribution Parameters</span>
          <Card className={darkMode ? "dark-mode w-100" : "w-100"}>
            <FlexBetween>
              <span>Community Tax</span>
              <strong>
                {distributionParamsData?.params?.community_tax
                  ? distributionParamsData.params.community_tax * 100 + "%"
                  : null}
              </strong>
            </FlexBetween>
            <FlexBetween>
              <span>Base Proposer Reward</span>
              <strong>
                {distributionParamsData?.params?.base_proposer_reward
                  ? distributionParamsData.params.base_proposer_reward * 100 +
                    "%"
                  : null}
              </strong>
            </FlexBetween>
            <FlexBetween>
              <span>Bonus Proposer Reward</span>
              <strong>
                {distributionParamsData?.params?.bonus_proposer_reward
                  ? distributionParamsData.params.bonus_proposer_reward * 100 +
                    "%"
                  : null}
              </strong>
            </FlexBetween>
            <FlexBetween>
              <span>Withdrawal Address Enabled</span>
              <strong>
                {distributionParamsData?.params?.withdraw_addr_enabled
                  ? distributionParamsData?.params?.withdraw_addr_enabled ===
                    true
                    ? "true"
                    : "false"
                  : null}
              </strong>
            </FlexBetween>
          </Card>
        </FlexColumn>
      </GridItem>
    </>
  );
}

const GridItem = styled.div`
  display: block;
`;
const Card = styled.div`
  box-shadow: 0px 7px 30px #0015da29;
  border-radius: 20px;
  height: 100%;
  margin-top: 10px;
  padding: 20px 10px;
  &.dark-mode {
    background-color: #19172d !important;
    box-shadow: 0px -1px 20px 0px #23232329 !important;
  }
`;
const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
const FlexBetween = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 0px;
`;

export default DistributionParams;
