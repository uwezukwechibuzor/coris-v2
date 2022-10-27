import React from "react";
import Assets from "../../lib/fetch/assets";
import Layout from "../../components/layout/Layout";

function CosmosAsset(props) {
  const t = props.chain_id.chain_id;

  return (
    <>
      <Assets chain_id={t} />
    </>
  );
}
export default CosmosAsset;

CosmosAsset.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
