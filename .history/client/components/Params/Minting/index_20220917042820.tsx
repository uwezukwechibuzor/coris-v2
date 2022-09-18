import React from 'react'
import styled from "styled-components";
import { useAppSelector } from '../../../lib/hooks';

function MintParams(props) {

  const darkMode = useAppSelector(state => state.general.darkMode)

  const mintingParamsData  = props
   
    return (
        <>
         <GridItem>
          <FlexColumn>
            <span>Minting Parameters</span>
            <Card className={darkMode ? 'dark-mode w-100' : 'w-100'}>
              <FlexBetween>
                <span>Mint Denom</span>
                <strong>{mintingParamsData?.params?.mint_denom ? mintingParamsData.params.mint_denom : null}</strong>
              </FlexBetween>
              <FlexBetween>
                <span>Inflation Rate Change</span>
                <strong>{mintingParamsData?.params?.inflation_rate_change ? Math.round(mintingParamsData.params.inflation_rate_change * 100) + '%' : null}</strong>
              </FlexBetween>
              <FlexBetween>
                <span>Inflation Max</span>
                <strong>{mintingParamsData?.params?.inflation_max ? Math.round(mintingParamsData.params.inflation_max * 100) + '%' : null}</strong>
              </FlexBetween>
              <FlexBetween>
                <span>Inflation Min</span>
                <strong>{mintingParamsData?.params?.inflation_min ? Math.round(mintingParamsData.data.params.inflation_min * 100) + '%' : null}</strong>
              </FlexBetween>
              <FlexBetween>
                <span>Goal Bonded</span>
                <strong>{mintingParamsData?.data?.params?.goal_bonded ? Math.round(mintingParamsData.data.params.goal_bonded * 100) + '%' : null}</strong>
              </FlexBetween>
              <FlexBetween>
                <span>Blocks Per Year</span>
                <strong>{mintingParamsData?.data?.params?.blocks_per_year ? mintingParamsData.data.params.blocks_per_year : null}</strong>
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

export default MintParams