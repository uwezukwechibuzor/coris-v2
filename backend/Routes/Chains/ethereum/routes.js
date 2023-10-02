const express = require("express");
const app = express();
const corsMiddleware = require("../../../corsMiddleware.js");
const { createEthereumCronJob } = require("../../../cron.js");
const Model = require("../../../Model/ethereum/Model.jsx");
const ethereumTxsHandler = require("../../../data/chainQueries/ethereum/handlers.js");

//cron task for Bitcoin
createEthereumCronJob();

// Define a helper function to prefix the routes with "/ethereum"
function ethereumRoute(routePrefix, path, handler) {
  return app.get(`/${routePrefix}${path}`, corsMiddleware, handler);
}

// Define the routes
const ethereumRoutes = (routePrefix, txsModel) => {
  ethereumRoute(routePrefix, "/txs", ethereumTxsHandler(txsModel));
};

ethereumRoutes("ethereum", Model.ethereumTxsModel);

module.exports = app;
