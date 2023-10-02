const mongoose = require("mongoose");

const TxsSchema = new mongoose.Schema({
    blockNumber: {
        type: Number,
        required: true,
        unique: false,
    },
    hash: {
    type: String,
    required: true,
    unique: true,
  },
  timestamp: Number,
  transactionIndex: Number,
  from: String,
  to: String,
  value: String,
  nonce: Number

});

//set bitcoin chain schema
const ethereumTransactions = mongoose.model("ethereum-Transactions", TxsSchema);

module.exports = {
  ethereumTxsModel: ethereumTransactions,
};
