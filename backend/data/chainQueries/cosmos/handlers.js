const getCache = require("../../../redis/getCache");
const setCache = require("../../../redis/setCache");
const fetchData = require("..");
const { getLatestBlocks, getAllTxs } = require("../../dbQueries");
const endpoints = require("../../endpoints.jsx");

//Set the caching time in seconds (e.g., 600 seconds = 10Mins)
const cacheExpirationInSeconds = 600;

const latestBlocksHandler = (blockModel) => async (req, res) => {
  try {
    const data = await getLatestBlocks(req, res, blockModel);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const allTxsHandler = (txModel) => async (req, res) => {
  try {
    const data = await getAllTxs(req, res, txModel);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const allValidatorsHandler = (apis) => async (req, res) => {
  try {
    let data = null;

    for (const api of apis) {
      const cacheKey = api.address + endpoints.allChainValidators;
      data = await getCache(cacheKey);

      if (!data) {
        // If data is not found in the cache, make an API request
        data = await fetchData(api.address + endpoints.allChainValidators);
        await setCache(cacheKey, data, cacheExpirationInSeconds);
      }

      if (data) {
        // If data is found (either in cache or fetched from an API), break out of the loop
        res.json(data);
        return;
      }
    }

    // If all API providers failed to fetch data, send an error response
    res.status(500).json({ error: "All API requests failed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const activeValidatorsHandler = (apis) => async (req, res) => {
  try {
    let data = null;

    for (const api of apis) {
      const cacheKey = api.address + endpoints.activeChainValidators;
      data = await getCache(cacheKey);

      if (!data) {
        // If data is not found in the cache, make an API request
        data = await fetchData(api.address + endpoints.activeChainValidators);
        await setCache(cacheKey, data, cacheExpirationInSeconds);
      }

      if (data) {
        // If data is found (either in cache or fetched from an API), break out of the loop
        res.json(data);
        return;
      }
    }

    // If all API providers failed to fetch data, send an error response
    res.status(500).json({ error: "All API requests failed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const chainValidatorsDetailsHandler = (apis) => async (req, res) => {
  const address = req.query.address;
  try {
    let data = null;

    for (const api of apis) {
      const cacheKey = api.address + endpoints.chainValidatorsDetails(address);
      data = await getCache(cacheKey);

      if (!data) {
        // If data is not found in the cache, make an API request
        data = await fetchData(
          api.address + endpoints.chainValidatorsDetails(address)
        );
        await setCache(cacheKey, data, cacheExpirationInSeconds);
      }

      if (data) {
        // If data is found (either in cache or fetched from an API), break out of the loop
        res.json(data);
        return;
      }
    }

    // If all API providers failed to fetch data, send an error response
    res.status(500).json({ error: "All API requests failed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const chainInflationHandler = (apis) => async (req, res) => {
  try {
    let data = null;

    for (const api of apis) {
      const cacheKey = api.address + endpoints.chainInflation;
      data = await getCache(cacheKey);

      if (!data) {
        // If data is not found in the cache, make an API request
        data = await fetchData(api.address + endpoints.chainInflation);
        await setCache(cacheKey, data, cacheExpirationInSeconds);
      }

      if (data) {
        // If data is found (either in cache or fetched from an API), break out of the loop
        res.json(data);
        return;
      }
    }

    // If all API providers failed to fetch data, send an error response
    res.status(500).json({ error: "All API requests failed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const chainCommunityPoolHandler = (apis) => async (req, res) => {
  try {
    let data = null;

    for (const api of apis) {
      const cacheKey = api.address + endpoints.chainCommunityPool;
      data = await getCache(cacheKey);

      if (!data) {
        // If data is not found in the cache, make an API request
        data = await fetchData(api.address + endpoints.chainCommunityPool);
        await setCache(cacheKey, data, cacheExpirationInSeconds);
      }

      if (data) {
        // If data is found (either in cache or fetched from an API), break out of the loop
        res.json(data);
        return;
      }
    }

    // If all API providers failed to fetch data, send an error response
    res.status(500).json({ error: "All API requests failed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const chainPoolHandler = (apis) => async (req, res) => {
  try {
    let data = null;

    for (const api of apis) {
      const cacheKey = api.address + endpoints.chainPool;
      data = await getCache(cacheKey);

      if (!data) {
        // If data is not found in the cache, make an API request
        data = await fetchData(api.address + endpoints.chainPool);
        await setCache(cacheKey, data, cacheExpirationInSeconds);
      }

      if (data) {
        // If data is found (either in cache or fetched from an API), break out of the loop
        res.json(data);
        return;
      }
    }

    // If all API providers failed to fetch data, send an error response
    res.status(500).json({ error: "All API requests failed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const chainBlockHeightDetailsHandler = (apis) => async (req, res) => {
  const height = req.query.height;

  try {
    let data = null;

    for (const api of apis) {
      const cacheKey = api.address + endpoints.chainBlockHeightDetails(height);
      data = await getCache(cacheKey);

      if (!data) {
        // If data is not found in the cache, make an API request
        data = await fetchData(
          api.address + endpoints.chainBlockHeightDetails(height)
        );
        await setCache(cacheKey, data, cacheExpirationInSeconds);
      }

      if (data) {
        // If data is found (either in cache or fetched from an API), break out of the loop
        res.json(data);
        return;
      }
    }

    // If all API providers failed to fetch data, send an error response
    res.status(500).json({ error: "All API requests failed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const chainBlockHeightTxsHandler = (apis) => async (req, res) => {
  const height = req.query.height;

  try {
    let data = null;

    for (const api of apis) {
      const cacheKey = api.address + endpoints.chainBlockHeightTxs(height);
      data = await getCache(cacheKey);

      if (!data) {
        // If data is not found in the cache, make an API request
        data = await fetchData(
          api.address + endpoints.chainBlockHeightTxs(height)
        );
        await setCache(cacheKey, data, cacheExpirationInSeconds);
      }

      if (data) {
        // If data is found (either in cache or fetched from an API), break out of the loop
        res.json(data);
        return;
      }
    }

    // If all API providers failed to fetch data, send an error response
    res.status(500).json({ error: "All API requests failed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const chainTxsByHashHandler = (apis) => async (req, res) => {
  const hash = req.query.hash;

  try {
    let data = null;

    for (const api of apis) {
      const cacheKey = api.address + endpoints.chainTxsByHash(hash);
      data = await getCache(cacheKey);

      if (!data) {
        // If data is not found in the cache, make an API request
        data = await fetchData(api.address + endpoints.chainTxsByHash(hash));
        await setCache(cacheKey, data, cacheExpirationInSeconds);
      }

      if (data) {
        // If data is found (either in cache or fetched from an API), break out of the loop
        res.json(data);
        return;
      }
    }

    // If all API providers failed to fetch data, send an error response
    res.status(500).json({ error: "All API requests failed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const chainValidatorsSlashingSigningInfosDetailsHandler =
  (apis) => async (req, res) => {
    const cons_address = req.query.cons_address;

    try {
      let data = null;

      for (const api of apis) {
        const cacheKey =
          api.address +
          endpoints.chainValidatorsSlashingSigningInfosDetails(cons_address);
        data = await getCache(cacheKey);

        if (!data) {
          // If data is not found in the cache, make an API request
          data = await fetchData(
            api.address +
              endpoints.chainValidatorsSlashingSigningInfosDetails(cons_address)
          );
          await setCache(cacheKey, data, cacheExpirationInSeconds);
        }

        if (data) {
          // If data is found (either in cache or fetched from an API), break out of the loop
          res.json(data);
          return;
        }
      }

      // If all API providers failed to fetch data, send an error response
      res.status(500).json({ error: "All API requests failed" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

const chainValidatorDelegationsHandler = (apis) => async (req, res) => {
  const validator_address = req.query.validator_address;

  try {
    let data = null;

    for (const api of apis) {
      const cacheKey =
        api.address + endpoints.chainValidatorDelegations(validator_address);
      data = await getCache(cacheKey);

      if (!data) {
        // If data is not found in the cache, make an API request
        data = await fetchData(
          api.address + endpoints.chainValidatorDelegations(validator_address)
        );
        await setCache(cacheKey, data, cacheExpirationInSeconds);
      }

      if (data) {
        // If data is found (either in cache or fetched from an API), break out of the loop
        res.json(data);
        return;
      }
    }

    // If all API providers failed to fetch data, send an error response
    res.status(500).json({ error: "All API requests failed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const chainValidatorUnDelegationsHandler = (apis) => async (req, res) => {
  const validator_address = req.query.validator_address;

  try {
    let data = null;

    for (const api of apis) {
      const cacheKey =
        api.address + endpoints.chainValidatorUnDelegations(validator_address);
      data = await getCache(cacheKey);

      if (!data) {
        // If data is not found in the cache, make an API request
        data = await fetchData(
          api.address + endpoints.chainValidatorUnDelegations(validator_address)
        );
        await setCache(cacheKey, data, cacheExpirationInSeconds);
      }

      if (data) {
        // If data is found (either in cache or fetched from an API), break out of the loop
        res.json(data);
        return;
      }
    }

    // If all API providers failed to fetch data, send an error response
    res.status(500).json({ error: "All API requests failed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const chainValidatorReDelegationsHandler = (apis) => async (req, res) => {
  const delegator_address = req.query.delegator_address;

  try {
    let data = null;

    for (const api of apis) {
      const cacheKey =
        api.address + endpoints.chainValidatorReDelegations(delegator_address);
      data = await getCache(cacheKey);

      if (!data) {
        // If data is not found in the cache, make an API request
        data = await fetchData(
          api.address + endpoints.chainValidatorReDelegations(delegator_address)
        );
        await setCache(cacheKey, data, cacheExpirationInSeconds);
      }

      if (data) {
        // If data is found (either in cache or fetched from an API), break out of the loop
        res.json(data);
        return;
      }
    }

    // If all API providers failed to fetch data, send an error response
    res.status(500).json({ error: "All API requests failed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const chainConsensusStateHandler = (rpcs) => async (req, res) => {
  try {
    let data = null;

    for (const rpc of rpcs) {
      const cacheKey = rpc.address + endpoints.consensusState;
      data = await getCache(cacheKey);

      if (!data) {
        // If data is not found in the cache, make an API request
        try {
          data = await fetchData(rpc.address + endpoints.consensusState);
          await setCache(cacheKey, data, cacheExpirationInSeconds);
        } catch (error) {
          console.error(
            `Error fetching data from ${rpc.address}: ${error.message}`
          );
          // Continue to the next API if this one fails
          continue;
        }
      }

      if (data) {
        // If data is found (either in cache or fetched from an API), break out of the loop
        res.json(data);
        return;
      }
    }

    // If all API providers failed to fetch data, send an error response
    res.status(500).json({ error: "All API requests failed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const chainMintingParamsHandler = (apis) => async (req, res) => {
  try {
    let data = null;

    for (const api of apis) {
      const cacheKey = api.address + endpoints.mintingParams;
      data = await getCache(cacheKey);

      if (!data) {
        // If data is not found in the cache, make an API request
        try {
          data = await fetchData(api.address + endpoints.mintingParams);
          await setCache(cacheKey, data, cacheExpirationInSeconds);
        } catch (error) {
          console.error(
            `Error fetching data from ${api.address}: ${error.message}`
          );
          // Continue to the next API if this one fails
          continue;
        }
      }

      if (data) {
        // If data is found (either in cache or fetched from an API), break out of the loop
        res.json(data);
        return;
      }
    }

    // If all API providers failed to fetch data, send an error response
    res.status(500).json({ error: "All API requests failed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const chainGovParamsHandler = (apis) => async (req, res) => {
  const params_type = req.query.params_type;

  try {
    let data = null;

    for (const api of apis) {
      const cacheKey = api.address + endpoints.govParams(params_type);
      data = await getCache(cacheKey);

      if (!data) {
        // If data is not found in the cache, make an API request
        data = await fetchData(api.address + endpoints.govParams(params_type));
        await setCache(cacheKey, data, cacheExpirationInSeconds);
      }

      if (data) {
        // If data is found (either in cache or fetched from an API), break out of the loop
        res.json(data);
        return;
      }
    }

    // If all API providers failed to fetch data, send an error response
    res.status(500).json({ error: "All API requests failed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const chainSlashingParamsHandler = (apis) => async (req, res) => {
  try {
    let data = null;

    for (const api of apis) {
      const cacheKey = api.address + endpoints.slashingParams;
      data = await getCache(cacheKey);

      if (!data) {
        // If data is not found in the cache, make an API request
        data = await fetchData(api.address + endpoints.slashingParams);
        await setCache(cacheKey, data, cacheExpirationInSeconds);
      }

      if (data) {
        // If data is found (either in cache or fetched from an API), break out of the loop
        res.json(data);
        return;
      }
    }

    // If all API providers failed to fetch data, send an error response
    res.status(500).json({ error: "All API requests failed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const chainStakingParamsHandler = (apis) => async (req, res) => {
  try {
    let data = null;

    for (const api of apis) {
      const cacheKey = api.address + endpoints.stakingParams;
      data = await getCache(cacheKey);

      if (!data) {
        // If data is not found in the cache, make an API request
        data = await fetchData(api.address + endpoints.stakingParams);
        await setCache(cacheKey, data, cacheExpirationInSeconds);
      }

      if (data) {
        // If data is found (either in cache or fetched from an API), break out of the loop
        res.json(data);
        return;
      }
    }

    // If all API providers failed to fetch data, send an error response
    res.status(500).json({ error: "All API requests failed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const chainDistributionParamsHandler = (apis) => async (req, res) => {
  try {
    let data = null;

    for (const api of apis) {
      const cacheKey = api.address + endpoints.distributionParams;
      data = await getCache(cacheKey);

      if (!data) {
        // If data is not found in the cache, make an API request
        data = await fetchData(api.address + endpoints.distributionParams);
        await setCache(cacheKey, data, cacheExpirationInSeconds);
      }

      if (data) {
        // If data is found (either in cache or fetched from an API), break out of the loop
        res.json(data);
        return;
      }
    }

    // If all API providers failed to fetch data, send an error response
    res.status(500).json({ error: "All API requests failed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const chainNodeInfoHandler = (apis) => async (req, res) => {
  try {
    let data = null;

    for (const api of apis) {
      const cacheKey = api.address + endpoints.nodeInfo;
      data = await getCache(cacheKey);

      if (!data) {
        // If data is not found in the cache, make an API request
        data = await fetchData(api.address + endpoints.nodeInfo);
        await setCache(cacheKey, data, cacheExpirationInSeconds);
      }

      if (data) {
        // If data is found (either in cache or fetched from an API), break out of the loop
        res.json(data);
        return;
      }
    }

    // If all API providers failed to fetch data, send an error response
    res.status(500).json({ error: "All API requests failed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const chainProposalsHandler = (apis) => async (req, res) => {
  try {
    let data = null;

    for (const api of apis) {
      const cacheKey = api.address + endpoints.proposals;
      data = await getCache(cacheKey);

      if (!data) {
        // If data is not found in the cache, make an API request
        data = await fetchData(api.address + endpoints.proposals);
        await setCache(cacheKey, data, cacheExpirationInSeconds);
      }

      if (data) {
        // If data is found (either in cache or fetched from an API), break out of the loop
        res.json(data);
        return;
      }
    }

    // If all API providers failed to fetch data, send an error response
    res.status(500).json({ error: "All API requests failed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const chainProposalDetailsHandler = (apis) => async (req, res) => {
  const proposal_id = req.query.proposal_id;

  try {
    let data = null;

    for (const api of apis) {
      const cacheKey = api.address + endpoints.proposalDetails(proposal_id);
      data = await getCache(cacheKey);

      if (!data) {
        // If data is not found in the cache, make an API request
        data = await fetchData(
          api.address + endpoints.proposalDetails(proposal_id)
        );
        await setCache(cacheKey, data, cacheExpirationInSeconds);
      }

      if (data) {
        // If data is found (either in cache or fetched from an API), break out of the loop
        res.json(data);
        return;
      }
    }

    // If all API providers failed to fetch data, send an error response
    res.status(500).json({ error: "All API requests failed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const chainProposalVotingOptionsHandler = (apis) => async (req, res) => {
  const id = req.query.id;

  try {
    let data = null;

    for (const api of apis) {
      const cacheKey = api.address + endpoints.proposalVotingOptions(id);
      data = await getCache(cacheKey);

      if (!data) {
        // If data is not found in the cache, make an API request
        data = await fetchData(
          api.address + endpoints.proposalVotingOptions(id)
        );
        await setCache(cacheKey, data, cacheExpirationInSeconds);
      }

      if (data) {
        // If data is found (either in cache or fetched from an API), break out of the loop
        res.json(data);
        return;
      }
    }

    // If all API providers failed to fetch data, send an error response
    res.status(500).json({ error: "All API requests failed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const chainProposalTallyOptionsHandler = (apis) => async (req, res) => {
  const id = req.query.id;

  try {
    let data = null;

    for (const api of apis) {
      const cacheKey = api.address + endpoints.proposalTallyOptions(id);
      data = await getCache(cacheKey);

      if (!data) {
        // If data is not found in the cache, make an API request
        data = await fetchData(
          api.address + endpoints.proposalTallyOptions(id)
        );
        await setCache(cacheKey, data, cacheExpirationInSeconds);
      }

      if (data) {
        // If data is found (either in cache or fetched from an API), break out of the loop
        res.json(data);
        return;
      }
    }

    // If all API providers failed to fetch data, send an error response
    res.status(500).json({ error: "All API requests failed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const chainProposalDepositsHandler = (apis) => async (req, res) => {
  const id = req.query.id;

  try {
    let data = null;

    for (const api of apis) {
      const cacheKey = api.address + endpoints.proposalDeposits(id);
      data = await getCache(cacheKey);

      if (!data) {
        // If data is not found in the cache, make an API request
        data = await fetchData(api.address + endpoints.proposalDeposits(id));
        await setCache(cacheKey, data, cacheExpirationInSeconds);
      }

      if (data) {
        // If data is found (either in cache or fetched from an API), break out of the loop
        res.json(data);
        return;
      }
    }

    // If all API providers failed to fetch data, send an error response
    res.status(500).json({ error: "All API requests failed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const chainAuthAccountHandler = (apis) => async (req, res) => {
  const address = req.query.address;

  try {
    let data = null;

    for (const api of apis) {
      const cacheKey = api.address + endpoints.authAccount(address);
      data = await getCache(cacheKey);

      if (!data) {
        // If data is not found in the cache, make an API request
        data = await fetchData(api.address + endpoints.authAccount(address));
        await setCache(cacheKey, data, cacheExpirationInSeconds);
      }

      if (data) {
        // If data is found (either in cache or fetched from an API), break out of the loop
        res.json(data);
        return;
      }
    }

    // If all API providers failed to fetch data, send an error response
    res.status(500).json({ error: "All API requests failed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const chainAccountTxsByEventsHandler = (apis) => async (req, res) => {
  const address = req.query.address;

  try {
    let data = null;

    for (const api of apis) {
      const cacheKey = api.address + endpoints.accountTxsByEvents(address);
      data = await getCache(cacheKey);

      if (!data) {
        // If data is not found in the cache, make an API request
        data = await fetchData(
          api.address + endpoints.accountTxsByEvents(address)
        );
        await setCache(cacheKey, data, cacheExpirationInSeconds);
      }

      if (data) {
        // If data is found (either in cache or fetched from an API), break out of the loop
        res.json(data);
        return;
      }
    }

    // If all API providers failed to fetch data, send an error response
    res.status(500).json({ error: "All API requests failed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const chainAccountBalanceHandler = (apis) => async (req, res) => {
  const address = req.query.address;

  try {
    let data = null;

    for (const api of apis) {
      const cacheKey = api.address + endpoints.accountBalance(address);
      data = await getCache(cacheKey);

      if (!data) {
        // If data is not found in the cache, make an API request
        data = await fetchData(api.address + endpoints.accountBalance(address));
        await setCache(cacheKey, data, cacheExpirationInSeconds);
      }

      if (data) {
        // If data is found (either in cache or fetched from an API), break out of the loop
        res.json(data);
        return;
      }
    }

    // If all API providers failed to fetch data, send an error response
    res.status(500).json({ error: "All API requests failed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const chainAccountDelegationRewardsHandler = (apis) => async (req, res) => {
  const delegator_address = req.query.delegator_address;

  try {
    let data = null;

    for (const api of apis) {
      const cacheKey =
        api.address + endpoints.accountDelegationRewards(delegator_address);
      data = await getCache(cacheKey);

      if (!data) {
        // If data is not found in the cache, make an API request
        data = await fetchData(
          api.address + endpoints.accountDelegationRewards(delegator_address)
        );
        await setCache(cacheKey, data, cacheExpirationInSeconds);
      }

      if (data) {
        // If data is found (either in cache or fetched from an API), break out of the loop
        res.json(data);
        return;
      }
    }

    // If all API providers failed to fetch data, send an error response
    res.status(500).json({ error: "All API requests failed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const chainAccountDelegationsHandler = (apis) => async (req, res) => {
  const delegator_address = req.query.delegator_address;

  try {
    let data = null;

    for (const api of apis) {
      const cacheKey =
        api.address + endpoints.accountDelegations(delegator_address);
      data = await getCache(cacheKey);

      if (!data) {
        // If data is not found in the cache, make an API request
        data = await fetchData(
          api.address + endpoints.accountDelegations(delegator_address)
        );
        await setCache(cacheKey, data, cacheExpirationInSeconds);
      }

      if (data) {
        // If data is found (either in cache or fetched from an API), break out of the loop
        res.json(data);
        return;
      }
    }

    // If all API providers failed to fetch data, send an error response
    res.status(500).json({ error: "All API requests failed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const chainAccountReDelegationsHandler = (apis) => async (req, res) => {
  const delegator_address = req.query.delegator_address;

  try {
    let data = null;

    for (const api of apis) {
      const cacheKey =
        api.address + endpoints.accountReDelegations(delegator_address);
      data = await getCache(cacheKey);

      if (!data) {
        // If data is not found in the cache, make an API request
        data = await fetchData(
          api.address + endpoints.accountReDelegations(delegator_address)
        );
        await setCache(cacheKey, data, cacheExpirationInSeconds);
      }

      if (data) {
        // If data is found (either in cache or fetched from an API), break out of the loop
        res.json(data);
        return;
      }
    }

    // If all API providers failed to fetch data, send an error response
    res.status(500).json({ error: "All API requests failed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const chainAccountUnDelegationsHandler = (apis) => async (req, res) => {
  const delegator_address = req.query.delegator_address;

  try {
    let data = null;

    for (const api of apis) {
      const cacheKey =
        api.address + endpoints.accountUnDelegations(delegator_address);
      data = await getCache(cacheKey);

      if (!data) {
        // If data is not found in the cache, make an API request
        data = await fetchData(
          api.address + endpoints.accountUnDelegations(delegator_address)
        );
        await setCache(cacheKey, data, cacheExpirationInSeconds);
      }

      if (data) {
        // If data is found (either in cache or fetched from an API), break out of the loop
        res.json(data);
        return;
      }
    }

    // If all API providers failed to fetch data, send an error response
    res.status(500).json({ error: "All API requests failed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  latestBlocksHandler,
  allTxsHandler,
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
