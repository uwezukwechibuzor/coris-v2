import React from "react";
import styled from "styled-components";
import { periodsInMinutes } from "../../../lib/Util/format";
import { useAppSelector } from "../../../lib/hooks";

function SlashingParams(props) {
  const darkMode = useAppSelector((state) => state.general.darkMode);

  const slashingParamsData = props;

  return (
    <>
      <GridItem>
        <FlexColumn>
          <span>Slashing Parameters</span>
          <Card className={darkMode ? "dark-mode w-100" : "w-100"}>
            <FlexBetween>
              <span>Signed Block Window</span>
              <strong>
                {slashingParamsData?.params?.signed_blocks_window
                  ? slashingParamsData.params.signed_blocks_window
                  : null}
              </strong>
            </FlexBetween>
            <FlexBetween>
              <span>Min signed Per Window</span>
              <strong>
                {slashingParamsData?.params?.min_signed_per_window
                  ? slashingParamsData.params.min_signed_per_window * 100 + "%"
                  : null}
              </strong>
            </FlexBetween>
            <FlexBetween>
              <span>Downtime Jail Duration</span>
              <strong>
                {slashingParamsData?.params?.downtime_jail_duration
                  ? periodsInMinutes(
                      slashingParamsData.params.downtime_jail_duration
                    )
                  : null}
              </strong>
            </FlexBetween>
            <FlexBetween>
              <span>Slash Fraction Double Sign</span>
              <strong>
                {slashingParamsData?.params?.slash_fraction_double_sign
                  ? slashingParamsData.params.slash_fraction_double_sign * 100 +
                    "%"
                  : null}
              </strong>
            </FlexBetween>
            <FlexBetween>
              <span>Slash Fraction Downtime</span>
              <strong>
                {slashingParamsData?.params?.slash_fraction_downtime
                  ? slashingParamsData.params.slash_fraction_downtime * 100 +
                    "%"
                  : null}
              </strong>
            </FlexBetween>
          </Card>
        </FlexColumn>
      </GridItem>
    </>
  );
}

const GridItem = styled.div`
  display: block;
`;
const Card = styled.div`
  box-shadow: 0px 7px 30px #0015da29;
  border-radius: 20px;
  height: 100%;
  margin-top: 10px;
  padding: 20px 10px;
  &.dark-mode {
    background-color: #19172d !important;
    box-shadow: 0px -1px 20px 0px #23232329 !important;
  }
`;
const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
const FlexBetween = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 0px;
`;

export default SlashingParams;
