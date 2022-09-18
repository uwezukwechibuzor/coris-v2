import React from "react";
import styled from 'styled-components';

function AccountUndelegationsContent(props) {
    
    const unDelegations = props

    return (
        <>
            <Underdelegation>
                                <Responsive>
                                    <table className="w-100">
                                        <thead>
                                            <tr>
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
                                                    <h4>Until</h4>
                                                </th>
                                            </tr>
                                        </thead>
                                       
                                    </table>
                                </Responsive>
                            </Underdelegation>
        </>
    )
}


const Underdelegation = styled.div`
  display: block;
`

const Flex = styled.div`
  display: flex
`;

const Responsive = styled.div`
  width: 100%;
  overflow-x: auto;
  @media screen and (max-width: 700px){
    width: 85vw;
  }
  `

export default AccountUndelegationsContent













                            