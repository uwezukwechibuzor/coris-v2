import React from 'react'
import Layout from "../../components/layout/Layout";

import { useRouter } from 'next/router'
import AccountContents from '../../components/Account';
import { accountBalanceEndpoint, accountDelegationRewardsEndpoint, accountDelegationsEndpoint, accountReDelegationsEndpoint, accountUnDelegationsEndpoint, authAccountEndpoint } from '../../lib/chainApiEndpoints';

const isServerReq = req => !req.url.startsWith('/_next');

function AccountDetails(props) {

    const getAuthAccount = props?.authAccount
    const authAccount = getAuthAccount !== undefined?  getAuthAccount : null

    const getAccountBalance = props?.accountBalance
    const accountBalance = getAccountBalance !== undefined? getAccountBalance : null

   const getDelegatorRewards = props?.accountDelegatorRewards
   const delegationRewards = getDelegatorRewards !== undefined? getDelegatorRewards : null
  
   const getAccountDelegations = props?.accountDelegations
   const accountDelegations = getAccountDelegations !== undefined? getAccountDelegations : null;

   const getAccountReledelegations = props?.accountRedelegations
   const accountReledelgations = getAccountReledelegations !== undefined ? getAccountReledelegations : null
   
   const getAccountUnbondingDelegations = props?.accountUnDelegations
   const accountUnboundingDelegations = getAccountUnbondingDelegations !== undefined ? getAccountUnbondingDelegations : null
   
    const accountDetails = {
        authAccount: authAccount,
        accountBalance: accountBalance,
        delegationRewards: delegationRewards,
        accountDelegations: accountDelegations,
        accountReledelgations: accountReledelgations,
        accountUnboundingDelegations: accountUnboundingDelegations
    }

    return (
       <>
       <AccountContents {...accountDetails} />
       </>
    )
}


export async function getServerSideProps({ res, req }) {

    try {
       // Fetch data from external API
       //authAccount
     const getAuthAccount = isServerReq(req) ? await fetch(`https:${authAccountEndpoint}`) : null
     const authAccount = await getAuthAccount.json()
    
     //get account balance
     const getAccountBalance  = isServerReq(req) ? await fetch(`https:${accountBalanceEndpoint}`) : null
     const accountBalance = await getAccountBalance.json()
    
     //account delegations rewards
     const getAccountDelegatorRewards  = isServerReq(req) ? await fetch(`https:${accountDelegationRewardsEndpoint}`) : null
     const accountDelegatorRewards = await getAccountDelegatorRewards.json()
    
     //get delegations
     const  getAccountDelegations  = isServerReq(req) ? await fetch(`https:${accountDelegationsEndpoint}`) : null
     const  accountDelegations = await  getAccountDelegations.json()
     
     
     //get Redelegations
     const  getAccountRedelegations  = isServerReq(req) ? await fetch(`https:${accountReDelegationsEndpoint}`) : null
     const  accountRedelegations = await  getAccountRedelegations.json()  //get Redelegations
     
     
     const  getAccountUnDelegations  = isServerReq(req) ? await fetch(`https:${accountUnDelegationsEndpoint}`) : null
     const  accountUnDelegations  = await  getAccountUnDelegations .json()
   

    res.setHeader(
     'Cache-Control',
     'public, s-maxage=600, stale-while-revalidate=900'
   )
   //res.writeHead(307, { Location: '/_error' }).end()
 
   return {
     props: {
        authAccount: Object.assign({}, authAccount)? {},
        accountBalance: Object.assign({}, accountBalance),
        accountDelegatorRewards: Object.assign({}, accountDelegatorRewards),
        accountDelegations: Object.assign({},  accountDelegations),
        accountRedelegations: Object.assign({},  accountRedelegations),
        accountUnDelegations: Object.assign({},  accountUnDelegations),
     },
   }

 } catch (error) {
   
 }
} 


export default AccountDetails

AccountDetails.getLayout = function getLayout(page: any) {
    return <Layout>{page}</Layout>
  };
