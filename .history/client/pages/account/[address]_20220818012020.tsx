import React from 'react'
import Layout from "../../components/layout/Layout";

import { useRouter } from 'next/router'
import AccountContents from '../../components/Account';
import { useGetChainAccountBalanceQuery, useGetChainAccountDelegationsQuery, useGetChainAccountReledelgationsQuery, useGetChainAccountUnbondingDelegationsQuery, useGetChainAuthAccountAddressQuery, useGetChainDelegatorRewardsQuery } from '../../lib/chainApi';

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
   
   const getAccountUnbondingDelegations = useGetChainAccountUnbondingDelegationsQuery
   
    const accountDetails = {
        authAccount: authAccount,
        accountBalance: accountBalance,
        delegationRewards: delegationRewards,
        accountDelegations: accountDelegations,
        accountReledelgations: accountReledelgations
    }

    return (
       <>
       <AccountContents {...accountDetails} />
       </>
    )
}

export default AccountDetails

AccountDetails.getLayout = function getLayout(page: any) {
    return <Layout>{page}</Layout>
  };
