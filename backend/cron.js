const cron = require("node-cron");
require("dotenv").config()
const Model = require("./Model/Models.jsx");
const fetchLatestBlocksAndTxs = require("./data/chainQueries/latestBlocksAndTxs.js");

 //cron to run at every 3sec to get latest blocks

 function createCronJob(apiUrl, txsModel, blockModel) {
   return cron.schedule("*/3 * * * * *", async () => {
     try {
       await fetchLatestBlocksAndTxs(apiUrl, txsModel, blockModel);
     } catch (error) {
       console.error("Error", error);
     }
   });
 }
 
 const agoricCron = createCronJob(
   process.env.AGORIC_REST_API,
   Model.agoricTxsModel,
   Model.agoricBlockModel
 );
 
 const akashCron = createCronJob(
   process.env.AKASH_REST_API,
   Model.akashTxsModel,
   Model.akashBlockModel
 );

const chihuahuaCron = createCronJob(
  process.env.CHIHUAHUA_REST_API,
  Model.chihuahuaTxsModel,
  Model.chihuahuaBlockModel
);

const cosmosCron = createCronJob(
  process.env.COSMOS_REST_API, 
  Model.cosmosTxsModel, 
  Model.cosmosBlockModel
);

const crescentCron = createCronJob(
  process.env.CRESCENT_REST_API,
  Model.crescentTxsModel,
  Model.crescentBlockModel,
);

const junoCron = createCronJob(
  process.env.JUNO_REST_API, 
  Model.junoTxsModel, 
  Model.junoBlockModel
);

const stargazeCron = createCronJob(
  process.env.STARGAZE_REST_API,
  Model.stargazeTxsModel,
  Model.stargazeBlockModel
);

const umeeCron = createCronJob(
  process.env.UMEE_REST_API, 
  Model.umeeTxsModel, 
  Model.umeeBlockModel
);

module.exports = {
    agoricCron,
    akashCron,
    stargazeCron,
    chihuahuaCron,
    cosmosCron,
    crescentCron,
    junoCron,
    umeeCron,
}