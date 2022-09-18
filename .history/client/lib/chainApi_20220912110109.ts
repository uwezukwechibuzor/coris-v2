import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { HYDRATE } from "next-redux-wrapper";
import { chainURL } from "./interfaces/chainsURL";

export const chainApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https:",
     mode: 'cors',  
     prepareHeaders: (headers) => {
      //headers.set('Access-Control-Allow-Origin', '*')
      // headers.set('Access-Control-Allow-Methods', 'GET') //
       //headers.set('Access-Control-Allow-Headers', '*') //
      return headers
    },
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: ['Height', 'Validators','ActiveValidators', 'ValidatorDetails', 'Pool', 'Delegations', 'UnDelegations', 'Redelegations', 'MintingParameters', 'GovParameters', 'SlashingParameters', 'StakingParameters', 'DistributionParameters', 'NodeInfo', 'Proposals', 'ProposalDetails', 'AnnualProvisions', 'Inflation', 'CommunityPool', 'Transactions', 'TransactionDetails', 'SlashingSigningInfosDetails', 'ProposalsVotingOptions', 'ProposalsDeposits', 'ConsensusState', 'AuthAccountAddress', 'AccountBalance', 'DelegatorRewards', 'AccountDelegations', 'AccountReledelgations', 'AccountUnbondingDelegations'],
  endpoints: (builder) => ({
     getChainBlockHeight: builder.query<any, any>({
      query: (height) => `${chainURL.cosmosChainREST}/blocks/${height}`,
      providesTags:  ['Height'],
    }),   
    getChainValidators: builder.query<any, void>({
      query: () => `${chainURL.cosmosChainREST}/cosmos/staking/v1beta1/validators?pagination.limit=500`,
      providesTags:  ['Validators'],
    }),  
    getChainActiveValidators: builder.query<any, void>({
      query: () => `${chainURL.cosmosChainREST}/cosmos/staking/v1beta1/validators?status=BOND_STATUS_BONDED&pagination.limit=500`,
      providesTags:  ['ActiveValidators'],
    }),   
    getChainValidatorDetails: builder.query<any, any>({
      query: (address) => `${chainURL.cosmosChainREST}/cosmos/staking/v1beta1/validators/${address}`,
      providesTags:  ['ValidatorDetails'],
    }), 
     getChainPool: builder.query<any, void>({
      query: () => `${chainURL.cosmosChainREST}/cosmos/staking/v1beta1/pool`,
      providesTags:  ['Pool'],
    }), 
    getChainDelegations: builder.query<any, any>({
      query: (validator_addr) => `${chainURL.cosmosChainREST}/cosmos/staking/v1beta1/validators/${validator_addr}/delegations?pagination.key=hhhh&pagination.limit=500&pagination.reverse=true`,
      providesTags:  ['Delegations'],
    }),
    getChainUnDelegations: builder.query<any, any>({
      query: (validator_addr) => `${chainURL.cosmosChainREST}/cosmos/staking/v1beta1/validators/${validator_addr}/unbonding_delegations?pagination.key=hhhh&pagination.limit=500&pagination.reverse=true`,
      providesTags:  ['UnDelegations'],
    }),
    getChainRedelegations: builder.query<any, any>({
      query: (delegator_addr) => `${chainURL.cosmosChainREST}/cosmos/staking/v1beta1/delegators/${delegator_addr}/redelegations?pagination.limit=600`,
      providesTags:  ['Redelegations'],
    }),
    getChainMintingParams: builder.query<any, void>({
      query: () => `${chainURL.cosmosChainREST}/cosmos/mint/v1beta1/params`,
      providesTags:  ['MintingParameters'],
    }),
    getChainGovParams: builder.query<any, any>({
      query: (params_type) => `${chainURL.cosmosChainREST}/cosmos/gov/v1beta1/params/${params_type}`,
      providesTags:  ['GovParameters'],
    }),
    getChainSlashingParams: builder.query<any,void>({
      query: () => `${chainURL.cosmosChainREST}/cosmos/slashing/v1beta1/params`,
      providesTags:  ['SlashingParameters'],
    }),
    getChainStakingParams: builder.query<any,void>({
      query: () => `${chainURL.cosmosChainREST}/cosmos/staking/v1beta1/params`,
      providesTags:  ['StakingParameters'],
    }),
    getChainDistributionParams: builder.query<any,void>({
      query: () => `${chainURL.cosmosChainREST}/cosmos/distribution/v1beta1/params`,
      providesTags:  ['DistributionParameters'],
    }),
    getChainNodeInfo: builder.query<any,void>({
      query: () => `${chainURL.cosmosChainREST}/node_info`,
      providesTags:  ['NodeInfo'],
    }),
    getChainProposals: builder.query<any,void>({
      query: () => `${chainURL.cosmosChainREST}/cosmos/gov/v1beta1/proposals&pagination.key=key&pagination.limit=500&pagination.count_total=true`,
      providesTags:  ['Proposals'],
    }),
    getChainProposalDetails: builder.query<any, any>({
      query: (proposal_id) => `${chainURL.cosmosChainREST}/cosmos/gov/v1beta1/proposals/${proposal_id}`,
      providesTags:  ['ProposalDetails'],
    }), 
    getChainAnnualProvisions: builder.query<any, void>({
      query: () => `${chainURL.cosmosChainREST}/cosmos/mint/v1beta1/annual_provisions`,
      providesTags:  ['AnnualProvisions'],
    }), 
    getChainInflation: builder.query<any, void>({
      query: () => `${chainURL.cosmosChainREST}/cosmos/mint/v1beta1/inflation`,
      providesTags:  ['Inflation'],
    }),
    getChainCommunityPool: builder.query<any, void>({
      query: () => `${chainURL.cosmosChainREST}/cosmos/distribution/v1beta1/community_pool`,
      providesTags:  ['CommunityPool'],
    }),
    getChainTxs: builder.query<any, any>({
      query: (height) => `${chainURL.cosmosChainREST}/cosmos/tx/v1beta1/txs?events=tx.height=${height}`,
      providesTags:  ['Transactions'],
    }),
    getChainTxDetails: builder.query<any, any>({
      query: (hash) => `${chainURL.cosmosChainREST}/cosmos/tx/v1beta1/txs/${hash}`,
      providesTags:  ['TransactionDetails'],
    }), 
    getChainValidatorsSlashingSigningInfosDetails: builder.query<any, any>({
      query: (cons_address) => `${chainURL.cosmosChainREST}/cosmos/slashing/v1beta1/signing_infos/${cons_address}`,
      providesTags:  ['SlashingSigningInfosDetails'],
    }), 
    getChainProposalsVotingOptions: builder.query<any, any>({
      query: (id) => `${chainURL.cosmosChainREST}/cosmos/gov/v1beta1/proposals/${id}/votes`,
      providesTags:  ['ProposalsVotingOptions'],
    }),
    getChainProposalsDeposits: builder.query<any, any>({
      query: (id) => `${chainURL.cosmosChainREST}/cosmos/gov/v1beta1/proposals/${id}/deposits`,
      providesTags:  ['ProposalsDeposits'],
    }),
    getChainValidatorsConsensusState: builder.query<any, void>({
      query: () => `${chainURL.cosmosChainRPC}/consensus_state?`,
      providesTags:  ['ConsensusState'],
    }),
    getChainAuthAccountAddress: builder.query<any, any>({
      query: (address) => `${chainURL.cosmosChainREST}/cosmos/auth/v1beta1/accounts/${address}`,
      providesTags:  ['AuthAccountAddress'],
    }),
    getChainAccountBalance: builder.query<any, any>({
      query: (address) => `${chainURL.cosmosChainREST}/cosmos/bank/v1beta1/balances/${address}`,
      providesTags:  ['AccountBalance'],
    }),
    getChainDelegatorRewards: builder.query<any, any>({
      query: (delegator_address) => `${chainURL.cosmosChainREST}/cosmos/distribution/v1beta1/delegators/${delegator_address}/rewards`,
      providesTags:  ['DelegatorRewards'],
    }), 
    getChainAccountDelegations: builder.query<any, any>({
      query: (delegator_address) => `${chainURL.cosmosChainREST}/cosmos/staking/v1beta1/delegations/${delegator_address}`,
      providesTags:  ['AccountDelegations'],
    }), 
    getChainAccountReledelgations: builder.query<any, any>({
      query: (delegator_address) => `${chainURL.cosmosChainREST}/cosmos/staking/v1beta1/delegators/${delegator_address}/redelegations`,
      providesTags:  ['AccountReledelgations'],
    }),
    getChainAccountUnbondingDelegations: builder.query<any, any>({
      query: (delegator_address) => `${chainURL.cosmosChainREST}/cosmos/staking/v1beta1/delegators/${delegator_address}/unbonding_delegations`,
      providesTags:  ['AccountUnbondingDelegations'],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetChainBlockHeightQuery,
  useGetChainValidatorsQuery,
  useGetChainActiveValidatorsQuery,
  useGetChainValidatorDetailsQuery,
  useGetChainPoolQuery,
  useGetChainDelegationsQuery,
  useGetChainUnDelegationsQuery,
  useGetChainRedelegationsQuery,
  useGetChainMintingParamsQuery,
  useGetChainGovParamsQuery,
  useGetChainSlashingParamsQuery,
  useGetChainStakingParamsQuery,
  useGetChainDistributionParamsQuery,
  useGetChainNodeInfoQuery,
  useGetChainProposalsQuery,
  useGetChainProposalDetailsQuery,
  useGetChainAnnualProvisionsQuery,
  useGetChainInflationQuery,
  useGetChainCommunityPoolQuery,
  useGetChainTxsQuery,
  useGetChainTxDetailsQuery,
  useGetChainValidatorsSlashingSigningInfosDetailsQuery,
  useGetChainProposalsVotingOptionsQuery,
  useGetChainProposalsDepositsQuery,
  useGetChainValidatorsConsensusStateQuery,
  useGetChainAuthAccountAddressQuery,
  useGetChainAccountBalanceQuery,
  useGetChainDelegatorRewardsQuery,
  useGetChainAccountDelegationsQuery,
  useGetChainAccountReledelgationsQuery,
  useGetChainAccountUnbondingDelegationsQuery,
  util: { getRunningOperationPromises },
} = chainApi;

//can be used in SSR
export const {
   getChainValidators,
   getChainPool,
   getChainDelegations,
 } = chainApi.endpoints;
