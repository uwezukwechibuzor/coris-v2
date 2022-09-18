import React from 'react'
import styled from "styled-components";
import { periodsInDays } from '../../../lib/Util/format';
import { useAppSelector } from '../../../lib/hooks';
import { COIN, DENOM } from '../../../lib/Util/constants';

function StakingParams(props) {

  const darkMode = useAppSelector(state => state.general.darkMode)

    const getStakingParams = props?.govStakingParams

    return (
        <>
         <GridItem>
          <FlexColumn>
            <span>Staking Parameters</span>
            <Card className={darkMode ? 'dark-mode w-100' : 'w-100'}>
              <FlexBetween>
                <span>Unbounding Time</span>
                <strong>{getStakingParams?.params?.unbonding_time ? periodsInDays(getStakingParams?.params.unbonding_time) : null}</strong>
              </FlexBetween>
              <FlexBetween>
                <span>Max Validator</span>
                <strong>{getStakingParams?.params?.max_validators ? getStakingParams?.params.max_validators : null}</strong>
              </FlexBetween>
              <FlexBetween>
                <span>Max Entries</span>
                <strong>{getStakingParams?.params?.max_entries ? getStakingParams.params.max_entries : null}</strong>
              </FlexBetween>
              <FlexBetween>
                <span>Historical Entries</span>
                <strong>{getStakingParams?.params?.historical_entries ? getStakingParams.params.historical_entries : null}</strong>
              </FlexBetween>
              <FlexBetween>
                <span>Bond Demon</span>
                <strong>{COIN}</strong>
              </FlexBetween>
            </Card>
          </FlexColumn>
        </GridItem>
        </>
    )
} 

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

export default StakingParams