import React from 'react'
import Layout from "../../components/layout/Layout";

import { useRouter } from 'next/router'
import AccountContents from '../../components/Account';
import { useGetChainAccountBalanceQuery, useGetChainAccountDelegationsQuery, useGetChainAccountReledelgationsQuery, useGetChainAccountUnbondingDelegationsQuery, useGetChainAuthAccountAddressQuery, useGetChainDelegatorRewardsQuery } from '../../lib/chainApi';

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
     //get inflation data
     const inflationEndPoint = inflationEndpoint
     const getInflationData = isServerReq(req) ? await fetch(`https:${inflationEndPoint}`) : null
     const inflationData = await getInflationData.json()
   
    //get community pool
    const getCommunityPool = isServerReq(req) ? await fetch(`https:${communityPoolEndpoint}`) : null
    const commuintyPoolData = await getCommunityPool.json();
   
    //get chain active validators
    const getChainActiveValidators = isServerReq(req) ? await fetch(`https:${chainActiveValidatorsEndpoint}`) : null
    const chainActiveValidatorsData = await getChainActiveValidators.json()
   
    //get Pool
    const getPool = isServerReq(req) ? await fetch(`https:${chainPoolEndpoint}`) : null
    const poolData = await getPool.json() 
   
    const getAllChainValidators = isServerReq(req) ? await fetch(`https:${allChainValidatorsEndpoint}`) : null
    const chainAllValidators = await getAllChainValidators.json();

    res.setHeader(
     'Cache-Control',
     'public, s-maxage=600, stale-while-revalidate=900'
   )
   //res.writeHead(307, { Location: '/_error' }).end()
 
   return {
     props: {
       inflationData: Object.assign({}, inflationData),
       commuintyPoolData: Object.assign({}, commuintyPoolData),
       chainActiveValidatorsData: Object.assign({}, chainActiveValidatorsData),
       poolData: Object.assign({}, poolData),
       chainAllValidators: Object.assign({}, chainAllValidators)
     },
   }

 } catch (error) {
   
 }
} 


export default AccountDetails

AccountDetails.getLayout = function getLayout(page: any) {
    return <Layout>{page}</Layout>
  };
