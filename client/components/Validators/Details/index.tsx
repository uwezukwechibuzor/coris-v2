import React from "react";
import Title from "./Title";
import styled from "styled-components";
import {
  getPercentageOfValidatorsBondedTokens,
  getValidatorsLogoFromWebsites,
  roundValidatorsVotingPowerToWholeNumber,
  toDay,
} from "../../../lib/Util/format";
import Link from "next/link";
import UndelegationsContent from "./Undelegations";
import DelegationsContent from "./Delegation";
import { useState } from "react";
import { fromHex, toBech32 } from "@cosmjs/encoding";
import Badge from "react-bootstrap/Badge";
import { useAppSelector } from "../../../lib/hooks";
//import CopyClip from "./CopyClip";
import "react-circular-progressbar/dist/styles.css";
import router from "next/router";
import TxsByHeightEvent from "../../Blocks/Details/tsxByHeightOrEvent";
import { assetSymbol } from "../../../lib/Util/constants";

function ValidatorsDetailsContent(props) {
  const darkMode = useAppSelector((state) => state.general.darkMode);
  const {
    getValidatorDetails,
    getUptimeByBlocksHeights,
    chainValidatorsSlashingInfo,
    chainValidatorDelegations,
    chainValidatorUnDelegations,
    getChainPool,
    getValidatorTxsByEvents,
    accountAddress,
    hexAddress,
    operatorAddress,
    bech32Address,
    chain_id,
  } = props;

  const [selectedDelegations, setDelegationPage] = useState("delegations");

  const validatorsDetails =
    getValidatorDetails?.validator !== undefined
      ? getValidatorDetails?.validator
      : null;

  //uptimeByBlocksHeights and convert to consensus(valcons) Operator Address
  const convertedSignatures = getUptimeByBlocksHeights?.map((data) => {
    const convertedSigs = data.signatures?.map((sig) => {
      return toBech32(chain_id + "valcons", fromHex(sig?.validator_address));
    });
    return convertedSigs;
  });

  //check if validator address contained in the signatures equals bech32Address
  let totalSignedBlocks = 0;
  let totalBlocks = 0;
  const getUptime = convertedSignatures?.map((sigs, index) => {
    totalBlocks++;
    if (validatorsDetails === null) {
      //set noUpTime and upTime to empty string when data is still loading
      return { noUpTime: "", upTime: "" };
    } else {
      if (!sigs?.includes(bech32Address)) {
        return { noUpTime: getUptimeByBlocksHeights[index] };
      }

      totalSignedBlocks++;

      return { upTime: getUptimeByBlocksHeights[index] };
    }
  });

  //get the percentage from total signed blocks and total blocks
  const percentageOfValidatorUptime =
    totalBlocks != 0 && totalSignedBlocks != 0
      ? (totalSignedBlocks / totalBlocks) * 100
      : 0;

  //get total bonded tokens
  const bondedTokens = getChainPool?.pool?.bonded_tokens;
  const percentageofVotingPower: number = getPercentageOfValidatorsBondedTokens(
    validatorsDetails?.tokens,
    bondedTokens
  );

  //get missed Blocks  && validators signing info
  const missedBlocks =
    chainValidatorsSlashingInfo !== undefined
      ? chainValidatorsSlashingInfo?.val_signing_info?.missed_blocks_counter
      : null;

  //get validatorsDelegations and pass to delegation and Undelegation component
  let validatorsDelegations, unDelegations;
  try {
    validatorsDelegations = chainValidatorDelegations;
    unDelegations = chainValidatorUnDelegations;
  } catch (error) {
    console.log(error);
  }

  return (
    <div className={darkMode ? "dark-mode" : ""}>
      <Title className={darkMode ? "dark-mode" : ""}>Validator Details</Title>
      <Card className={darkMode ? "dark-mode" : ""} style={{ padding: "20px" }}>
        <div className="">
          <img
            width={35}
            src={getValidatorsLogoFromWebsites(
              validatorsDetails?.description?.website
            )}
            alt=""
          />
        </div>
        <h4 className="my-3">{validatorsDetails?.description?.moniker}</h4>
        <div className="my-3">
          <div>
            <strong>Operator Address</strong>
          </div>
          <small
            onClick={() =>
              router.push(`/${chain_id}/validators/${operatorAddress}`)
            }
          >
            {operatorAddress}
          </small>
        </div>
        <div className="my-3">
          <div>
            <strong>Consensus Address</strong>
          </div>
          <small>
            {bech32Address}
            {/* <CopyClip value={operatorAddress} /> */}
          </small>
        </div>
        <div className="my-3">
          <div>
            <strong>Hex Address</strong>
          </div>
          <small>
            {hexAddress}
            {/* <CopyClip value={operatorAddress} /> */}
          </small>
        </div>
        <div className="my-3">
          <div>
            <strong>Address</strong>
          </div>
          <small
            onClick={() =>
              router.push(`/${chain_id}/account/${accountAddress}`)
            }
          >
            {accountAddress}
          </small>
        </div>
        <hr />
        <div className="my-3">
          <div>
            <strong>Website</strong>
          </div>
          <small>{validatorsDetails?.description?.website}</small>
        </div>
        <div className="my-3">
          <div>
            <strong>Commission</strong>
          </div>
          <small>
            {validatorsDetails?.commission?.commission_rates
              ? validatorsDetails?.commission?.commission_rates?.rate * 100 +
                "%"
              : null}
          </small>
        </div>
        <div className="my-3">
          <div>
            <strong>Max Rate</strong>
          </div>
          <small>
            {validatorsDetails?.commission?.commission_rates
              ? validatorsDetails?.commission?.commission_rates?.max_rate *
                  100 +
                "%"
              : null}
          </small>
        </div>
        <div className="my-3">
          <div>
            <strong>Max Change Rate</strong>
          </div>
          <small>
            {validatorsDetails?.commission?.commission_rates
              ? validatorsDetails?.commission?.commission_rates
                  ?.max_change_rate *
                  100 +
                "%"
              : null}
          </small>
        </div>
        <div className="my-3">
          <div>
            <strong>Updated</strong>
          </div>
          <small>
            {validatorsDetails?.commission
              ? toDay(validatorsDetails?.commission?.update_time, "from")
              : null}
          </small>
        </div>
        <div className="my-3">
          <div>
            <strong>Uptime</strong>
          </div>
          <small>{percentageOfValidatorUptime + "%"}</small>
        </div>
        <div className="my-3">
          <div>
            <strong>Voting Power</strong>
          </div>
          <small>
            {validatorsDetails?.tokens
              ? roundValidatorsVotingPowerToWholeNumber(
                  validatorsDetails?.tokens
                ) +
                " " +
                assetSymbol(chain_id)
              : null}
          </small>
        </div>
        <div className="my-3">
          <div>
            <strong>Percentage of VP</strong>
          </div>
          <small>
            {getChainPool?.pool?.bonded_tokens && validatorsDetails?.tokens
              ? percentageofVotingPower.toFixed(2)
              : 0}
            %
          </small>
        </div>
        <div className="my-3">
          <div>
            <strong>Bonded Height</strong>
          </div>
          <small>
            {" "}
            {validatorsDetails ? validatorsDetails?.unbonding_height : null}
          </small>
        </div>
        <div className="my-3">
          <div>
            <strong>Self Bonded</strong>
          </div>
          <small>
            {" "}
            {validatorsDetails ? validatorsDetails?.min_self_delegation : null}
          </small>
        </div>
        <div className="my-3">
          <div>
            <strong>Details</strong>
          </div>
          <small>{validatorsDetails?.description?.details}</small>
        </div>
      </Card>
      <Grid>
        <GridItemSeven className={darkMode ? "dark-mode" : ""}>
          <FlexColumn>
            <Flex className="p-3">
              <div>Uptime by 100 latest blocks</div>
              <div style={{ marginLeft: "20px" }}>
                Missed Blocks <Badge bg="danger">{missedBlocks}</Badge>
              </div>
            </Flex>
            <BlockGrid>
              {getUptime?.map((data) => (
                <Link
                  href="/[chain_id]/blocks/[height]"
                  as={`/${chain_id}/blocks/${
                    data?.upTime?.height || data?.noUpTime?.height
                  }`}
                >
                  <a>
                    <Block
                      className={
                        data.upTime?.height
                          ? "bg-success"
                          : data.noUpTime?.height
                          ? "bg-danger"
                          : "bg-dark"
                      }
                    >
                      <Tooltip>
                        <strong>Height:</strong>
                        <br />
                        <strong>
                          {data.upTime?.height || data.noUpTime?.height}
                        </strong>
                        <br />
                        <strong style={{ color: "#50df50" }}>Signed: </strong>
                        <br />
                        <strong>
                          {data.upTime?.height ? (
                            "Success"
                          ) : data.noUpTime?.height ? (
                            <p className="text-danger">Failed</p>
                          ) : null}
                        </strong>
                      </Tooltip>
                    </Block>
                  </a>
                </Link>
              ))}
            </BlockGrid>
          </FlexColumn>
        </GridItemSeven>
      </Grid>
      <br />
      <h5>Delegations</h5>
      <Card className={darkMode ? "dark-mode" : ""}>
        <div className="w-100 p-3">
          <TabToggler className={darkMode ? "dark-mode" : ""}>
            <TabTogglerItem
              className={`${
                selectedDelegations === "delegations" ? "active" : ""
              } ${darkMode ? "dark-mode" : ""}`}
              onClick={() => setDelegationPage("delegations")}
            >
              Delegations
            </TabTogglerItem>
            <TabTogglerItem
              onClick={() => setDelegationPage("underdelegations")}
              className={`${
                selectedDelegations === "underdelegations" ? "active" : ""
              } ${darkMode ? "dark-mode" : ""}`}
            >
              Undelegations
            </TabTogglerItem>
          </TabToggler>
          {selectedDelegations === "delegations" ? (
            <DelegationsContent
              {...validatorsDelegations}
              chain_id={chain_id}
            />
          ) : (
            <UndelegationsContent {...unDelegations} chain_id={chain_id} />
          )}
        </div>
      </Card>
      <Container className="my-3">
        <h4>Transactions By Validator</h4>
        <TxsByHeightEvent txs={getValidatorTxsByEvents} chain_id={chain_id} />
      </Container>
      <style jsx>{`
        .inActive {
          color: red;
        }
        .active {
          color: green;
        }
        .uptime {
          background: green;
        }
        .noUptime {
          background: red;
        }
        @media screen and (max-width: 120px) {
          .block-sm {
            display: block;
          }
        }
      `}</style>
    </div>
  );
}

const Container = styled.div`
  display: block;
`;

const TabToggler = styled.div`
  background: #e9ebfe;
  border-radius: 10px;
  width: 400px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 40px;
  cursor: pointer;
  @media screen and (max-width: 506px) {
    flex-direction: column;
    width: 100%;
  }
  &.dark-mode {
    background: #0b0a15 !important;
  }
`;

const TabTogglerItem = styled.div`
  diplay: flex;
  align-items: center;
  justify-content: center;
  &.active {
    background: white;
    border-radius: 5px;
    padding: 10px;
    box-shadow: 0px 7px 8px 0px #9f9f9f;
  }
  @media screen and (max-width: 506px) {
    padding: 10px 0px;
  }
  &.dark-mode.active {
    background: #19172d !important;
  }
`;

const Card = styled.div`
  box-shadow: 0px 7px 30px #0015da29;
  border-radius: 20px;
  margin-bottom: 40px;
  &.dark-mode {
    background-color: #19172d !important;
    box-shadow: 0px -1px 20px 0px #23232329 !important;
  }
`;
const BlockGrid = styled.div`
  display: flex !important;
  flex-wrap: wrap;
`;
const Tooltip = styled.div`
  width: 80px;
  height: 90px;
  background: #324239;
  display: none;
  transform: translate(-35%, -110%);
  border-radius: 10px;
  color: white;
  font-size: 12px;
  padding: 3px;
  text-align: center;
`;
const Block = styled.div`
  width: 18px;
  height: 18px;
  background: #48bb78;
  margin: 5px;
  cursor: pointer;
  border-radius: 3px;
  position: relative;
  &:hover ${Tooltip} {
    display: block;
  }
`;
const Flex = styled.div`
  display: flex;
`;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const Grid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
  @media screen and (max-width: 906px) {
  }
`;

const GridItemSeven = styled.div`
  box-shadow: 0px 7px 30px #0015da29;
  border-radius: 20px;
  grid-column: 1 / span 4;
  padding: 20px;
  &.dark-mode {
    background-color: #19172d !important;
    box-shadow: 0px -1px 20px 0px #23232329 !important;
  }
`;

export default ValidatorsDetailsContent;
