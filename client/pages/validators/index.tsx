import axios from "axios";
import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import ValidatorsContent from "../../components/Validators";
import { allChainValidatorsEndpoint, chainPoolEndpoint } from "../../lib/chainApiEndpoints";

const isServerReq = req => !req.url.startsWith('/_next');

function Validators(props) {

  //get total bonded tokens
  const bondedTokensFromPool = props?.poolData !== null?  props?.poolData?.pool?.bonded_tokens : null
  
  const chainAllValidators  = props?.chainAllValidators  !== null?  props?.chainAllValidators.validators  : null

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

export async function getServerSideProps({res, req}) {
  
  var poolData, chainAllValidators;

  try {
  // Fetch data from external API
  //get Pool
  const getPool =  isServerReq(req) ? await fetch(chainPoolEndpoint) : null
    if(!getPool.ok) {
            return {
                    props: {
                      poolData: Object.assign({}, null),
                    },
            }
    }
  poolData = await getPool.json()

  const getAllChainValidators =  isServerReq(req) ? await fetch(allChainValidatorsEndpoint) : null
     if(!getAllChainValidators.ok) {
      return {
        props: {
          chainAllValidators: Object.assign({}, null),
        },
      }
     }
  chainAllValidators = await getAllChainValidators.json();
   
  res.setHeader(
   'Cache-Control',
   'public, s-maxage=600, stale-while-revalidate=900'
 )
 
 if (!poolData || !chainAllValidators) {
  return {
    props: {
      poolData: Object.assign({}, null),
      chainAllValidators: Object.assign({}, null),
    },
  }
 } else {
  return {
    props: {
      poolData: Object.assign({}, poolData),
      chainAllValidators: Object.assign({}, chainAllValidators),
    },
  }
 }

} catch (error) {
   console.log("Error" + error)
  } 
}

export default Validators

Validators.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>
};