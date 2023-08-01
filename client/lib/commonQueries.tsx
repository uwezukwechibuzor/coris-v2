import useSWR from "swr";
import { BaseChainApi } from "./baseChainApi";
import {
  allTxsEndpoint,
  chainPoolEndpoint,
  latestBlocksEndpoint,
} from "./chainApiEndpoints";
import { fetcher } from "./Util/fetcher";
import { swrOptions } from "./Util/swrOptions ";

// Fetch latest blocks data
export function getLatestBlocks(chain_id, queryTotalBlocks) {
  const { data } = useSWR(
    BaseChainApi(chain_id) + latestBlocksEndpoint(queryTotalBlocks),
    fetcher,
    swrOptions
  );
  return data;
}

// Fetch all transactions data
export function latestTxs(chain_id, queryTotalTxs) {
  const { data } = useSWR(
    BaseChainApi(chain_id) + allTxsEndpoint(queryTotalTxs),
    fetcher,
    swrOptions
  );
  return data;
}

// Fetch chain pool data
export function chainPool(chain_id) {
  const { data } = useSWR(BaseChainApi(chain_id) + chainPoolEndpoint, fetcher);
  return data;
}
