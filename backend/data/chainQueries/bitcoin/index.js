const endpoints = require("../../endpoints.jsx");
const fetch = require("node-fetch");

const fetchBitcoinTxs = async (apis, txModel) => {
  try {
    // Parameter validation
    if (!apis || !Array.isArray(apis) || apis.length === 0 || !txModel) {
      throw new Error("Invalid parameters");
    }

    for (const api of apis) {
      try {
        // Make an HTTP request to the current API endpoint to get Bitcoin transactions
        const getTxs = await fetch(api + endpoints.bitcoinTxs);

        // Check if the response is not OK (e.g., HTTP status code is not in the 200 range)
        if (!getTxs.ok) {
          throw new Error(
            `Unexpected response: ${getTxs.status} - ${getTxs.statusText}`
          );
        }

        // Check the Content-Type header to ensure it's JSON
        const contentType = getTxs.headers.get("Content-Type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Invalid response content type: not JSON");
        }

        // Read the response text
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
          // Continue to the next API if this one doesn't have valid data
          continue;
        }

        // Map and process each transaction in the response
        const mapTxData = txData.data.list.map(async (tx) => {
          // Skip saving if a transaction with the same hash already exists
          const existingTx = await txModel.findOne({ hash: tx.hash });
          if (existingTx) {
            return;
          }

          // Create a new transaction data object
          const transactionsData = new txModel({
            block_height: tx.block_height,
            hash: tx.hash,
            block_time: tx.block_time,
            fee: tx.fee,
            is_coinbase: tx.is_coinbase,
            is_double_spend: tx.is_double_spend,
            outputs_count: tx.outputs_count,
            outputs_value: tx.outputs_value,
            witness_hash: tx.witness_hash,
            inputs: tx.inputs,
            outputs: tx.outputs,
          });

          // Save the transaction data
          await transactionsData.save();
        });

        // Ensure that the function waits for all save operations to complete before continuing
        await Promise.all(mapTxData);
      } catch (apiError) {
        // Continue to the next API if this one fails
        continue;
      }
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = fetchBitcoinTxs;
