import React, { useState } from "react";
import {
  formatNumbers,
  getPercentageOfValidatorsBondedTokens,
  getValidatorsLogoFromWebsites,
  sortValidatorsByVotingPower,
  toDay,
} from "../../lib/Util/format";
import { Bech32, fromBase64, fromHex, toBech32 } from "@cosmjs/encoding";
import { sha256 } from "@cosmjs/crypto";
import styled from "styled-components";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { UrbanistBoldBlack40px } from "../../styledMixins";
import SearchButton from "./SearchButton";
import { useRouter } from "next/router";
import { useAppSelector } from "../../lib/hooks";
import DelegateButton from "./DelegateButton";

const bondDenom = 1000000;

function ValidatorsContent(props) {
  const darkMode = useAppSelector((state) => state.general.darkMode);
  const [query, setQuery] = useState("");

  const {
    totalBondedTokens,
    uptimeByBlocksHeights,
    chainAllValidators,
    chain_id,
  } = props;

  var activeValidatorsData = [];
  var inActiveValidatorsData = [];
  chainAllValidators?.validators?.map((data) =>
    data.status === "BOND_STATUS_BONDED"
      ? activeValidatorsData.push(data)
      : inActiveValidatorsData.push(data)
  );

  //sort by voting power
  sortValidatorsByVotingPower(activeValidatorsData);
  sortValidatorsByVotingPower(inActiveValidatorsData);

  //declare cumulative shares for both active and inactive validators
  let activeValidatorsCumulativeShare: number = 0;
  let inActiveValidatorsCumulativeShare: number = 0;

  //uptimeByBlocksHeights
  const convertedSignatures = uptimeByBlocksHeights?.map((data) => {
    const convertedSigs = data.signatures?.map((sig) => {
      return toBech32("cosmosvalcons", fromHex(sig?.validator_address));
    });
    return convertedSigs;
  });

  activeValidatorsData?.map((validator) => {
    //convert operator address to valcons address from validators query using consensus pubkey
    //check if query is still fetching and if still fetching, set to empty string
    const consensusPubkey =
      validator?.consensus_pubkey?.key !== undefined
        ? validator?.consensus_pubkey?.key
        : "";
    const ed25519PubkeyRaw = fromBase64(consensusPubkey);
    const addressData = sha256(ed25519PubkeyRaw).slice(0, 20);
    const bech32Address = Bech32.encode("cosmosvalcons", addressData);

    let totalSignedBlocks = 0;
    let totalBlocks = 0;
    convertedSignatures?.map((data) => {
      totalBlocks++;
      if (data?.includes(bech32Address)) {
        totalSignedBlocks++;
        const uptime = (totalSignedBlocks / totalBlocks) * 100;
        validator.upTime = uptime.toFixed(2);
        return validator;
      }
    });
  });

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
                    <th>
                      Voting <br /> Power
                    </th>
                    <th>% VP</th>
                    <th style={{ width: "60px", marginLeft: "-40px" }}>
                      Cumulative <br /> Share
                    </th>
                    <th>Commission</th>
                    <th>Uptime</th>
                    <th>Status</th>
                    <th>Jailed</th>
                    <th>
                      Unbonding <br /> Height
                    </th>
                    <th>
                      Unbonding <br /> Time
                    </th>
                    <th>
                      Update <br /> Time
                    </th>
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
                      let percentageOfVotingPower: number;
                      data?.tokens || totalBondedTokens
                        ? (percentageOfVotingPower =
                            getPercentageOfValidatorsBondedTokens(
                              data?.tokens,
                              totalBondedTokens
                            ))
                        : 0;

                      activeValidatorsCumulativeShare +=
                        percentageOfVotingPower;

                      const commission =
                        data?.commission?.commission_rates?.rate * 100;
                      return (
                        <tr className="validator-item-row" key={index}>
                          <td key={index}>{index + 1}</td>
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
                                    `/${chain_id}/validators/${data.operator_address}`
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
                              {percentageOfVotingPower !== Infinity
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
                              {activeValidatorsCumulativeShare !== Infinity
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
                          <td>{data.upTime ? data.upTime : 0}%</td>
                          <td>
                            {data.status === "BOND_STATUS_BONDED"
                              ? "Bonded"
                              : data?.status === "BOND_STATUS_UNBONDED"
                              ? "UnBounded"
                              : "UnBounding"}
                          </td>
                          <td>{data?.jailed === false ? "No" : "Yes"}</td>
                          <td>{data?.unbonding_height}</td>
                          <td>{toDay(data?.unbonding_time, "date")}</td>
                          <td>
                            {toDay(data?.commission?.update_time, "from")}
                          </td>
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
                    <th>
                      Voting <br /> Power
                    </th>
                    <th>% VP</th>
                    <th style={{ width: "60px", marginLeft: "-40px" }}>
                      Cumulative <br /> Share
                    </th>
                    <th>Commission</th>
                    <th>Uptime</th>
                    <th>Status</th>
                    <th>Jailed</th>
                    <th>
                      Unbonding <br /> Height
                    </th>
                    <th>
                      Unbonding <br /> Time
                    </th>
                    <th>
                      Update <br /> Time
                    </th>
                    <th>Delegate</th>
                  </tr>
                </thead>
                <tbody>
                  {inActiveValidatorsData
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

                      inActiveValidatorsCumulativeShare +=
                        percentageOfVotingPower;

                      const commission =
                        data?.commission?.commission_rates?.rate * 100;
                      return (
                        <tr className="validator-item-row" key={index}>
                          <td key={index}>{index + 1}</td>
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
                                    `/${chain_id}/validators/${data.operator_address}`
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
                              {percentageOfVotingPower !== Infinity
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
                              {inActiveValidatorsCumulativeShare !== Infinity
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
                          <td>{toDay(data?.unbonding_time, "date")}</td>
                          <td>
                            {toDay(data?.commission?.update_time, "from")}
                          </td>
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

const Title = styled.h1`
  ${UrbanistBoldBlack40px}
  min-height: 48px;
  min-width: 112px;
  letter-spacing: 0;
  margin-top: 50px;
  margin-bottom: 30px;
`;

const Responsive = styled.div`
  width: 100%;
  overflow-x: auto;
  @media screen and (max-width: 1075px) {
    width: 100vw;
  }
`;

export default ValidatorsContent;
