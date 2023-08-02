import useSWR from "swr";
import { BaseChainApi } from "./baseChainApi";
import {
  ChainAllValidatorsEndpoint,
  accountTxsByEventsEndpoint,
  allTxsEndpoint,
  chainActiveValidatorsEndpoint,
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

// Fetch all validators data
export function allValidators(chain_id) {
  const { data } = useSWR(
    BaseChainApi(chain_id) + ChainAllValidatorsEndpoint,
    fetcher
  );
  return data;
}

// Fetch active validators data
export function activeValidators(chain_id) {
  const { data } = useSWR(
    BaseChainApi(chain_id) + chainActiveValidatorsEndpoint,
    fetcher
  );
  return data;
}

// Fetch account Txs By Events
export function accountTxsByEvents(chain_id, accountAddress) {
  const { data } = useSWR(
    accountAddress
      ? BaseChainApi(chain_id) + accountTxsByEventsEndpoint(accountAddress)
      : null,
    fetcher,
    swrOptions
  );
  return data;
}
