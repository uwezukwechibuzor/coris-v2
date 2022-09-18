import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import BlocksContent from "../../components/Blocks";
import axios from 'axios'
import { useGetChainTxsQuery } from "../../lib/chainApi";

function Blocks () {
  
  //get blocks
  const [getBlocks, setBlocks] = useState([])
  const queryTotalBlocks = 20
  let getBlocksAPi = process.env.NEXT_PUBLIC_GetBlocks
  useEffect(() => {
    axios.get(`${getBlocksAPi}/blocks/latest?limit=${queryTotalBlocks}`).
      then((response) => {
          setBlocks(response.data)
      }).catch((error) => {
          console.log(error)
      })
  }, [getBlocks])

   //get transactions data in each blocks
   const t = async () => {
    getBlocks.map(h =+)
   const txx = await fetch(`http://66.206.5.26:1317/cosmos/tx/v1beta1/txs?events=tx.height=${12002990}`)
   const txData = await txx.json();

   //console.log(txData)
   }
  
   t()

  return (
   <> 
  <BlocksContent getBlocks={getBlocks} />
  </>
  );
}


export default Blocks

Blocks.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>
};