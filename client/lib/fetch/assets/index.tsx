import { useEffect, useState } from "react";
import AssetsContent from "../../../components/Assets";
import Layout from "../../../components/layout/Layout";
import axios from "axios";
import { cosmosEcoSystem_API } from "../../coingeckoAPI";

function Assets(props) {
  const [coinsData, setCoins] = useState([]);
  
  useEffect(() => {
    axios
      .get(cosmosEcoSystem_API)
      .then((response) => {
        setCoins(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const coins = {
    coinsData: coinsData,
  };
  return (
    <>
      <AssetsContent {...coins} />
    </>
  );
}

export default Assets;
