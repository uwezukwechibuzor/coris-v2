import  React, { useState } from "react";
import styled from "styled-components";
import { useGetChainRedelegationsQuery } from "../../../lib/chainApi";
import {
  UrbanistNormalNewCar172px,
  UrbanistMediumAbsoluteZero172px, 
 ValignTextMiddle
} from "../../../styledMixins";
import { formatHash } from "../../../lib/Util/format";

function RedelegationsContent(props) {
     //get relgations details
    const getRedelegators = props?.data?.delegation_responses?.map((delegator) => {
        const delegatorsAddress = delegator?.delegation?.delegator_address
        const redelegationData =useGetChainRedelegationsQuery(delegatorsAddress)
        return redelegationData
    })


    const relegatorsDetails = getRedelegators?.map((data) => {
     return data?.data?.redelegation_responses.map((r) => {
         console.log(r?.redelegation)
     })
  })
 //console.log(relegatorsDetails)

    return (
         <>
    <Redelegation>
                <Responsive>
                  <table className="w-100">
                    <thead>
                      <tr>
                        <th>
                          <h4>Address</h4>
                        </th>
                        <th>
                          <h4>From</h4>
                        </th>
                        <th>
                          <h4>To</h4>
                        </th>
                        <th>
                          <h4>Amount</h4>
                        </th>
                        <th>
                          <h4>Date</h4>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="striped">
                        <td>
                          <Flex style={{ alignItems: 'center' }}>
                            <div>
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M15.619 16.7619C10.9367 16.7619 7.04364 20.1409 6.24514 24.5934C4.22535 22.3024 3 19.2943 3 16C3 8.8203 8.8203 3 16 3C23.1797 3 29 8.8203 29 16C29 19.6408 27.5033 22.9321 25.0916 25.292C24.5948 20.4992 20.5433 16.7619 15.619 16.7619ZM16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32ZM16 16.7619C18.9455 16.7619 21.3333 14.3741 21.3333 11.4286C21.3333 8.48305 18.9455 6.09524 16 6.09524C13.0545 6.09524 10.6667 8.48305 10.6667 11.4286C10.6667 14.3741 13.0545 16.7619 16 16.7619Z" fill="#C4C4C4" />
                              </svg>
                            </div>
                            <div className="ml-3">jhkhkjhkjhkj</div>
                          </Flex>
                        </td>
                        <td>
                          sdfdfdsfsdfsdffsdf
                        </td>
                        <td>
                          sdfdfdsfsdfsdffsdf
                        </td>
                        <td>
                          1000
                        </td>
                        <td>
                          14 Mar
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Responsive>
              </Redelegation>
      </>
    )
}
const Delegation = styled.div`
  display: block;
`

const Underdelegation = styled.div`
  display: block;
`

const Redelegation = styled.div`
  display: block;
`

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

`

const Card = styled.div`
  box-shadow: 0px 7px 30px #0015da29;
  border-radius: 20px;
  margin-bottom:40px;
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
`

const GridItemSeven = styled.div`
  box-shadow: 0px 7px 30px #0015da29;
  border-radius: 20px;
  grid-column: 1 / span 4;
  padding: 20px;
`


const Responsive = styled.div`
  width: 100%;
  overflow-x: auto;
  @media screen and (max-width: 700px){
    width: calc(100vw - 50px);
  }
`

export default RedelegationsContent