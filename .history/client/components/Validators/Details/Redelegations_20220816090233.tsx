import Link from "next/link";
import  React, { useState } from "react";
import styled from "styled-components";
import { useGetChainRedelegationsQuery, useGetChainValidatorsQuery } from "../../../lib/chainApi";
import { formatHash } from "../../../lib/Util/format";

function RedelegationsContent(props) {
     //get relgations details
     let  getRedelegators
     let redelegation = []
     try {
     getRedelegators = props.isLoading === false? props?.data?.delegation_responses?.map((delegator) => {
        const delegatorsAddress = delegator?.delegation?.delegator_address
        const redelegationData =useGetChainRedelegationsQuery(delegatorsAddress)
        return redelegationData
    }): null

    getRedelegators?.map(redelegatorData => {
      return redelegatorData.data.redelegation_responses.map(data => {
        redelegation.push(data)
      })
    }) 

  } catch(error) {

  }

  redelegation.map(d => {
   // console.log(d)
  })

const getValidatorDetailsByAddress = (operatorAddress: string) => {
const getAllValidators = useGetChainValidatorsQuery()  
const validators = getAllValidators.isLoading === false? getAllValidators.data.validators : null
 return validators?.map((validator, index) => {
      if (validator?.operator_address.includes(operatorAddress)){
         return validators[index]
      }
      validator.filter(function)
 })
}    

const y = getValidatorDetailsByAddress('cosmosvaloper1sjllsnramtg3ewxqwwrwjxfgc4n4ef9u2lcnj0')
console.log(y)


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

                  {redelegation?.map(data => 
                    <tbody>
                      <tr className="striped">
                      <Link href='/account[address]' as={`/account/${data.redelegation.delegator_address}`} ><a>
                        <td>
                          <Flex style={{ alignItems: 'center' }}>
                            <div>
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M15.619 16.7619C10.9367 16.7619 7.04364 20.1409 6.24514 24.5934C4.22535 22.3024 3 19.2943 3 16C3 8.8203 8.8203 3 16 3C23.1797 3 29 8.8203 29 16C29 19.6408 27.5033 22.9321 25.0916 25.292C24.5948 20.4992 20.5433 16.7619 15.619 16.7619ZM16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32ZM16 16.7619C18.9455 16.7619 21.3333 14.3741 21.3333 11.4286C21.3333 8.48305 18.9455 6.09524 16 6.09524C13.0545 6.09524 10.6667 8.48305 10.6667 11.4286C10.6667 14.3741 13.0545 16.7619 16 16.7619Z" fill="#C4C4C4" />
                              </svg>
                            </div>
                            <div className="ml-3">{data.redelegation? formatHash(data.redelegation.delegator_address, 10, '...') : null}</div>
                          </Flex>
                        </td>
                        </a></Link>
                        <td>
                         {data.redelegation? data.redelegation?.validator_src_address : null}
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
                    )}
                  </table>
                </Responsive>
              </Redelegation>
      </>
    )
}

const Redelegation = styled.div`
  display: block;
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

const Flex = styled.div`
  display: flex;
`

const Responsive = styled.div`
  width: 100%;
  overflow-x: auto;
  @media screen and (max-width: 700px){
    width: calc(100vw - 50px);
  }
`

export default RedelegationsContent