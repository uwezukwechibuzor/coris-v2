
export const latestBlocksEndpoint = (limit) => `/blocks/latest?limit=${limit}`;

export const allTxsEndpoint = (limit) => `/txs?limit=${limit}`;

export const inflationEndpoint = `/chain_inflation`;

export const communityPoolEndpoint = `/chain_community_pool`;

export const chainActiveValidatorsEndpoint = `/active_validators`;

export const allChainValidatorsEndpoint = `/all_validators`;

export const chainPoolEndpoint = `/chain_pool`;

export const chainBlockHeightDetailsEndpont = (height) =>
  `/block_height_details?height=${height}`;

export const chainBlockHeightTxsEndpoint = (height) =>
  `/block_height_txs?height=${height}`;

export const chainTxsByHashEndpoint = (hash) => `/chain_txs_hash?hash=${hash}`;

export const chainValidatorsDetailsEndpoint = (address) =>
  `/chain_validator_details?address=${address}`;

export const chainValidatorsSlashingSigningInfosDetailsEndpoint = (
  cons_address
) =>
  `/chain_validator_slashing_signing_info_details?cons_address=${cons_address}`;

export const chainValidatorDelegationsEndpoint = (validator_addr) =>
  `/chain_validator_delegations?validator_addr=${validator_addr}`;

export const chainValidatorUnDelegationsEndpoint = (validator_addr) =>
  `/chain_validator_undelegations?validator_addr=${validator_addr}`;

export const chainValidatorReDelegationsEndpoint = (delegator_addr) =>
  `/chain_validator_undelegations?delegator_addr=${delegator_addr}`;

export const consensusStateEndpoint = `/chain_consensus`;

export const mintingParamsEndpoint = `/chain_minting_params`;

export const govParamsEndpoint = (params_type) =>
  `/chain_gov_params?params_type=${params_type}`;

export const slashingParamsEndpoint = `/chain_slashing_params`;

export const stakingParamsEndpoint = `/chain_staking_params`;

export const distributionParamsEndpoint = `/chain_distribution_params`;

export const nodeInfoEndpoint = `/chain_node_info`;

export const proposalsEndpoint = `/chain_proposals`;

export const proposalDetailsEndpoint = (proposal_id) =>
  `/chain_proposal_details?proposal_id=${proposal_id}`;

export const proposalVotingOptionsEndpoint = (id) =>
  `/chain_proposal_voting_options?id=${id}`;

export const proposalDepositsEndpoint = (id) =>
  `/chain_proposal_deposits?id=${id}`;

export const authAccountEndpoint = (address) =>
  `/chain_auth_account?address=${address}`;

export const accountBalanceEndpoint = (address) =>
  `/chain_account_balance?address=${address}`;

export const accountDelegationRewardsEndpoint = (delegator_address) =>
  `/chain_account_delegation_rewaards?delegator_address=${delegator_address}`;

export const accountDelegationsEndpoint = (delegator_address) =>
  `/chain_account_delegations?delegator_address=${delegator_address}`;

export const accountReDelegationsEndpoint = (delegator_address) =>
  `/umee/chain_account_redelegations?delegator_address=${delegator_address}`;

export const accountUnDelegationsEndpoint = (delegator_address) =>
  `/chain_account_undelegations?delegator_address=${delegator_address}`;
