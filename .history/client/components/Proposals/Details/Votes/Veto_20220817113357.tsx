import React from "react";
import styled from "styled-components";

function VetoVoteOptions(props){
    const vetoVotes = props
    
    let tBodyData = [] 
    for (const i in vetoVotes) {
        tBodyData.push()
    }

    return (
        <>
           <div>
                  <Responsive>
                    <table className="w-100">
                      <thead>
                        <tr>
                          <th>
                            <h4>Voter</h4>
                          </th>
                          <th>
                            <h4>Option</h4>
                          </th>
                        </tr>
                      </thead>

                    </table>
                  </Responsive>
                </div>
        </>
    )
}

const Responsive = styled.div`
  width: 100%;
  overflow-x: auto;
  @media screen and (max-width: 1075px){
    width: calc(100vw - 40px);
  }
`;

const Flex = styled.div`
  display: flex;
`

export default VetoVoteOptions