import React from "react";
import RelayersPage from "../../../components/IBC_Relayers";
import Layout from "../../../components/layout/Layout";

function IBC_Relayers(props) {
  const chain_id = props?.chain_id?.chain_id;

  return (
    <>
      <RelayersPage chain_id={chain_id} />
    </>
  );
}

export default IBC_Relayers;

IBC_Relayers.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
