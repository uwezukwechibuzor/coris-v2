const endpoints = require("../../endpoints.jsx");
const fetch = require("node-fetch");

const fetchLatestBlocksAndTxs = async (api, txModel, blockModel) => {
  try {
    let response = await fetch(api + endpoints.latestBlocks);
    if (!response.ok) throw new Error("Unexpected response");

    const block = await response.json();

    // Get transactions data in each block
    const getTxs = await fetch(
      api + endpoints.chainBlockHeightTxs(block.block.header.height)
    );
    if (!getTxs.ok) throw new Error("Unexpected response");

    const txData = await getTxs.json();

    // Check if txData and txData.tx_responses are not null
    if (!txData || !txData.tx_responses) {
      return;
    }

    const mapTxData = txData.tx_responses.map(async (tx) => {
      try {
        // Attempt to find an existing transaction by txHash
        const existingTx = await txModel.findOne({ txHash: tx.txhash });

        if (existingTx) {
          return;
        } else {
          const transactionsData = new txModel({
            txHash: tx.txhash,
            messages: tx.tx.body.messages,
            memo: tx.tx.body.memo,
            result: tx.code,
            raw_log: tx.raw_log,
            fee: tx.tx.auth_info.fee.amount,
            height: tx.height,
            time: tx.timestamp,
          });

          // Save the data
          await transactionsData.save();
        }
      } catch (error) {
        return;
      }
    });

    // To ensure that the function waits for the save operations to complete before returning
    await Promise.all(mapTxData);

    const existingBlock = await blockModel.findOne({
      height: block.block.header.height,
    });

    if (!existingBlock) {
      // Save latest blocks
      const blockData = new blockModel({
        height: block.block.header.height,
        hash: block.block_id.hash,
        proposer: block.block.header.proposer_address,
        noTxs: block.block.data.txs.length,
        time: block.block.header.time,
        signatures: block.block.last_commit.signatures.map(
          (validatorDetails) => {
            return { validator_address: validatorDetails.validator_address };
          }
        ),
      });

      await blockData.save();
    }
  } catch (err) {
    console.error(err);
    // Handle errors here
  }
};

module.exports = fetchLatestBlocksAndTxs;
