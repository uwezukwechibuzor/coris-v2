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

//set agoric chain schema
const agoricBlocks = mongoose.model("agoric-Blocks", BlockSchema);
const agoricTransactions = mongoose.model("agoric-Transactions", TxsSchema);

//set akash chain schema
const akashBlocks = mongoose.model("akash-Blocks", BlockSchema);
const akashTransactions = mongoose.model("akash-Transactions", TxsSchema);

//set crescent chain schema
const crescentBlocks = mongoose.model("crescent-Blocks", BlockSchema);
const crescentTransactions = mongoose.model("crescent-Transactions", TxsSchema);

//set chihuahua chain schema
const chihuahuaBlocks = mongoose.model("chihuahua-Blocks", BlockSchema);
const chihuahuaTransactions = mongoose.model("chihuahua-Transactions", TxsSchema);

//set juno chain schema
const junoBlocks = mongoose.model("juno-Blocks", BlockSchema);
const junoTransactions = mongoose.model("juno-Transactions", TxsSchema);


//set stargaze chain schema
const stargazeBlocks = mongoose.model("stargaze-Blocks", BlockSchema);
const stargazeTransactions = mongoose.model("stargaze-Transactions", TxsSchema);


module.exports = {
  umeeBlockModel: umeeBlocks,
  umeeTxsModel: umeeTransactions,
  
  cosmosBlockModel: cosmosBlocks,
  cosmosTxsModel: cosmosTransactions,
  
  agoricBlockModel: agoricBlocks,
  agoricTxsModel: agoricTransactions,

  akashBlockModel: akashBlocks,
  akashTxsModel: akashTransactions,

  crescentBlockModel: crescentBlocks,
  crescentTxsModel: crescentTransactions,

  chihuahuaBlockModel: chihuahuaBlocks,
  chihuahuaTxsModel: chihuahuaTransactions,

  junoBlockModel: junoBlocks,
  junoTxsModel: junoTransactions,

  stargazeBlockModel: stargazeBlocks,
  stargazeTxsModel: stargazeTransactions,

};
