import React, { useState } from "react";
import styled from "styled-components";
import ProgressBar from "react-bootstrap/ProgressBar";
import { UrbanistBoldBlack40px } from "../../../styledMixins";
import { abbrMessage, toDay } from "../../../lib/Util/format";
import YesVoteOptions from "./Votes/yes";
import NoVoteOptions from "./Votes/No";
import AbstainVoteOptions from "./Votes/Abstain";
import Link from "next/link";
import VetoVoteOptions from "./Votes/Veto";
import { useAppSelector } from "../../../lib/hooks";
import { COIN, DENOM } from "../../../lib/Util/constants";

function ProposalDetailsContents(props) {
  const darkMode = useAppSelector((state) => state.general.darkMode);
  const {
    type,
    total,
    proposalDetails,
    proposalsVotingOptions,
    deposits,
    getTally,
    chain_id,
  } = props;

  const [selectedVoteView, setVoteView] = useState("yes");

  const proposal = proposalDetails !== undefined ? proposalDetails : null;

  const finalTallySum =
    Number(getTally?.tally?.yes) +
    Number(getTally?.tally?.no) +
    Number(getTally?.tally?.no_with_veto) +
    Number(getTally?.tally?.abstain);
  //console.log(finalTallyResultSum)
  const tallyPercentage = (tallyResult: number) =>
    (tallyResult / finalTallySum) * 100;

  const proposalDescription = proposal?.proposal?.content?.description
    .split("\\n\\n")
    .map((str) => <p>{str}</p>);

  //get depositors dedtails
  const depositDetails = deposits !== undefined ? deposits?.deposits : null;

  //proposals voting options
  const getVotingOptions =
    proposalsVotingOptions !== undefined ? proposalsVotingOptions : null;

  let voteOptionYes = [];
  let voteOptionNo = [];
  let voteOptionVeto = [];
  let voteOptionAbstain = [];
  getVotingOptions?.votes?.map((data) =>
    data.option === "VOTE_OPTION_YES"
      ? voteOptionYes.push(data)
      : data.option === "VOTE_OPTION_NO"
      ? voteOptionNo.push(data)
      : data.option === "VOTE_OPTION_NO_WITH_VETO"
      ? voteOptionVeto.push(data)
      : voteOptionAbstain.push(data)
  );

  return (
    <div className={darkMode ? "dark-mode" : ""}>
      <Title className={darkMode ? "dark-mode" : ""}>Proposal Details</Title>
      <Box className={darkMode ? "dark-mode" : ""}>
        <span>
          {proposal?.proposal?.content?.title
            ? proposal?.proposal.content.title
            : null}
        </span>
        <Container>
          <Badge
            className={
              proposal?.proposal?.status === "PROPOSAL_STATUS_PASSED"
                ? "success"
                : proposal?.proposal?.status === "PROPOSAL_STATUS_REJECTED"
                ? "danger"
                : proposal?.proposal?.status === "PROPOSAL_STATUS_VOTING_PERIOD"
                ? "info"
                : "warning"
            }
          >
            {proposal?.proposal?.status === "PROPOSAL_STATUS_PASSED"
              ? "PASSED"
              : proposal?.proposal?.status === "PROPOSAL_STATUS_REJECTED"
              ? "REJECTED"
              : proposal?.proposal?.status === "PROPOSAL_STATUS_VOTING_PERIOD"
              ? "VOTING PERIOD"
              : proposal?.proposal?.status === "PROPOSAL_STATUS_FAILED"
              ? "FAILED"
              : null}
          </Badge>
        </Container>
        <Container>
          <Flex style={{ marginTop: "10px" }}>
            <span>{type}</span>
            <Container style={{ marginLeft: "40px" }}>
              <strong>
                {proposal?.proposal?.content
                  ? abbrMessage(proposal?.proposal?.content)
                  : null}
              </strong>
            </Container>
          </Flex>
          <Flex style={{ marginTop: "10px" }}>
            <span>{total}</span>
            <Container style={{ marginLeft: "40px" }}>
              <strong>
                {finalTallySum
                  ? (finalTallySum / DENOM).toFixed(2)
                  : ""}
                {COIN}
              </strong>
            </Container>
          </Flex>
          <ProgressBar style={{ height: "30px" }}>
            <ProgressBar
              striped
              variant="success"
              now={
                getTally?.tally
                  ? tallyPercentage(getTally?.tally?.yes)
                  : 0
              }
              key={1}
              label={
                getTally?.tally
                  ? tallyPercentage(
                    getTally?.tally?.yes
                    ).toFixed(2) + "%"
                  : 0
              }
            />
            <ProgressBar
              variant="danger"
              now={
                getTally?.tally
                  ? tallyPercentage(getTally?.tally?.no)
                  : 0
              }
              key={2}
              label={
                getTally?.tally
                  ? tallyPercentage(
                    getTally?.tally?.no
                    ).toFixed(2) + "%"
                  : 0
              }
            />
            <ProgressBar
              striped
              variant="warning"
              now={
                getTally?.tally
                  ? tallyPercentage(
                    getTally?.tally?.no_with_veto
                    )
                  : 0
              }
              key={3}
              label={
                getTally?.tally
                  ? tallyPercentage(
                    getTally?.tally?.no_with_veto
                    ).toFixed(2) + "%"
                  : 0
              }
            />
            <ProgressBar
              striped
              style={{ background: "gray" }}
              now={
                getTally?.tally
                  ? tallyPercentage(
                    getTally?.tally?.abstain
                    )
                  : 0
              }
              key={4}
              label={
                getTally?.tally
                  ? tallyPercentage(
                    getTally?.tally?.abstain
                    ).toFixed(2) + "%"
                  : 0
              }
            />
          </ProgressBar>
        </Container>
        <Container style={{ marginTop: "20px" }}>
          <Grid>
            <Container>
              <Flex>
                <Color className="first" />
                <strong style={{ marginLeft: "10px" }}>Yes</strong>
              </Flex>
              <div>
                {getTally?.tally
                  ? tallyPercentage(
                    getTally?.tally?.yes
                    ).toFixed(2) + "%"
                  : 0}{" "}
                (
                {getTally?.tally?.yes
                  ? (getTally?.tally?.yes / DENOM).toFixed(
                      2
                    )
                  : 0}
                {COIN})
              </div>
            </Container>
            <Container>
              <Flex>
                <Color className="second" />
                <strong style={{ marginLeft: "10px" }}>No</strong>
              </Flex>
              <div>
                {getTally?.tally
                  ? tallyPercentage(
                    getTally?.tally?.no
                    ).toFixed(2) + "%"
                  : 0}
                (
                {getTally?.tally?.no
                  ? (getTally?.tally?.no / DENOM).toFixed(
                      2
                    )
                  : 0}
                {COIN})
              </div>
            </Container>
            <Container>
              <Flex>
                <Color className="third" />
                <strong style={{ marginLeft: "10px" }}>Veto</strong>
              </Flex>
              <div>
                {getTally?.tally
                  ? tallyPercentage(
                    getTally?.tally?.no_with_veto
                    ).toFixed(2) + "%"
                  : 0}
                (
                {getTally?.tally?.no_with_veto
                  ? (
                    getTally?.tally?.no_with_veto / DENOM
                    ).toFixed(2)
                  : 0}
                {COIN})
              </div>
            </Container>
            <Container>
              <Flex>
                <Color className="fourth" />
                <strong style={{ marginLeft: "10px" }}>Abstain</strong>
              </Flex>
              <div>
                {getTally?.tally
                  ? tallyPercentage(
                    getTally?.tally?.abstain
                    ).toFixed(2) + "%"
                  : 0}
                (
                {getTally?.tally?.abstain
                  ? (
                    getTally?.tally?.abstain / DENOM
                    ).toFixed(2)
                  : 0}
                {COIN})
              </div>
            </Container>
          </Grid>
        </Container>
      </Box>

      <Box
        className={darkMode ? "dark-mode" : ""}
        style={{ marginTop: "20px", padding: "20px" }}
      >
        <FlexBetween>
          <Container>Propser:</Container>
          <Container>
            <strong className="text-info">
              <Link
                href="/[chain_id]/account[address]"
                as={`/${chain_id}/account/${proposal?.proposal?.content?.recipient}`}
              >
                <a>
                  {proposal?.proposal?.content?.recipient
                    ? proposal.proposal.content.recipient
                    : "No Recipient"}
                </a>
              </Link>
            </strong>
          </Container>
        </FlexBetween>
        <FlexBetween>
          <Container>Total Deposit:</Container>
          <Container>
            <strong>
              {proposal?.proposal.total_deposit
                ? (proposal.proposal.total_deposit[0].amount / DENOM).toFixed(2)
                : null}{" "}
              {COIN}
            </strong>
          </Container>
        </FlexBetween>
        <FlexBetween>
          <Container>Voting Start</Container>
          <Container>
            <strong>
              {proposal?.proposal?.voting_start_time
                ? toDay(proposal.proposal.voting_start_time)
                : null}
            </strong>
          </Container>
        </FlexBetween>
        <FlexBetween>
          <Container>Voting End</Container>
          <Container>
            <strong>
              {proposal?.proposal?.voting_end_time
                ? toDay(proposal.proposal.voting_end_time)
                : null}
            </strong>
          </Container>
        </FlexBetween>
        <FlexBetween>
          <Container>Submit Time</Container>
          <Container>
            <strong>
              {proposal?.proposal?.submit_time
                ? toDay(proposal?.proposal.submit_time)
                : null}
            </strong>
          </Container>
        </FlexBetween>
        <FlexBetween>
          <Container>Deposit End Time</Container>
          <Container>
            <strong>
              {proposal?.proposal?.deposit_end_time
                ? toDay(proposal?.proposal.deposit_end_time)
                : null}
            </strong>
          </Container>
        </FlexBetween>
      </Box>

      <Box
        className={darkMode ? "dark-mode" : ""}
        style={{ marginTop: "20px", padding: "20px" }}
      >
        <FlexBetween>
          <Container>Depositor</Container>
          <Container>
            <strong className="text-info">Amount </strong>
          </Container>
        </FlexBetween>
        {depositDetails?.map((data) => (
          <FlexBetween>
            <Container>
              <Link
                href="/[chain_id]/account/[address]"
                as={`/${chain_id}/account/${data.depositor}`}
              >
                <a>{data ? data.depositor : null}</a>
              </Link>
            </Container>
            <Container>
              <strong>
                {data ? data.amount[0].amount : null}{" "}
                {data ? data.amount[0].denom : null}
              </strong>
            </Container>
          </FlexBetween>
        ))}
      </Box>

      <div className="my-3">
        <h4>Description</h4>
        <Box
          className={darkMode ? "dark-mode" : ""}
          style={{ width: "100%", wordBreak: "break-all" }}
        >
          {proposalDescription ? proposalDescription : null}
        </Box>
      </div>
      {/* <DownBoard>
        continue work here to display Votes
      </DownBoard> */}

      <Card className={darkMode ? "dark-mode" : ""}>
        <div className="w-100 p-3">
          <TabToggler className={darkMode ? "dark-mode" : ""}>
            <TabTogglerItem
              className={`${selectedVoteView === "yes" ? "active" : ""} ${
                darkMode ? "dark-mode" : ""
              }`}
              onClick={() => setVoteView("yes")}
            >
              Yes
            </TabTogglerItem>
            <TabTogglerItem
              onClick={() => setVoteView("no")}
              className={`${selectedVoteView === "no" ? "active" : ""} ${
                darkMode ? "dark-mode" : ""
              }`}
            >
              No
            </TabTogglerItem>
            <TabTogglerItem
              onClick={() => setVoteView("veto")}
              className={`${selectedVoteView === "veto" ? "active" : ""} ${
                darkMode ? "dark-mode" : ""
              }`}
            >
              Veto
            </TabTogglerItem>
            <TabTogglerItem
              onClick={() => setVoteView("abstain")}
              className={`${selectedVoteView === "abstain" ? "active" : ""} ${
                darkMode ? "dark-mode" : ""
              }`}
            >
              Abstain
            </TabTogglerItem>
          </TabToggler>
          {selectedVoteView === "yes" ? (
            <YesVoteOptions voteOptionYes={voteOptionYes} chain_id={chain_id} />
          ) : selectedVoteView === "no" ? (
            <NoVoteOptions voteOptionNo={voteOptionNo} chain_id={chain_id} />
          ) : selectedVoteView === "veto" ? (
            <VetoVoteOptions
              voteOptionVeto={voteOptionVeto}
              chain_id={chain_id}
            />
          ) : (
            <AbstainVoteOptions
              voteOptionAbstain={voteOptionAbstain}
              chain_id={chain_id}
            />
          )}
        </div>
      </Card>
    </div>
  );
}

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

const FlexBetween = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const Bar = styled.div`
  display: flex;
  height: 34px;
  margin-top: 10px;
  border-radius: 5px;
  overflow: hidden;
`;

const Flex = styled.div`
  display: flex;
`;

const Box = styled.div`
  border-radius: 20px;
  box-shadow: 0px 7px 30px #0015da29;
  width: 100%;
  padding: 20px 20px;
  word-break: break-all;
  &.dark-mode {
    background-color: #19172d !important;
    box-shadow: 0px -1px 20px 0px #23232329 !important;
  }
`;

const Container = styled.div`
  display: block;
`;

const Badge = styled.div`
  border-radius: 20px;
  display: inline-block;
  padding: 0px 10px;
  margin-top: 10px;
  color: white;
  &.success {
    background: #16a82e;
  }
  &.danger {
    background: #dc3545;
  }
  &.warning {
    background: #ffc107;
  }
  &.info {
    background: #0d6efd;
  }
`;

const Grid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: auto auto auto auto;
  @media screen and (max-width: 764px) {
    grid-template-columns: auto auto;
    grid-gap: 40px;
  }
`;

const Color = styled.div`
  width: 25px;
  height: 25px;
  background: red;
  border-radius: 5px;
  &.first {
    background: #16a82e;
  }
  &.second {
    background: #dc3545;
  }
  &.third {
    background: #ffc107;
  }
  &.fourth {
    background: gray;
  }
`;

const Title = styled.h1`
  ${UrbanistBoldBlack40px}
  min-height: 48px;
  margin-top: 54px;
  letter-spacing: 0;
`;

export default ProposalDetailsContents;
