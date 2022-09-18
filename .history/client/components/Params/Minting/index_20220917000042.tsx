import React from 'react'
import styled from "styled-components";
import {
    UrbanistNormalBlack24px,
    UrbanistSemiBoldBlack24px,
    ValignTextMiddle,
  } from "../../../styledMixins";

function MintParams(props) {
    const {
        mintDenom,
        inflationRateChange,
        inflationMax,
        inflationMin,
        goalBonded,
        blocksPerYear,
        mintingParamsData
      } = props;
   
    return (
        <>
         <GridItem>
          <FlexColumn>
            <span>Minning Parameters</span>
            <Card className={darkMode ? 'dark-mode w-100' : 'w-100'}>
              <FlexBetween>
                <span>Mint Denom</span>
                <strong>{minitingParamtersData.mintingParamsData?.data?.params?.mint_denom ? minitingParamtersData.mintingParamsData.data.params.mint_denom : null}</strong>
              </FlexBetween>
              <FlexBetween>
                <span>Inflation Rate Change</span>
                <strong>{minitingParamtersData.mintingParamsData?.data?.params?.inflation_rate_change ? Math.round(minitingParamtersData.mintingParamsData.data.params.inflation_rate_change * 100) + '%' : null}</strong>
              </FlexBetween>
              <FlexBetween>
                <span>Inflation Max</span>
                <strong>{minitingParamtersData.mintingParamsData?.data?.params?.inflation_max ? Math.round(minitingParamtersData.mintingParamsData.data.params.inflation_max * 100) + '%' : null}</strong>
              </FlexBetween>
              <FlexBetween>
                <span>Inflation Min</span>
                <strong>{minitingParamtersData.mintingParamsData?.data?.params?.inflation_min ? Math.round(minitingParamtersData.mintingParamsData.data.params.inflation_min * 100) + '%' : null}</strong>
              </FlexBetween>
              <FlexBetween>
                <span>Goal Bonded</span>
                <strong>{minitingParamtersData.mintingParamsData?.data?.params?.goal_bonded ? Math.round(minitingParamtersData.mintingParamsData.data.params.goal_bonded * 100) + '%' : null}</strong>
              </FlexBetween>
              <FlexBetween>
                <span>Blocks Per Year</span>
                <strong>{minitingParamtersData.mintingParamsData?.data?.params?.blocks_per_year ? minitingParamtersData.mintingParamsData.data.params.blocks_per_year : null}</strong>
              </FlexBetween>
            </Card>
          </FlexColumn>
        </GridItem>
        </>
    )
}

ter-spacing: 0;
`;

export default MintParams