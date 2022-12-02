import React, { useEffect, useState } from "react";
import Layout from "../../../components/layout/Layout";
import { useRouter } from "next/router";
import BlockHeightContent from "../../../components/Blocks/Details";
import {
  chainActiveValidatorsEndpoint,
  chainBlockHeightDetailsEndpont,
  chainBlockHeightTxsEndpoint,
} from "../../../lib/chainApiEndpoints";
import axios from "axios";
import { BaseChainApi } from "../../../lib/baseChainApi";

function BlocksDetails(props) {
  const [getActiveValidators, setActiveValidators] = useState([]);
  const [getTxsByHeight, setTxsByHeight] = useState(null);
  const [getBlockHeightDetails, setBlockHeightDetails] = useState(null);

  const router = useRouter();
  const query = router.query;

  const chain_id = props?.chain_id?.chain_id;

  useEffect(() => {
    axios
      .get(
        BaseChainApi(chain_id) + chainBlockHeightDetailsEndpont(query?.height)
      )
      .then((response) => {
        setBlockHeightDetails(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [query.height, chain_id]);

  //fetch Transactions in a Block Height
  useEffect(() => {
    axios
      .get(BaseChainApi(chain_id) + chainBlockHeightTxsEndpoint(query.height))
      .then((response) => {
        setTxsByHeight(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [query.height, chain_id]);

  //active validators
  useEffect(() => {
    axios
      .get(BaseChainApi(chain_id) + chainActiveValidatorsEndpoint)
      .then((response) => {
        setActiveValidators(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [query.height, chain_id]);

  const blockDetailsData = {
    title: "Block Details",
    blockData: getBlockHeightDetails,
    txs: getTxsByHeight,
    activeValidators: getActiveValidators,
  };

  return (
    <>
      <BlockHeightContent {...blockDetailsData} chain_id={chain_id} />
    </>
  );
}

export default BlocksDetails;

BlocksDetails.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
