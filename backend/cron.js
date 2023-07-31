const cron = require("node-cron");
require("dotenv").config()
const Model = require("./Model/Models.jsx");
const fetchLatestBlocksAndTxs = require("./data/chainQueries/latestBlocksAndTxs.js");

 //cron to run at every 3sec to get latest blocks

 const agoricCron = cron.schedule("*/3 * * * * *", async () => {
    try{
      await fetchLatestBlocksAndTxs(
      process.env.AGORIC_REST_API,
      Model.agoricTxsModel,
      Model.agoricBlockModel,
    );
    } catch(error) {
        console.error("Error", error)
    }
  });

const akashcCron = cron.schedule("*/3 * * * * *", async () => {
    try{
      await fetchLatestBlocksAndTxs(
      process.env.AKASH_REST_API,
      Model.akashTxsModel, Model.akashBlockModel);
    } catch(error) {
        console.error("Error", error)
    }
  });

const chihuahuaCron = cron.schedule("*/3 * * * * *", async () => {
    try{
      await fetchLatestBlocksAndTxs(
      process.env.CHIHUAHUA_REST_API,
      Model.chihuahuaTxsModel,
      Model.chihuahuaBlockModel,
    );
    } catch(error) {
        console.error("Error", error)
    }
  });

const cosmosCron = cron.schedule("*/3 * * * * *", async () => {
    try{
       await fetchLatestBlocksAndTxs(process.env.COSMOS_REST_API, Model.cosmosTxsModel, Model.cosmosBlockModel);
    } catch(error) {
        console.error("Error", error)
    }
  });

const crescentCron = cron.schedule("*/3 * * * * *", async () => {
    try{
      await fetchLatestBlocksAndTxs(
      process.env.CRESCENT_REST_API,
      Model.crescentTxsModel,
      Model.crescentBlockModel,
    );
    } catch(error) {
        console.error("Error", error)
    }
  });

const junoCron = cron.schedule("*/3 * * * * *", async () => {
    try{
        await fetchLatestBlocksAndTxs(process.env.JUNO_REST_API, Model.junoTxsModel, Model.junoBlockModel);
    } catch(error) {
        console.error("Error", error)
    }
  });

const stargazeCron = cron.schedule("*/3 * * * * *", async () => {
    try{
    await fetchLatestBlocksAndTxs(
      process.env.STARGAZE_REST_API,
      Model.stargazeTxsModel,
      Model.stargazeBlockModel,
    );
    } catch(error) {
        console.error("Error", error)
    }
  });

const umeeCron = cron.schedule("*/3 * * * * *", async () => {
    try{
        await fetchLatestBlocksAndTxs(process.env.UMEE_REST_API, Model.umeeTxsModel, Model.umeeBlockModel);
    } catch(error) {
        console.error("Error", error)
    }
  });

module.exports = {
    agoricCron,
    akashcCron,
    stargazeCron,
    chihuahuaCron,
    cosmosCron,
    crescentCron,
    junoCron,
    umeeCron,
}