const mongoose = require("mongoose");

const BlockSchema = new mongoose.Schema({
  height: {
    type: Number,
    required: true,
    unique: true,
  },
  hash: {
    type: String,
    required: true,
    unique: true,
  },
  proposer: {
    type: String,
    required: true,
    unique: false,
  },
  noTxs: {
    type: Number,
    required: true,
    unique: false,
  },
  time: {
    type: String,
    required: true,
    unique: false,
  },
  signatures: [],
});

const TxsSchema = new mongoose.Schema({
  txHash: {
    type: String,
    required: true,
    unique: true,
  },
  messages: [],
  memo : String,
  result: {
    type: Number,
    required: true,
    unique: false,
  },
  raw_log: String,
  fee: [],
  height: {
    type: Number,
    required: true,
    unique: false,
  },
  time: {
    type: String,
    required: true,
    unique: false,
  },
});

//set umee chain schema
const bitcoinBlocks = mongoose.model("bitcoin-Blocks", BlockSchema);
const bitcoinTransactions = mongoose.model("bitcoin-Transactions", TxsSchema);



module.exports = {
  bitcoinBlockModel: bitcoinBlocks,
  bitcoinTxsModel: bitcoinTransactions,
};
