import React, { useState } from 'react'
import styled from "styled-components";
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Badge from 'react-bootstrap/Badge'
import {
  UrbanistSemiBoldBlack172px,
  UrbanistNormalNewCar172px,
  UrbanistMediumBlack172px,
  UrbanistBoldWhite20px,
  UrbanistBoldBlack40px,
  ValignTextMiddle,
} from "../../styledMixins";
import SearchButton from './SearchButton';
import { formatTimeDateYear } from '../../lib/Util/format';
import { useRouter } from 'next/router';
import { useAppSelector } from '../../lib/hooks';
import ReactPaginate from 'react-paginate';
import { ProgressBar } from 'react-bootstrap';

function ProposalsContent(props) {
  const darkMode = useAppSelector(state => state.general.darkMode)
  const [query, setQuery] = useState("")

  const {
    proposalsData
  } = props;
  //console.log(proposalsData)

  const activeProposals = proposalsData?.data?.proposals?.map(proposal => {
    if (proposal.status === 'PROPOSAL_STATUS_VOTING_PERIOD' || proposal.status === 'PROPOSAL_STATUS_PASSED' || proposal.status === 'PROPOSAL_STATUS_REJECTED' || proposal.status === 'PROPOSAL_STATUS_FAILED') {
      return proposal
    }
  })

  const pendingProposals = proposalsData?.data?.proposals?.map(proposal => {
    if (proposal.status === 'PROPOSAL_STATUS_DEPOSIT_PERIOD') {
      return proposal
    }
  })

  const router = useRouter()
  return (
    <div className={darkMode ? 'dark-mode' : ''}>
      <Title className={darkMode ? 'dark-mode' : ''}>Proposals</Title>
      <Grid>
        <GridItem className={darkMode ? 'dark-mode' : ''}>
          <FlexBetween>
            <h5>#76</h5>
            <BadgeStatus>
              <Bullet />
              <BadgeText>VOTING PERIOD</BadgeText>
            </BadgeStatus>
          </FlexBetween>
          <h6>## Require a minimum 5% commission for all validator nodes</h6>
        

            <TableRow>
              <TableData style={{width: '110px'}}>Proposer</TableData>
              <TableData><b>dqo3jr...dqeqwx</b></TableData>
            </TableRow>
            <TableRow>
              <TableData>Voting start</TableData>
              <TableData>
                <b>2022-08-25 21:23:35</b>

              </TableData>
            </TableRow>
            <TableRow>
              <TableData>Voting end</TableData>
              <TableData>
                <b>2022-08-25 21:23:35</b>
              </TableData>
            </TableRow>
         
         
          <Flex>
            <div className="mt-3" style={{ width: "70%", borderRight: "1px solid #f3f3f3", paddingRight: "20px"}}>
            <ProgressBar style={{ height: "30px" }}>
            <ProgressBar striped variant="success" now={20} />
            <ProgressBar variant="danger" now={20} />
            <ProgressBar striped variant="warning" now={20} />
            <ProgressBar striped variant="info" now={20} />
          </ProgressBar>
            </div>
            <div className="ml-3">
              <b>Most voted on</b>
              <FlexMiddle>
                <Box style={{marginRight: '5px'}} />
                <div>
                  <span>No </span> 
                  <span>66.<span style={{fontSize: "12px"}}>83</span></span>
                </div>
              </FlexMiddle>
            </div>
          </Flex>
          
        </GridItem>
        <GridItem className={darkMode ? 'dark-mode' : ''}>
          <FlexBetween>
            <h5>#76</h5>
            <BadgeStatus>
              <Bullet />
              <BadgeText>VOTING PERIOD</BadgeText>
            </BadgeStatus>
          </FlexBetween>
          <h6>## Require a minimum 5% commission for all validator nodes</h6>
          <table>
            <TableRow>
              <TableData style={{ width: '110px' }}>Proposer</TableData>
              <TableData><b>dqo3jr...dqeqwx</b></TableData>
            </TableRow>
            <TableRow>
              <TableData>Voting start</TableData>
              <TableData>
                <b>2022-08-25 21:23:35</b>

              </TableData>
            </TableRow>
            <TableRow>
              <TableData>Voting end</TableData>
              <TableData>
                <b>2022-08-25 21:23:35</b>
              </TableData>
            </TableRow>
          </table>
          <Flex>
            <div className="mt-3" style={{ width: "70%", borderRight: "1px solid #f3f3f3", paddingRight: "20px" }}>
              <ProgressBar style={{ height: "30px" }}>
                <ProgressBar striped variant="success" now={20} />
                <ProgressBar variant="danger" now={20} />
                <ProgressBar striped variant="warning" now={20} />
                <ProgressBar striped variant="info" now={20} />
              </ProgressBar>
            </div>
            <div className="ml-3">
              <b>Most voted on</b>
              <FlexMiddle>
                <Box style={{ marginRight: '5px' }} />
                <div>
                  <span>No </span>
                  <span>66.<span style={{ fontSize: "12px" }}>83</span></span>
                </div>
              </FlexMiddle>
            </div>
          </Flex>

        </GridItem>
      </Grid>
          <SearchButton setQuery={setQuery} />
          <Responsive>
            <table className={darkMode ? 'w-100 mt-3 table table-responsive dark-mode' : 'w-100 mt-3 table table-responsive'}>
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
                {activeProposals?.filter(proposal => {
                  if (query === ' ') {
                    return proposal
                  } else if (proposal?.content?.title.toLowerCase().includes(query.toLocaleLowerCase())) {
                    return proposal
                  }
                })
                  .map((proposal) => (
                    <tr style={{ cursor: 'pointer' }} onClick={() => router.push(`/proposals/${proposal?.proposal_id}`)}>
                      <td>{proposal?.proposal_id}</td>
                      <td>{proposal?.content?.description ? proposal.content.title.slice(0, 40) + '....' : null}</td>
                      <td>{proposal.status === 'PROPOSAL_STATUS_PASSED' ? (<Badge bg="success">PASSED</Badge>) : proposal.status === 'PROPOSAL_STATUS_REJECTED' ? (<Badge bg="danger">REJECTED</Badge>) : proposal.status === 'PROPOSAL_STATUS_VOTING_PERIOD' ? (<Badge bg="info">VOTING PERIOD</Badge>) : (<Badge bg="warning">FAILED</Badge>)}</td>
                      <td>{formatTimeDateYear(proposal.voting_start_time)}</td>
                      <td>{formatTimeDateYear(proposal.voting_end_time)}</td>
                      <td>{proposal.total_deposit[0].amount + ' ' + proposal.total_deposit[0].denom}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </Responsive>
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >>"
            onPageChange={() => { }}
            pageRangeDisplayed={2}
            pageCount={20}
            previousLabel="<< previous"
            renderOnZeroPageCount={null}
            className="pagination"
          />
    </div>
  )
}

const FlexMiddle = styled.div`
  display: flex;
  align-items: center;
`;

const Box = styled.div`
  width: 10px;
  height: 10px;
  background: red;
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
  background: unset !important
`;

const BadgeStatus = styled.div`
    width: fit-content;
    background-color: rgba(0,177,253,.1);
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
`

const Bullet = styled.div`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 0.5rem;
    background: #00b1ff;
`

const Responsive = styled.div`
  width: 100%;
  overflow-x: auto;
  @media screen and (max-width: 1074px){
    width: calc(100vw - 10px);
  };
  @media (min-width: 1074px) and (max-width: 1334px){
    width: calc(100vw - 130px);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 20px;
  margin-bottom: 40px;
  margin-top: 20px;
   @media screen and (max-width: 1003px){
    grid-template-columns: auto;
  }
`;

const GridItem = styled.div`
  position: relative;
  display: block;
  box-shadow: 0px 7px 30px #0015da29;
  border-radius: 20px;
  margin-bottom:10px;
  padding: 20px;
  &.dark-mode{
    background-color:#19172d !important;
    box-shadow: 0px -1px 20px 0px #23232329 !important;
  }
`;



const Title = styled.h1`
  ${UrbanistBoldBlack40px}
  min-height: 48px;
  margin-top: 54px;
  letter-spacing: 0;
`;

const OverlapGroup13 = styled.div`
  width: 100%;
  margin-top: 14px;
  display: flex;
  flex-direction: column;
  padding: 27px 13px;
  align-items: center;
  min-height: 886px;
  background-color: var(--white);
  border-radius: 20px;
  box-shadow: 0px 7px 30px #0015da29;
`;


const ProposalHeading = styled.div`
  ${UrbanistSemiBoldBlack172px}
  align-self: flex-end;
  margin-top: 40px;
  display: flex;
  align-items: flex-start;
  min-width: 1292px;
`;

const ID = styled.div`
  ${ValignTextMiddle}
  height: 21px;
  align-self: flex-end;
  margin-bottom: 0;
  min-width: 30px;
  letter-spacing: 0;
`;

const Title1 = styled.div`
  ${ValignTextMiddle}
  height: 21px;
  margin-left: 48px;
  min-width: 34px;
  letter-spacing: 0;
`;

const Status = styled.div`
  ${ValignTextMiddle}
  height: 21px;
  margin-left: 404px;
  min-width: 50px;
  letter-spacing: 0;
`;

const VotingStart = styled.div`
  ${ValignTextMiddle}
  height: 21px;
  margin-left: 150px;
  min-width: 94px;
  letter-spacing: 0;
`;

const VotingEnd = styled.div`
  ${ValignTextMiddle}
  height: 21px;
  margin-left: 133px;
  min-width: 84px;
  letter-spacing: 0;
`;

const TotalDeposit = styled.div`
  ${ValignTextMiddle}
  height: 21px;
  align-self: flex-end;
  margin-left: 140px;
  min-width: 102px;
  letter-spacing: 0;
`;

const OverlapGroupContainer1 = styled.div`
  width: 1303px;
  height: 59px;
  position: relative;
  margin-top: 19px;
  margin-right: 1px;
`;

const OverlapGroup2 = styled.div`
  position: absolute;
  height: 60px;
  top: 0;
  left: 0;
  display: flex;
  padding: 16px 7px;
  justify-content: flex-end;
  align-items: center;
  min-width: 1303px;
  background-color: var(--titan-white);
`;

const Number = styled.div`
  ${UrbanistMediumBlack172px}
  min-height: 21px;
  margin-top: 0.72px;
  min-width: 20px;
  letter-spacing: 0;
`;

const TitleValue = styled.div`
  ${UrbanistNormalNewCar172px}
  min-height: 21px;
  margin-left: 59px;
  margin-top: 0.72px;
  min-width: 408px;
  letter-spacing: 0;
`;

const OverlapGroup3 = styled.div`
  height: 28px;
  align-self: flex-start;
  margin-left: 30px;
  display: flex;
  padding: 1.7px 16.5px;
  justify-content: flex-end;
  align-items: flex-start;
  min-width: 106px;
  background-color: var(--forest-green);
  border-radius: 12.52px;
`;

const SatusValue = styled.div`
  ${UrbanistBoldWhite20px}
  min-height: 24px;
  letter-spacing: 0;
`;

const VotingStartValue = styled.div`
  ${UrbanistMediumBlack172px}
  min-height: 21px;
  margin-left: 94px;
  margin-top: 0.72px;
  min-width: 142px;
  letter-spacing: 0;
`;

const VotingEndvalue = styled.div`
  ${UrbanistMediumBlack172px}
  min-height: 21px;
  margin-left: 87px;
  margin-top: 0.72px;
  min-width: 142px;
  letter-spacing: 0;
`;

const TotalDepositValue = styled.div`
  ${UrbanistMediumBlack172px}
  min-height: 21px;
  margin-left: 90px;
  margin-top: 0.72px;
  min-width: 89px;
  letter-spacing: 0;
`;

export default ProposalsContent