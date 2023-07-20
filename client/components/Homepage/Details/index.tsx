import React from "react";
import styled from "styled-components";
import { useAppSelector } from "../../../lib/hooks";
import { formatNumbers } from "../../../lib/Util/format";
import {
  UrbanistBoldBlack16px,
  UrbanistNormalBlack24px,
  UrbanistNormalBlack16px,
} from "../../../styledMixins";

function Details(props) {
  const darkMode = useAppSelector((state) => state.general.darkMode);
  const { onlineVotingPower, totalActiveVotingPower, place, totalVotingPower } =
    props;

  return (
    <Details1>
      <OnlineVotingPower className={darkMode ? "dark-mode" : ""}>
        {onlineVotingPower}
      </OnlineVotingPower>
      <Group7328>
        <div>
          <TotalActiveVotingPower className={darkMode ? "dark-mode" : ""}>
            {formatNumbers(totalActiveVotingPower)}
          </TotalActiveVotingPower>
          <div>
            <Place
              style={{
                color: darkMode ? "white" : "black",
              }}
            >
              {place}
            </Place>
          </div>
          <TotalVotingPower className={darkMode ? "dark-mode" : ""}>
            {formatNumbers(totalVotingPower)}
          </TotalVotingPower>
        </div>
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
  width: 160px;
  &.darkMode {
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

const TotalActiveVotingPower = styled.div`
  ${UrbanistBoldBlack16px}
  min-height: 19px;
  font-size: 14px;
  width: 100px;
  letter-spacing: 1.28px;
  &.darkMode {
    color: white;
  }
`;

const Place = styled.div`
  ${UrbanistNormalBlack16px}
  min-height: 19px;
  min-width: 34px;
  letter-spacing: 0;
  font-size: 14px;
  font-weight: bold;
  margin-right: 5px;
`;

const TotalVotingPower = styled.div`
  font-weight: bold;
  min-height: 19px;
  font-size: 14px;
  width: 100px;
  &.darkMode {
    color: white;
  }
`;

export default Details;
