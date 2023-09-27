import { Network, Alchemy } from "alchemy-sdk";
import Web3 from "web3";

// Initialize a Web3 instance (connect to an Ethereum node if needed)
const web3 = new Web3();

const settings = {
  apiKey: "iHiSvMYKjRZEuwF_ma9IecHZUjiHiagG",
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

// Get the latest block
alchemy.core
  .getBlock("latest")
  .then(async (block) => {
    //console.log("Latest Block:", block);

    // Fetch transaction details for each transaction in the block
    for (const txHash of block.transactions) {
      const transaction = await alchemy.core.getTransaction(txHash);
      //console.log("Transaction:", transaction.value._hex);
      const decimalValue = web3.utils.hexToNumberString("0x06ef075cb1e307f0");
      console.log(`Decimal Value: ${decimalValue}`);
    }
  })
  .catch((error) => {
    console.error("Error:", error);
  });