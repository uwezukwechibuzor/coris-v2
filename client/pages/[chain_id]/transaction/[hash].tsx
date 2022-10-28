import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "../../../components/layout/Layout";
import TransactionContents from "../../../components/Transaction";
import { BaseChainApi } from "../../../lib/baseChainApi";
import { chainTxsByHashEndpoint } from "../../../lib/chainApiEndpoints";
import { useRouter } from "next/router";

function TransactionDetails(props) {
  const [getChainTxsByHash, setChainTxsByHash] = useState(null);

  const router = useRouter();
  const query = router.query;

  const chain_id = props?.chain_id?.chain_id;

  //fetch Txs By Hash
  useEffect(() => {
    axios
      .get(BaseChainApi() + chainTxsByHashEndpoint(query?.hash))
      .then((response) => {
        setChainTxsByHash(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [query.hash]);

  return (
    <>
      <TransactionContents txDetails={getChainTxsByHash} chain_id={chain_id} />
    </>
  );
}

export default TransactionDetails;

TransactionDetails.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
