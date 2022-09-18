import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import BlocksContent from "../../components/Blocks";
import axios from 'axios'
import { useGetChainTxsQuery } from "../../lib/chainApi";

function Blocks () {
  
  const [getBlocks, setBlocks] = useState([])
  const [getAllTxs, setGetAllTxs] = useState([])

  const queryTotalBlocks = 20;
  const queryTotalTxs = 1000;

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


 const [postsPerPage] = useState(5);
 const [offset, setOffset] = useState(1);
 const [pageCount, setPageCount] = useState(0)

 getAllTxs.slice(offset - 1 , offset - 1 + postsPerPage)
 setPageCount(Math.ceil(.length / postsPerPage))

 const handlePageClick = (event) => {
  const selectedPage = event.selected;
  setOffset(selectedPage + 1)
};



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