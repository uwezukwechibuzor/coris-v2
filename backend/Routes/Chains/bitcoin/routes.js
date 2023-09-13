const express = require("express");
const app = express();
const { createBitcoinCronJob } = require("../../../cron.js");
const Models = require("../../../Model/bitcoin/Models.jsx");
require("dotenv").config();

const BITCOIN_API = process.env.BITCOIN_REST_API;

//cron task for agoric
createBitcoinCronJob(BITCOIN_API, Models.bitcoinTxsModel);

module.exports = app;
