import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import BlocksContent from "../../components/Blocks";
import axios from 'axios'

function Blocks () {
  
  //get blocks
  const [getBlocks, setBlocks] = useState([])
  const queryTotalBlocks = 1500
  let getBlocksAPi = process.env.NEXT_PUBLIC_GetBlocks
  useEffect(() => {
      axios.get(`${getBlocksAPi}/blocks`).then((response) => {
          setBlocks(response.data)
      }).catch((error) => {
          console.log(error)
      })
  }, [getBlocks])
  console.log(getBlocks)
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