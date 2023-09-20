const endpoints = require("../../endpoints.jsx");
const fetch = require("node-fetch");

const fetchBitcoinTxs = async (api, txModel) => {
  try {
    // Get transactions data in each block
    const getTxs = await fetch(api + endpoints.bitcoinTxs);
    if (!getTxs.ok) {
      throw new Error("Unexpected response");
    }

    const txData = await getTxs.json();

    // Check if txData and txData.data.list are not null
    if (!txData || !txData.data || !txData.data.list) {
      return;
    }

    const mapTxData = txData.data.list.map(async (tx) => {
      // Skip saving if transaction with the same hash already exists
      const existingTx = await txModel.findOne({ hash: tx.hash });
      if (existingTx) {
        return;
      }

      const transactionsData = new txModel({
        block_height: tx.block_height,
        hash: tx.hash,
        block_time: tx.block_time,
        fee: tx.fee,
        is_coinbase: tx.is_coinbase,
        is_double_spend: tx.is_double_spend,
        outputs_count: tx.outputs_count,
        outputs_value: tx.outputs_value,
        inputs: tx.inputs,
        outputs: tx.outputs,
      });

      // Save the data
      await transactionsData.save();
    });

    // To ensure that the function waits for the save operations to complete before returning
    await Promise.all(mapTxData);
  } catch (err) {
    console.error(err);
    // Handle errors here
  }
};

module.exports = fetchBitcoinTxs;
