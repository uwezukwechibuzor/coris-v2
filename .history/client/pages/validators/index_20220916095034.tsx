import axios from "axios";
import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import ValidatorsContent from "../../components/Validators";
import { allChainValidatorsEndpoint, chainPoolEndpoint } from "../../lib/chainApiEndpoints";

const isServerReq = req => !req.url.startsWith('/_next');

function Validators(props) {

  //get total bonded tokens
  const bondedTokensFromPool = props?.poolData !== undefined?  props?.poolData?.pool?.bonded_tokens : null
  
  const chainAllValidators  = props?.chainAllValidators  !== undefined?  props?.chainAllValidators.validators  : null

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
    totalBondedTokens: bondedTokensFromPool,
    uptimeByBlocksHeights:  uptimeByBlocksHeights,
    chainAllValidators:chainAllValidators 
  }

  return (
   <> 
  <ValidatorsContent {...validatorsDetails } />
  </>
  );
} 

export async function getServerSideProps(res, req) {
  
  try {
     // Fetch data from external API
  //get Pool
  const getPool =  await fetch(`https:${chainPoolEndpoint}`) 
  const poolData = isServerReq(req) ? await getPool.json() : null

  const getAllChainValidators = await fetch(`https:${allChainValidatorsEndpoint}`) 
  const chainAllValidators = isServerReq(req) ?  await getAllChainValidators.json() : null

  res.setHeader(
   'Cache-Control',
   'public, s-maxage=600, stale-while-revalidate=900'
 )

 if (!chainAllValidators ) {
  return {
    redirect: {
      destination: '/',
      permanent: false,
    },
  }
}

 return {
   props: {
     poolData,
     chainAllValidators 
   },
 }

} catch (error) {
  return error
}
  } 


export default Validators

Validators.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>
};