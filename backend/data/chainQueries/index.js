const fetch = require("node-fetch");
const endPoints = require("../endpoints.jsx");

const getAllValidators = async (api) => {
  try {
    const response = await fetch(api + endPoints.allChainValidators);
    if (response.status !== 200 || !response) {
      throw "Error Querying Chain API";
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const getActiveValidators = async (api) => {
  try {
    const response = await fetch(api + endPoints.activeChainValidators);
    if (response.status !== 200 || !response) {
      throw "Error Querying Chain API";
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const getChainInflation = async (api) => {
  try {
    const response = await fetch(api + endPoints.chainInflation);
    if (response.status !== 200 || !response) {
      throw "Error Querying Chain API";
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const getChainCommunityPool = async (api) => {
  try {
    const response = await fetch(api + endPoints.chainCommunityPool);
    if (response.status !== 200 || !response) {
      throw "Error Querying Chain API";
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const getChainPool = async (api) => {
  try {
    const response = await fetch(api + endPoints.chainPool);
    if (response.status !== 200 || !response) {
      throw "Error Querying Chain API";
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const getChainBlockHeightDetails = async (api, height) => {
  try {
    const response = await fetch(
      api + endPoints.chainBlockHeightDetails(height)
    );
    if (response.status !== 200 || !response) {
      throw "Error Querying Chain API";
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const getChainBlockHeightTxs = async (api, height) => {
  try {
    const response = await fetch(api + endPoints.chainBlockHeightTxs(height));
    if (response.status !== 200 || !response) {
      throw "Error Querying Chain API";
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const getChainTxsByHash = async (api, hash) => {
  try {
    const response = await fetch(api + endPoints.chainTxsByHash(hash));
    if (response.status !== 200 || !response) {
      throw "Error Querying Chain API";
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const getChainValidatorsDetails = async (api, address) => {
  try {
    const response = await fetch(
      api + endPoints.chainValidatorsDetails(address)
    );
    if (response.status !== 200 || !response) {
      throw "Error Querying Chain API";
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const getChainValidatorsSlashingSigningInfosDetails = async (
  api,
  cons_adddress
) => {
  try {
    const response = await fetch(
      api + endPoints.chainValidatorsSlashingSigningInfosDetails(cons_adddress)
    );
    if (response.status !== 200 || !response) {
      throw "Error Querying Chain API";
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const getChainValidatorDelegations = async (api, validator_adddress) => {
  try {
    const response = await fetch(
      api + endPoints.chainValidatorDelegations(validator_adddress)
    );
    if (response.status !== 200 || !response) {
      throw "Error Querying Chain API";
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const getChainValidatorUnDelegations = async (api, validator_adddress) => {
  try {
    const response = await fetch(
      api + endPoints.chainValidatorUnDelegations(validator_adddress)
    );
    if (response.status !== 200 || !response) {
      throw "Error Querying Chain API";
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const getChainValidatorReDelegations = async (api, delegator_adddress) => {
  try {
    const response = await fetch(
      api + endPoints.chainValidatorReDelegations(delegator_adddress)
    );
    if (response.status !== 200 || !response) {
      throw "Error Querying Chain API";
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const getChainConsensusState = async (rpc) => {
  try {
    const response = await fetch(rpc + endPoints.consensusState);
    if (response.status !== 200 || !response) {
      throw "Error Querying Chain API";
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const getChainMintingParams = async (api) => {
  try {
    const response = await fetch(api + endPoints.mintingParams);
    if (response.status !== 200 || !response) {
      throw "Error Querying Chain API";
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const getChainGovParams = async (api, params_type) => {
  try {
    const response = await fetch(api + endPoints.govParams(params_type));
    if (response.status !== 200 || !response) {
      throw "Error Querying Chain API";
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const getChainSlashingParams = async (api) => {
  try {
    const response = await fetch(api + endPoints.slashingParams);
    if (response.status !== 200 || !response) {
      throw "Error Querying Chain API";
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const getChainStakingParams = async (api) => {
  try {
    const response = await fetch(api + endPoints.stakingParams);
    if (response.status !== 200 || !response) {
      throw "Error Querying Chain API";
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const getChainDistributionParams = async (api) => {
  try {
    const response = await fetch(api + endPoints.distributionParams);
    if (response.status !== 200 || !response) {
      throw "Error Querying Chain API";
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const getChainNodeInfo = async (api) => {
  try {
    const response = await fetch(api + endPoints.nodeInfo);
    if (response.status !== 200 || !response) {
      throw "Error Querying Chain API";
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const getChainProposals = async (api) => {
  try {
    const response = await fetch(api + endPoints.proposals);
    if (response.status !== 200 || !response) {
      throw "Error Querying Chain API";
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const getChainProposalDetails = async (api, proposal_id) => {
  try {
    const response = await fetch(api + endPoints.proposalDetails(proposal_id));
    if (response.status !== 200 || !response) {
      throw "Error Querying Chain API";
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const getChainProposalVotingOptions = async (api, id) => {
  try {
    const response = await fetch(api + endPoints.proposalVotingOptions(id));
    if (response.status !== 200 || !response) {
      throw "Error Querying Chain API";
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const getChainProposalTallyOptions = async (api, id) => {
  try {
    const response = await fetch(api + endPoints.proposalTallyOptions(id));
    if (response.status !== 200 || !response) {
      throw "Error Querying Chain API";
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const getChainProposalDeposits = async (api, id) => {
  try {
    const response = await fetch(api + endPoints.proposalDeposits(id));
    if (response.status !== 200 || !response) {
      throw "Error Querying Chain API";
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const getChainAuthAccount = async (api, address) => {
  try {
    const response = await fetch(api + endPoints.authAccount(address));
    if (response.status !== 200 || !response) {
      throw "Error Querying Chain API";
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const getChainAccountTxsByEvents = async (api, address) => {
  try {
    const response = await fetch(api + endPoints.accountTxsByEvents(address));
    if (response.status !== 200 || !response) {
      throw "Error Querying Chain API";
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const getChainAccountBalance = async (api, address) => {
  try {
    const response = await fetch(api + endPoints.accountBalance(address));
    if (response.status !== 200 || !response) {
      throw "Error Querying Chain API";
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const getChainAccountDelegationRewards = async (api, delegator_address) => {
  try {
    const response = await fetch(
      api + endPoints.accountDelegationRewards(delegator_address)
    );
    if (response.status !== 200 || !response) {
      throw "Error Querying Chain API";
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const getChainAccountDelegations = async (api, delegator_address) => {
  try {
    const response = await fetch(
      api + endPoints.accountDelegations(delegator_address)
    );
    if (response.status !== 200 || !response) {
      throw "Error Querying Chain API";
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const getChainAccountReDelegations = async (api, delegator_address) => {
  try {
    const response = await fetch(
      api + endPoints.accountReDelegations(delegator_address)
    );
    if (response.status !== 200 || !response) {
      throw "Error Querying Chain API";
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const getChainAccountUnDelegations = async (api, delegator_address) => {
  try {
    const response = await fetch(
      api + endPoints.accountUnDelegations(delegator_address)
    );
    if (response.status !== 200 || !response) {
      throw "Error Querying Chain API";
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllValidators,
  getActiveValidators,
  getChainInflation,
  getChainCommunityPool,
  getChainPool,
  getChainBlockHeightDetails,
  getChainBlockHeightTxs,
  getChainTxsByHash,
  getChainValidatorsDetails,
  getChainValidatorsSlashingSigningInfosDetails,
  getChainValidatorDelegations,
  getChainValidatorUnDelegations,
  getChainValidatorReDelegations,
  getChainConsensusState,
  getChainMintingParams,
  getChainGovParams,
  getChainSlashingParams,
  getChainStakingParams,
  getChainDistributionParams,
  getChainNodeInfo,
  getChainProposals,
  getChainProposalDetails,
  getChainProposalVotingOptions,
  getChainProposalTallyOptions,
  getChainProposalDeposits,
  getChainAuthAccount,
  getChainAccountTxsByEvents,
  getChainAccountBalance,
  getChainAccountDelegationRewards,
  getChainAccountDelegations,
  getChainAccountReDelegations,
  getChainAccountUnDelegations,
};
