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
  result: {
    type: Number,
    required: true,
    unique: false,
  },
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
const umeeBlocks = mongoose.model("umee-Blocks", BlockSchema);
const umeeTransactions = mongoose.model("umee-Transactions", TxsSchema);


//set cosmos chain schema
const cosmosBlocks = mongoose.model("cosmos-Blocks", BlockSchema);
const cosmosTransactions = mongoose.model("cosmos-Transactions", TxsSchema);


module.exports = {
  umeeBlockModel: umeeBlocks,
  umeeTxsModel: umeeTransactions,
  cosmosBlockModel: cosmosBlocks,
  cosmosTxsModel: cosmosTransactions,
};
