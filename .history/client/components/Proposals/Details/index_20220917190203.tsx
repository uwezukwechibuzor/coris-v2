import React, { useState } from 'react'
import styled from "styled-components";
import ProgressBar from 'react-bootstrap/ProgressBar';
import CardGroup from 'react-bootstrap/CardGroup';
import {
  UrbanistNormalBlack24px,
  UrbanistBoldWhite20px,
  UrbanistSemiBoldBlack24px,
  UrbanistBoldBlack40px,
  ValignTextMiddle,
} from "../../../styledMixins";
import { formatHash, formatTimeDateYear } from '../../../lib/Util/format';
import YesVoteOptions from './Votes/yes';
import NoVoteOptions from './Votes/No';
import VoteVoteOptions from './Votes/Veto';
import AbstainVoteOptions from './Votes/Abstain';
import Link from 'next/link';
import VetoVoteOptions from './Votes/Veto';
import { useAppSelector } from '../../../lib/hooks';
import { COIN } from '../../../lib/Util/constants';

function ProposalDetailsContents(props) {
  const darkMode = useAppSelector(state => state.general.darkMode)
  const {
    type,
    total,
    proposalDetails,
    proposalsVotingOptions,
    deposits
  } = props;
  console.log(props)
  const [selectedVoteView, setVoteView] = useState('yes')

 const proposal = proposalDetails !== undefined? proposalDetails : null


  const finalTallyResultSum = Number(proposal?.proposal?.final_tally_result?.yes) + Number(proposal?.proposal?.final_tally_result?.no) + Number(proposal?.proposal?.final_tally_result?.no_with_veto) + Number(proposal?.proposal?.final_tally_result?.abstain)
  //console.log(finalTallyResultSum)
  const tallyPercentage = (tallyResult: number) => ((tallyResult / finalTallyResultSum) * 100)

  const proposalDescription = proposal?.proposal?.content?.description.split('\\n\\n').map(str => <p>{str}</p>)
  
 //get depositors dedtails
 const depositDetails = deposits !== undefined? deposits?.deposits : null

  //proposals voting options
  const getVotingOptions = proposalsVotingOptions !== undefined? proposalsVotingOptions : null

  let voteOptionYes = []
  let voteOptionNo = []
  let voteOptionVeto = []
  let voteOptionAbstain = []
  getVotingOptions?.votes?.map(data => data.option === 'VOTE_OPTION_YES' ? voteOptionYes.push(data): data.option === 'VOTE_OPTION_NO' ? voteOptionNo.push(data) : data.option === 'VOTE_OPTION_NO_WITH_VETO' ? voteOptionVeto.push(data) : voteOptionAbstain.push(data)
  ) 
 

  return (
    <div className={darkMode ? 'dark-mode' : ''}>
      <Title className={darkMode ? 'dark-mode' : ''}>Proposal Details</Title>
      <Box className={darkMode ? 'dark-mode' : ''}>
        <span>{proposal?.proposal?.content?.title ? proposal?.proposal.content.title : null}</span>
        <Container>
          <Badge className={proposal?.proposal?.status === 'PROPOSAL_STATUS_PASSED' ? 'success' : proposal?.proposal?.status === 'PROPOSAL_STATUS_REJECTED' ? 'danger' : proposal?.proposal?.status === 'PROPOSAL_STATUS_VOTING_PERIOD' ? 'info' : 'warning'}>
            {proposal?.proposal?.status === 'PROPOSAL_STATUS_PASSED' ? "PASSED" : proposal?.proposal?.status === 'PROPOSAL_STATUS_REJECTED' ? "REJECTED" : proposal?.proposal?.status === 'PROPOSAL_STATUS_VOTING_PERIOD' ? "VOTING PERIOD" : "FAILED"}
          </Badge>
        </Container>
        <Container>
          <Flex style={{ marginTop: '10px' }}>
            <span>{type}</span>
            <Container style={{ marginLeft: '40px' }}><strong>
              {proposal?.proposal.content['@type']}
            </strong></Container>
          </Flex>
          <Flex style={{ marginTop: '10px' }}>
            <span>{total}</span>
            <Container style={{ marginLeft: '40px' }}><strong>{finalTallyResultSum? finalTallyResultSum : ''} {proposal?.proposal?.total_deposit ? proposal?.proposal?.total_deposit[0].denom : ''}</strong></Container>
          </Flex>
          <ProgressBar style={{ height: "30px" }}>
            <ProgressBar striped variant="success" now={proposal?.proposal? tallyPercentage(proposal?.proposal?.final_tally_result?.yes) : 0} key={1} label={proposal?.proposal? tallyPercentage(proposal?.proposal?.final_tally_result?.yes).toFixed(2) + '%' : 0} />
            <ProgressBar variant="danger" now={proposal?.proposal? tallyPercentage(proposal?.proposal?.final_tally_result?.no): 0} key={2} label={proposal?.proposal? tallyPercentage(proposal?.proposal?.final_tally_result?.no).toFixed(2) + '%': 0} />
            <ProgressBar striped variant="warning" now={proposal?.proposal? tallyPercentage(proposal?.proposal?.final_tally_result?.no_with_veto): 0} key={3} label={proposal?.proposal? tallyPercentage(proposal?.proposal?.final_tally_result?.no_with_veto).toFixed(2) + '%': 0} />
            <ProgressBar striped variant="info" now={proposal?.proposal? tallyPercentage(proposal?.proposal?.final_tally_result?.abstain): 0} key={4} label={proposal?.proposal? tallyPercentage(proposal?.proposal?.final_tally_result?.abstain).toFixed(2) + '%': 0} />
          </ProgressBar>
        </Container>
        <Container style={{ marginTop: "20px" }}>
          <Grid>
            <Container>
              <Flex>
                <Color className="first" />
                <strong style={{ marginLeft: "10px" }}>Yes</strong>
              </Flex>
              <div>{proposal?.proposal? tallyPercentage(proposal?.proposal?.final_tally_result?.yes).toFixed(2) + '%' : 0} ({proposal?.proposal?.final_tally_result?.yes ? proposal?.proposal.final_tally_result.yes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0}  {proposal?.proposal?.total_deposit ? proposal?.proposal.total_deposit[0].denom : ''})</div>
            </Container>
            <Container>
              <Flex>
                <Color className="second" />
                <strong style={{ marginLeft: "10px" }}>No</strong>
              </Flex>
              <div>{proposal?.proposal? tallyPercentage(proposal?.proposal?.final_tally_result?.no).toFixed(2) + '%' : 0} ({proposal?.proposal?.final_tally_result?.no ? proposal?.proposal.final_tally_result.no.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0} {proposal?.proposal.total_deposit ? proposal?.proposal.total_deposit[0].denom : ''})</div>
            </Container>
            <Container>
              <Flex>
                <Color className="third" />
                <strong style={{ marginLeft: "10px" }}>Veto</strong>
              </Flex>
              <div>{proposal?.proposal? tallyPercentage(proposal?.proposal?.final_tally_result?.no_with_veto).toFixed(2) + '%': 0} ({proposal?.proposal?.final_tally_result?.no_with_veto ? proposal?.proposal.final_tally_result.no_with_veto.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0} {proposal?.proposal?.total_deposit ? proposal?.proposal.total_deposit[0].denom : ''})</div>
            </Container>
            <Container>
              <Flex>
                <Color className="fourth" />
                <strong style={{ marginLeft: "10px" }}>Abstain</strong>
              </Flex>
              <div>{proposal?.proposal? tallyPercentage(proposal?.proposal?.final_tally_result?.abstain).toFixed(2) + '%': 0} ({proposal?.proposal?.final_tally_result?.abstain ? proposal?.proposal.final_tally_result.abstain.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0} {proposal?.proposal.total_deposit ? proposal?.proposal.total_deposit[0].denom : ''})</div>
            </Container>
          </Grid>
        </Container>
      </Box>

      <Box className={darkMode ? 'dark-mode' : ''} style={{ marginTop: "20px", padding: "20px" }}>
        <FlexBetween>
          <Container>Propser:</Container>
          <Container><strong className="text-info">
            <Link href='/account[address]' as={`/account/${proposal?.proposal?.content?.recipient}`} ><a>
            {proposal?.proposal?.content?.recipient ? proposal.proposal.content.recipient  : 'No Recipient'}
             </a></Link>
            </strong></Container>
        </FlexBetween>
        <FlexBetween>
          <Container>Total Deposit:</Container>
          <Container><strong>{proposal?.proposal.total_deposit ? proposal.proposal.total_deposit[0].amount/de : null} {COIN}</strong></Container>
        </FlexBetween>
        <FlexBetween>
          <Container>Voting Start</Container>
          <Container><strong>{proposal?.proposal?.voting_start_time ? formatTimeDateYear(proposal.proposal.voting_start_time) : null}</strong></Container>
        </FlexBetween>
        <FlexBetween>
          <Container>Voting End</Container>
          <Container><strong>{proposal?.proposal?.voting_end_time ? formatTimeDateYear(proposal.proposal.voting_end_time) : null}</strong></Container>
        </FlexBetween>
        <FlexBetween>
          <Container>Submit Time</Container>
          <Container><strong>{proposal?.proposal?.submit_time ? formatTimeDateYear(proposal?.proposal.submit_time) : null}</strong></Container>
        </FlexBetween>
        <FlexBetween>
          <Container>Deposit End Time</Container>
          <Container><strong>{proposal?.proposal?.deposit_end_time ? formatTimeDateYear(proposal?.proposal.deposit_end_time) : null}</strong></Container>
        </FlexBetween>
      </Box>

      <Box className={darkMode ? 'dark-mode' : ''} style={{ marginTop: "20px", padding: "20px" }}>
        <FlexBetween>
          <Container>Depositor</Container>
          <Container><strong className="text-info">Amount </strong></Container>
        </FlexBetween>
        {depositDetails?.map(data =>
        <FlexBetween>
          <Container>
          <Link href='/account[address]' as={`/account/${data.depositor}`} ><a>
            {data? data.depositor : null}
            </a></Link>
            </Container>
          <Container><strong>{data? data.amount[0].amount : null} {data? data.amount[0].denom : null}</strong></Container>
        </FlexBetween>
        )}
      </Box>
    
      <div className="my-3">
        <h4>Description</h4>
        <Box className={darkMode ? 'dark-mode' : ''}  style ={{width: "100%", wordBreak: 'break-all'}}>
          {proposalDescription ? proposalDescription : null}
        </Box>
      </div>
      {/* <DownBoard>
        continue work here to display Votes
      </DownBoard> */}

      <Card className={darkMode ? 'dark-mode' : ''}>
        <div className="w-100 p-3">
          <TabToggler className={darkMode ? 'dark-mode' : ''}>
            <TabTogglerItem
              className={`${selectedVoteView === 'yes' ? "active" : ''} ${darkMode ? 'dark-mode': '' }`}
              onClick={() => setVoteView('yes')}
            >Yes</TabTogglerItem>
            <TabTogglerItem
              onClick={() => setVoteView('no')}
              className={`${selectedVoteView === 'no' ? "active" : ''} ${darkMode ? 'dark-mode' : ''}`}
            >No</TabTogglerItem>
            <TabTogglerItem
              onClick={() => setVoteView('veto')}
              className={`${selectedVoteView === 'veto' ? "active" : ''} ${darkMode ? 'dark-mode' : ''}`}
            >Veto</TabTogglerItem>
            <TabTogglerItem
              onClick={() => setVoteView('abstain')}
              className={`${selectedVoteView === 'abstain' ? "active" : ''} ${darkMode ? 'dark-mode' : ''}`}
            >Abstain</TabTogglerItem>
          </TabToggler>
          {
            selectedVoteView === 'yes' ? (
             <YesVoteOptions {...voteOptionYes } />
            ) : selectedVoteView === 'no' ? (
             <NoVoteOptions {...voteOptionNo } />
              ) : selectedVoteView === 'veto' ? (
               <VetoVoteOptions {...voteOptionVeto} />
              ) : (
               <AbstainVoteOptions {...voteOptionAbstain} /> 
                ) 
          }

        </div>
      </Card>

    </div>
  )
}


const TabToggler = styled.div`
  background: #e9ebfe;
  border-radius: 10px;
  width: 400px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom:40px;
  cursor: pointer;
  @media screen and (max-width: 506px){
    flex-direction: column;
    width: 100%;
  }
  &.dark-mode{
    background: #0b0a15 !important;
  }
`

const TabTogglerItem = styled.div`
  diplay: flex; 
  align-items:center;
  justify-content: center;
  &.active{
    background: white;
    border-radius: 5px;
    padding: 10px;
    box-shadow: 0px 7px 8px 0px #9f9f9f;
  }
  @media screen and (max-width: 506px){
    padding: 10px 0px;
  }
  &.dark-mode.active{
    background: #19172d !important;
  }
  
`

const Card = styled.div`
  box-shadow: 0px 7px 30px #0015da29;
  border-radius: 20px;
  margin-bottom:40px;
  &.dark-mode{
    background-color:#19172d !important;
    box-shadow: 0px -1px 20px 0px #23232329 !important;
  }
`

const Responsive = styled.div`
  width: 100%;
  overflow-x: auto;
  @media screen and (max-width: 1075px){
    width: calc(100vw - 40px);
  }
`;

const FlexBetween = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`

const Bar = styled.div`
  display: flex;
  height: 34px;
  margin-top: 10px;
  border-radius: 5px;
  overflow: hidden;
`

const BarItemOne = styled.div`
  width: 50%;
  height: 100%;
  background: #16a82e;
`
const BarItemTwo = styled.div`
  width: 50%;
  height: 100%;
  background: #dd15e1;
`
const BarItemThree = styled.div`
  width: 25%;
  height: 100%;
  background: #4a15e1;
`
const BarItemFour = styled.div`
  width: 10%;
  height: 100%;
  background: #b815e1;
`

const Flex = styled.div`
  display: flex;
`

const Box = styled.div`
  border-radius: 20px;
  box-shadow: 0px 7px 30px #0015da29;
  width: 100%;
  padding: 20px 20px;
  word-break: break-all;
  &.dark-mode{
    background-color:#19172d !important;
    box-shadow: 0px -1px 20px 0px #23232329 !important;
  }
`

const Container = styled.div`
  display:block;
`

const Badge = styled.div`
  border-radius: 20px;
  display: inline-block;
  padding: 0px 10px;
  margin-top: 10px;
  color: white;
  &.success{
    background: #16A82E;
  }
  &.danger{
    background:#dc3545;
  }
  &.warning{
    background: #ffc107;
  }
  &.info{
    background: #0d6efd;
  }
`

const Grid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: auto auto auto auto;
  @media screen and (max-width: 764px){
    grid-template-columns: auto auto;
    grid-gap: 40px;
  }
`

const Color = styled.div`
  width: 25px;
  height: 25px;
  background: red;
  border-radius: 5px;
  &.first{
    background: #16A82E;
  }
  &.second{
    background: #dc3545;
  }
  &.third{
    background: #ffc107
  }
  &.fourth{
    background: #0d6efd;
  }
`










































const Title = styled.h1`
  ${UrbanistBoldBlack40px}
  min-height: 48px;
  margin-top: 54px;
  letter-spacing: 0;
`;

const FlexCol3 = styled.div`
  width: 1336px;
  margin-top: 14px;
  display: flex;
  flex-direction: column;
  padding: 31px 0;
  align-items: center;
  min-height: 430px;
  background-color: var(--white);
  border-radius: 20px;
  box-shadow: 0px 7px 30px #0015da29;
`;

const FlexCol4 = styled.div`
  width: 1304px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 260px;
`;

const TitleValue = styled.div`
  ${UrbanistNormalBlack24px}
  min-height: 29px;
  letter-spacing: 0;
`;

const OverlapGroup2 = styled.div`
  height: 28px;
  margin-top: 17px;
  display: flex;
  padding: 1.7px 16.5px;
  justify-content: flex-end;
  align-items: flex-start;
  min-width: 106px;
  background-color: var(--forest-green2);
  border-radius: 12.52px;
`;

const PASSED = styled.div`
  ${UrbanistBoldWhite20px}
  min-height: 24px;
  letter-spacing: 0;
  margin-left: -10px;
`;

const FlexRow1 = styled.div`
  margin-top: 15px;
  display: flex;
  align-items: flex-start;
  min-width: 233px;
`;

const Type = styled.div`
  ${ValignTextMiddle}
  ${UrbanistNormalBlack24px}
            height: 29px;
  min-width: 57px;
  letter-spacing: 0;
`;

const TextProposal = styled.div`
  ${ValignTextMiddle}
  ${UrbanistSemiBoldBlack24px}
            height: 29px;
  margin-left: 30px;
  letter-spacing: 0;
`;

const FlexRow2 = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: flex-start;
  min-width: 346px;
`;

const TypeValue = styled.div`
  ${ValignTextMiddle}
  ${UrbanistNormalBlack24px}
            height: 29px;
  min-width: 58px;
  letter-spacing: 0;
`;

const TextProposalValue = styled.div`
  ${ValignTextMiddle}
  ${UrbanistSemiBoldBlack24px}
            height: 29px;
  margin-left: 34px;
  letter-spacing: 0;
`;

const OverlapGroup4 = styled.div`
  width: 1304px;
  height: 64px;
  position: relative;
  margin-top: 33px;
  background-color: var(--forest-green);
  border-radius: 15px;
`;

const Rectangle93 = styled.div`
  position: absolute;
  width: 119px;
  height: 64px;
  top: 0;
  left: 1185px;
  background-color: var(--electric-violet);
  border-radius: 15px;
`;

const Rectangle92 = styled.div`
  position: absolute;
  width: 47px;
  height: 64px;
  top: 0;
  left: 1185px;
  background-color: var(--purple-heart);
`;

const Rectangle91 = styled.div`
  position: absolute;
  width: 47px;
  height: 64px;
  top: 0;
  left: 1165px;
  background-color: var(--hot-magenta);
`;

const FlexRow3 = styled.div`
  ${UrbanistSemiBoldBlack24px}
  align-self: flex-start;
  margin-top: 32px;
  margin-left: 16px;
  display: flex;
  align-items: center;
  min-width: 1231px;
`;

const Yes = styled.div`
  width: 34px;
  height: 34px;
  background-color: var(--forest-green);
  border-radius: 5px;
  margin-left: 40px;
`;


const No = styled.div`
  width: 34px;
  height: 34px;
  margin-left: 350px;
  background-color: var(--hot-magenta);
  border-radius: 5px;
`;

const Veto = styled.div`
  width: 34px;
  height: 34px;
  margin-left: 290px;
  background-color: var(--purple-heart);
  border-radius: 5px;
`;

const Abstain = styled.div`
  width: 34px;
  height: 34px;
  margin-left: 299px;
  background-color: var(--electric-violet);
  border-radius: 5px;
`;

const CorContainer = styled.div`
  ${UrbanistNormalBlack24px}
  margin-top: 11px;
  margin-right: 3px;
  display: flex;
  align-items: flex-start;
  min-width: 1291px;
`;

const YesValue = styled.div`
  ${ValignTextMiddle}
  height: 29px;
  min-width: 223px;
  letter-spacing: 0;
`;

const NoValue = styled.div`
  ${ValignTextMiddle}
  height: 29px;
  margin-left: 147px;
  min-width: 209px;
  letter-spacing: 0;
`;

const VetoValue = styled.div`
  ${ValignTextMiddle}
  height: 29px;
  margin-left: 177px;
  min-width: 200px;
  letter-spacing: 0;
`;

const AbstainValue = styled.div`
  ${ValignTextMiddle}
  height: 29px;
  margin-left: 90px;
  letter-spacing: 0;
`;

const DownBoard = styled.div`
  width: 1336px;
  height: 300px;
  margin-top: 16px;
  background-color: var(--white);
  border-radius: 20px;
  box-shadow: 0px 7px 30px #0015da29;
`;


export default ProposalDetailsContents