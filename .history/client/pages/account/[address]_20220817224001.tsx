import React from 'react'
import Layout from "../../components/layout/Layout";

import { useRouter } from 'next/router'
import AccountContents from '../../components/Account';
import { useGetChainAuthAccountAddressQuery } from '../../lib/chainApi';

function AccountDetails(props) {
    const {query} = useRouter()

    const getAuthAccount = useGetChainAuthAccountAddressQuery(query)

    return (
       <>
       <AccountContents />
       </>
    )
}

export default AccountDetails

AccountDetails.getLayout = function getLayout(page: any) {
    return <Layout>{page}</Layout>
  };