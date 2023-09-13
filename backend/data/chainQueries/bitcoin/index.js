const endpoints = require("../../endpoints.jsx");
const fetchData = require("../index.js");

const fetchBitcoinTxs = async (api, txModel) => {
  try {
    // Get transactions data in each block
    const getTxs = await fetchData(api + endpoints.bitcoinTxs);
    if (!getTxs.ok) throw new Error("unexpected response");

    const txData = await getTxs.json();
    //const mapTxData = txData.tx_responses.map(async (tx) => {
    // Skip saving if transaction with the same hash already exists
    // const existingTx = await txModel.findOne({ hash: tx.hash });
    //if (existingTx) {
    //return;
    //}
    console.log(txData);
    const transactionsData = new txModel({
      //txHash: tx.txhash,
      //messages: tx.tx.body.messages,
      //memo: tx.tx.body.memo,
      //result: tx.code,
      //raw_log: tx.raw_log,
      //fee: tx.tx.auth_info.fee.amount,
      //height: tx.height,
      //time: tx.timestamp,
    });

    // Save the data
    await transactionsData.save();

    // });

    // To ensure that the function waits for the save operations to complete before returning
    // await Promise.all(mapTxData);
  } catch (err) {
    console.error(err);
    // Handle errors here
  }
};

module.exports = fetchBitcoinTxs;
