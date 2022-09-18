import React from 'react'
import styled from "styled-components";
import {
  UrbanistNormalBlack24px,
  UrbanistSemiBoldBlack24px,
  ValignTextMiddle,
} from "../../../styledMixins";
import { periodsInMinutes } from '../../../lib/Util/format';
import { useAppSelector } from '../../../lib/hooks';

function SlashingParams(props) {
   
  const darkMode = useAppSelector(state => state.general.darkMode)


    const slashingParamsData = props;
 
    return (
        <>
          <GridItem>
          <FlexColumn>
            <span>Slashing Parameters</span>
            <Card className={darkMode ? 'dark-mode w-100' : 'w-100'}>
              <FlexBetween>
                <span>Signed Block Window</span>
                <strong>{slashingParamsData?.data?.params?.signed_blocks_window ? slashingParamsData.data.params.signed_blocks_window : null}</strong>
              </FlexBetween>
              <FlexBetween>
                <span>Min signed Per Window</span>
                <strong>{slashingParamsData?.data?.params?.min_signed_per_window ? slashingParamsData.data.params.min_signed_per_window * 100 + '%' : null}</strong>
              </FlexBetween>
              <FlexBetween>
                <span>Downtime Jail Duration</span>
                <strong>{slashingParamsData?.data?.params?.downtime_jail_duration ? periodsInMinutes(slashingParametersData.slashingParamsData.data.params.downtime_jail_duration) : null}</strong>
              </FlexBetween>
              <FlexBetween>
                <span>Slash Fraction Double Sign</span>
                <strong>{slashingParametersData.slashingParamsData?.data?.params?.slash_fraction_double_sign ? slashingParametersData.slashingParamsData.data.params.slash_fraction_double_sign * 100 + '%' : null}</strong>
              </FlexBetween>
              <FlexBetween>
                <span>Slash Fraction Downtime</span>
                <strong>{slashingParametersData.slashingParamsData?.data?.params?.slash_fraction_downtime ? slashingParametersData.slashingParamsData.data.params.slash_fraction_downtime * 100 + '%' : null}</strong>
              </FlexBetween>
            </Card>
          </FlexColumn>
        </GridItem>
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

export default SlashingParams