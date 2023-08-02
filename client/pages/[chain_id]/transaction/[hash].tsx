import Layout from "../../../components/layout/Layout";
import TransactionContents from "../../../components/Transaction";
import { BaseChainApi } from "../../../lib/baseChainApi";
import { chainTxsByHashEndpoint } from "../../../lib/chainApiEndpoints";
import { useRouter } from "next/router";
import useSWR from "swr";
import { fetcher } from "../../../lib/Util/fetcher";

function TransactionDetails(props) {
  const router = useRouter();
  const query = router.query;

  const chain_id = props?.chain_id?.chain_id;

  //fetch Txs By Hash
  const { data: getChainTxsByHash } = useSWR(
    query.hash
      ? BaseChainApi(chain_id) + chainTxsByHashEndpoint(query?.hash)
      : null,
    fetcher
  );

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
