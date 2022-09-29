import React from 'react'
import Layout from "../../components/layout/Layout";

import { useRouter } from 'next/router'
import AccountContents from '../../components/Account';
import { useGetChainAccountBalanceQuery, useGetChainAuthAccountAddressQuery } from '../../lib/chainApi';

function AccountDetails(props) {
    const {query} = useRouter()

    const getAuthAccount = useGetChainAuthAccountAddressQuery(query.address)
    const authAccount = getAuthAccount.isLoading === false? getAuthAccount.data : null
    const getAccountBalance = useGetChainAccountBalanceQuery(query.address)
    
    const accountDetails = {
        authAccount:authAccount
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