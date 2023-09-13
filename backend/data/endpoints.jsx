module.exports = {
    // cosmos chains
    latestBlocks: '/blocks/latest',
    latestBlocksRecentVersion: '/cosmos/base/tendermint/v1beta1/blocks/latest',
    allChainValidators: '/cosmos/staking/v1beta1/validators?pagination.limit=500',
    activeChainValidators: '/cosmos/staking/v1beta1/validators?status=BOND_STATUS_BONDED&pagination.limit=500',
    chainInflation: '/cosmos/mint/v1beta1/inflation',
    chainCommunityPool: '/cosmos/distribution/v1beta1/community_pool',
    chainPool: '/cosmos/staking/v1beta1/pool',
    chainBlockHeightDetails: (height) => `/blocks/${height}`,
    chainBlockHeightTxs:  (height) =>  `/cosmos/tx/v1beta1/txs?events=tx.height=${height}`,
    chainTxsByHash:  (hash) =>  `/cosmos/tx/v1beta1/txs/${hash}`,
    chainValidatorsDetails: (address) => `/cosmos/staking/v1beta1/validators/${address}`,
    chainValidatorsSlashingSigningInfosDetails: (cons_address) => `/cosmos/slashing/v1beta1/signing_infos/${cons_address}`,
    chainValidatorDelegations: (validator_address) => `/cosmos/staking/v1beta1/validators/${validator_address}/delegations?pagination.limit=500&pagination.reverse=true`,
    chainValidatorUnDelegations: (validator_addr) => `/cosmos/staking/v1beta1/validators/${validator_addr}/unbonding_delegations?pagination.limit=500&pagination.reverse=true`,
    chainValidatorReDelegations: (delegator_addr) => `/cosmos/staking/v1beta1/delegators/${delegator_addr}/redelegations?pagination.limit=600`,
    consensusState: '/consensus_state?',
    mintingParams: `/cosmos/mint/v1beta1/params`,
    govParams: (params_type) => `/cosmos/gov/v1beta1/params/${params_type}`,
    slashingParams: `/cosmos/slashing/v1beta1/params`,
    stakingParams: `/cosmos/staking/v1beta1/params`,
    distributionParams: `/cosmos/distribution/v1beta1/params`,
    nodeInfo:  `/node_info`,
    proposals:  `/cosmos/gov/v1beta1/proposals?pagination.limit=500&pagination.reverse=true`,
    proposalDetails:  (proposal_id) =>  `/cosmos/gov/v1beta1/proposals/${proposal_id}`,
    proposalVotingOptions: (id) =>  `/cosmos/gov/v1beta1/proposals/${id}/votes`,
    proposalTallyOptions: (id) =>  `/cosmos/gov/v1beta1/proposals/${id}/tally`,
    proposalDeposits: (id) => `/cosmos/gov/v1beta1/proposals/${id}/deposits`,
    authAccount: (address) => `/cosmos/auth/v1beta1/accounts/${address}`,
    accountTxsByEvents: (address) => `/cosmos/tx/v1beta1/txs?events=message.sender='${address}'&pagination.reverse=true&order_by=ORDER_BY_DESC`,
    accountBalance: (address) => `/cosmos/bank/v1beta1/balances/${address}`,
    accountDelegationRewards: (delegator_address) =>  `/cosmos/distribution/v1beta1/delegators/${delegator_address}/rewards`,
    accountDelegations:  (delegator_address) => `/cosmos/staking/v1beta1/delegations/${delegator_address}`,
    accountReDelegations:  (delegator_address) =>  `/cosmos/staking/v1beta1/delegators/${delegator_address}/redelegations`,
    accountUnDelegations:  (delegator_address) => `/cosmos/staking/v1beta1/delegators/${delegator_address}/unbonding_delegations`,

    // bitcoin
    bitcoinTxs : '/v3/block/latest/tx',
}

