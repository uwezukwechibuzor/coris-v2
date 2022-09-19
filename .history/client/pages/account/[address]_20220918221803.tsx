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





export default AccountDetails

AccountDetails.getLayout = function getLayout(page: any) {
    return <Layout>{page}</Layout>
  };
