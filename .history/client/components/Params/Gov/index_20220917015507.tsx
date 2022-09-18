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

const MintDenom = styled.div`
  ${ValignTextMiddle}
  height: 29px;
  letter-spacing: 0;
`;

const InflationRateChange = styled.div`
  ${ValignTextMiddle}
  height: 29px;
  margin-top: 16px;
  letter-spacing: 0;
`;

const Percent1 = styled.div`
  ${ValignTextMiddle}
  height: 29px;
  margin-top: 16px;
  min-width: 44px;
  letter-spacing: 0;
`;

const Percent2 = styled.div`
  ${ValignTextMiddle}
  height: 29px;
  margin-top: 16px;
  min-width: 43px;
  letter-spacing: 0;
`;

const FlexRow2 = styled.div`
  height: 318px;
  margin-left: 16px;
  display: flex;
  padding: 31px 16px;
  align-items: flex-start;
  min-width: 660px;
  background-color: var(--white);
  border-radius: 20px;
  box-shadow: 0px 7px 30px #0015da29;
`;

const FlexCol5 = styled.div`
  ${UrbanistNormalBlack24px}
  width: 204px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 254px;
`;

const FlexCol6 = styled.div`
  ${UrbanistSemiBoldBlack24px}
  width: 148px;
  margin-left: 276px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  min-height: 254px;
`;

const Address1 = styled.div`
  ${ValignTextMiddle}
  height: 29px;
  min-width: 148px;
  letter-spacing: 0;
`;

const Address2 = styled.div`
  ${ValignTextMiddle}
  height: 29px;
  margin-top: 16px;
  min-width: 71px;
  letter-spacing: 0;
`;

export default GovParams