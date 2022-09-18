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
        <GridItem>
        </>
    )
}

const MintDenom = styled.div`
  ${ValignTextMiddle}
  height: 29px;
  letter-spacing: 0;
`;

const FlexRow1 = styled.div`
  height: 318px;
  display: flex;
  padding: 31px 16px;
  align-items: flex-start;
  min-width: 660px;
  background-color: var(--white);
  border-radius: 20px;
  box-shadow: 0px 7px 30px #0015da29;
`;

const FlexCol3 = styled.div`
  ${UrbanistNormalBlack24px}
  width: 227px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 254px;
`;

const InflationRateChange = styled.div`
  ${ValignTextMiddle}
  height: 29px;
  margin-top: 16px;
  letter-spacing: 0;
`;

const FlexCol4 = styled.div`
  ${UrbanistSemiBoldBlack24px}
  width: 119px;
  margin-left: 282px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  min-height: 254px;
`;

const CORIS = styled.div`
  ${ValignTextMiddle}
  height: 29px;
  min-width: 71px;
  letter-spacing: 0;
`;

const Percent = styled.div`
  ${ValignTextMiddle}
  height: 29px;
  margin-top: 16px;
  min-width: 37px;
  letter-spacing: 0;
`;

const Percent1 = styled.div`
  ${ValignTextMiddle}
  height: 29px;
  margin-top: 16px;
  min-width: 44px;
  letter-spacing: 0;
`;

const Percent2 = styled.div`
  ${ValignTextMiddle}
  height: 29px;
  margin-top: 16px;
  min-width: 43px;
  letter-spacing: 0;
`;

const Address = styled.div`
  ${ValignTextMiddle}
  height: 29px;
  margin-top: 16px;
  min-width: 11px;
  letter-spacing: 0;
`;

export default MintParams