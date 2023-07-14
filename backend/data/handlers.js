const { fetchData } = require("./chainQueries");
const endpoints = require("./endpoints.jsx");

const allValidatorsHandler = (api) => async (req, res) => {
  try {
    const data = await fetchData(api + endpoints.allChainValidators);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const activeValidatorsHandler = (api) => async (req, res) => {
  try {
    const data = await fetchData(api + endpoints.activeChainValidators);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const chainValidatorsDetailsHandler = (api) => async (req, res) => {
  try {
    const address = req.params.address;
    const data = await fetchData(
      api + endpoints.chainValidatorsDetails(address),
    );
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const chainInflationHandler = (api) => async (req, res) => {
  try {
    const data = await fetchData(api + endpoints.chainInflation);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const chainCommunityPoolHandler = (api) => async (req, res) => {
  try {
    const data = await fetchData(api + endpoints.chainCommunityPool);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const chainPoolHandler = (api) => async (req, res) => {
  try {
    const data = await fetchData(api + endpoints.chainPool);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const chainBlockHeightDetailsHandler = (api) => async (req, res) => {
  try {
    const height = req.query.height;
    const data = await fetchData(
      api + endpoints.chainBlockHeightDetails(height),
    );
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const chainBlockHeightTxsHandler = (api) => async (req, res) => {
  try {
    const height = req.query.height;
    const data = await fetchData(api + endpoints.chainBlockHeightTxs(height));
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const chainTxsByHashHandler = (api) => async (req, res) => {
  try {
    const hash = req.query.hash;
    const data = await fetchData(api + endpoints.chainTxsByHash(hash));
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const chainValidatorsSlashingSigningInfosDetailsHandler =
  (api) => async (req, res) => {
    try {
      const cons_adddress = req.params.cons_adddress;
      const data = await fetchData(
        api +
          endpoints.chainValidatorsSlashingSigningInfosDetails(cons_adddress),
      );
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

const chainValidatorDelegationsHandler = (api) => async (req, res) => {
  try {
    const validator_adddress = req.params.validator_adddress;
    const data = await fetchData(
      api + endpoints.chainValidatorDelegations(validator_adddress),
    );
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const chainValidatorUnDelegationsHandler = (api) => async (req, res) => {
  try {
    const validator_adddress = req.params.validator_adddress;
    const data = await fetchData(
      api + endpoints.chainValidatorUnDelegations(validator_adddress),
    );
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const chainValidatorReDelegationsHandler = (api) => async (req, res) => {
  try {
    const delegator_adddress = req.params.delegator_adddress;
    const data = await fetchData(
      api + endpoints.chainValidatorReDelegations(delegator_adddress),
    );
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const chainConsensusStateHandler = (rpc) => async (req, res) => {
  try {
    const data = await fetchData(rpc + endpoints.consensusState);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const chainMintingParamsHandler = (api) => async (req, res) => {
  try {
    const data = await fetchData(api + endpoints.mintingParams);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const chainGovParamsHandler = (api) => async (req, res) => {
  try {
    const params_type = req.query.params_type;
    const data = await fetchData(api + endpoints.govParams(params_type));
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const chainSlashingParamsHandler = (api) => async (req, res) => {
  try {
    const data = await fetchData(api + endpoints.slashingParams);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const chainStakingParamsHandler = (api) => async (req, res) => {
  try {
    const data = await fetchData(api + endpoints.stakingParams);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const chainDistributionParamsHandler = (api) => async (req, res) => {
  try {
    const data = await fetchData(api + endpoints.distributionParams);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const chainNodeInfoHandler = (api) => async (req, res) => {
  try {
    const data = await fetchData(api + endpoints.nodeInfo);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const chainProposalsHandler = (api) => async (req, res) => {
  try {
    const data = await fetchData(api + endpoints.proposals);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const chainProposalDetailsHandler = (api) => async (req, res) => {
  try {
    const proposal_id = req.query.proposal_id;
    const data = await fetchData(api + endpoints.proposalDetails(proposal_id));
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const chainProposalVotingOptionsHandler = (api) => async (req, res) => {
  try {
    const id = req.query.id;
    const data = await fetchData(api + endpoints.proposalVotingOptions(id));
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const chainProposalTallyOptionsHandler = (api) => async (req, res) => {
  try {
    const id = req.query.id;
    const data = await fetchData(api + endpoints.proposalTallyOptions(id));
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const chainProposalDepositsHandler = (api) => async (req, res) => {
  try {
    const id = req.query.id;
    const data = await fetchData(api + endpoints.proposalDeposits(id));
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const chainAuthAccountHandler = (api) => async (req, res) => {
  try {
    const address = req.query.address;
    const data = await fetchData(api + endpoints.authAccount(address));
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const chainAccountTxsByEventsHandler = (api) => async (req, res) => {
  try {
    const address = req.query.address;
    const data = await fetchData(api + endpoints.accountTxsByEvents(address));
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const chainAccountBalanceHandler = (api) => async (req, res) => {
  try {
    const address = req.query.address;
    const data = await fetchData(api + endpoints.accountBalance(address));
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const chainAccountDelegationRewardsHandler = (api) => async (req, res) => {
  try {
    const delegator_address = req.query.delegator_address;
    const data = await fetchData(
      api + endpoints.accountDelegationRewards(delegator_address),
    );
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const chainAccountDelegationsHandler = (api) => async (req, res) => {
  try {
    const delegator_address = req.query.delegator_address;
    const data = await fetchData(
      api + endpoints.accountDelegations(delegator_address),
    );
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const chainAccountReDelegationsHandler = (api) => async (req, res) => {
  try {
    const delegator_address = req.query.delegator_address;
    const data = await fetchData(
      api + endpoints.accountReDelegations(delegator_address),
    );
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const chainAccountUnDelegationsHandler = (api) => async (req, res) => {
  try {
    const delegator_address = req.query.delegator_address;
    const data = await fetchData(
      api + endpoints.accountUnDelegations(delegator_address),
    );
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  allValidatorsHandler,
  activeValidatorsHandler,
  chainValidatorsDetailsHandler,
  chainInflationHandler,
  chainCommunityPoolHandler,
  chainPoolHandler,
  chainBlockHeightDetailsHandler,
  chainBlockHeightTxsHandler,
  chainTxsByHashHandler,
  chainValidatorsSlashingSigningInfosDetailsHandler,
  chainValidatorDelegationsHandler,
  chainValidatorUnDelegationsHandler,
  chainValidatorReDelegationsHandler,
  chainConsensusStateHandler,
  chainMintingParamsHandler,
  chainGovParamsHandler,
  chainSlashingParamsHandler,
  chainStakingParamsHandler,
  chainDistributionParamsHandler,
  chainNodeInfoHandler,
  chainProposalsHandler,
  chainProposalDetailsHandler,
  chainProposalVotingOptionsHandler,
  chainProposalTallyOptionsHandler,
  chainProposalDepositsHandler,
  chainAuthAccountHandler,
  chainAccountTxsByEventsHandler,
  chainAccountBalanceHandler,
  chainAccountDelegationRewardsHandler,
  chainAccountDelegationsHandler,
  chainAccountReDelegationsHandler,
  chainAccountUnDelegationsHandler,
};
