import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import BlocksContent from "../../components/Blocks";
import axios from 'axios'
import { useGetChainTxsQuery } from "../../lib/chainApi";

function Blocks () {
  
  const [getBlocks, setBlocks] = useState([])
  const [getAllTxs, setGetAllTxs] = useState([])

  const queryTotalBlocks = 20;
  const queryTotalTxs = 2000;

  //get 
  let getBlocksAPi = process.env.NEXT_PUBLIC_GetBlocks
  useEffect(() => {
    axios.get(`${getBlocksAPi}/blocks/latest?limit=${queryTotalBlocks}`).
      then((response) => {
          setBlocks(response.data)
      }).catch((error) => {
          console.log(error)
      })
  }, [getBlocks])
  
   //get all latest transactions
   let getTxsAPi = process.env.NEXT_PUBLIC_GetBlocks
   useEffect(() => {
       axios.get(`${getBlocksAPi}/txs?limit=${queryTotalTxs}`).then((response) => {
           setGetAllTxs(response.data)
       }).catch((error) => {
           console.log(error)
       })
   }, [getAllTxs])


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