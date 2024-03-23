import Layout from "../../../components/layout/Layout";
import ValidatorsDetailsContent from "../../../components/Validators/Details";
import { useRouter } from "next/router";
import {
  accountTxsByEventsEndpoint,
  chainValidatorDelegationsEndpoint,
  chainValidatorsDetailsEndpoint,
  chainValidatorsSlashingSigningInfosDetailsEndpoint,
  chainValidatorUnDelegationsEndpoint,
} from "../../../lib/chainApiEndpoints";
import {
  Bech32,
  fromBase64,
  fromBech32,
  fromHex,
  toBech32,
  toHex,
} from "@cosmjs/encoding";
import { sha256 } from "@cosmjs/crypto";
import { BaseChainApi } from "../../../lib/baseChainApi";
import {
  accountTxsByEvents,
  chainPool,
  getLatestBlocks,
} from "../../../lib/commonQueries";
import useSWR from "swr";
import { fetcher } from "../../../lib/Util/fetcher";

function ValidatorsDetails(props) {
  const chain_id = props?.chain_id?.chain_id;

  const router = useRouter();
  const query = router.query;

  //get uptime by blocks
  //get blocks
  const queryTotalBlocks = 100;
  const getUptimeByBlocksHeights = getLatestBlocks(chain_id, queryTotalBlocks);

  const uptimeByBlocksHeights = getUptimeByBlocksHeights?.map(
    (uptimeByBlocksHeights) => uptimeByBlocksHeights
  );

  const getChainPool = chainPool(chain_id);

  const getValidatorTxsByEvents = accountTxsByEvents(chain_id, accountAddress);

  //get validators details
  const { data: getValidatorDetails } = useSWR(
    query.address
      ? BaseChainApi(chain_id) + chainValidatorsDetailsEndpoint(query.address)
      : null,
    fetcher
  );

  var accountAddress, hexAddress, operatorAddress, bech32Address;
  try {
    const consensusPubkey =
      getValidatorDetails?.validator?.consensus_pubkey?.key !== undefined
        ? getValidatorDetails?.validator?.consensus_pubkey?.key
        : "";
    const ed25519PubkeyRaw = fromBase64(consensusPubkey);
    const addressData = sha256(ed25519PubkeyRaw).slice(0, 20);
    bech32Address = Bech32.encode("akash" + "valcons", addressData);

    //get operator address to get account address and hex address
    operatorAddress =
      getValidatorDetails?.validator !== undefined
        ? getValidatorDetails?.validator?.operator_address
        : " ";

    accountAddress = toBech32(
      "akash",
      fromHex(toHex(fromBech32(operatorAddress).data))
    );

    hexAddress = toHex(fromBech32(bech32Address).data);
  } catch (error) {}

  // Fetch validator slashing signing Info Details
  const { data: getValidatorSlashingSigningInfos } = useSWR(
    bech32Address
      ? BaseChainApi(chain_id) +
          chainValidatorsSlashingSigningInfosDetailsEndpoint(bech32Address)
      : null,
    fetcher
  );

  // Get each validator's delegations
  const { data: getValidatorDelegations } = useSWR(
    query.address
      ? BaseChainApi(chain_id) +
          chainValidatorDelegationsEndpoint(query.address)
      : null,
    fetcher
  );

  // Get each validator's undelegations
  const { data: getValidatorUnDelegations } = useSWR(
    query.address
      ? BaseChainApi(chain_id) +
          chainValidatorUnDelegationsEndpoint(query.address)
      : null,
    fetcher
  );

  const data = {
    getValidatorDetails: getValidatorDetails,
    getUptimeByBlocksHeights: uptimeByBlocksHeights,
    chainValidatorsSlashingInfo: getValidatorSlashingSigningInfos,
    chainValidatorDelegations: getValidatorDelegations,
    chainValidatorUnDelegations: getValidatorUnDelegations,
    getChainPool: getChainPool,
    getValidatorTxsByEvents: getValidatorTxsByEvents,
    accountAddress: accountAddress,
    hexAddress: hexAddress,
    operatorAddress: operatorAddress,
    bech32Address: bech32Address,
    chain_id: chain_id,
  };

  return <ValidatorsDetailsContent {...data} />;
}

export default ValidatorsDetails;

ValidatorsDetails.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
