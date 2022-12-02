import axios from "axios";
import { useEffect, useState } from "react";
import Layout from "../../../components/layout/Layout";
import ValidatorsContent from "../../../components/Validators";
import { BaseChainApi } from "../../../lib/baseChainApi";
import {
  ChainAllValidatorsEndpoint,
  chainPoolEndpoint,
  latestBlocksEndpoint,
} from "../../../lib/chainApiEndpoints";

function Validators(props) {
  const [getUptimeByBlocksHeights, setUptimeByBlocksHeights] = useState([]);
  const [getChainPool, setChainPool] = useState(null);
  const [getAllValidators, setAllValidators] = useState(null);

  const chain_id = props?.chain_id?.chain_id;

  //all validators
  useEffect(() => {
    axios
      .get(BaseChainApi(chain_id) + ChainAllValidatorsEndpoint)
      .then((response) => {
        setAllValidators(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [chain_id]);

  //get Pool
  useEffect(() => {
    axios
      .get(BaseChainApi(chain_id) + chainPoolEndpoint)
      .then((response) => {
        setChainPool(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [chain_id]);

  //get total bonded tokens
  const bondedTokensFromPool =
    getChainPool !== null ? getChainPool?.pool?.bonded_tokens : null;

  //get uptime by blocks
  //get blocks
  const queryTotalBlocks = 100;
  useEffect(() => {
    axios
      .get(BaseChainApi(chain_id) + latestBlocksEndpoint(queryTotalBlocks))
      .then((response) => {
        setUptimeByBlocksHeights(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [getUptimeByBlocksHeights, chain_id]);

  const uptimeByBlocksHeights = getUptimeByBlocksHeights.map(
    (uptimeByBlocksHeights) => uptimeByBlocksHeights
  );

  const validatorsDetails = {
    totalBondedTokens: bondedTokensFromPool,
    uptimeByBlocksHeights: uptimeByBlocksHeights,
    chainAllValidators: getAllValidators,
  };

  return (
    <>
      <ValidatorsContent {...validatorsDetails} chain_id={chain_id} />
    </>
  );
}

export default Validators;

Validators.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
