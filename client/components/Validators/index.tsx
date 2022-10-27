import React, { useState } from "react";
import {
  formatNumbers,
  getPercentageOfValidatorsBondedTokens,
  getValidatorsLogoFromWebsites,
  roundValidatorsVotingPowerToWholeNumber,
  sortValidatorsByVotingPower,
  toDay,
} from "../../lib/Util/format";
import styled from "styled-components";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import {
  UrbanistNormalNewCar172px,
  UrbanistNormalBlack172px,
  UrbanistMediumAbsoluteZero172px,
  UrbanistBoldBlack40px,
} from "../../styledMixins";
import SearchButton from "./SearchButton";
import { useRouter } from "next/router";
import { useAppSelector } from "../../lib/hooks";
import DelegateButton from "./DelegateButton";

const bondDenom = 1000000;

function ValidatorsContent(props) {
  const darkMode = useAppSelector((state) => state.general.darkMode);
  const [query, setQuery] = useState("");

  const { totalBondedTokens, uptimeByBlocksHeights, chainAllValidators } =
    props;
  //console.log( uptimeByBlocksHeights)

  var activeValidatorsData = chainAllValidators?.map((data) => {
    if (data.status === "BOND_STATUS_BONDED") {
      return data;
    }
  });

  var inActiveValidatorsData = chainAllValidators?.map((data) => {
    if (
      data.status === "BOND_STATUS_UNBONDED" ||
      data.status === "BOND_STATUS_UNBONDING"
    ) {
      return data;
    }
  });

  //sort by voting power
  sortValidatorsByVotingPower(activeValidatorsData);
  sortValidatorsByVotingPower(inActiveValidatorsData);

  //declare cumulative shares for both active and inactive validators
  let activeValidatorsCumulativeShare: number = 0;
  let inActiveValidatorsCumulativeShare: number = 0;

  const router = useRouter();

  return (
    <div className={darkMode ? "dark-mode" : ""}>
      <Title className={darkMode ? "dark-mode" : ""}>Validators</Title>
      <div>
        <SearchButton setQuery={setQuery} />
        <Tabs
          defaultActiveKey="active"
          id="uncontrolled-tab-example"
          className=""
          variant="tabs"
        >
          <Tab eventKey="active" title="Active" className="w-100">
            <Responsive>
              <table
                className={
                  darkMode
                    ? "w-100 mt-3 table table-responsive dark-mode"
                    : "w-100 mt-3 table table-responsive"
                }
              >
                <colgroup>
                  <col />
                  <col style={{ width: "50px" }} />
                  <col style={{ width: "100px" }} />
                </colgroup>

                <thead>
                  <tr style={{ fontWeight: "bold" }}>
                    <th>Rank</th>
                    <th style={{ width: "40px" }}>Validator</th>
                    <th>Voting Power</th>
                    <th>% VP</th>
                    <th style={{ width: "60px", marginLeft: "-40px" }}>
                      Cumulative Share
                    </th>
                    <th>Commission</th>
                    <th>Uptime</th>
                    <th>Status</th>
                    <th>Jailed</th>
                    <th>Unbonding Height</th>
                    <th>Unbonding Time</th>
                    <th>Update Time</th>
                    <th>Delegate</th>
                  </tr>
                </thead>
                <tbody>
                  {activeValidatorsData
                    ?.filter((data) => {
                      //if Query does not exist
                      if (query === " ") {
                        return data;
                      } else if (
                        data?.description?.moniker
                          .toLowerCase()
                          .includes(query.toLocaleLowerCase())
                      ) {
                        return data;
                      }
                    })
                    .map((data, index) => {
                      var percentageOfVotingPower: number =
                        getPercentageOfValidatorsBondedTokens(
                          data?.tokens,
                          totalBondedTokens
                        );

                      activeValidatorsCumulativeShare +=
                        percentageOfVotingPower;

                      const commission =
                        data?.commission?.commission_rates?.rate * 100;
                      return (
                        <tr className="validator-item-row">
                          <td>{index + 1}</td>
                          <td>
                            <Flex>
                              <FlexMiddle>
                                <img
                                  className="img"
                                  src={getValidatorsLogoFromWebsites(
                                    data?.description?.website
                                  )}
                                  alt=""
                                />
                              </FlexMiddle>
                              <FlexMiddle
                                className="ellipsis"
                                style={{ width: "120px" }}
                                onClick={() =>
                                  router.push(
                                    `/validators/${data.operator_address}`
                                  )
                                }
                              >
                                {data?.description?.moniker}
                              </FlexMiddle>
                            </Flex>
                          </td>
                          <td>
                            <div className="sub">
                              {data?.tokens
                                ? formatNumbers(data?.tokens / bondDenom)
                                : 0}
                            </div>
                          </td>
                          <td>
                            <div style={{ color: "red" }} className="sub">
                              {data?.tokens
                                ? percentageOfVotingPower.toFixed(2) + "%"
                                : 0}
                            </div>
                          </td>
                          <td style={{ position: "relative" }}>
                            <div
                              style={{
                                position: "absolute",
                                top: "0px",
                                left: "0px",
                                height: "100%",
                                width: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-end",
                                paddingRight: "20px",
                              }}
                            >
                              {data?.tokens
                                ? activeValidatorsCumulativeShare.toFixed(2) +
                                  "%"
                                : 0}
                            </div>
                            <div
                              className="w-100 d-flex h-100 position-absolute"
                              style={{ top: "0px", left: "0px" }}
                            >
                              <div
                                className="h-100"
                                style={{
                                  width: `${activeValidatorsCumulativeShare.toFixed(
                                    2
                                  )}%`,
                                  background: "#ecf8f447",
                                }}
                              ></div>
                              <div
                                className="h-100"
                                style={{ width: "5px", background: "#c5f1de" }}
                              ></div>
                            </div>
                          </td>
                          <td>{commission.toFixed(2) + "%"}</td>
                          <td>100%</td>
                          <td>
                            {data.status === "BOND_STATUS_BONDED"
                              ? "Bonded"
                              : data?.status === "BOND_STATUS_UNBONDED"
                              ? "UnBounded"
                              : "UnBounding"}
                          </td>
                          <td>{data?.jailed === false ? "No" : "Yes"}</td>
                          <td>{data?.unbonding_height}</td>
                          <td>{toDay(data?.unbonding_time)}</td>
                          <td>{toDay(data?.commission?.update_time)}</td>
                          <td>
                            <DelegateButton className={""} />
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </Responsive>
          </Tab>
          <Tab eventKey="inactive" title="InActive">
            <Responsive>
              <table
                className={
                  darkMode
                    ? "w-100 mt-3 table table-responsive dark-mode"
                    : "w-100 mt-3 table table-responsive"
                }
              >
                <colgroup>
                  <col />
                  <col style={{ width: "50px" }} />
                  <col style={{ width: "100px" }} />
                </colgroup>

                <thead>
                  <tr style={{ fontWeight: "bold" }}>
                    <th>Rank</th>
                    <th style={{ width: "40px" }}>Validator</th>
                    <th>Voting Power</th>
                    <th>% VP</th>
                    <th style={{ width: "60px", marginLeft: "-40px" }}>
                      Cumulative Share
                    </th>
                    <th>Commission</th>
                    <th>Uptime</th>
                    <th>Status</th>
                    <th>Jailed</th>
                    <th>Unbonding Height</th>
                    <th>Unbonding Time</th>
                    <th>Update Time</th>
                    <th>Delegate</th>
                  </tr>
                </thead>
                <tbody>
                  {inActiveValidatorsData
                    ?.filter((data) => {
                      //if Query does not exist
                      console.log(data);
                      if (query === " ") {
                        return data;
                      } else if (
                        data?.description?.moniker
                          .toLowerCase()
                          .includes(query.toLocaleLowerCase())
                      ) {
                        return data;
                      }
                    })
                    .map((data, index) => {
                      var percentageOfVotingPower: number =
                        getPercentageOfValidatorsBondedTokens(
                          data?.tokens,
                          totalBondedTokens
                        );

                      inActiveValidatorsCumulativeShare +=
                        percentageOfVotingPower;

                      const commission =
                        data?.commission?.commission_rates?.rate * 100;
                      return (
                        <tr className="validator-item-row">
                          <td>{index + 1}</td>
                          <td>
                            <Flex>
                              <FlexMiddle>
                                <img
                                  className="img"
                                  src={getValidatorsLogoFromWebsites(
                                    data?.description?.website
                                  )}
                                  alt=""
                                />
                              </FlexMiddle>
                              <FlexMiddle
                                className="ellipsis"
                                style={{ width: "120px" }}
                                onClick={() =>
                                  router.push(
                                    `/validators/${data.operator_address}`
                                  )
                                }
                              >
                                {data?.description?.moniker}
                              </FlexMiddle>
                            </Flex>
                          </td>
                          <td>
                            <div className="sub">
                              {data?.tokens
                                ? formatNumbers(data?.tokens / bondDenom)
                                : 0}
                            </div>
                          </td>
                          <td>
                            <div style={{ color: "red" }} className="sub">
                              {data?.tokens
                                ? percentageOfVotingPower.toFixed(2) + "%"
                                : 0}
                            </div>
                          </td>
                          <td style={{ position: "relative" }}>
                            <div
                              style={{
                                position: "absolute",
                                top: "0px",
                                left: "0px",
                                height: "100%",
                                width: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-end",
                                paddingRight: "20px",
                              }}
                            >
                              {data?.tokens
                                ? inActiveValidatorsCumulativeShare.toFixed(2) +
                                  "%"
                                : 0}
                            </div>
                            <div
                              className="w-100 d-flex h-100 position-absolute"
                              style={{ top: "0px", left: "0px" }}
                            >
                              <div
                                className="h-100"
                                style={{
                                  width: `${inActiveValidatorsCumulativeShare.toFixed(
                                    2
                                  )}%`,
                                  background: "#ecf8f447",
                                }}
                              ></div>
                              <div
                                className="h-100"
                                style={{ width: "5px", background: "#c5f1de" }}
                              ></div>
                            </div>
                          </td>
                          <td>{commission.toFixed(2) + "%"}</td>
                          <td>0</td>
                          <td>
                            {data.status === "BOND_STATUS_BONDED"
                              ? "Bonded"
                              : data?.status === "BOND_STATUS_UNBONDED"
                              ? "UnBounded"
                              : "UnBounding"}
                          </td>
                          <td>{data?.jailed === false ? "No" : "Yes"}</td>
                          <td>{data?.unbonding_height}</td>
                          <td>{toDay(data?.unbonding_time)}</td>
                          <td>{toDay(data?.commission?.update_time)}</td>
                          <td>
                            <DelegateButton className={""} />
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </Responsive>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

const Flex = styled.div`
  display: flex;
`;

const FlexMiddle = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
`;

const ValidatorTitleData = {
  rank: "Rank",
  validator: "Validator",
  votingPower: "Voting Power",
  cumulativeshare: "Cumulative Share",
  commission: "Commission",
  uptime: "Uptime",
};

const Title = styled.h1`
  ${UrbanistBoldBlack40px}
  min-height: 48px;
  min-width: 112px;
  letter-spacing: 0;
  margin-top: 50px;
  margin-bottom: 30px;
`;

const Validators = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 18.2px 16px;
  align-items: flex-start;
  min-height: 797px;
  background-color: var(--white);
  border-radius: 20px;
  box-shadow: 0px 7px 30px #0015da29;
`;

const OverlapGroup10 = styled.div`
  height: 60px;
  margin-top: 19px;
  display: flex;
  padding: 13.8px 14.6px;
  align-items: center;
  min-width: 1303px;
  background-color: var(--titan-white);
`;

const RankValue = styled.div`
  ${UrbanistMediumAbsoluteZero172px}
  min-height: 21px;
  margin-top: 0.33px;
  min-width: 74px;
  letter-spacing: 0;
`;

const ValidatorValue = styled.div`
  ${UrbanistNormalBlack172px}
  min-height: 21px;
  margin-left: 1px;
  margin-top: 0.33px;
  min-width: 167px;
  letter-spacing: 0;
`;

const Voting = styled.div`
  ${UrbanistNormalNewCar172px}
  min-height: 21px;
  margin-left: 300px;
  margin-top: 0.33px;
  min-width: 99px;
  letter-spacing: 0;
`;

const CumulativeShare = styled.div`
  ${UrbanistNormalBlack172px}
  min-height: 21px;
  margin-left: 220px;
  margin-top: 0.33px;
  min-width: 9px;
  letter-spacing: 0;
`;

const Commission = styled.div`
  ${UrbanistNormalBlack172px}
  min-height: 21px;
  margin-left: 100px;
  margin-top: 0.33px;
  min-width: 51px;
  letter-spacing: 0;
`;

const Delegate = styled.div`
  ${UrbanistNormalBlack172px}
  min-height: 21px;
  margin-left: 90px;
  margin-top: 0.33px;
  min-width: 51px;
  letter-spacing: 0;
  color: blue;
`;

const Responsive = styled.div`
  width: 100%;
  overflow-x: auto;
  @media screen and (max-width: 1075px) {
    width: 100vw;
  }
`;

export default ValidatorsContent;
