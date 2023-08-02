import Layout from "../../../components/layout/Layout";
import ValidatorsContent from "../../../components/Validators";
import {
  allValidators,
  chainPool,
  getLatestBlocks,
} from "../../../lib/commonQueries";

function Validators(props) {
  const chain_id = props?.chain_id?.chain_id;

  const getAllValidators = allValidators(chain_id);

  //get total bonded tokens
  const getChainPool = chainPool(chain_id);
  const bondedTokensFromPool =
    getChainPool !== null ? getChainPool?.pool?.bonded_tokens : null;

  //get uptime by blocks
  //get blocks
  const queryTotalBlocks = 100;
  const getUptimeByBlocksHeights = getLatestBlocks(chain_id, queryTotalBlocks);

  const uptimeByBlocksHeights = getUptimeByBlocksHeights?.map(
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
