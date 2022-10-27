import React from "react";
import RelayersPage from "../../components/IBC_Relayers";
import Layout from "../../components/layout/Layout";

function IBC_Relayers(props) {
  return (
    <>
      <RelayersPage />
    </>
  );
}

export default IBC_Relayers;

IBC_Relayers.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
