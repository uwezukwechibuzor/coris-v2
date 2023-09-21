const endpoints = require("../../endpoints.jsx");
const fetch = require("node-fetch");

const fetchBitcoinTxs = async (api, txModel) => {
  try {
    // Get transactions data in each block
    const getTxs = await fetch(api + endpoints.bitcoinTxs);

    if (!getTxs.ok) {
      throw new Error(
        `Unexpected response: ${getTxs.status} - ${getTxs.statusText}`
      );
    }

    // Check the Content-Type header
    const contentType = getTxs.headers.get("Content-Type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Invalid response content type: not JSON");
    }

    const responseText = await getTxs.text();

    // Check if the response body is empty
    if (!responseText) {
      throw new Error("Empty response body");
    }

    // Attempt to parse the response as JSON
    let txData;
    try {
      txData = JSON.parse(responseText);
    } catch (jsonError) {
      console.error(`Failed to parse JSON response: ${jsonError}`);
      throw new Error("Invalid JSON response");
    }

    // Check if txData and txData.data.list are not null
    if (!txData || !txData.data || !txData.data.list) {
      return;
    }

    const mapTxData = txData.data.list.map(async (tx) => {
      // Skip saving if a transaction with the same hash already exists
      const existingTx = await txModel.findOne({ hash: tx.hash });
      if (existingTx) {
        return;
      }

      // Convert inputs and outputs arrays to objects
      const inputs = tx.inputs.map((input) => ({
        prev_addresses: input.prev_addresses,
        prev_position: input.prev_position,
        prev_type: input.prev_type,
        prev_value: input.prev_value,
        sequence: input.sequence,
      }));

      const outputs = tx.outputs.map((output) => ({
        addresses: output.addresses,
        value: output.value,
        type: output.type,
        spent_by_tx_position: output.spent_by_tx_position,
      }));

      const transactionsData = new txModel({
        block_height: tx.block_height,
        hash: tx.hash,
        block_time: tx.block_time,
        fee: tx.fee,
        is_coinbase: tx.is_coinbase,
        is_double_spend: tx.is_double_spend,
        outputs_count: tx.outputs_count,
        outputs_value: tx.outputs_value,
        inputs,
        outputs,
      });

      // Save the data
      await transactionsData.save();
    });

    // To ensure that the function waits for the save operations to complete before returning
    await Promise.all(mapTxData);
  } catch (err) {
    console.error(err);
    // Handle errors here, you might want to log them or perform specific error-handling actions
  }
};

module.exports = fetchBitcoinTxs;
