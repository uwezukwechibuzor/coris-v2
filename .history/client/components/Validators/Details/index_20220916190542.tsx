import React from "react";
import Title from "./Title"
import styled from "styled-components";
import { formatTime, formatTimeDateYear, getPercentageOfValidatorsBondedTokens, getValidatorsLogoFromWebsites, roundValidatorsVotingPowerToWholeNumber } from "../../../lib/Util/format";
import Link from "next/link";
import UndelegationsContent from "./Undelegations";
import DelegationsContent from "./Delegation";
import { useState } from "react";
import { sha256 } from "@cosmjs/crypto";
import { Bech32, fromBase64, fromBech32, fromHex, toBech32, toHex } from "@cosmjs/encoding";
import Badge from 'react-bootstrap/Badge';
import { OverlayTrigger, ProgressBar } from "react-bootstrap";
import { useAppSelector } from "../../../lib/hooks";
import CopyClip from "./CopyClip";
import { DENOM } from "../../../lib/Util/constants";


function ValidatorsDetailsContent(props) {
  const darkMode = useAppSelector(state => state.general.darkMode)
  const {
    getValidatorDetails,
    getUptimeByBlocksHeights,
    chainValidatorsSlashingInfo,
    chainValidatorDelegations,
    chainValidatorUnDelegations,
    poolData
  }  = props

  const [selectedDelegations, setDelegationPage] = useState('delegations')

  const validatorsDetails =  getValidatorDetails?.validator !== undefined?  getValidatorDetails?.validator: null
  


//get operator Address, Hex Address and Account Address
 let operatorAddress, accountAddress, hexAddress, bech32Address
try {
   //convert operator address to valcons address from validators query using consensus pubkey
   //check if query is still fetching and if still fetching, set to empty string
  const consensusPubkey = validatorsDetails?.consensus_pubkey?.key !== undefined ?  validatorsDetails?.consensus_pubkey?.key : ''
  const ed25519PubkeyRaw = fromBase64(consensusPubkey);
  const addressData = sha256(ed25519PubkeyRaw).slice(0, 20);
  bech32Address = Bech32.encode("cosmosvalcons", addressData);

  operatorAddress = validatorsDetails?.operator_address !== undefined? validatorsDetails?.operator_address : " "

  accountAddress = toBech32("cosmos", fromHex(toHex(fromBech32(operatorAddress).data)))
  
  hexAddress = toHex(fromBech32(bech32Address).data)
  
} catch (error) {
   //console.log(error)
}

//get missed Blocks  && validators signing info
const missedBlocks = chainValidatorsSlashingInfo !== undefined? chainValidatorsSlashingInfo?.val_signing_info?.missed_blocks_counter : null


//uptimeByBlocksHeights
const convertedSignatures = getUptimeByBlocksHeights?.map(data => {
  const convertedSigs = data.signatures?.map(sig => {
    return toBech32("cosmosvalcons", fromHex(sig?.validator_address))
  })
  return convertedSigs;
})
//check if validator address contained in the signatures equals bech32Address
let totalSignedBlocks = 0
let totalBlocks = 0
const getUptime = convertedSignatures.map((sigs, index) => {
   totalBlocks++
  if (!sigs?.includes(bech32Address)) {
    return {noUpTime:getUptimeByBlocksHeights[index]}
  }
  totalSignedBlocks++
  return {upTime:getUptimeByBlocksHeights[index]}
})
 

//get the percentage from total signed blocks and total blocks
const percentageOfValidatorUptime = totalBlocks != 0 && totalSignedBlocks != 0? totalSignedBlocks/totalBlocks*100 : 0
  
  //delegators shares
  const delegatorsShares = (validatorsDetails?.delegator_shares / DENOM).toFixed(2)

  //get total bonded tokens
  const bondedTokens = poolData?.pool?.bonded_tokens
  const percentageofVotingPower: number = getPercentageOfValidatorsBondedTokens(validatorsDetails?.tokens, bondedTokens)

  //get validatorsDelegations and pass to delegation component and relegation to get fetch the delegators address
  let validatorsDelegations, unDelegations
  try {
    validatorsDelegations =  chainValidatorDelegations
    //get UnDelegations and pass to delegation component
    unDelegations =  chainValidatorUnDelegations
    
  } catch(error) {

  }
  
  return (
    <div className={darkMode ? 'dark-mode' : ''}>
      <Title className={darkMode ? 'dark-mode' : ''}>Validator Details</Title>
      <Grid>
        <GridItemOne className={darkMode ? 'dark-mode' : ''}>
          <div className="d-table w-100">
            <div className="d-row w-100">
              <FlexCenter style={{ marginTop: "20px" }}>
                <FlexColumn>
                  <FlexXCenter>
                    <img width={25} src={getValidatorsLogoFromWebsites(validatorsDetails?.description?.website)} alt="" />
                  </FlexXCenter>
                  <FlexXCenter style={{ marginTop: '20px' }}>
                    <h5>{validatorsDetails?.description?.moniker}</h5>
                  </FlexXCenter>
                  <FlexXCenter>
                    <small><a>{validatorsDetails?.description?.website}</a></small>
                  </FlexXCenter>
                </FlexColumn>
              </FlexCenter>
            </div>
            <div className="d-row w-100">
              <FlexCenter>
                <FlexColumn>
                  <FlexXCenter style={{ padding: '20px' }}>
                    <span style={{ textAlign: 'center' }}>{validatorsDetails?.description?.details}</span>
                  </FlexXCenter>
                </FlexColumn>
              </FlexCenter>
            </div>
          </div>
        </GridItemOne>
        <GridItemTwo className={darkMode ? 'dark-mode' : ''}>
          <FlexXCenter className="h-100 w-100" style={{ alignItems: "center" }}>
            <FlexColumn style={{ width: '25%' }}>
              <h5>{validatorsDetails?.status === undefined ? null : validatorsDetails?.status === 'BOND_STATUS_BONDED' ?  <p className="active">Active</p> : <p className="inActive">InActive</p>}
              </h5>
              <span>Status</span>
            </FlexColumn>
            <FlexColumn style={{ width: '25%' }}>
              <h5>{validatorsDetails?.jailed === undefined ? null: validatorsDetails?.jailed === false ?  <p className="active">No</p> : <p className="inActive">Yes</p>}</h5>
              <span>In Jail</span>
            </FlexColumn>
            <FlexColumn >
              <h5>{percentageOfValidatorUptime+'%'}</h5>
              <span>Uptime</span>
            </FlexColumn>
          </FlexXCenter>
        </GridItemTwo>
        <GridItemThree className={darkMode ? 'dark-mode' : ''}>
          <Flex className="w-100 h-100">
            <FlexCenter className="w-50">
            {percentageofVotingPower? percentageofVotingPower.toFixed(2)+'%' : null}
            </FlexCenter>
            <FlexCenter className="w-50">
              <FlexColumn>
                <span>Voting Power</span>
                <h5>{validatorsDetails?.tokens? roundValidatorsVotingPowerToWholeNumber(validatorsDetails?.tokens) : null}</h5>
                <OverlayTrigger  overlay={<Tooltip id="tooltip-disabled">{percentageofVotingPower.toFixed(2)+'%'}</Tooltip>}>
                  <ProgressBar animated   now={percentageofVotingPower} />
                </OverlayTrigger>
                <
              </FlexColumn>
            </FlexCenter>
          </Flex>
      
        </GridItemThree>
        <GridItemFour className={darkMode ? 'dark-mode' : ''}>
          <FlexColumn>
            <FlexCenter className="p-3">
              <div>Commission</div>
            </FlexCenter>
            <div>
              <FlexBetween className="px-3 pt-3">
                <div>Commission</div>
                <strong>{validatorsDetails?.commission?.commission_rates? validatorsDetails?.commission?.commission_rates?.rate *100+'%' : null}</strong>
              </FlexBetween>
              <FlexBetween className="px-3 pt-3">
                <div>Max Rate</div>
                <strong>{validatorsDetails?.commission?.commission_rates? validatorsDetails?.commission?.commission_rates?.max_rate*100+'%' : null}</strong>
              </FlexBetween>
              <FlexBetween className="px-3 pt-3">
                <div>Max Change Rate</div>
                <strong>{validatorsDetails?.commission?.commission_rates? validatorsDetails?.commission?.commission_rates?.max_change_rate*100+'%' : null}</strong>
              </FlexBetween>
              <FlexBetween className="px-3 pt-3">
                <div>Updated</div>
                <strong>{validatorsDetails?.commission? formatTime(validatorsDetails?.commission?.update_time): null}</strong>
              </FlexBetween>
            </div>
          </FlexColumn>
        </GridItemFour>
        <GridItemFive className={darkMode ? 'dark-mode' : ''}>
          <FlexColumn>
            <FlexCenter className="p-3">
              <div>Bonded</div>
            </FlexCenter>
            <div>
              <FlexBetween className="px-3 pt-3">
                <div>Bonded</div>
                <strong>{validatorsDetails? validatorsDetails?.min_self_delegation : null}</strong>
              </FlexBetween>
              <FlexBetween className="px-3 pt-3">
                <div>Delegator Shares</div>
                <strong>{validatorsDetails? delegatorsShares : null}</strong>
              </FlexBetween>
              <FlexBetween className="px-3 pt-3">
                <div>Bonded Height</div>
                <strong>{validatorsDetails? validatorsDetails?.unbonding_height : null}</strong>
              </FlexBetween>
            </div>
          </FlexColumn>
        </GridItemFive>
        <GridItemSix className={darkMode ? 'dark-mode' : ''}>
          <FlexColumn>
            <FlexCenter className="p-3">
              <div>Addresses</div>
            </FlexCenter>
            <FlexColumn className='p-3'>
              <FlexColumn>
                <strong>Account</strong>
                <Flex>
                  <span>{accountAddress}</span>
                  <CopyClip value={accountAddress} />
                </Flex>
              </FlexColumn>
              <FlexColumn>
                <strong>Operator</strong>
                <Flex>
                  <span>{operatorAddress}</span>
                  <CopyClip value={operatorAddress} />
                </Flex>
              </FlexColumn>
              <FlexColumn>
                <strong>Consensus</strong>
                <Flex>
                  <span>{bech32Address}</span>
                  <CopyClip value={bech32Address} />
                </Flex>
              </FlexColumn>
              <FlexColumn>
                <strong>Hex</strong>
                <Flex>
                  <span>{hexAddress}</span>
                  <CopyClip value={hexAddress} />
                </Flex>
              </FlexColumn>
            </FlexColumn>
          </FlexColumn>
        </GridItemSix>
        <GridItemSeven className={darkMode ? 'dark-mode' : ''}>
          <FlexColumn>
            <Flex className="p-3">
              <div>Uptime by 100 latest blocks</div>
              <div style={{marginLeft: '20px'}}>Missed Blocks <Badge  bg="danger">{missedBlocks}</Badge></div>
            </Flex>
            <BlockGrid>
               {getUptime.map(data =>
               <Link href='/blocks[height]' as={`/blocks/${data.upTime?.height || data.noUpTime?.height}`} ><a>
              <Block className={data.upTime?.height? 'bg-success' : data.noUpTime?.height?  'bg-danger': null} >
                <Tooltip>
                  <strong>Height:</strong>
                  <br />
                  <strong>{data.upTime?.height || data.noUpTime?.height }</strong>
                  <br />
                  <strong style={{ color: "#50df50" }}>Signed: </strong>
                  <br />
                  <strong>{data.upTime?.height? 'Success' : data.noUpTime?.height? <p className="text-danger" >Failed</p> : null}</strong>
                </Tooltip>
              </Block>
              </a></Link>
           )}
            </BlockGrid>
          </FlexColumn>
        </GridItemSeven>
      </Grid>
      <br />
      <h5>Delegations</h5>
      <Card className={darkMode ? 'dark-mode' : ''}>
        <div className="w-100 p-3">
          <TabToggler className={darkMode ? 'dark-mode' : ''}>
            <TabTogglerItem
              className={`${selectedDelegations === 'delegations' ? "active" : ''} ${darkMode ? 'dark-mode': '' }`}
              onClick={() => setDelegationPage('delegations')}
            >Delegations</TabTogglerItem>
            <TabTogglerItem
              onClick={() => setDelegationPage('underdelegations')}
              className={`${selectedDelegations === 'underdelegations' ? "active" : ''} ${darkMode ? 'dark-mode': '' }`}
            >Undelegations</TabTogglerItem>
           </TabToggler>
          {
            selectedDelegations === 'delegations' ? (

            <DelegationsContent {...validatorsDelegations} />

            )  : (
              <UndelegationsContent {...unDelegations} />
                          
              )
          }
        </div>
      </Card>
      <style jsx>{`
           .inActive {
           color: red;
           }
           .active {
           color: green;
           }
           .uptime {
            background: green
           }
           .noUptime {
            background: red
           }
         `}</style>
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
const BlockGrid = styled.div`
  display: flex !important;
  flex-wrap: wrap;
`
const Tooltip = styled.div`
  width: 80px;
  height: 90px;
  background: #324239;
  display: none;
  transform: translate(-35%, -110%);
  border-radius: 10px;
  color: white;
  font-size: 12px;
  padding: 3px;
  text-align: center;
`
const Block = styled.div`
  width: 18px;
  height: 18px;
  background: #48bb78;
  margin: 5px;
  cursor: pointer;
  border-radius: 3px;
  position: relative;
  &:hover ${Tooltip} {
    display: block
  }
`
const Flex = styled.div`
  display: flex;
`
const FlexBetween = styled.div`
  display: flex;
  justify-content: space-between;
`
const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`
const FlexXCenter = styled.div`
  display: flex;
  justify-content: center;
`
const ImageContainer = styled.div`
  display: flex;
  align-items:center;
  justify-content:center;
  border-radius: 50%;
  background: red;
  width: 90px;
  height: 90px;
  background-color: #5e2bca;
`

const FlexCenter = styled.div`
  display: flex;
  align-items:center !important;
  justify-content: center;
`
const Grid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
  @media screen and (max-width: 906px){
    
  }
`
const GridItemOne = styled.div`
  box-shadow: 0px 7px 30px #0015da29;
  border-radius: 20px;
  grid-column: 1 / span 2;
  grid-row: 1 / 3;
  @media screen and (max-width: 906px){
    grid-column: 1 / span 4;
  }
  @media screen and (max-width: 625px){
    grid-column: 1 / span 4;
  }
  &.dark-mode{
    background-color:#19172d !important;
    box-shadow: 0px -1px 20px 0px #23232329 !important;
  }
`

const GridItemTwo = styled.div`
  box-shadow: 0px 7px 30px #0015da29;
  border-radius: 20px;
  grid-column: 3 / span 2;
  height: 150px;
  @media screen and (max-width: 906px){
    grid-column: 1 / span 2;
    grid-row: 3 / span 1;
  }
  @media screen and (max-width: 625px){
    grid-column: 1 / span 4;
  }
  &.dark-mode{
    background-color:#19172d !important;
    box-shadow: 0px -1px 20px 0px #23232329 !important;
  }
`

const GridItemThree = styled.div`
  box-shadow: 0px 7px 30px #0015da29;
  border-radius: 20px;
  grid-column: 3 / span 2;
  height: 150px;
   @media screen and (max-width: 906px){
    grid-column: 3 / span 2;
    grid-row: 3 / span 1;
  }
  @media screen and (max-width: 625px){
    grid-column: 1 / span 4;
    grid-row: 4 / span 1;
  }
  &.dark-mode{
    background-color:#19172d !important;
    box-shadow: 0px -1px 20px 0px #23232329 !important;
  }
`

const GridItemFour = styled.div`
  box-shadow: 0px 7px 30px #0015da29;
  border-radius: 20px;
  grid-column: 1 / span 1;
  grid-row: 3 / 6;
  @media screen and (max-width: 906px){
    grid-column: 1 / span 2;
    grid-row: 4 / 7;
    height: fit-content;
    padding-bottom: 20px;
    @media screen and (max-width: 625px){
      grid-column: 1 / span 4;
      grid-row: 5 / span 1;
    }
  }
  &.dark-mode{
    background-color:#19172d !important;
    box-shadow: 0px -1px 20px 0px #23232329 !important;
  }
`

const GridItemFive = styled.div`
  box-shadow: 0px 7px 30px #0015da29;
  border-radius: 20px;
  grid-column: 2 / span 1;
  grid-row: 3 / 6;
  @media screen and (max-width: 906px){
    grid-column: 3 / span 2;
    grid-row: 4 / 7;
    height: fit-content;
    padding-bottom: 20px;
  }
  @media screen and (max-width: 625px){
    grid-column: 1 / span 4;
    grid-row: 6 / span 1;
  }
  &.dark-mode{
    background-color:#19172d !important;
    box-shadow: 0px -1px 20px 0px #23232329 !important;
  }
`

const GridItemSix = styled.div`
  box-shadow: 0px 7px 30px #0015da29;
  border-radius: 20px;
  grid-column: 3 / span 2;
  grid-row: 3 / 6;
  height: 300px;
  @media screen and (max-width: 906px){
    grid-column: 1 / span 4;
    grid-row: 7 /span 6;
    height: fit-content;
    padding-bottom: 20px;
  }
  @media screen and (max-width: 625px){
    grid-column: 1 / span 4;
    grid-row: 7 / span 1;
  }
  &.dark-mode{
    background-color:#19172d !important;
    box-shadow: 0px -1px 20px 0px #23232329 !important;
  }
`

const GridItemSeven = styled.div`
  box-shadow: 0px 7px 30px #0015da29;
  border-radius: 20px;
  grid-column: 1 / span 4;
  padding: 20px;
  &.dark-mode{
    background-color:#19172d !important;
    box-shadow: 0px -1px 20px 0px #23232329 !important;
  }
`

export default ValidatorsDetailsContent