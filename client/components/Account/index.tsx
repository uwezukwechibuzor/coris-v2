import React, { useState } from "react";
import styled from "styled-components";
import { UrbanistBoldBlack40px } from "../../styledMixins";
import QRCode from "react-qr-code";
import AccountDelegationsContent from "./Details/Delegations";
import AccountRedelegationsContent from "./Details/Redelegations";
import AccountUndelegationsContent from "./Details/Undelegations";
import { useAppSelector } from "../../lib/hooks";
import Doughnut from "./Doughnut";
import { COIN, DENOM } from "../../lib/Util/constants";
import { abbrMessage, formatHash } from "../../lib/Util/format";
import { useRouter } from "next/router";
//import CopyClip from "../Validators/Details/CopyClip";
import TxsByHeightEvent from "../Blocks/Details/tsxByHeightOrEvent";
import CopyClip from "../Validators/Details/CopyClip";

function AccountContents(props) {
  const darkMode = useAppSelector((state) => state.general.darkMode);
  const [selectedDelegations, setDelegationPage] = useState("delegations");

  const router = useRouter();
  const query = router.query;
  const accountAddress: any = query.address;

  const {
    authAccount,
    accountBalance,
    delegationRewards,
    accountDelegations,
    accountRedelegations,
    accountUnboundingDelegations,
    getAllAccountTxsByEvents,
    chain_id,
  } = props;

  let totalRewards = 0;
  delegationRewards?.rewards?.map((data) => {
    const totalAmount = Number(data?.reward[0]?.amount);
    totalRewards += totalAmount;
  });

  let totalDelegationsAmount = 0;
  accountDelegations?.delegation_responses?.map((data) => {
    totalDelegationsAmount += Number(data?.balance?.amount);
  });

  let totalRedegationsAmount = 0;
  accountRedelegations?.redelegation_responses?.map((data) => {
    totalRedegationsAmount += Number(data?.entries[0]?.balance);
  });

  let totalUnboundingDelegationsAmount = 0;
  accountUnboundingDelegations?.unbonding_responses?.map((data) => {
    totalUnboundingDelegationsAmount += Number(data?.entries[0]?.balance);
  });

  //get total value
  const totalValue =
    totalRewards +
    totalDelegationsAmount +
    totalRedegationsAmount +
    totalUnboundingDelegationsAmount;
  const percentageOfAccountRewards =
    totalRewards !== 0 ? (totalRewards / totalValue) * 100 : 0;
  const percentageOfAccountDelegations =
    totalDelegationsAmount !== 0
      ? (totalDelegationsAmount / totalValue) * 100
      : 0;
  const percentageOfAccountRedelegations =
    totalRedegationsAmount !== 0
      ? (totalRedegationsAmount / totalValue) * 100
      : 0;
  const percentageOfAccountUnboundings =
    totalUnboundingDelegationsAmount !== 0
      ? (totalUnboundingDelegationsAmount / totalValue) * 100
      : 0;

  const percentageData = {
    percentageOfAccountRewards,
    percentageOfAccountDelegations,
    percentageOfAccountRedelegations,
    percentageOfAccountUnboundings,
  };

  return (
    <>
      <Title className={darkMode ? "dark-mode" : ""}>Account Details</Title>
      <Grid1>
        <Container className="mb-3">
          <Card
            className={darkMode ? "dark-mode" : ""}
            style={{ padding: "40px" }}
          >
            <QRContainer>
              <QRCode value="hey" size={100} />
            </QRContainer>
            <FlexMiddle className="mt-3">Address</FlexMiddle>
            <FlexMiddle>
              <h5>{query.address}</h5>
              <CopyClip value={accountAddress} />
            </FlexMiddle>
            <hr style={{ border: "1px solid rgb(199 199 199)" }} />
            <FlexMiddle>
              <div
                className="d-flex w-100"
                style={{ justifyContent: "space-between" }}
              >
                <div>
                  <div>
                    <span>Account No</span>
                  </div>
                  <strong>
                    {authAccount?.account?.account_number
                      ? authAccount.account.account_number
                      : null}
                  </strong>
                </div>
                <div>
                  <div>
                    <span>Sequence</span>
                  </div>
                  <strong>
                    {authAccount?.account?.sequence
                      ? authAccount.account.sequence
                      : 0}
                  </strong>
                </div>
              </div>
            </FlexMiddle>
            <hr style={{ border: "1px solid rgb(199 199 199)" }} />
            <FlexMiddle className="mt-3">Type</FlexMiddle>
            <FlexMiddle>
              <h6>
                {authAccount?.account ? abbrMessage(authAccount.account) : null}
              </h6>
            </FlexMiddle>
            <FlexMiddle>
              <div>
                <div>
                  <span style={{ marginLeft: "70px" }}>
                    <FlexMiddle>Balance</FlexMiddle>
                  </span>
                </div>
                {accountBalance?.balances?.map((data) => (
                  <h6>
                    {data?.denom == "uatom"
                      ? data?.amount / DENOM + " " + COIN
                      : data.amount / DENOM +
                        " " +
                        formatHash(data?.denom, 10, "...")}
                    <br />
                  </h6>
                ))}
              </div>
            </FlexMiddle>
          </Card>
        </Container>
        <Container className="mb-3">
          <Card
            className={
              darkMode ? "dark-mode w-100 h-100 py-3" : "w-100 h-100 py-3"
            }
          >
            <Flex
              className="block-sm align-items-center"
              style={{ flexDirection: "column" }}
            >
              <Flex className="w-40 w-100-sm justify-content-center align-items-center">
                <div>
                  <Doughnut {...percentageData} />
                </div>
              </Flex>
              <Flex className="pt-3 w-100" style={{ flexDirection: "column" }}>
                <div className="px-3">
                  <Flex
                    style={{
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                    }}
                  >
                    <Flex>
                      <Box className="reward" />
                      <h5 className="ml-3">
                        Reward{" "}
                        <small style={{ fontSize: "12px" }}>
                          {percentageOfAccountRewards.toFixed(2) + "%"}
                        </small>
                      </h5>
                    </Flex>
                    <Flex>
                      <h5>
                        <strong>
                          {delegationRewards?.rewards !== undefined
                            ? (totalRewards / DENOM).toFixed(4)
                            : 0}{" "}
                          {COIN}
                        </strong>
                      </h5>
                    </Flex>
                  </Flex>
                  <Flex
                    style={{
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                    }}
                  >
                    <Flex>
                      <Box className="delegations" />
                      <h5 className="ml-3">
                        Delegation{" "}
                        <small style={{ fontSize: "12px" }}>
                          {percentageOfAccountDelegations.toFixed(2) + "%"}
                        </small>
                      </h5>
                    </Flex>
                    <Flex>
                      <h5>
                        <strong>
                          {accountDelegations?.delegation_responses
                            ? (totalDelegationsAmount / DENOM).toFixed(4)
                            : 0}{" "}
                          {COIN}
                        </strong>
                      </h5>
                    </Flex>
                  </Flex>
                  <Flex
                    style={{
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                    }}
                  >
                    <Flex>
                      <Box className="redelegations" />
                      <h5 className="ml-3">
                        Redelegation{" "}
                        <small style={{ fontSize: "12px" }}>
                          {percentageOfAccountRedelegations.toFixed(2) + "%"}
                        </small>
                      </h5>
                    </Flex>
                    <Flex>
                      <h5>
                        <strong>
                          {accountRedelegations?.redelegation_responses
                            ? (totalRedegationsAmount / DENOM).toFixed(4)
                            : 0}{" "}
                          {COIN}
                        </strong>
                      </h5>
                    </Flex>
                  </Flex>
                  <Flex
                    style={{
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                    }}
                  >
                    <Flex>
                      <Box className="unbondings" />
                      <h5 className="ml-3">
                        Unbondings{" "}
                        <small style={{ fontSize: "12px" }}>
                          {percentageOfAccountUnboundings.toFixed(2) + "%"}
                        </small>
                      </h5>
                    </Flex>
                    <Flex>
                      <h5>
                        <strong>
                          {accountUnboundingDelegations?.unbonding_responses
                            ? (
                                totalUnboundingDelegationsAmount / DENOM
                              ).toFixed(4)
                            : null}{" "}
                          {COIN}
                        </strong>
                      </h5>
                    </Flex>
                  </Flex>
                </div>
              </Flex>
            </Flex>
          </Card>
        </Container>
      </Grid1>
      <Container className="my-3">
        <h5>Delegations</h5>
        <Card
          className={darkMode ? "dark-mode" : ""}
          style={{ padding: "10px" }}
        >
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
              <TabTogglerItem
                onClick={() => setDelegationPage("redelegations")}
                className={`${
                  selectedDelegations === "redelegations" ? "active" : ""
                } ${darkMode ? "dark-mode" : ""}`}
              >
                Redelegations
              </TabTogglerItem>
            </TabToggler>
            {selectedDelegations === "delegations" ? (
              <AccountDelegationsContent
                {...accountDelegations}
                chain_id={chain_id}
              />
            ) : selectedDelegations === "redelegations" ? (
              <AccountRedelegationsContent
                Redelegations={accountRedelegations}
                chain_id={chain_id}
              />
            ) : (
              <AccountUndelegationsContent
                {...accountUnboundingDelegations}
                chain_id={chain_id}
              />
            )}
          </div>
        </Card>
      </Container>
      <Container className="my-3">
        <h4>Transactions</h4>
        <TxsByHeightEvent txs={getAllAccountTxsByEvents} chain_id={chain_id} />
      </Container>
    </>
  );
}

const Box = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 3px;
  &.delegations {
    background: blue !important;
  }
  &.reward {
    background: red !important;
  }
  &.redelegations {
    background: lightblue !important;
  }
  &.unbondings {
    background: darkblue !important;
  }
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
  @media screen and (max-width: 506px) {
    flex-direction: column;
    width: 100%;
  }
  &.dark-mode {
    background: #0b0a15 !important;
  }
`;

const TabTogglerItem = styled.div`
  cursor: pointer;
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

const FlexMiddle = styled.div`
  display: flex;
  justify-content: center;
`;

const QRContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Card = styled.div`
  border-radius: 20px;
  box-shadow: 0px 7px 30px #0015da29;
  word-break: break-all;
  &.dark-mode {
    background-color: #19172d !important;
    box-shadow: 0px -1px 20px 0px #23232329 !important;
  }
`;

const Flex = styled.div`
  display: flex;
`;

const Grid1 = styled.div`
  display: grid;
  grid-template-columns: 400px auto;
  grid-gap: 30px;
  @media screen and (max-width: 1168px) {
    grid-template-columns: auto;
  }
`;

const Container = styled.div`
  display: block;
`;

const Title = styled.h1`
  ${UrbanistBoldBlack40px}
  min-height: 48px;
  min-width: 112px;
  letter-spacing: 0;
  margin-top: 60px;
`;

export default AccountContents;
