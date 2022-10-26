import axios from "axios";
import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import ValidatorsContent from "../../components/Validators";
import { BaseChainApi } from "../../lib/baseChainApi";
import {
  chainPoolEndpoint,
  latestBlocksEndpoint,
} from "../../lib/chainApiEndpoints";

function Validators(props) {
  const [getUptimeByBlocksHeights, setUptimeByBlocksHeights] = useState([]);
  const [getChainPool, setChainPool] = useState(null);

  //get all chain validators from props
  const chainAllValidators = props?.getAllValidators;

  //get Pool
  useEffect(() => {
    axios
      .get(BaseChainApi() + chainPoolEndpoint)
      .then((response) => {
        setChainPool(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //get total bonded tokens
  const bondedTokensFromPool =
    getChainPool !== null ? getChainPool?.pool?.bonded_tokens : null;

  //get uptime by blocks
  //get blocks
  const queryTotalBlocks = 100;
  useEffect(() => {
    axios
      .get(BaseChainApi() + latestBlocksEndpoint(queryTotalBlocks))
      .then((response) => {
        setUptimeByBlocksHeights(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [getUptimeByBlocksHeights]);

  const uptimeByBlocksHeights = getUptimeByBlocksHeights.map(
    (uptimeByBlocksHeights) => uptimeByBlocksHeights
  );

  const validatorsDetails = {
    totalBondedTokens: bondedTokensFromPool,
    uptimeByBlocksHeights: uptimeByBlocksHeights,
    chainAllValidators: chainAllValidators,
  };

  return (
    <>
      <ValidatorsContent {...validatorsDetails} />
    </>
  );
}

export default Validators;

Validators.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
