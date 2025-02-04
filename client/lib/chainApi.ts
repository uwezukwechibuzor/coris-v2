import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import { ChainAllValidatorsEndpoint, allTxsEndpoint, chainBlockHeightDetailsEndpont, latestBlocksEndpoint } from "./chainApiEndpoints";
import { chainURL } from "./Util/chainsURL";

const baseChainAPI =  ""

export const chainApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: baseChainAPI,
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
  tagTypes: ['Blocks','Height', 'AllTxs', 'Validators','ActiveValidators', 'ValidatorDetails', 'Pool', 'Delegations', 'UnDelegations', 'Redelegations', 'MintingParameters', 'GovParameters', 'SlashingParameters', 'StakingParameters', 'DistributionParameters', 'NodeInfo', 'Proposals', 'ProposalDetails', 'AnnualProvisions', 'Inflation', 'CommunityPool', 'Transactions', 'TransactionDetails', 'SlashingSigningInfosDetails', 'ProposalsVotingOptions', 'ProposalsDeposits', 'ConsensusState', 'AuthAccountAddress', 'AccountBalance', 'DelegatorRewards', 'AccountDelegations', 'AccountReledelgations', 'AccountUnbondingDelegations'],
  endpoints: (builder) => ({
     getChainLatestBlocks: builder.query<any, any>({
      query: (limit) => latestBlocksEndpoint(limit),
      providesTags:  ['Blocks'],
    }),  
    getChainBlockHeight: builder.query<any, any>({
      query: (height) => chainBlockHeightDetailsEndpont(height),
      providesTags:  ['Height'],
    }),   
     getChainAllTxs: builder.query<any, any>({
      query: (limit) => allTxsEndpoint(limit),
      providesTags:  ['AllTxs'],
    }),   
    getChainValidators: builder.query<any, void>({
      query: () => ChainAllValidatorsEndpoint,
      providesTags:  ['Validators'],
    }),  
    getChainActiveValidators: builder.query<any, void>({
      query: () => `/cosmos/staking/v1beta1/validators?status=BOND_STATUS_BONDED&pagination.limit=500`,
      providesTags:  ['ActiveValidators'],
    }),   
    getChainValidatorDetails: builder.query<any, any>({
      query: (address) => `${baseChainAPI}/cosmos/staking/v1beta1/validators/${address}`,
      providesTags:  ['ValidatorDetails'],
    }), 
     getChainPool: builder.query<any, void>({
      query: () => `${baseChainAPI}/cosmos/staking/v1beta1/pool`,
      providesTags:  ['Pool'],
    }), 
    getChainDelegations: builder.query<any, any>({
      query: (validator_addr) => `${baseChainAPI}/cosmos/staking/v1beta1/validators/${validator_addr}/delegations?pagination.key=hhhh&pagination.limit=500&pagination.reverse=true`,
      providesTags:  ['Delegations'],
    }),
    getChainUnDelegations: builder.query<any, any>({
      query: (validator_addr) => `${baseChainAPI}/cosmos/staking/v1beta1/validators/${validator_addr}/unbonding_delegations?pagination.key=hhhh&pagination.limit=500&pagination.reverse=true`,
      providesTags:  ['UnDelegations'],
    }),
    getChainRedelegations: builder.query<any, any>({
      query: (delegator_addr) => `${baseChainAPI}/cosmos/staking/v1beta1/delegators/${delegator_addr}/redelegations?pagination.limit=600`,
      providesTags:  ['Redelegations'],
    }),
    getChainMintingParams: builder.query<any, void>({
      query: () => `${baseChainAPI}/cosmos/mint/v1beta1/params`,
      providesTags:  ['MintingParameters'],
    }),
    getChainGovParams: builder.query<any, any>({
      query: (params_type) => `${baseChainAPI}/cosmos/gov/v1beta1/params/${params_type}`,
      providesTags:  ['GovParameters'],
    }),
    getChainSlashingParams: builder.query<any,void>({
      query: () => `${baseChainAPI}/cosmos/slashing/v1beta1/params`,
      providesTags:  ['SlashingParameters'],
    }),
    getChainStakingParams: builder.query<any,void>({
      query: () => `${baseChainAPI}/cosmos/staking/v1beta1/params`,
      providesTags:  ['StakingParameters'],
    }),
    getChainDistributionParams: builder.query<any,void>({
      query: () => `${baseChainAPI}/cosmos/distribution/v1beta1/params`,
      providesTags:  ['DistributionParameters'],
    }),
    getChainNodeInfo: builder.query<any,void>({
      query: () => `${baseChainAPI}/node_info`,
      providesTags:  ['NodeInfo'],
    }),
    getChainProposals: builder.query<any,void>({
      query: () => `${baseChainAPI}/cosmos/gov/v1beta1/proposals?pagination.limit=500&pagination.reverse=true`,
      providesTags:  ['Proposals'],
    }),
    getChainProposalDetails: builder.query<any, any>({
      query: (proposal_id) => `${baseChainAPI}/cosmos/gov/v1beta1/proposals/${proposal_id}`,
      providesTags:  ['ProposalDetails'],
    }), 
    getChainAnnualProvisions: builder.query<any, void>({
      query: () => `${baseChainAPI}/cosmos/mint/v1beta1/annual_provisions`,
      providesTags:  ['AnnualProvisions'],
    }), 
    getChainInflation: builder.query<any, void>({
      query: () => `${baseChainAPI}/cosmos/mint/v1beta1/inflation`,
      providesTags:  ['Inflation'],
    }),
    getChainCommunityPool: builder.query<any, void>({
      query: () => `${baseChainAPI}/cosmos/distribution/v1beta1/community_pool`,
      providesTags:  ['CommunityPool'],
    }),
    getChainTxs: builder.query<any, any>({
      query: (height) => `${baseChainAPI}/cosmos/tx/v1beta1/txs?events=tx.height=${height}`,
      providesTags:  ['Transactions'],
    }),
    getChainTxDetails: builder.query<any, any>({
      query: (hash) => `${baseChainAPI}/cosmos/tx/v1beta1/txs/${hash}`,
      providesTags:  ['TransactionDetails'],
    }), 
    getChainValidatorsSlashingSigningInfosDetails: builder.query<any, any>({
      query: (cons_address) => `${baseChainAPI}/cosmos/slashing/v1beta1/signing_infos/${cons_address}`,
      providesTags:  ['SlashingSigningInfosDetails'],
    }), 
    getChainProposalsVotingOptions: builder.query<any, any>({
      query: (id) => `${baseChainAPI}/cosmos/gov/v1beta1/proposals/${id}/votes`,
      providesTags:  ['ProposalsVotingOptions'],
    }),
    getChainProposalsDeposits: builder.query<any, any>({
      query: (id) => `${baseChainAPI}/cosmos/gov/v1beta1/proposals/${id}/deposits`,
      providesTags:  ['ProposalsDeposits'],
    }),
    getChainValidatorsConsensusState: builder.query<any, void>({
      query: () => `${baseChainAPI}/consensus_state?`,
      providesTags:  ['ConsensusState'],
    }),
    getChainAuthAccountAddress: builder.query<any, any>({
      query: (address) => `${baseChainAPI}/cosmos/auth/v1beta1/accounts/${address}`,
      providesTags:  ['AuthAccountAddress'],
    }),
    getChainAccountBalance: builder.query<any, any>({
      query: (address) => `${baseChainAPI}/cosmos/bank/v1beta1/balances/${address}`,
      providesTags:  ['AccountBalance'],
    }),
    getChainDelegatorRewards: builder.query<any, any>({
      query: (delegator_address) => `${baseChainAPI}/cosmos/distribution/v1beta1/delegators/${delegator_address}/rewards`,
      providesTags:  ['DelegatorRewards'],
    }), 
    getChainAccountDelegations: builder.query<any, any>({
      query: (delegator_address) => `${baseChainAPI}/cosmos/staking/v1beta1/delegations/${delegator_address}`,
      providesTags:  ['AccountDelegations'],
    }), 
    getChainAccountReledelgations: builder.query<any, any>({
      query: (delegator_address) => `${baseChainAPI}/cosmos/staking/v1beta1/delegators/${delegator_address}/redelegations`,
      providesTags:  ['AccountReledelgations'],
    }),
    getChainAccountUnbondingDelegations: builder.query<any, any>({
      query: (delegator_address) => `${baseChainAPI}/cosmos/staking/v1beta1/delegators/${delegator_address}/unbonding_delegations`,
      providesTags:  ['AccountUnbondingDelegations'],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetChainLatestBlocksQuery,
  useGetChainBlockHeightQuery,
  useGetChainAllTxsQuery,
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
  getChainLatestBlocks,
   getChainValidators,
   getChainPool,
   getChainDelegations,
 } = chainApi.endpoints;
