import React, { useEffect, useState } from "react";
import Layout from "../../../components/layout/Layout";
import ValidatorsDetailsContent from "../../../components/Validators/Details";
import { useRouter } from "next/router";
import axios from "axios";
import {
  accountTxsByEventsEndpoint,
  chainPoolEndpoint,
  chainValidatorDelegationsEndpoint,
  chainValidatorsDetailsEndpoint,
  chainValidatorsSlashingSigningInfosDetailsEndpoint,
  chainValidatorUnDelegationsEndpoint,
  latestBlocksEndpoint,
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

function ValidatorsDetails(props) {
  const [getUptimeByBlocksHeights, setUptimeByBlocksHeights] = useState([]);
  const [getValidatorDetails, setValidatorDetails] = useState(null);
  const [getValidatorSlashingSigningInfos, setValidatorSlashingSigningInfos] =
    useState(null);
  const [getValidatorDelegations, setValidatorDelegations] = useState(null);
  const [getValidatorUnDelegations, setValidatorUnDelegations] = useState(null);
  const [getChainPool, setChainPool] = useState(null);
  const [getValidatorTxsByEvents, setValidatorTxsByEvents] = useState(null);

  const chain_id = props?.chain_id?.chain_id;

  const router = useRouter();
  const query = router.query;

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

  //get validators details
  useEffect(() => {
    axios
      .get(
        BaseChainApi(chain_id) + chainValidatorsDetailsEndpoint(query.address)
      )
      .then((response) => {
        setValidatorDetails(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [query.address, chain_id]);

  var accountAddress, hexAddress, operatorAddress, bech32Address;
  try {
    const consensusPubkey =
      getValidatorDetails?.validator?.consensus_pubkey?.key !== undefined
        ? getValidatorDetails?.validator?.consensus_pubkey?.key
        : "";
    const ed25519PubkeyRaw = fromBase64(consensusPubkey);
    const addressData = sha256(ed25519PubkeyRaw).slice(0, 20);
    bech32Address = Bech32.encode("cosmosvalcons", addressData);

    //get operator address to get account address and hex address
    operatorAddress =
      getValidatorDetails?.validator !== undefined
        ? getValidatorDetails?.validator?.operator_address
        : " ";

    accountAddress = toBech32(
      "cosmos",
      fromHex(toHex(fromBech32(operatorAddress).data))
    );

    hexAddress = toHex(fromBech32(bech32Address).data);
  } catch (error) {}

  //get validator slashing signing Info Details
  axios
    .get(
      BaseChainApi(chain_id) +
        chainValidatorsSlashingSigningInfosDetailsEndpoint(bech32Address)
    )
    .then((response) => {
      if (getValidatorSlashingSigningInfos === null) {
        setValidatorSlashingSigningInfos(response.data);
      }
    })
    .catch((error) => {
      console.log(error);
    });

  //get account Txs By Events
  axios
    .get(BaseChainApi(chain_id) + accountTxsByEventsEndpoint(accountAddress))
    .then((response) => {
      setValidatorTxsByEvents(response.data);
    })
    .catch((error) => {
      console.log(error);
    });

  //get each validators delegations
  useEffect(() => {
    axios
      .get(
        BaseChainApi(chain_id) +
          chainValidatorDelegationsEndpoint(query.address)
      )
      .then((response) => {
        setValidatorDelegations(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [query.address, chain_id]);

  //get each validators Undelegations
  useEffect(() => {
    axios
      .get(
        BaseChainApi(chain_id) +
          chainValidatorUnDelegationsEndpoint(query.address)
      )
      .then((response) => {
        setValidatorUnDelegations(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [query.address, chain_id]);

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
