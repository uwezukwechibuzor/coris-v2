const express = require("express");
const app = express();
const { createBitcoinCronJob } = require("../../../cron.js");
const corsMiddleware = require("../../../corsMiddleware.js");
const Model = require("../../../Model/bitcoin/Models.jsx");
const bitcoinTxsHandler = require("../../../data/chainQueries/bitcoin/handlers.js");
require("dotenv").config();

const BITCOIN_API = process.env.BITCOIN_REST_API;

let RESTAPI = [];

if (BITCOIN_API) {
  try {
    RESTAPI = JSON.parse(BITCOIN_API);
  } catch (error) {
    console.error("Error parsing BITCOIN_API :", error);
  }
}

//cron task for Bitcoin
createBitcoinCronJob(RESTAPI, Model.bitcoinTxsModel);

// Define a helper function to prefix the routes with "/bitcoin"
function bitcoinRoute(routePrefix, path, handler) {
  return app.get(`/${routePrefix}${path}`, corsMiddleware, handler);
}

// Define the routes
const defineRoutes = (routePrefix, txsModel) => {
  bitcoinRoute(routePrefix, "/txs", bitcoinTxsHandler(txsModel));
};

defineRoutes("bitcoin", Model.bitcoinTxsModel);

module.exports = app;
