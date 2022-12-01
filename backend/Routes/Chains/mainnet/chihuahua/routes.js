const express = require("express");
const cors = require("cors");
const Model = require("../../../../Model/Models.jsx");
const app = express();
const cron = require("node-cron");
const fetch = require("node-fetch");
require("dotenv").config();
var endPoints = require("../../../../data/endpoints.jsx");

cron.schedule("*/3 * * * * *", function () {
  //cron to run at every 5sec to get latest blocks
  getBlocksAsync();
});

const API = process.env.CHIHUAHUA_REST_API;
const RPC = process.env.CHIHUAHUA_RPC_API;

async function getBlocksAsync() {
  try {
    let response = await fetch(`${API}${endPoints.latestBlocks}`);
    if (!response.ok) throw new Error("unexpected response");

    const block = await response.json();

    //get transactions data in each blocks
    const getTxs = await fetch(
      `${API}/${endPoints.chainBlockHeightTxs(block.block.header.height)}`
    );
    if (!getTxs.ok) throw new Error("unexpected response");

    const txData = await getTxs.json();
    txData.tx_responses.map((tx) => {
      const transactionsData = new Model.chihuahuaTxsModel({
        txHash: tx.txhash,
        messages: tx.tx.body.messages,
        result: tx.code,
        fee: tx.tx.auth_info.fee.amount,
        height: tx.height,
        time: tx.timestamp,
      });

      //save the data
      transactionsData.save((err) => {
        try {
          if (err) {
            throw "TxsData can not be duplicated";
          }
        } catch (e) {
          console.log(e);
        }
      });
    });

    //saving latest blocks
    const blockData = new Model.chihuahuaBlockModel({
      height: block.block.header.height,
      hash: block.block_id.hash,
      proposer: block.block.header.proposer_address,
      noTxs: block.block.data.txs.length,
      time: block.block.header.time,
      signatures: block.block.last_commit.signatures.map((validatorDetails) => {
        return { validator_address: validatorDetails.validator_address };
      }),
    });
    //console.log(blockData)
    blockData.save((err) => {
      try {
        if (err) {
          throw "blockdata can not be duplicated";
        }
      } catch (e) {
        console.log(e);
      }
    });
  } catch (err) {
    console.error(err);
    // Handle errors here
  }
}

app.use(
  cors({
    origin: "*",
  })
);

//return blocks by specifying the limit
app.get("/chihuahua/blocks/latest", async function (req, res) {
  try {
    const limit = req.query.limit;
    const blocks = await Model.chihuahuaBlockModel
      .find({}, {}, { sort: { _id: -1 } })
      .limit(limit);
    res.json(blocks);
    //console.log(blocks)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get all transactions
app.get("/chihuahua/txs", async function (req, res) {
  try {
    const limit = req.query.limit;
    const txs = await Model.chihuahuaTxsModel
      .find({}, {}, { sort: { _id: -1 } })
      .limit(limit);
    res.json(txs);
    //console.log(blocks)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Reverse Proxy For all the chain endpoints
//get all chain validators
app.get("/chihuahua/all_validators", async (req, res) => {
  try {
    const response = await fetch(`${API}${endPoints.allChainValidators}`);
    if (response.status !== 200 || !response) {
      throw "Error Querying Chain API";
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get active validators
app.get("/chihuahua/active_validators", async (req, res) => {
  try {
    const response = await fetch(`${API}${endPoints.activeChainValidators}`);
    if (response.status !== 200 || !response) {
      throw "Error Querying Chain API";
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get chain inflation
app.get("/chihuahua/chain_inflation", async (req, res) => {
  try {
    const response = await fetch(`${API}${endPoints.chainInflation}`);
    if (response.status !== 200 || !response) {
      throw "Error Querying Chain API";
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get chain community pool
app.get("/chihuahua/chain_community_pool", async (req, res) => {
  try {
    const response = await fetch(`${API}${endPoints.chainCommunityPool}`);
    if (response.status !== 200 || !response) {
      throw "Error Querying Chain API";
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get chain pool
app.get("/chihuahua/chain_pool", async (req, res) => {
  try {
    const response = await fetch(`${API}${endPoints.chainPool}`);
    if (response.status !== 200 || !response) {
      throw "Error Querying Chain API";
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get chain block height details
app.get("/chihuahua/block_height_details", async (req, res) => {
  try {
    const height = req.query.height;
    const response = await fetch(
      API + endPoints.chainBlockHeightDetails(height)
    );
    if (response.status !== 200 || !response) {
      throw "Error Querying Chain API";
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get chain block height Txs
app.get("/chihuahua/block_height_txs", async (req, res) => {
  try {
    const height = req.query.height;
    const response = await fetch(
      `${API}${endPoints.chainBlockHeightTxs(height)}`
    );
    if (response.status !== 200 || !response) {
      throw "Error Querying Chain API";
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get chain Txs by Hash
app.get("/chihuahua/chain_txs_hash", async (req, res) => {
  try {
    const hash = req.query.hash;
    const response = await fetch(`${API}${endPoints.chainTxsByHash(hash)}`);
    if (response.status !== 200 || !response) {
      throw "Error Querying Chain API";
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get chain validators details
app.get("/chihuahua/chain_validator_details/:address", async (req, res) => {
  try {
    const adddress = req.params.address;
    const response = await fetch(
      API + endPoints.chainValidatorsDetails(adddress)
    );
    if (response.status !== 200 || !response) {
      throw "Error Querying Chain API";
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get chain validators Slashing Signing Info Details
app.get(
  "/chihuahua/chain_validator_slashing_signing_info_details/:cons_adddress",
  async (req, res) => {
    try {
      const cons_adddress = req.params.cons_adddress;
      const response = await fetch(
        `${API}${endPoints.chainValidatorsSlashingSigningInfosDetails(
          cons_adddress
        )}`
      );
      if (response.status !== 200 || !response) {
        throw "Error Querying Chain API";
      }
      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

//get chain validators delegations
app.get(
  "/chihuahua/chain_validator_delegations/:validator_adddress",
  async (req, res) => {
    try {
      const validator_adddress = req.params.validator_adddress;
      const response = await fetch(
        API + endPoints.chainValidatorDelegations(validator_adddress)
      );
      if (response.status !== 200 || !response) {
        throw "Error Querying Chain API";
      }
      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

//get chain validators undelegations
app.get(
  "/chihuahua/chain_validator_undelegations/:validator_adddress",
  async (req, res) => {
    try {
      const validator_adddress = req.params.validator_adddress;
      const response = await fetch(
        `${API}${endPoints.chainValidatorUnDelegations(validator_adddress)}`
      );
      if (response.status !== 200 || !response) {
        throw "Error Querying Chain API";
      }
      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

//get chain validators redelegations
app.get(
  "/chihuahua/chain_validator_undelegations/:delegator_adddress",
  async (req, res) => {
    try {
      const delegator_adddress = req.params.delegator_adddress;
      const response = await fetch(
        `${API}${endPoints.chainValidatorReDelegations(delegator_adddress)}`
      );
      if (response.status !== 200 || !response) {
        throw "Error Querying Chain API";
      }
      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

//get chain validators consensus state
app.get("/chihuahua/chain_consensus", async (req, res) => {
  try {
    const response = await fetch(`${RPC}${endPoints.consensusState}`);
    if (response.status !== 200 || !response) {
      throw "Error Querying Chain API";
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get chain minting params
app.get("/chihuahua/chain_minting_params", async (req, res) => {
  try {
    const response = await fetch(`${API}${endPoints.mintingParams}`);
    if (response.status !== 200 || !response) {
      throw "Error Querying Chain API";
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get chain governance params
app.get("/chihuahua/chain_gov_params", async (req, res) => {
  try {
    const params_type = req.query.params_type;
    const response = await fetch(`${API}${endPoints.govParams(params_type)}`);
    if (response.status !== 200 || !response) {
      throw "Error Querying Chain API";
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get chain slashing params
app.get("/chihuahua/chain_slashing_params", async (req, res) => {
  try {
    const response = await fetch(`${API}${endPoints.slashingParams}`);
    if (response.status !== 200 || !response) {
      throw "Error Querying Chain API";
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get chain staking params
app.get("/chihuahua/chain_staking_params", async (req, res) => {
  try {
    const response = await fetch(`${API}${endPoints.stakingParams}`);
    if (response.status !== 200 || !response) {
      throw "Error Querying Chain API";
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get chain distribution params
app.get("/chihuahua/chain_distribution_params", async (req, res) => {
  try {
    const response = await fetch(`${API}${endPoints.distributionParams}`);
    if (response.status !== 200 || !response) {
      throw "Error Querying Chain API";
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get chain node info
app.get("/chihuahua/chain_node_info", async (req, res) => {
  try {
    const response = await fetch(`${API}${endPoints.nodeInfo}`);
    if (response.status !== 200 || !response) {
      throw "Error Querying Chain API";
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get chain proposals
app.get("/chihuahua/chain_proposals", async (req, res) => {
  try {
    const response = await fetch(`${API}${endPoints.proposals}`);
    if (response.status !== 200 || !response) {
      throw "Error Querying Chain API";
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get chain proposal details
app.get("/chihuahua/chain_proposal_details", async (req, res) => {
  try {
    const proposal_id = req.query.proposal_id;
    const response = await fetch(
      `${API}${endPoints.proposalDetails(proposal_id)}`
    );
    if (response.status !== 200 || !response) {
      throw "Error Querying Chain API";
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get chain proposal voting options
app.get("/chihuahua/chain_proposal_voting_options", async (req, res) => {
  try {
    const id = req.query.id;
    const response = await fetch(
      `${API}${endPoints.proposalVotingOptions(id)}`
    );
    if (response.status !== 200 || !response) {
      throw "Error Querying Chain API";
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get chain proposal Tally options
app.get("/chihuahua/chain_proposal_tally_options", async (req, res) => {
  try {
    const id = req.query.id;
    const response = await fetch(`${API}${endPoints.proposalTallyOptions(id)}`);
    if (response.status !== 200 || !response) {
      throw "Error Querying Chain API";
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get chain proposal deposits
app.get("/chihuahua/chain_proposal_deposits", async (req, res) => {
  try {
    const id = req.query.id;
    const response = await fetch(`${API}${endPoints.proposalDeposits(id)}`);
    if (response.status !== 200 || !response) {
      throw "Error Querying Chain API";
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get chain auth account
app.get("/chihuahua/chain_auth_account", async (req, res) => {
  try {
    const address = req.query.address;
    const response = await fetch(`${API}${endPoints.authAccount(address)}`);
    if (response.status !== 200 || !response) {
      throw "Error Querying Chain API";
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get chain account Txs by Events
app.get("/chihuahua/chain_account_txs_by_events/:address", async (req, res) => {
  try {
    const address = req.params.address;
    const response = await fetch(
      `${API}${endPoints.accountTxsByEvents(address)}`
    );
    if (response.status !== 200 || !response) {
      throw "Error Querying Chain API";
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get chain account balance
app.get("/chihuahua/chain_account_balance", async (req, res) => {
  try {
    const address = req.query.address;
    const response = await fetch(`${API}${endPoints.accountBalance(address)}`);
    if (response.status !== 200 || !response) {
      throw "Error Querying Chain API";
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get chain account delegation rewards
app.get("/chihuahua/chain_account_delegation_rewaards", async (req, res) => {
  try {
    const delegator_address = req.query.delegator_address;
    const response = await fetch(
      `${API}${endPoints.accountDelegationRewards(delegator_address)}`
    );
    if (response.status !== 200 || !response) {
      throw "Error Querying Chain API";
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get chain account delegations
app.get("/chihuahua/chain_account_delegations", async (req, res) => {
  try {
    const delegator_address = req.query.delegator_address;
    const response = await fetch(
      `${API}${endPoints.accountDelegations(delegator_address)}`
    );
    if (response.status !== 200 || !response) {
      throw "Error Querying Chain API";
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get chain account redelegations
app.get("/chihuahua/chain_account_redelegations", async (req, res) => {
  try {
    const delegator_address = req.query.delegator_address;
    const response = await fetch(
      `${API}${endPoints.accountReDelegations(delegator_address)}`
    );
    if (response.status !== 200 || !response) {
      throw "Error Querying Chain API";
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get chain account undelegations
app.get("/chihuahua/chain_account_undelegations", async (req, res) => {
  try {
    const delegator_address = req.query.delegator_address;
    const response = await fetch(
      `${API}${endPoints.accountUnDelegations(delegator_address)}`
    );
    if (response.status !== 200 || !response) {
      throw "Error Querying Chain API";
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = app;
