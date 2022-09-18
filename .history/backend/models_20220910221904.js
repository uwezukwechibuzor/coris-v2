const mongoose = require("mongoose");

const BlockSchema = new mongoose.Schema({
  height: {
    type: Number,
    required: true,
    unique: true
  },
  hash: {
    type: String,
    required: true,
    unique: true
  },
  proposer: {
    type: String,
    required: true,
    unique: false
  },
  noTxs: {
    type: Number,
    required:true,
    unique: false
  },
  time: {
    type: String,
    required: true,
    unique: false
  },
   signatures: [
  
   ]
 
});

const TxsSchema = new mongoose.Schema({
  txHash: {
    type: String,
    required: true,
    unique: true
  },
  : {
    type: String,
    required: true,
    unique: true
  },
  proposer: {
    type: String,
    required: true,
    unique: false
  },
  noTxs: {
    type: Number,
    required:true,
    unique: false
  },
  time: {
    type: String,
    required: true,
    unique: false
  },
   signatures: [
  
   ]
 
});

const Block = mongoose.model("Block", BlockSchema);
const Transactions = mongoose.model("Transactions", TxsSchema);

module.exports = Block;
module.exports = Transactions;
