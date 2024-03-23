const cron = require("node-cron");
require("dotenv").config();
const fetchLatestBlocksAndTxs = require("./data/chainQueries/cosmos/latestBlocksAndTxs.js");


//cron to run at every 3sec to get latest blocks
function createCronJob(options) {
  const { apiUrl, txsModel, blockModel } = options;

  return cron.schedule("*/3 * * * * *", async () => {
    try {
      await fetchLatestBlocksAndTxs(apiUrl, txsModel, blockModel);
    } catch (error) {
      console.error("Error", error);
    }
  });
}

module.exports = {
  createCronJob,
};
