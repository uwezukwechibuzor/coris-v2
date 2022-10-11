import { useEffect, useState } from "react";
import AssetsContent from "../../components/Assets";
import Layout from "../../components/layout/Layout";
import axios from 'axios'

function Assets() {
  
    console.log("POWER")
    async function fetchPosts() {
        const request = await fetch("https://api.cosmos.network/cosmos/staking/v1beta1/validators?pagination.limit=500")
        const data = await request.json()
        console.log(data, request)
    }
    fetchPosts()

    const [coinsData, setCoins] = useState([])
    let coinsAPi = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=cosmos-ecosystem&order=market_cap_desc&per_page=50&page=1&sparkline=false'
    useEffect(() => {
        axios.get(coinsAPi).then((response) => {
            setCoins(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [])
   const coins = {
       coinsData: coinsData
   }
  return (
   <> 
   <AssetsContent {...coins} />
  </>
  );
}

export default Assets

Assets.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>
};