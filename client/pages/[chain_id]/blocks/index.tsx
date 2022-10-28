import React, { useEffect, useState } from "react";
import Layout from "../../../components/layout/Layout";
import BlocksContent from "../../../components/Blocks";
import axios from "axios";
import {
  allTxsEndpoint,
  chainActiveValidatorsEndpoint,
  latestBlocksEndpoint,
} from "../../../lib/chainApiEndpoints";
import { BaseChainApi } from "../../../lib/baseChainApi";

function Blocks(props) {
  const [getBlocks, setBlocks] = useState([]);
  const [getAllTxs, setAllTxs] = useState([]);
  const [getActiveValidators, setActiveValidators] = useState([]);

  const queryTotalBlocks = 15;
  const queryTotalTxs = 20;

  const chain_id = props?.chain_id?.chain_id;

  useEffect(() => {
    axios
      .get(BaseChainApi() + latestBlocksEndpoint(queryTotalBlocks))
      .then((response) => {
        setBlocks(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [getBlocks]);

  useEffect(() => {
    axios
      .get(BaseChainApi() + allTxsEndpoint(queryTotalTxs))
      .then((response) => {
        setAllTxs(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [getAllTxs]);

  useEffect(() => {
    axios
      .get(BaseChainApi() + chainActiveValidatorsEndpoint)
      .then((response) => {
        setActiveValidators(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <BlocksContent
        getBlocks={getBlocks}
        getAllTxs={getAllTxs}
        activeValidators={getActiveValidators}
        chain_id={chain_id}
      />
    </>
  );
}

export default Blocks;

Blocks.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
