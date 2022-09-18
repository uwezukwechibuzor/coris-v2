import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import BlocksContent from "../../components/Blocks";
import axios from 'axios'
import { useGetChainTxsQuery } from "../../lib/chainApi";

function Blocks () {
  
  const [getBlocks, setBlocks] = useState([])
  const [getAllTxs, setGetAllTxs] = useState([])
  const [currentPage, setCurrentPage] = useState(0);

  const queryTotalBlocks = 20;
  const queryTotalTxs = 100;

  //get 20 latest blocks 
  let getAPi = process.env.NEXT_PUBLIC_GetBlocks
  useEffect(() => {
    axios.get(`${getAPi}/blocks/latest?limit=${queryTotalBlocks}`).
      then((response) => {
          setBlocks(response.data)
      }).catch((error) => {
          console.log(error)
      })
  }, [getBlocks])
  

   //get all latest transactions
   useEffect(() => {
       axios.get(`${getAPi}/txs?limit=${queryTotalTxs}`).then((response) => {
           setGetAllTxs(response.data)
       }).catch((error) => {
           console.log(error)
       })
   }, [getAllTxs])
   //console.log(getAllTxs)
   const PER_PAGE = 10;
   const offset = currentPage * PER_PAGE;
   const currentPageData = getAllTxs.slice(offset, offset + PER_PAGE)
   const pageCount = Math.ceil(getAllTxs.length / PER_PAGE);
   console.log(cu, pageCount)

  return (
   <> 
  <BlocksContent getBlocks={getBlocks} getAllTxs={getAllTxs} />
  </>
  );
}


export default Blocks

Blocks.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>
};