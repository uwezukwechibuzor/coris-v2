const express = require("express");
const cors = require('cors');
const {blockModel, txsModel } = require("./models");
const app = express();
const cron = require("node-cron");
const fetch = require("node-fetch");
require("dotenv").config();

const fetchURL = process.env.COSMOS_REST

cron.schedule('*/3 * * * * *', function(){
    //cron to run at every 5sec to get latest blocks
        getBlocksAsync()
});


async function getBlocksAsync() {
    try{
      let response = await fetch(`${fetchURL}/blocks/latest`);
      const block = await response.json();
    
      //get transactions data in each blocks
     const getTxs = await fetch(`${fetchURL}/cosmos/tx/v1beta1/txs?events=tx.height=${block.block.header.height}`)
     const txData = await getTxs.json();
    txData.tx_responses.map(tx => {
        const transactionsData = new txsModel({
          txHash: tx.txhash
          type: tx.txhash
          result: 'uu',
          amount: 10,
          fee: 10,
          height: 111,
          time: 'ss'
        })
        
        //save the data 
        transactionsData.save((err)=>{
            try {
                if (err){
                    throw('blockdata can not be duplicated')
                }
            } catch(e) {
                console.log(e)
            }
        })
    })
      


      const blockData =  new blockModel({
        height: block.block.header.height,
        hash: block.block_id.hash,
        proposer: block.block.header.proposer_address,
        noTxs: block.block.data.txs.length,
        time: block.block.header.time,
        signatures: block.block.last_commit.signatures.map(validatorDetails => { return {validator_address: validatorDetails.validator_address}})
    })
   //console.log(blockData)
         blockData.save((err)=>{
            try {
                if (err){
                    throw('blockdata can not be duplicated')
                }
            } catch(e) {
                console.log(e)
            }
        })

     }catch(err){
      console.error(err);
      // Handle errors here
    }
  }

  
app.use(cors({
    origin: '*'
}));

//return blocks by specifying the limit
app.get('/blocks/latest', async function(req, res) {
    try{  
       const limit = req.query.limit
      const blocks = await blockModel.find({}, {}, { sort: {'_id': -1}}).limit(limit)
       res.json(blocks) 
      //console.log(blocks)
}
catch(error){
    res.status(500).json({message: error.message})
}

});


/*app.get('/blocks', async function(req, res) {
    try{  

      const blocks = await blockModel.find({}, {}, { sort: {'_id': -1}}).select('height hash proposer noTxs time').limit(1500)
       res.json(blocks) 
      //console.log(blocks)
}
catch(error){
    res.status(500).json({message: error.message})
}

});
*/

module.exports = app;