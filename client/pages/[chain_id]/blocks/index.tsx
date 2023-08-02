import Layout from "../../../components/layout/Layout";
import BlocksContent from "../../../components/Blocks";
import {
  activeValidators,
  getLatestBlocks,
  latestTxs,
} from "../../../lib/commonQueries";

function Blocks(props) {
  const queryTotalBlocks = 20;
  const queryTotalTxs = 20;

  const chain_id = props?.chain_id?.chain_id;

  const getBlocks = getLatestBlocks(chain_id, queryTotalBlocks);

  const getAllTxs = latestTxs(chain_id, queryTotalTxs);

  const getActiveValidators = activeValidators(chain_id);

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
