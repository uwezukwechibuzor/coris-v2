import React from 'react'
import Layout from "../../components/layout/Layout";

import { useRouter } from 'next/router'
import AccountContents from '../../components/Account';
import { useGetChainAccountBalanceQuery, useGetChainAccountDelegationsQuery, useGetChainAccountReledelgationsQuery, useGetChainAccountUnbondingDelegationsQuery, useGetChainAuthAccountAddressQuery, useGetChainDelegatorRewardsQuery } from '../../lib/chainApi';
import { accountBalanceEndpoint, authAccountEndpoint } from '../../lib/chainApiEndpoints';

const isServerReq = req => !req.url.startsWith('/_next');

function AccountDetails(props) {
    const {query} = useRouter()

    const getAuthAccount = useGetChainAuthAccountAddressQuery(query.address)
    const authAccount = getAuthAccount.isLoading === false? getAuthAccount.data : null

    const getAccountBalance = useGetChainAccountBalanceQuery(query.address)
    const accountBalance = getAccountBalance.isLoading === false? getAccountBalance.data : null

   const getDelegatorRewards = useGetChainDelegatorRewardsQuery(query.address)
   const delegationRewards = getDelegatorRewards.isLoading === false? getDelegatorRewards.data : null
  
   const getAccountDelegations = useGetChainAccountDelegationsQuery(query.address)
   const accountDelegations = getAccountDelegations.isLoading === false? getAccountDelegations.data : null;

   const getAccountReledelegations = useGetChainAccountReledelgationsQuery(query.address)
   const accountReledelgations = getAccountReledelegations.isLoading === false ? getAccountReledelegations.data : null
   
   const getAccountUnbondingDelegations = useGetChainAccountUnbondingDelegationsQuery(query.address)
   const accountUnboundingDelegations = getAccountUnbondingDelegations.isLoading === false ? getAccountUnbondingDelegations.data : null
   
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
     const acccountBalance = await getAccountBalance.json()
   

    res.setHeader(
     'Cache-Control',
     'public, s-maxage=600, stale-while-revalidate=900'
   )
   //res.writeHead(307, { Location: '/_error' }).end()
 
   return {
     props: {
        authAccount: Object.assign({}, authAccount),
    
     },
   }

 } catch (error) {
   
 }
} 


export default AccountDetails

AccountDetails.getLayout = function getLayout(page: any) {
    return <Layout>{page}</Layout>
  };
