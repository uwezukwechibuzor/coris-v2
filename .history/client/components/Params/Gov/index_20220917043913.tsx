import React from 'react'
import styled from "styled-components";
import { periodsInDays } from '../../../lib/Util/format';
import { useAppSelector } from '../../../lib/hooks';

function GovParams(props) {

  const darkMode = useAppSelector(state => state.general.darkMode)
    
    const {
      govDepositParams,
      govTallyingParams,
      govVotingParams
      } = props;
  
    return (
        <>
         <GridItem>
          <FlexColumn>
            <span>Governance Parameters</span>
            <Card className={darkMode ? 'dark-mode w-100' : 'w-100'}>
              <FlexBetween>
                <span>Min Deposit</span>
                <strong>{govDepositParams?.deposit_params?.min_deposit ? govDepositParams?.deposit_params?.min_deposit[0]?.amount </strong>
              </FlexBetween>
              <FlexBetween>
                <span>Max Deposit Period</span>
                <strong>{govDepositParams?.deposit_params?.max_deposit_period ? periodsInDays(govDepositParams?.deposit_params.max_deposit_period) : null}</strong>
              </FlexBetween>
              <FlexBetween>
                <span>Quorom</span>
                <strong>{govTallyingParams?.tally_params?.quorum ?  govTallyingParams.tally_params.quorum * 100 + '%' : null}</strong>
              </FlexBetween>
              <FlexBetween>
                <span>Threshold</span>
                <strong>{govTallyingParams?.tally_params?.threshold ?  govTallyingParams.tally_params.threshold * 100 + '%' : null}</strong>
              </FlexBetween>
              <FlexBetween>
                <span>Veto Threshold</span>
                <strong>{govTallyingParams?.tally_params?.veto_threshold ?  govTallyingParams.tally_params.veto_threshold * 100 + '%' : null}</strong>
              </FlexBetween>
              <FlexBetween>
                <span>Voting Period</span>
                <strong>{govVotingParams?.voting_params?.voting_period ? periodsInDays(govVotingParams?.voting_params.voting_period) : null}</strong>
              </FlexBetween>
            </Card>
          </FlexColumn>
        </GridItem>
        </>
    )
}


const Grid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
  margin-bottom: 40px;
  @media screen and (max-width: 700px){
    grid-template-columns: repeat(1, 1fr);
  }
`
const GridItem = styled.div`
  display:block;
`
const Card = styled.div`
  box-shadow: 0px 7px 30px #0015da29;
  border-radius: 20px;
  height: 100%;
  margin-top: 10px;
  padding: 20px 10px;
  &.dark-mode{
    background-color:#19172d !important;
    box-shadow: 0px -1px 20px 0px #23232329 !important;
  }
`
const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`
const FlexBetween = styled.div`
  display: flex;
  justify-content:space-between;
  padding: 5px 0px;
`

export default GovParams