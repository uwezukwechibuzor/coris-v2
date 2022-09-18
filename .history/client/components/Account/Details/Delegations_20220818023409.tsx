import React from "react";

function AccountDelegationsContent() {
    return (
        <>
          <Delegation>
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
                                                </tr>
                                            </tbody>
                                        </table>
                                    </Responsive>
                                </Delegation>
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

const Box = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 3px;
    background: red;
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
  @media screen and (max-width: 506px){
    flex-direction: column;
    width: 100%;
  }
`

const TabTogglerItem = styled.div`
  cursor: pointer;
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

const FlexMiddle = styled.div`
  display: flex;
  justify-content: center;
`;

const QRContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  height: 150px;
`;

const Card = styled.div`
  border-radius: 20px;
  box-shadow: 0px 7px 30px #0015da29;
  word-break: break-all;
`;

const Flex = styled.div`
  display: flex
`;

const InLineFlex = styled.div`
  display:inline-flex;
  flex-wrap: wrap;
  align-items:center;
  justify-content: center;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns:auto auto auto;
  grid-gap: 30px;
  @media screen and (max-width:1018px){
    grid-template-columns:auto;
  }
`;

const Container = styled.div`
  display: block;
`;

const Responsive = styled.div`
  width: 100%;
  overflow-x: auto;
  @media screen and (max-width: 700px){
    width: 85vw;
  }
  `;

const Circle = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background:red;
`;

const Title = styled.h1`
  ${UrbanistBoldBlack40px}
  min-height: 48px;
  min-width: 112px;
  letter-spacing: 0;
  margin-top: 30px
`;


export default AccountDelegationsContent