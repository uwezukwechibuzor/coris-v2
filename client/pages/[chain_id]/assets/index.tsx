import React from "react";
import Assets from "../../../lib/fetch/assets";
import Layout from "../../../components/layout/Layout";

function CosmosAsset() {
    
    return (
      <>
        <Assets/>
      </>
    );
  }
export default CosmosAsset;


CosmosAsset.getLayout = function getLayout(page: any) {
    return <Layout>{page}</Layout>;
  };