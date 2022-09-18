import React from 'react'
import styled from "styled-components";
import {
  UrbanistNormalBlack24px,
  UrbanistSemiBoldBlack24px,
  ValignTextMiddle,
} from "../../../styledMixins";
import { periodsInDays } from '../../../lib/Util/format';

function GovParams(props) {
    const {
        minDeposit,
        name1,
        quorom,
        threshold,
        vetoThreshold,
        votingPeriod,
        govVotingParamsData,
        govDepositParamsData,
        govTallyingParamsData 
      } = props;
  
    return (
        <>
         <GridItem>
          <FlexColumn>
            <span>Governance Parameters</span>
            <Card className={darkMode ? 'dark-mode w-100' : 'w-100'}>
              <FlexBetween>
                <span>Min Deposit</span>
                <strong>{getGovDepositParams?.data?.deposit_params?.min_deposit ? getGovDepositParams?.data?.deposit_params?.min_deposit[0]?.amount + '' + getGovDepositParams?.data?.deposit_params?.min_deposit[0]?.denom : null}</strong>
              </FlexBetween>
              <FlexBetween>
                <span>Max Deposit Period</span>
                <strong>{getGovDepositParams?.data?.deposit_params?.max_deposit_period ? periodsInDays(getGovDepositParams.data.deposit_params.max_deposit_period) : null}</strong>
              </FlexBetween>
              <FlexBetween>
                <span>Quorom</span>
                <strong>{getGovDepositParams?.data?.tally_params?.quorum ? getGovDepositParams.data.tally_params.quorum * 100 + '%' : null}</strong>
              </FlexBetween>
              <FlexBetween>
                <span>Threshold</span>
                <strong>{getGovDepositParams?.data?.tally_params?.threshold ? getGovDepositParams.data.tally_params.threshold * 100 + '%' : null}</strong>
              </FlexBetween>
              <FlexBetween>
                <span>Veto Threshold</span>
                <strong>{getGovDepositParams?.data?.tally_params?.veto_threshold ? getGovDepositParams.data.tally_params.veto_threshold * 100 + '%' : null}</strong>
              </FlexBetween>
              <FlexBetween>
                <span>Voting Period</span>
                <strong>{getGovDepositParams?.data?.voting_params?.voting_period ? periodsInDays(getGovDepositParams.data.voting_params.voting_period) : null}</strong>
              </FlexBetween>
            </Card>
          </FlexColumn>
        </GridItem>
        </>
    )
}



export default GovParams