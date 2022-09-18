import React, { useState } from "react";
import { getPercentageOfValidatorsBondedTokens, getValidatorsLogoFromWebsites, roundValidatorsVotingPowerToWholeNumber, sortValidatorsByVotingPower } from "../../../lib/Util/format"
import styled from "styled-components";
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import {
  UrbanistNormalNewCar172px,
  UrbanistNormalBlack172px,
  UrbanistMediumAbsoluteZero172px,
  UrbanistBoldBlack40px
} from "../../../styledMixins";
import SearchButton from "../SearchButton";
import Link from "next/link";
import { Router, useRouter } from "next/router";

function ConsensusDetails(props) {
  const [query, setQuery] = useState("")

  const {
    validators,
    totalBondedTokens,
    consensusState
  } = props;

  let activeVal = []
  var activeValidatorsData = validators?.map((data) => {
    if (data.status === 'BOND_STATUS_BONDED') {
       activeVal.push(data)
    }
  })
     
  let consensus = []
  consensusState?.result?.round_state?.height_vote_set.map((data) => {
            
        let preVotes = []
        data?.prevotes.map((details, i) => preVotes.push(details))

        consensus = data?.precommits?.map((details, i ) => {
       return [activeVal[i], preVotes[i], details]
       })
       
  })

  consensus.map(d => {
    return d.map(y => {
        console.log(y[0])
    })
  })


  var inActiveValidatorsData = validators?.map((data) => {
    if (data.status === 'BOND_STATUS_UNBONDED' || data.status === 'BOND_STATUS_UNBONDING') {
      return data
    }
  })

  //sort by voting power
  sortValidatorsByVotingPower(activeValidatorsData)
  sortValidatorsByVotingPower(inActiveValidatorsData)

  //declare cumulative shares for both active and inactive validators
  let activeValidatorsCumulativeShare: number = 0
  let inActiveValidatorsCumulativeShare: number = 0
   


  const router = useRouter()

  return (
    <>
      <Title>Validators</Title>
      <div>
        <Tabs defaultActiveKey="active" id="uncontrolled-tab-example" className="" variant="tabs">
          <Tab eventKey="active" title="Active" className="w-100">
            <Responsive>
              <table className="w-100 mt-3 table table-responsive">
                <thead>
                  <tr style={{ fontWeight: "bold" }}>
                    <th>Rank</th>
                    <th>Validator</th>
                    <th>Voting Power</th>
                    <th>Cummulative Share</th>
                    <th>Pre-Vote</th>
                    <th>Pre-Commit</th>
                  </tr>
                </thead>
                <tbody>
                {consensus?.map((details, index) => {
                        return details?.map((data, i) => {
                        if (data !== undefined) {
                            //console.log(details[index], i, index)
                      var percentageOfVotingPower: number = getPercentageOfValidatorsBondedTokens(data[index]?.tokens, totalBondedTokens)

                      activeValidatorsCumulativeShare += percentageOfVotingPower
                      
                      return (
                        <tr className="validator-item-row" onClick={() => router.push(`/validators/${data[index].operator_address}`)} >
                          <td>{i + 1}</td>
                          <td>
                            <Flex>
                              <FlexMiddle>
                                <img className="img" src={data? getValidatorsLogoFromWebsites(data[index]?.description?.website): null} alt="" />
                              </FlexMiddle>
                              <FlexMiddle>
                                {data[index]?.description?.moniker}
                              </FlexMiddle>
                            </Flex>
                          </td>
                          <td>
                            {data[index]?.tokens? roundValidatorsVotingPowerToWholeNumber(data[index]?.tokens): 0}
                            <div style={{color: 'red'}} className="sub">{data[index]?.tokens? percentageOfVotingPower.toFixed(2) + '%': 0}</div>
                          </td>
                          <td>{data[index]?.tokens? activeValidatorsCumulativeShare.toFixed(2) + '%' : 0}</td>
                          <td>{data[1] === 'nil-Vote'? <img src="https://img.icons8.com/color/20/000000/cancel--v1.png"/> : <img src="https://img.icons8.com/fluency/20/000000/ok.png"/> }</td>
                          <td>{data[2] === 'nil-Vote'? <img src="https://img.icons8.com/color/20/000000/cancel--v1.png"/> : <img src="https://img.icons8.com/fluency/20/000000/ok.png"/> }</td>
                        </tr>
                     )
                    }
                  })
                })
                }
                </tbody>
              </table>
            </Responsive>
          </Tab>
          <Tab eventKey="inactive" title="InActive">
            <Responsive>
              <table className="w-100 mt-3">
              <thead>
                <tr style={{ fontWeight: "bold" }}>
                  <th>Rank</th>
                  <th>Validator</th>
                  <th>Voting Power</th>
                  <th>Cummulative Share</th>
                  <th>Pre-Vote</th>
                  <th>Pre-Commit</th>
                </tr>
              </thead>
              <tbody>
                {inActiveValidatorsData?.filter(data => {
                  //if Query does not exist
                  if (query === ' ') {
                    return data;
                  } else if (data?.description?.moniker.toLowerCase().includes(query.toLocaleLowerCase())) {
                    return data
                  }
                })
                  .map((data, index) => {
                    var percentageOfVotingPower: number = getPercentageOfValidatorsBondedTokens(data?.tokens, totalBondedTokens)

                    inActiveValidatorsCumulativeShare += percentageOfVotingPower
                    const commission = data?.commission?.commission_rates?.rate * 100

                    return (
                      <tr className="validator-item-row" onClick={() => router.push(`/validators/${data.operator_address}`)} >
                        <td>{index + 1}</td>
                        <td>
                          <Flex>
                            <FlexMiddle>
                              <img className="img" src={getValidatorsLogoFromWebsites(data?.description?.website)} alt="" />
                            </FlexMiddle>
                            <FlexMiddle>
                              {data?.description?.moniker}
                            </FlexMiddle>
                          </Flex>
                        </td>
                        <td>
                          {roundValidatorsVotingPowerToWholeNumber(data?.tokens)}
                          <div style={{color: "red"}} className="sub">{percentageOfVotingPower.toFixed(2) + '%'}</div>
                        </td>
                        <td>{inActiveValidatorsCumulativeShare.toFixed(2) + '%'}</td>
                        <td className="text-danger"><img src="https://img.icons8.com/color/20/000000/cancel--v1.png"/></td>
                        <td className="text-danger"><img src="https://img.icons8.com/color/20/000000/cancel--v1.png"/></td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
            </Responsive>
            
          </Tab>
        </Tabs>
      </div>
    </>
  );
}


const Flex = styled.div`
  display: flex;
`;

const FlexMiddle = styled.div`
  display: flex;
  align-items:center;
  margin-left: 10px
`;

const ValidatorTitleData = {
  rank: "Rank",
  validator: "Validator",
  votingPower: "Voting Power",
  cumulativeshare: "Cumulative Share",
  commission: "Commission",
  uptime: "Uptime",
};

const Title = styled.h1`
  ${UrbanistBoldBlack40px}
  min-height: 48px;
  min-width: 112px;
  letter-spacing: 0;
  margin-top: 30px
`;

const Validators = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 18.2px 16px;
  align-items: flex-start;
  min-height: 797px;
  background-color: var(--white);
  border-radius: 20px;
  box-shadow: 0px 7px 30px #0015da29;
`;

const OverlapGroup10 = styled.div`
  height: 60px;
  margin-top: 19px;
  display: flex;
  padding: 13.8px 14.6px;
  align-items: center;
  min-width: 1303px;
  background-color: var(--titan-white);
`;

const RankValue = styled.div`
  ${UrbanistMediumAbsoluteZero172px}
  min-height: 21px;
  margin-top: 0.33px;
  min-width: 74px;
  letter-spacing: 0;
`;

const ValidatorValue = styled.div`
  ${UrbanistNormalBlack172px}
  min-height: 21px;
  margin-left: 1px;
  margin-top: 0.33px;
  min-width: 167px;
  letter-spacing: 0;
`;

const Voting = styled.div`
  ${UrbanistNormalNewCar172px}
  min-height: 21px;
  margin-left: 300px;
  margin-top: 0.33px;
  min-width: 99px;
  letter-spacing: 0;
`;

const CumulativeShare = styled.div`
  ${UrbanistNormalBlack172px}
  min-height: 21px;
  margin-left: 220px;
  margin-top: 0.33px;
  min-width: 9px;
  letter-spacing: 0;
`;

const Commission = styled.div`
  ${UrbanistNormalBlack172px}
  min-height: 21px;
  margin-left: 100px;
  margin-top: 0.33px;
  min-width: 51px;
  letter-spacing: 0;
`;

const Delegate = styled.div`
  ${UrbanistNormalBlack172px}
  min-height: 21px;
  margin-left: 90px;
  margin-top: 0.33px;
  min-width: 51px;
  letter-spacing: 0;
  color: blue;
`;

const Responsive = styled.div`
  width: 100%;
  overflow-x: auto;
  @media screen and (max-width: 1075px){
    width: calc(100vw - 40px);
  }
`;


export default ConsensusDetails