import React from "react";
import {
  getPercentageOfValidatorsBondedTokens,
  getValidatorsLogoFromWebsites,
  roundValidatorsVotingPowerToWholeNumber,
  sortValidatorsByVotingPower,
} from "../../../lib/Util/format";
import styled from "styled-components";
import { UrbanistBoldBlack40px } from "../../../styledMixins";
import { useRouter } from "next/router";
import { useAppSelector } from "../../../lib/hooks";

function ConsensusDetails(props) {
  const darkMode = useAppSelector((state) => state.general.darkMode);

  const { validators, totalBondedTokens, consensusState } = props;

  let activeVal = [];
  validators?.map((data) => {
    if (data.status === "BOND_STATUS_BONDED" && data !== undefined) {
      activeVal.push(data);
    } else {
    }
  });

  //sort by voting power
  sortValidatorsByVotingPower(activeVal);

  const consensus = consensusState?.result?.round_state?.height_vote_set.map(
    (data) => {
      let preVotes = [];
      data?.prevotes.map((details, i) => preVotes.push(details));

      const preCommit = data?.precommits?.map((details, i) => {
        return [activeVal[i], preVotes[i], details];
      });
      return preCommit;
    }
  );

  //declare cumulative shares for both active and inactive validators
  let activeValidatorsCumulativeShare: number = 0;

  const router = useRouter();

  return (
    <div className={darkMode ? "dark-mode" : ""}>
      <Title className={darkMode ? "dark-mode" : ""}>Consensus State</Title>
      <div>
        <Responsive>
          <table
            className={
              darkMode
                ? "w-100 mt-3 table table-responsive dark-mode"
                : "w-100 mt-3 table table-responsive"
            }
          >
            <thead>
              <tr style={{ fontWeight: "bold" }}>
                <th>Rank</th>
                <th>Validator</th>
                <th>Voting Power</th>
                <th>Cummulative Share</th>
                <th>Status</th>
                <th>Jailed</th>
                <th>Pre-Vote</th>
                <th>Pre-Commit</th>
              </tr>
            </thead>
            <tbody>
              {consensus?.map((details, index) => {
                return details?.map((data, i) => {
                  if (
                    data[index] !== undefined &&
                    data[index]?.description?.moniker !== undefined
                  ) {
                    var percentageOfVotingPower: number =
                      getPercentageOfValidatorsBondedTokens(
                        data[index]?.tokens,
                        totalBondedTokens
                      );

                    activeValidatorsCumulativeShare += percentageOfVotingPower;

                    return (
                      <tr
                        className="validator-item-row"
                        onClick={() =>
                          router.push(
                            `/validators/${data[index].operator_address}`
                          )
                        }
                      >
                        <td>{i + 1}</td>
                        <td>
                          <Flex>
                            <FlexMiddle>
                              <img
                                className="img"
                                src={
                                  data
                                    ? getValidatorsLogoFromWebsites(
                                        data[index]?.description?.website
                                      )
                                    : null
                                }
                                alt=""
                              />
                            </FlexMiddle>
                            <FlexMiddle>
                              {data[index]?.description?.moniker}
                            </FlexMiddle>
                          </Flex>
                        </td>
                        <td>
                          {data[index]?.tokens
                            ? roundValidatorsVotingPowerToWholeNumber(
                                data[index]?.tokens
                              )
                            : 0}
                          <div style={{ color: "red" }} className="sub">
                            {data[index]?.tokens
                              ? percentageOfVotingPower.toFixed(2) + "%"
                              : 0}
                          </div>
                        </td>
                        <td>
                          {data[index]?.tokens
                            ? activeValidatorsCumulativeShare.toFixed(2) + "%"
                            : 0}
                        </td>
                        <td>
                          {data[0].status === "BOND_STATUS_BONDED"
                            ? "Bonded"
                            : data[0]?.status === "BOND_STATUS_UNBONDED"
                            ? "UnBounded"
                            : "UnBounding"}
                        </td>
                        <td>{data[0]?.jailed === false ? "No" : "Yes"}</td>
                        <td>
                          {data[1] === "nil-Vote" ? (
                            <img src="https://img.icons8.com/color/20/000000/cancel--v1.png" />
                          ) : (
                            <img src="https://img.icons8.com/fluency/20/000000/ok.png" />
                          )}
                        </td>
                        <td>
                          {data[2] === "nil-Vote" ? (
                            <img src="https://img.icons8.com/color/20/000000/cancel--v1.png" />
                          ) : (
                            <img src="https://img.icons8.com/fluency/20/000000/ok.png" />
                          )}
                        </td>
                      </tr>
                    );
                  }
                });
              })}
            </tbody>
          </table>
        </Responsive>
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
    width: calc(100vw - 40px);
  }
`;

export default ConsensusDetails;
