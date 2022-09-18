import React, { useState } from 'react'
import styled from "styled-components";
import Badge from 'react-bootstrap/Badge'
import {
  UrbanistBoldBlack40px,
} from "../../styledMixins";
import SearchButton from './SearchButton';
import { formatTimeDateYear, toDay } from '../../lib/Util/format';
import { useRouter } from 'next/router';
import { useAppSelector } from '../../lib/hooks';
import ReactPaginate from 'react-paginate';
import { ProgressBar } from 'react-bootstrap';
import { COIN, DENOM } from '../../lib/Util/constants';

function ProposalsContent(props) {

  const darkMode = useAppSelector(state => state.general.darkMode)
  const [currentPage, setCurrentPage] = useState(0);

  const [query, setQuery] = useState("")

  const {
    proposalsData
  } = props;

  const activeProposals = proposalsData?.proposals?.map(proposal => {
    if (proposal.status === 'PROPOSAL_STATUS_VOTING_PERIOD' || proposal.status === 'PROPOSAL_STATUS_PASSED' || proposal.status === 'PROPOSAL_STATUS_REJECTED' || proposal.status === 'PROPOSAL_STATUS_FAILED') {
      return proposal
    }
  })

  //get the first from data from the ative proposals
  const getFirstActiveProposals = activeProposals.slice(0, 4)


    //add pagination to signatures
    const PER_PAGE = 15;
    const offset = currentPage * PER_PAGE;
    const currentactiveProposals = activeProposals?.slice(offset, offset + PER_PAGE) 
    const pageCount = Math.ceil(activeProposals?.length / PER_PAGE);
    function handlePageClick({ selected: selectedPage }) {
      setCurrentPage(selectedPage);
    }

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
        
         <table>
          <thead>
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
            </thead>
            <tbody>
            <TableRow>
              <TableData>Voting end</TableData>
              <TableData>
                <b>2022-08-25 21:23:35</b>
              </TableData>
            </TableRow>
            </tbody>
         </table>

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
              <thead>
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
            </thead>
            <tbody>
            <TableRow>
              <TableData>Voting end</TableData>
              <TableData>
                <b>2022-08-25 21:23:35</b>
              </TableData>
            </TableRow>
            </tbody>
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
              <thead>
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
            </thead>
            <tbody>
            <TableRow>
              <TableData>Voting end</TableData>
              <TableData>
                <b>2022-08-25 21:23:35</b>
              </TableData>
            </TableRow>
            </tbody>
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
              <thead>
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
            </thead>
            <tbody>
            <TableRow>
              <TableData>Voting end</TableData>
              <TableData>
                <b>2022-08-25 21:23:35</b>
              </TableData>
            </TableRow>
            </tbody>
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
          {/*<SearchButton setQuery={setQuery} />*/}
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
                {currentactiveProposals?.filter(proposal => {
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
                      <td>{toDay(proposal.voting_start_time)}</td>
                      <td>{toDay(proposal.voting_end_time)}</td>
                      <td>{(proposal.total_deposit[0].amount/DENOM).toFixed(2)} {COIN}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </Responsive>
          {currentactiveProposals?.length !== 0 ? 
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
          /> : null }    
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

export default ProposalsContent