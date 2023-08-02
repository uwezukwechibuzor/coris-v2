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
import { activeValidators } from "../../../lib/commonQueries";
import useSWR from "swr";
import { fetcher } from "../../../lib/Util/fetcher";

function BlocksDetails(props) {
  const router = useRouter();
  const query = router.query;

  const chain_id = props?.chain_id?.chain_id;

  const { data: getBlockHeightDetails } = useSWR(
    query?.height
      ? BaseChainApi(chain_id) + chainBlockHeightDetailsEndpont(query?.height)
      : null,
    fetcher
  );

  //fetch Transactions in a Block Height
  const { data: getTxsByHeight } = useSWR(
    query?.height
      ? BaseChainApi(chain_id) + chainBlockHeightTxsEndpoint(query.height)
      : null,
    fetcher
  );

  const getActiveValidators = activeValidators(chain_id);

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
