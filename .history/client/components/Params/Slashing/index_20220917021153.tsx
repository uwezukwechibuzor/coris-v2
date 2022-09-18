import React from 'react'
import styled from "styled-components";
import {
  UrbanistNormalBlack24px,
  UrbanistSemiBoldBlack24px,
  ValignTextMiddle,
} from "../../../styledMixins";
import { periodsInMinutes } from '../../../lib/Util/format';

function SlashingParams(props) {
    const {
        signedBlockWindow,
        minSignedPerWindow,
        downtimeJailDuration,
        slashFractionDoubleSign,
        slashFractionDowntime,
        slashingParamsData
      } = props;
 
    return (
        <>
          <GridItem>
          <FlexColumn>
            <span>Slashing Parameters</span>
            <Card className={darkMode ? 'dark-mode w-100' : 'w-100'}>
              <FlexBetween>
                <span>Signed Block Window</span>
                <strong>{slashingParametersData.slashingParamsData?.data?.params?.signed_blocks_window ? slashingParametersData.slashingParamsData.data.params.signed_blocks_window : null}</strong>
              </FlexBetween>
              <FlexBetween>
                <span>Min signed Per Window</span>
                <strong>{slashingParametersData.slashingParamsData?.data?.params?.min_signed_per_window ? slashingParametersData.slashingParamsData.data.params.min_signed_per_window * 100 + '%' : null}</strong>
              </FlexBetween>
              <FlexBetween>
                <span>Downtime Jail Duration</span>
                <strong>{slashingParametersData.slashingParamsData?.data?.params?.downtime_jail_duration ? periodsInMinutes(slashingParametersData.slashingParamsData.data.params.downtime_jail_duration) : null}</strong>
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

const FlexRow3 = styled.div`
  height: 273px;
  display: flex;
  padding: 31px 16px;
  align-items: flex-start;
  min-width: 660px;
  background-color: var(--white);
  border-radius: 20px;
  box-shadow: 0px 7px 30px #0015da29;
`;

const FlexCol7 = styled.div`
  ${UrbanistNormalBlack24px}
  width: 278px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 209px;
`;

const FlexCol8 = styled.div`
  ${UrbanistSemiBoldBlack24px}
  width: 104px;
  margin-left: 246px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  min-height: 209px;
`;

const Address3 = styled.div`
  ${ValignTextMiddle}
  height: 29px;
  min-width: 62px;
  letter-spacing: 0;
`;

const Address4 = styled.div`
  ${ValignTextMiddle}
  height: 29px;
  margin-top: 16px;
  min-width: 104px;
  letter-spacing: 0;
`;

export default SlashingParams