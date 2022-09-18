import React from "react";
import styled from "styled-components";
import { useAppSelector } from "../../../lib/hooks";
import { formatNumbers } from "../../../lib/Util/format";
import { UrbanistBoldBlack16px, UrbanistNormalBlack24px, UrbanistNormalBlack16px } from "../../../styledMixins";


function Details(props) {
  const darkMode = useAppSelector(state => state.general.darkMode)
  const { onlineVotingPower, x36516M1, place, x36516M2 } = props;

  return (
    <Details1>
      <OnlineVotingPower className={darkMode ? 'dark-mode' : ''}>{onlineVotingPower}</OnlineVotingPower>
      <Group7328>
        <X36516m className={darkMode ? 'dark-mode' : ''}>{formatNumbers(x36516M1)}</X36516m>
        <div>
          <Place
            style={{
              color: darkMode ? 'white' : 'black'
            }}
          >{place}</Place>
        </div>
        <X36516m1 className={darkMode ? 'dark-mode' : ''}>{form}</X36516m1>
      </Group7328>
    </Details1>
  );
}

const Details1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 60px;
`;

const OnlineVotingPower = styled.div`
  ${UrbanistNormalBlack24px}
  min-height: 29px;
  letter-spacing: 0;
  width: 100px;
  &.darkMode{
    color: white;
  }
`;

const Group7328 = styled.div`
  height: 19px;
  margin-top: 12px;
  display: flex;
  align-items: flex-start;
  min-width: 192px;
`;

const X36516m = styled.div`
  ${UrbanistBoldBlack16px}
  min-height: 19px;
  font-size: 14px;
  width: 100px;
  letter-spacing: 1.28px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  &.darkMode{
    color: white;
  }
`;

const Place = styled.div`
  ${UrbanistNormalBlack16px}
  min-height: 19px;
  margin-left: 10px;
  min-width: 34px;
  letter-spacing: 0;
  font-size: 14px;
  font-weight: bold;
  margin-right: 5px;
`;

const X36516m1 = styled.div`
  font-weight: bold;
  min-height: 19px;
  font-size: 14px;
  width: 100px;
  letter-spacing: 1.28px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  &.darkMode{
    color: white;
  }
`;

export default Details;
