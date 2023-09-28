const { Network, Alchemy } = require("alchemy-sdk");
const Web3 = require("web3");

// Initialize a Web3 instance (connect to an Ethereum node if needed)
const web3 = new Web3();

const settings = {
  apiKey: "iHiSvMYKjRZEuwF_ma9IecHZUjiHiagG",
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

async function fetchEthereumTransactions(txModel) {
  try {
    // Get the latest block
    const block = await alchemy.core.getBlock("latest");

    // Fetch transaction details for each transaction in the block
    for (const txHash of block.transactions) {
      const tx = await alchemy.core.getTransaction(txHash);
      const value = web3.utils.hexToNumberString(tx.value._hex);

      // convert value to ethers
      const convertValue = value / 10 ** 18;

      // Create a new transaction data object
      const transactionsData = new txModel({
        blockNumber: block.blockNumber,
        hash: tx.hash,
        timestamp: block.timestamp,
        transactionIndex: tx.transactionIndex,
        from: tx.from,
        to: tx.to,
        value: convertValue,
        nonce: tx.nonce,
      });

      // Save the transaction data
      await transactionsData.save();
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

module.exports = fetchEthereumTransactions;
