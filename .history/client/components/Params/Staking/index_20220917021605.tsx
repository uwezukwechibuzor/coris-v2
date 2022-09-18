import React from 'react'
import styled from "styled-components";
import {
  UrbanistNormalBlack24px,
  UrbanistSemiBoldBlack24px,
  ValignTextMiddle,
} from "../../../styledMixins";
import { periodsInDays } from '../../../lib/Util/format';

function StakingParams(props) {
    const {
        unbondingTime,
        name2,
        name3,
        historicalEntries,
        surname,
        stakingParamsData
      } = props;

    return (
        <>
         <GridItem>
          <FlexColumn>
            <span>Staking Parameters</span>
            <Card className={darkMode ? 'dark-mode w-100' : 'w-100'}>
              <FlexBetween>
                <span>Unbounding Time</span>
                <strong>{getStakingParams?.data?.params?.unbonding_time ? periodsInDays(getStakingParams.data.params.unbonding_time) : null}</strong>
              </FlexBetween>
              <FlexBetween>
                <span>Max Validator</span>
                <strong>{getStakingParams?.data?.params?.max_validators ? getStakingParams.data.params.max_validators : null}</strong>
              </FlexBetween>
              <FlexBetween>
                <span>Max Entries</span>
                <strong>{getStakingParams?.data?.params?.max_entries ? getStakingParams.data.params.max_entries : null}</strong>
              </FlexBetween>
              <FlexBetween>
                <span>Historical Entries</span>
                <strong>{getStakingParams?.data?.params?.historical_entries ? getStakingParams.data.params.historical_entries : null}</strong>
              </FlexBetween>
              <FlexBetween>
                <span>Bond Demon</span>
                <strong>{getStakingParams?.data?.params?.bond_denom ? getStakingParams.data.params.bond_denom : null}</strong>
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

const CORIS = styled.div`
  ${ValignTextMiddle}
  height: 29px;
  min-width: 71px;
  letter-spacing: 0;
`;

const FlexRow4 = styled.div`
  height: 273px;
  margin-left: 16px;
  display: flex;
  padding: 31px 16px;
  align-items: flex-start;
  min-width: 660px;
  background-color: var(--white);
  border-radius: 20px;
  box-shadow: 0px 7px 30px #0015da29;
`;

const FlexCol9 = styled.div`
  ${UrbanistNormalBlack24px}
  width: 174px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 209px;
`;

const FlexCol10 = styled.div`
  ${UrbanistSemiBoldBlack24px}
  width: 148px;
  margin-left: 306px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  min-height: 209px;
`;

const Number = styled.div`
  ${ValignTextMiddle}
  height: 29px;
  margin-top: 16px;
  min-width: 29px;
  letter-spacing: 0;
`;

const Number1 = styled.div`
  ${ValignTextMiddle}
  height: 29px;
  margin-top: 16px;
  min-width: 14px;
  letter-spacing: 0;
`;

const Address5 = styled.div`
  ${ValignTextMiddle}
  height: 29px;
  margin-top: 16px;
  min-width: 70px;
  letter-spacing: 0;
`;

const Address6 = styled.div`
  ${ValignTextMiddle}
  height: 29px;
  margin-top: 16px;
  min-width: 14px;
  letter-spacing: 0;
`;

export default StakingParams