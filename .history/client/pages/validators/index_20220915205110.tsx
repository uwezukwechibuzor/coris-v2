import axios from "axios";
import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import ValidatorsContent from "../../components/Validators";
import { allChainValidatorsEndpoint, chainPoolEndpoint } from "../../lib/chainApiEndpoints";


function Validators(props) {
  
  //get all validators data for bonded, unbonded and unbounding
  const allValidators =  props?.validators

  //get total bonded tokens
  const bondedTokensFromPool = props?.poolData !== undefined?  props?.poolData?.pool?.bonded_tokens : nullconst bondedTokensFromPool = props?.poolData !== undefined?  props?.poolData?.pool?.bonded_tokens : null

      //get uptime by blocks
    //get blocks
    const [getUptimeByBlocksHeights, setUptimeByBlocksHeights] = useState([])
    const queryTotalBlocks = 100
    let getBlocksAPi = process.env.NEXT_PUBLIC_GetBlocks
    useEffect(() => {
        axios.get(`${getBlocksAPi}/blocks/latest?limit=${queryTotalBlocks}`).then((response) => {
            setUptimeByBlocksHeights(response.data)
        }).catch((error) => {
            console.log(error)
        })
      }, [getUptimeByBlocksHeights])
     
    const uptimeByBlocksHeights = getUptimeByBlocksHeights.map(uptimeByBlocksHeights => uptimeByBlocksHeights)

  const validatorsDetails = {
    allValidators: allValidators,
    totalBondedTokens: bondedTokensFromPool,
    uptimeByBlocksHeights:  uptimeByBlocksHeights 
  }

  return (
   <> 
  <ValidatorsContent {...validatorsDetails } />
  </>
  );
} 

export async function getServerSideProps({  res }) {
  
  try {
     // Fetch data from external API
  //get Pool
  const getPool =  await fetch(`https:${chainPoolEndpoint}`)
  const poolData = await getPool.json()

  const getAllChainValidators =  await fetch(`https:${allChainValidatorsEndpoint}`)
  const chainAllValidators = await getAllChainValidators.json();

  res.setHeader(
   'Cache-Control',
   'public, s-maxage=600, stale-while-revalidate=900'
 )

 return {
   props: {
     poolData,
     chainAllValidators 
   },
 }

} catch (error) {
   
}
  } 


export default Validators

Validators.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>
};