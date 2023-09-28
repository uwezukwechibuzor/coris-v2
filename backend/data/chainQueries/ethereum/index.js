const { Network, Alchemy } = require("alchemy-sdk");
const { Web3 } = require("web3");
const Model = require("../../../Model/ethereum/Model.jsx");

// Initialize a Web3 instance (connect to an Ethereum node if needed)
const web3 = new Web3();

const settings = {
  apiKey: "iHiSvMYKjRZEuwF_ma9IecHZUjiHiagG",
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

async function fetchEthereumTxs() {
  try {
    // Retry logic for network errors
    const retryCount = 3;
    let attempt = 0;
    let block;

    while (attempt < retryCount) {
      attempt++;

      try {
        // Get the latest block
        block = await alchemy.core.getBlock("latest");
        break;
      } catch (networkError) {
        console.error(
          `Network error (attempt ${attempt}):`,
          networkError.message
        );

        // Add delay before retrying (you can adjust the delay duration)
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    }

    if (!block) {
      console.error(
        "Failed to retrieve the latest block after multiple attempts."
      );
      return;
    }

    // Create an array to store transaction data objects
    const transactionsDataArray = [];

    // Fetch transaction details for each transaction in the block
    for (const txHash of block.transactions) {
      const tx = await alchemy.core.getTransaction(txHash);
      const value = web3.utils.hexToNumberString(tx.value._hex);
      // convert value to ethers
      const convertValue = value / 10 ** 18;

      // Create a new transaction data object and push it to the array
      const transactionsData = new Model.ethereumTxsModel({
        blockNumber: tx.blockNumber,
        hash: tx.hash,
        timestamp: block.timestamp,
        transactionIndex: tx.transactionIndex,
        from: tx.from,
        to: tx.to,
        value: convertValue,
        nonce: tx.nonce,
      });

      transactionsDataArray.push(transactionsData);
    }

    // Insert all transaction data objects in a single batch
    await Model.ethereumTxsModel.insertMany(transactionsDataArray);
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error, you can log it and continue
      return;
    } else {
      // Handle other errors
      console.error("Error:", error);
    }
  }
}

module.exports = fetchEthereumTxs;
