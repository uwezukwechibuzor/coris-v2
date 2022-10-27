import React from "react";
import RelayerDetails from "../../components/IBC_Relayers/RelayerDetails";
import Layout from "../../components/layout/Layout";

function IBC_RelayerDetails(props) {
  return (
    <>
      <RelayerDetails />
    </>
  );
}

export default IBC_RelayerDetails;

IBC_RelayerDetails.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
