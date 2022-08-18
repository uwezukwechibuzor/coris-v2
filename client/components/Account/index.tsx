import React, { useState } from 'react'
import styled from 'styled-components';
import { UrbanistBoldBlack40px } from '../../styledMixins';
import QRCode from "react-qr-code";
import AccountDelegationsContent from './Details/Delegations';
import AccountRedelegationsContent from './Details/Redelegations';
import AccountUndelegationsContent from './Details/Undelegations';

function AccountContents(props) {
    const [selectedDelegations, setDelegationPage] = useState('delegations')
    
    const {
      authAccount,
      accountBalance,
      delegationRewards,
      accountDelegations,
      accountReledelgations,
      accountUnboundingDelegations
    } = props

    const balance = Number(accountBalance?.balances[0]?.amount)
    const denom = 'autom'
     
    let totalRewards = 0
    delegationRewards?.rewards?.map(data => {
       const totalAmount = Number(data?.reward[0]?.amount)
       totalRewards += totalAmount
    })
    
    let totalDelegationsAmount = 0
    accountDelegations?.delegation_responses.map(data => {
         totalDelegationsAmount += Number(data?.balance?.amount)
    })
    
    let totalReledegationsAmount = 0
     accountReledelgations?.redelegation_responses?.map(data => {
        totalReledegationsAmount +=  Number(data?.entries[0]?.balance)
     })
    
     let totalUnboundingDelegationsAmount = 0
      accountUnboundingDelegations?.unbonding_responses?.map(data => {
         totalUnboundingDelegationsAmount += Number(data.entries[0].balance)
      })



    return (
        <>
            <Title>Account Details</Title>
            <Container className="mb-3">
                <Card style={{ padding: "40px" }}>
                    <QRContainer>
                        <QRCode value="hey" size={150} />
                    </QRContainer>
                    <FlexMiddle className="mt-3">Address</FlexMiddle>
                    <FlexMiddle>
                        <h4>{authAccount?.account?.address? authAccount.account.address : null}</h4>
                    </FlexMiddle>
                    <FlexMiddle>
                        <div>
                            <div><span>Account No</span></div>
                            <strong>{authAccount?.account?.account_number? authAccount.account.account_number : null}</strong>
                            <div><span>Sequence</span></div>
                            <strong>{authAccount?.account?.sequence? authAccount.account.sequence : 0}</strong>
                        </div>

                    </FlexMiddle>
                    <FlexMiddle className="mt-3">Type</FlexMiddle>
                    <FlexMiddle>
                        <h4>{authAccount?.account['@type']? authAccount.account['@type'] : null }</h4>
                    </FlexMiddle>
                    <FlexMiddle>
                        <div>
                            <div><span style={{marginLeft: '70px'}} ><FlexMiddle className="mt-3">PubKey</FlexMiddle></span></div>
                            <strong>
                                {authAccount?.account?.pub_key['@type']}
                                <br />
                                {authAccount?.account?.pub_key.key}
                            </strong>
                        </div>

                    </FlexMiddle>
                </Card>
            </Container>
            <Container className='w-100'>
                <Card style={{ height: '400px' }} className="w-100">
                    <Flex className='block-sm'>
                        <Flex className='w-40 w-100-sm'>
                        </Flex>
                        <Flex className='w-60 p-3 w-100-sm' style={{ flexDirection: "column" }}>
                            <div>
                                <h4><strong></strong></h4>
                            </div>
                            <div style={{ margin: "40px" }}>
                                <Flex style={{ alignItems: 'center', justifyContent: "space-between" }}>
                                    <Flex>
                                        <Box />
                                        <h5 className="ml-3">Balance</h5>
                                    </Flex>
                                    <Flex>
                                        <h5><strong>{accountBalance?.balances[0]? balance : 0} {denom }</strong></h5>
                                    </Flex>
                                </Flex>
                                <Flex style={{ alignItems: 'center', justifyContent: "space-between" }}>
                                    <Flex>
                                        <Box />
                                        <h5 className="ml-3">Reward</h5>
                                    </Flex>
                                    <Flex>
                                        <h5><strong>{delegationRewards?.rewards !== NaN? 0: totalRewards.toFixed(2) } {denom}</strong></h5>
                                    </Flex>
                                </Flex>
                                <Flex style={{ alignItems: 'center', justifyContent: "space-between" }}>
                                    <Flex>
                                        <Box />
                                        <h5 className="ml-3">Delegation</h5>
                                    </Flex>
                                    <Flex>
                                        <h5><strong>{accountDelegations?.delegation_responses? totalDelegationsAmount : 0} {denom}</strong></h5>
                                    </Flex>
                                </Flex>
                                <Flex style={{ alignItems: 'center', justifyContent: "space-between" }}>
                                    <Flex>
                                        <Box />
                                        <h5 className="ml-3">Redelegation</h5>
                                    </Flex>
                                    <Flex>
                                        <h5><strong>{accountReledelgations?.redelegation_responses? totalReledegationsAmount: 0} {denom}</strong></h5>
                                    </Flex>
                                </Flex>
                                <Flex style={{ alignItems: 'center', justifyContent: "space-between" }}>
                                    <Flex>
                                        <Box />
                                        <h5 className="ml-3">Undelegation</h5>
                                    </Flex>
                                    <Flex>
                                        <h5><strong>{accountUnboundingDelegations?.unbonding_responses? totalUnboundingDelegationsAmount: null} {denom}</strong></h5>
                                    </Flex>
                                </Flex>
                            </div>
                        </Flex>
                    </Flex>
                </Card>
            </Container>

            <Container className="my-3">
                <h5>Tokens</h5>
                <Card style={{ padding: "10px" }}>
                    <Responsive>
                        <table className="w-100">
                            <thead>
                                <tr>
                                    <th>
                                        <h4>Name</h4>
                                    </th>
                                    <th>
                                        <h4>Amount</h4>
                                    </th>
                                    <th>
                                        <h4> Total Value</h4>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="striped">
                                    <td>
                                        <Flex style={{ alignItems: 'center' }}>
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32" fill="none">
                                                    <path fillRule="evenodd" clip-rule="evenodd" d="M15.619 16.7619C10.9367 16.7619 7.04364 20.1409 6.24514 24.5934C4.22535 22.3024 3 19.2943 3 16C3 8.8203 8.8203 3 16 3C23.1797 3 29 8.8203 29 16C29 19.6408 27.5033 22.9321 25.0916 25.292C24.5948 20.4992 20.5433 16.7619 15.619 16.7619ZM16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32ZM16 16.7619C18.9455 16.7619 21.3333 14.3741 21.3333 11.4286C21.3333 8.48305 18.9455 6.09524 16 6.09524C13.0545 6.09524 10.6667 8.48305 10.6667 11.4286C10.6667 14.3741 13.0545 16.7619 16 16.7619Z" fill="#C4C4C4" />
                                                </svg>
                                            </div>
                                            <div className="ml-3 text-primary">cosmos</div>
                                        </Flex>
                                    </td>
                                    <td>
                                        1000
                                    </td>
                                    <td>
                                    300000
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </Responsive>
                </Card>
            </Container>


            <Container className="my-3">
                <h5>Delegations</h5>
                <Card style={{ padding: "10px" }}>
                    <div className="w-100 p-3">
                        <TabToggler>
                            <TabTogglerItem
                                className={selectedDelegations === 'delegations' ? "active" : ''}
                                onClick={() => setDelegationPage('delegations')}
                            >Delegations</TabTogglerItem>
                            <TabTogglerItem
                                onClick={() => setDelegationPage('underdelegations')}
                                className={selectedDelegations === 'underdelegations' ? "active" : ''}
                            >Undelegations</TabTogglerItem>
                            <TabTogglerItem
                                onClick={() => setDelegationPage('redelegations')}
                                className={selectedDelegations === 'redelegations' ? "active" : ''}
                            >Redelegations</TabTogglerItem>
                        </TabToggler>
                        {
                            selectedDelegations === 'delegations' ? (
                               <AccountDelegationsContent {...accountDelegations} />
                            ) : selectedDelegations === 'redelegations' ? (
                                <AccountRedelegationsContent {...accountReledelgations} />
                            ) : (
                              <AccountUndelegationsContent {...accountUnboundingDelegations} />
                            )
                        }

                    </div>
                </Card>
            </Container>


            <Container>
                <h5>Total Vesting</h5>
                <Grid style={{ marginBottom: "30px" }}>
                    <Card className="p-3">
                        <Flex className="text-center w-100" style={{ justifyContent: 'center' }}>
                            <h5>Continuous Vesting</h5>
                        </Flex>
                        <Flex className="text-center w-100" style={{ justifyContent: 'center' }}>
                            <span>
                                Your tokens are unlocked every block
                            </span>
                        </Flex>
                    </Card>
                    <Card className="p-3">
                        <Flex className="text-center w-100" style={{ justifyContent: 'center' }}>
                            <h5>Continuous Vesting</h5>
                        </Flex>
                        <Flex className="text-center w-100" style={{ justifyContent: 'center' }}>
                            <span>
                                Your tokens are unlocked every block
                            </span>
                        </Flex>
                    </Card>
                    <Card className="p-3">
                        <Flex className="text-center w-100" style={{ justifyContent: 'center' }}>
                            <h5>Continuous Vesting</h5>
                        </Flex>
                        <Flex className="text-center w-100" style={{ justifyContent: 'center' }}>
                            <span>
                                Your tokens are unlocked every block
                            </span>
                        </Flex>
                    </Card>
                </Grid>
            </Container>
            <Container className="my-3">
                <Card style={{ padding: "10px", minHeight: "400px" }}>
                    <Responsive>
                        <table className="w-100">
                            <thead>
                                <tr>
                                    <th>
                                        <h4>Type</h4>
                                    </th>
                                    <th>
                                        <h4>Days Remaining</h4>
                                    </th>
                                    <th>
                                        <h4>Still Locked</h4>
                                    </th>
                                    <th>
                                        <h4>Historically Unlocked</h4>
                                    </th>
                                    <th>
                                        <h4>Full Unlocked</h4>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="striped">
                                    <td>sdsd</td>
                                    <td>sdasd</td>
                                    <td>asdadsda</td>
                                    <td>sdasdasdasdas</td>
                                </tr>
                            </tbody>
                        </table>
                    </Responsive>
                </Card>
            </Container>
            <Container className="my-3">
                <h4>Transactions</h4>
                <Card style={{ padding: "10px", minHeight: "400px" }}>
                    <Responsive>
                        <table className="w-100">
                            <thead>
                                <tr>
                                    <th>
                                        <h4>Hash</h4>
                                    </th>
                                    <th>
                                        <h4>Height</h4>
                                    </th>
                                    <th>
                                        <h4>Status</h4>
                                    </th>
                                    <th>
                                        <h4>Type</h4>
                                    </th>
                                    <th>
                                        <h4>Time</h4>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="striped">
                                    <td>sdsd</td>
                                    <td>sdasd</td>
                                    <td>asdadsda</td>
                                    <td>sdasdasdasdas</td>
                                    <td>sdasdasdasdas</td>
                                </tr>
                            </tbody>
                        </table>
                    </Responsive>
                </Card>
            </Container>
        </>
    )
}


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



export default AccountContents