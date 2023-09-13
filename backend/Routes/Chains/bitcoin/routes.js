const express = require("express");
const app = express();
const { createBitcoinCronJob } = require("../../../cron.js");
const corsMiddleware = require("../../../corsMiddleware.js");
const {
  allTxsHandler,
} = require("../../../data/chainQueries/cosmos/handlers.js");
const Models = require("../../../Model/bitcoin/Models.jsx");
require("dotenv").config();

const BITCOIN_API = process.env.BITCOIN_REST_API;

//cron task for Bitcoin
createBitcoinCronJob(BITCOIN_API, Models.bitcoinTxsModel);

// Define a helper function to prefix the routes with "/bitcoin"
function bitcoinRoute(path, handler) {
  return app.get(`/bitcoin${path}`, corsMiddleware, handler);
}

// Define the routes
bitcoinRoute("/txs", allTxsHandler(Models.bitcoinTxsModel));

module.exports = app;
