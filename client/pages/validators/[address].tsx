import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import ValidatorsDetailsContent from "../../components/Validators/Details";
import { useRouter } from "next/router";
import axios from "axios";
import {
  chainPoolEndpoint,
  chainValidatorDelegationsEndpoint,
  chainValidatorsDetailsEndpoint,
  chainValidatorsSlashingSigningInfosDetailsEndpoint,
  chainValidatorUnDelegationsEndpoint,
  latestBlocksEndpoint,
} from "../../lib/chainApiEndpoints";
import { Bech32, fromBase64 } from "@cosmjs/encoding";
import { sha256 } from "@cosmjs/crypto";
import { BaseChainApi } from "../../lib/baseChainApi";

function ValidatorsDetails(props) {
  const [getUptimeByBlocksHeights, setUptimeByBlocksHeights] = useState([]);
  const [getValidatorDetails, setValidatorDetails] = useState(null);
  const [getValidatorSlashingSigningInfos, setValidatorSlashingSigningInfos] =
    useState(null);
  const [getValidatorDelegations, setValidatorDelegations] = useState(null);
  const [getValidatorUnDelegations, setValidatorUnDelegations] = useState(null);
  const [getChainPool, setChainPool] = useState(null);

  const router = useRouter();
  const query = router.query;

  //get uptime by blocks
  //get blocks
  const queryTotalBlocks = 50;
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

  //get validators details
  useEffect(() => {
    axios
      .get(BaseChainApi() + chainValidatorsDetailsEndpoint(query.address))
      .then((response) => {
        setValidatorDetails(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [query.address]);

  const consensusPubkey =
    getValidatorDetails?.validator?.consensus_pubkey?.key !== undefined
      ? getValidatorDetails?.validator?.consensus_pubkey?.key
      : "";
  const ed25519PubkeyRaw = fromBase64(consensusPubkey);
  const addressData = sha256(ed25519PubkeyRaw).slice(0, 20);
  const bech32Address = Bech32.encode("cosmosvalcons", addressData);

  //get validator slashing signing Info Details
  useEffect(() => {
    axios
      .get(
        BaseChainApi() +
          chainValidatorsSlashingSigningInfosDetailsEndpoint(bech32Address)
      )
      .then((response) => {
        setValidatorSlashingSigningInfos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [query.address]);

  //get each validators delegations
  useEffect(() => {
    axios
      .get(BaseChainApi() + chainValidatorDelegationsEndpoint(query.address))
      .then((response) => {
        setValidatorDelegations(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [query.address]);

  //get each validators Undelegations
  useEffect(() => {
    axios
      .get(BaseChainApi() + chainValidatorUnDelegationsEndpoint(query.address))
      .then((response) => {
        setValidatorUnDelegations(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [query.address]);

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
  console.log(getValidatorSlashingSigningInfos);
  const data = {
    getValidatorDetails: getValidatorDetails,
    getUptimeByBlocksHeights: uptimeByBlocksHeights,
    chainValidatorsSlashingInfo: getValidatorSlashingSigningInfos,
    chainValidatorDelegations: getValidatorDelegations,
    chainValidatorUnDelegations: getValidatorUnDelegations,
    getChainPool,
  };

  return <ValidatorsDetailsContent {...data} />;
}

export default ValidatorsDetails;

ValidatorsDetails.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
