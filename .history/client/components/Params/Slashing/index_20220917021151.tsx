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