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
   
  getBlocks.map(d => {
    
    const getAllTxsOnBlockHeight = useGetChainTxsQuery(d?.height)
    console.log(getAllTxsOnBlockHeight)
  })


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