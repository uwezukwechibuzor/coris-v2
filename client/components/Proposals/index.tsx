import React, { useState } from "react";
import styled from "styled-components";
import Badge from "react-bootstrap/Badge";
import { UrbanistBoldBlack40px } from "../../styledMixins";
import { abbrMessage, toDay } from "../../lib/Util/format";
import { useRouter } from "next/router";
import { useAppSelector } from "../../lib/hooks";
import ReactPaginate from "react-paginate";
import { Button, ProgressBar } from "react-bootstrap";
import { assetSymbol, DENOM } from "../../lib/Util/constants";
import SearchButton from "./SearchButton";

function ProposalsContent(props) {
  const darkMode = useAppSelector((state) => state.general.darkMode);
  const [currentPage, setCurrentPage] = useState(0);

  const [query, setQuery] = useState("");

  const { proposalsData, getFirstFourActiveProposalsTally, chain_id } = props;

  const activeProposals = proposalsData?.proposals?.map((proposal) => {
    if (
      proposal.status === "PROPOSAL_STATUS_VOTING_PERIOD" ||
      proposal.status === "PROPOSAL_STATUS_PASSED" ||
      proposal.status === "PROPOSAL_STATUS_REJECTED" ||
      proposal.status === "PROPOSAL_STATUS_FAILED"
    ) {
      return proposal;
    }
  });

  var finalTallySum;
  const tallyPercentage = (tallyResult: number) => {
    if (finalTallySum == 0 || tallyResult == 0) {
      return 0;
    }
    return (tallyResult / finalTallySum) * 100;
  };
  //add pagination to signatures
  const PER_PAGE = 15;
  const offset = currentPage * PER_PAGE;
  const currentactiveProposals = activeProposals?.slice(
    offset,
    offset + PER_PAGE
  );
  const pageCount = Math.ceil(activeProposals?.length / PER_PAGE);
  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }

  const router = useRouter();

  return (
    <div className={darkMode ? "dark-mode" : ""}>
      <Title className={darkMode ? "dark-mode" : ""}>Proposals</Title>
      <Grid>
        {getFirstFourActiveProposalsTally?.map((proposals) => {
          return proposals?.map((data) => {
            finalTallySum =
              data.tally !== undefined || data?.tally != null
                ? Number(data?.tally?.tally?.yes) +
                  Number(data?.tally?.tally?.no) +
                  Number(data?.tally?.tally?.no_with_veto) +
                  Number(data?.tally?.tally?.abstain)
                : 0;

            const max = Math.max(
              data?.tally?.tally?.yes,
              data?.tally?.tally?.no,
              data?.tally?.tally?.no_with_veto,
              data?.tally?.tally?.abstain
            );

            return (
              <GridItem className={darkMode ? "dark-mode" : ""}>
                <FlexBetween>
                  <h5>#{data?.proposal_id}</h5>
                  <BadgeStatus>
                    <Bullet />
                    <BadgeText>
                      {data?.status === "PROPOSAL_STATUS_PASSED" ? (
                        <Badge bg="success">PASSED</Badge>
                      ) : data?.status === "PROPOSAL_STATUS_REJECTED" ? (
                        <Badge bg="danger">REJECTED</Badge>
                      ) : data?.status === "PROPOSAL_STATUS_VOTING_PERIOD" ? (
                        <Badge bg="info">VOTING PERIOD</Badge>
                      ) : (
                        <Badge bg="warning">FAILED</Badge>
                      )}
                    </BadgeText>
                  </BadgeStatus>
                </FlexBetween>
                <h6>
                  ## {data?.content?.description ? data?.content?.title : null}
                </h6>
                <table>
                  <thead>
                    <TableRow>
                      <TableData style={{ width: "110px" }}>Type</TableData>
                      <TableData>
                        <b>
                          {data?.content ? abbrMessage(data?.content) : null}
                        </b>
                      </TableData>
                    </TableRow>
                    <TableRow>
                      <TableData>Voting start</TableData>
                      <TableData>
                        <b>{toDay(data?.voting_start_time)}</b>
                      </TableData>
                    </TableRow>
                  </thead>
                  <tbody>
                    <TableRow>
                      <TableData>Voting end</TableData>
                      <TableData>
                        <b>{toDay(data?.voting_end_time)}</b>
                      </TableData>
                    </TableRow>
                  </tbody>
                </table>

                <Flex>
                  <div
                    className="mt-3"
                    style={{
                      width: "70%",
                      borderRight: "1px solid #f3f3f3",
                      paddingRight: "20px",
                    }}
                  >
                    <ProgressBar style={{ height: "30px" }}>
                      <ProgressBar
                        striped
                        variant="success"
                        now={
                          data?.tally?.tally.yes != null
                            ? tallyPercentage(data?.tally?.tally?.yes)
                            : 0
                        }
                        key={1}
                        label={
                          data?.tally?.tally.yes != null
                            ? tallyPercentage(data?.tally?.tally?.yes).toFixed(
                                2
                              ) + "%"
                            : 0
                        }
                      />
                      <ProgressBar
                        variant="danger"
                        now={
                          data?.tally?.tally.no != null
                            ? tallyPercentage(data?.tally?.tally?.no)
                            : 0
                        }
                        key={2}
                        label={
                          data?.tally?.tally.no != null
                            ? tallyPercentage(data?.tally?.tally?.no).toFixed(
                                2
                              ) + "%"
                            : 0
                        }
                      />
                      <ProgressBar
                        striped
                        variant="warning"
                        now={
                          data?.tally?.tally.no_with_veto != null
                            ? tallyPercentage(data?.tally?.tally?.no_with_veto)
                            : 0
                        }
                        key={3}
                        label={
                          data?.tally?.tally.no_with_veto != null
                            ? tallyPercentage(
                                data?.tally?.tally?.no_with_veto
                              ).toFixed(2) + "%"
                            : 0
                        }
                      />
                      <ProgressBar
                        striped
                        style={{ background: "gray" }}
                        now={
                          data?.tally?.tally?.abstain != null
                            ? tallyPercentage(data?.tally?.tally?.abstain)
                            : 0
                        }
                        key={4}
                        label={
                          data?.tally?.tally?.abstain != null
                            ? tallyPercentage(
                                data?.tally?.tally?.abstain
                              ).toFixed(2) + "%"
                            : 0
                        }
                      />
                    </ProgressBar>
                    <Grid>
                      <Container>
                        <Flex>
                          <Color className="first" />
                          <strong style={{ marginLeft: "10px" }}>Yes</strong>
                        </Flex>
                        <div>
                          {data?.tally?.tally?.yes != null
                            ? tallyPercentage(data?.tally?.tally?.yes).toFixed(
                                2
                              ) + "%"
                            : 0}
                          (
                          {data?.tally?.tally?.yes != null
                            ? (data?.tally?.tally?.yes / DENOM).toFixed(2)
                            : 0}
                          {assetSymbol(chain_id)})
                        </div>
                      </Container>
                      <Container>
                        <Flex>
                          <Color className="second" />
                          <strong style={{ marginLeft: "10px" }}>No</strong>
                        </Flex>
                        <div>
                          {data?.tally?.tally?.no != null
                            ? tallyPercentage(data?.tally?.tally?.no).toFixed(
                                2
                              ) + "%"
                            : 0}
                          (
                          {data?.tally?.tally?.no != null
                            ? (data?.tally?.tally?.no / DENOM).toFixed(2)
                            : 0}
                          {assetSymbol(chain_id)})
                        </div>
                      </Container>
                      <Container>
                        <Flex>
                          <Color className="third" />
                          <strong style={{ marginLeft: "10px" }}>
                            No With Veto
                          </strong>
                        </Flex>
                        <div>
                          {data?.tally?.tally?.no_with_veto != null
                            ? tallyPercentage(
                                data?.tally?.tally?.no_with_veto
                              ).toFixed(2) + "%"
                            : 0}
                          (
                          {data?.tally?.tally?.no_with_veto != null
                            ? (
                                data?.tally?.tally?.no_with_veto / DENOM
                              ).toFixed(2)
                            : 0}{" "}
                          {assetSymbol(chain_id)})
                        </div>
                      </Container>
                      <Container>
                        <Flex>
                          <Color className="fourth" />
                          <strong style={{ marginLeft: "10px" }}>
                            Abstain
                          </strong>
                        </Flex>
                        <div>
                          {data?.tally?.tally?.abstain != null
                            ? tallyPercentage(
                                data?.tally?.tally?.abstain
                              ).toFixed(2) + "%"
                            : 0}
                          (
                          {data?.tally?.tally?.abstain != null
                            ? (data?.tally?.tally?.abstain / DENOM).toFixed(2)
                            : 0}
                          {assetSymbol(chain_id)})
                        </div>
                      </Container>
                    </Grid>
                  </div>
                  <div className="ml-3">
                    <b>Most voted on</b>
                    <FlexMiddle>
                      <Box
                        style={{ marginRight: "5px" }}
                        className={
                          tallyPercentage(max) ===
                          tallyPercentage(data?.tally?.tally?.yes)
                            ? "first"
                            : tallyPercentage(max) ===
                              tallyPercentage(data?.tally?.tally?.no)
                            ? "second"
                            : tallyPercentage(max) ===
                              tallyPercentage(data?.tally?.tally?.no_with_veto)
                            ? "third"
                            : tallyPercentage(max) ===
                              tallyPercentage(data?.tally?.tally?.abstain)
                            ? "fourth"
                            : ""
                        }
                      />
                      <div>
                        <span>
                          {tallyPercentage(max) ===
                          tallyPercentage(data?.tally?.tally?.yes)
                            ? "Yes"
                            : tallyPercentage(max) ===
                              tallyPercentage(data?.tally?.tally?.no)
                            ? "No"
                            : tallyPercentage(max) ===
                              tallyPercentage(data?.tally?.tally?.no_with_veto)
                            ? "No With Veto"
                            : tallyPercentage(max) ===
                              tallyPercentage(data?.tally?.tally?.abstain)
                            ? "Abstain"
                            : "None"}
                        </span>
                        <span style={{ marginLeft: "5px" }}>
                          {max ? tallyPercentage(max).toFixed(2) : 0}
                          <span style={{ fontSize: "12px" }}>%</span>
                        </span>
                      </div>
                    </FlexMiddle>
                    <br />
                    <Button
                      variant="outline-primary"
                      onClick={() =>
                        router.push(
                          `/${chain_id}/proposals/${data?.proposal_id}`
                        )
                      }
                    >
                      Read more
                    </Button>
                  </div>
                </Flex>
              </GridItem>
            );
          });
        })}
      </Grid>
      <SearchButton setQuery={setQuery} />
      <Responsive>
        <table
          className={
            darkMode
              ? "w-100 mt-3 table table-responsive dark-mode"
              : "w-100 mt-3 table table-responsive"
          }
        >
          <thead>
            <tr>
              <th>#ID</th>
              <th>Title</th>
              <th>Status</th>
              <th>Voting start</th>
              <th>Voting end</th>
              <th>Total deposit</th>
            </tr>
          </thead>
          <tbody>
            {currentactiveProposals
              ?.filter((proposal) => {
                if (query === " ") {
                  return proposal;
                } else if (
                  proposal?.content?.title
                    .toLowerCase()
                    .includes(query.toLocaleLowerCase())
                ) {
                  return proposal;
                }
              })
              .map((proposal) => (
                <tr
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    router.push(
                      `/${chain_id}/proposals/${proposal?.proposal_id}`
                    )
                  }
                >
                  <td>{proposal?.proposal_id}</td>
                  <td>
                    {proposal?.content?.description
                      ? proposal.content.title.slice(0, 40) + "...."
                      : null}
                  </td>
                  <td>
                    {proposal.status === "PROPOSAL_STATUS_PASSED" ? (
                      <Badge bg="success">PASSED</Badge>
                    ) : proposal.status === "PROPOSAL_STATUS_REJECTED" ? (
                      <Badge bg="danger">REJECTED</Badge>
                    ) : proposal.status === "PROPOSAL_STATUS_VOTING_PERIOD" ? (
                      <Badge bg="info">VOTING PERIOD</Badge>
                    ) : (
                      <Badge bg="warning">FAILED</Badge>
                    )}
                  </td>
                  <td>{toDay(proposal.voting_start_time)}</td>
                  <td>{toDay(proposal.voting_end_time)}</td>
                  <td>
                    {(proposal.total_deposit[0].amount / DENOM).toFixed(2)}{" "}
                    {assetSymbol(chain_id)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </Responsive>
      {currentactiveProposals?.length !== 0 ? (
        <ReactPaginate
          previousLabel={"←"}
          nextLabel={"→"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          previousLinkClassName={"pagination__link"}
          nextLinkClassName={"pagination__link"}
          disabledClassName={"pagination__link--disabled"}
          activeClassName={"pagination__link--active"}
        />
      ) : null}
    </div>
  );
}

const Container = styled.div`
  display: block;
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

const FlexMiddle = styled.div`
  display: flex;
  align-items: center;
`;

const Box = styled.div`
  width: 10px;
  height: 10px;
  background: red;
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

const Flex = styled.div`
  display: flex;
`;

const FlexBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const TableData = styled.td`
  padding: unset !important;
  padding-top: 10px !important;
  padding-bottom: 10x; !im portant
`;

const TableRow = styled.tr`
  background: unset !important;
`;

const BadgeStatus = styled.div`
  width: fit-content;
  background-color: rgba(0, 177, 253, 0.1);
  padding: 5px 10px;
  border-radius: 5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BadgeText = styled.span`
  color: #00b1ff;
  font-size: 12px;
  font-weight: bold;
`;

const Bullet = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 0.5rem;
  background: #00b1ff;
`;

const Responsive = styled.div`
  width: 100%;
  overflow-x: auto;
  @media screen and (max-width: 1074px) {
    width: calc(100vw - 10px);
  }
  @media (min-width: 1074px) and (max-width: 1334px) {
    width: calc(100vw - 130px);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 20px;
  margin-bottom: 40px;
  margin-top: 20px;
  @media screen and (max-width: 1003px) {
    grid-template-columns: auto;
  }
`;

const GridItem = styled.div`
  position: relative;
  display: block;
  box-shadow: 0px 7px 30px #0015da29;
  border-radius: 20px;
  margin-bottom: 10px;
  padding: 20px;
  &.dark-mode {
    background-color: #19172d !important;
    box-shadow: 0px -1px 20px 0px #23232329 !important;
  }
`;

const Title = styled.h1`
  ${UrbanistBoldBlack40px}
  min-height: 48px;
  margin-top: 54px;
  letter-spacing: 0;
`;

export default ProposalsContent;
