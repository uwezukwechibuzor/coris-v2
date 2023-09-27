const endpoints = require("../../endpoints.jsx");
const fetch = require("node-fetch");

// Error handling function
const handleError = (message, error) => {
  // Check if the error is a duplicate key error, and if so, simply return without logging it
  if (error.code === 11000) {
    return;
  }
  console.error(message, error);
  // Handle errors here, including any fallback logic if needed
};

const fetchLatestBlocksAndTxs = async (apis, txModel, blockModel) => {
  let response, block;
  let successFlag = false;
  try {
    // Parameter validation
    if (
      !apis ||
      !Array.isArray(apis) ||
      apis.length === 0 ||
      !txModel ||
      !blockModel
    ) {
      throw new Error("Invalid parameters");
    }

    for (const api of apis) {
      try {
        if (successFlag) {
          break;
        }

        response = await fetch(api.address + endpoints.latestBlocks);
        if (response.ok) {
          // If the request is successful, proceed to process it
          successFlag = true;
          block = await response.json();

          // Get transactions data in each block
          let txData;
          try {
            const getTxs = await fetch(
              api.address +
                endpoints.chainBlockHeightTxs(block.block.header.height)
            );
            if (getTxs.ok) {
              txData = await getTxs.json();
            } else {
              // Continue to the next API if this one fails
              continue;
            }
          } catch (apiError) {
            // Continue to the next API if this one fails
            continue;
          }

          // Check if txData and txData.tx_responses are not null
          if (!txData || !txData.tx_responses) {
            // Continue to the next API if this one doesn't have valid data
            continue;
          }

          const mapTxData = txData.tx_responses.map(async (tx) => {
            try {
              // Attempt to find an existing transaction by txHash
              const existingTx = await txModel.findOne({ txHash: tx.txhash });

              if (!existingTx) {
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
              } else {
                // Handle duplicate key error (txHash already exists)
                throw new Error(
                  `Transaction with txHash ${tx.txhash} already exists.`
                );
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
                  return {
                    validator_address: validatorDetails.validator_address,
                  };
                }
              ),
            });

            await blockData.save();
          }
        } else {
          // Continue to the next API if this one fails
          continue;
        }
      } catch (apiError) {
        // Continue to the next API if this one fails
        continue;
      }
    }
  } catch (err) {
    handleError("An error occurred:", err);
  }
};

module.exports = fetchLatestBlocksAndTxs;
