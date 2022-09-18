import Layout from "../../components/layout/Layout";
import ValidatorsContent from "../../components/Validators";
import {
  getChainValidators,
  useGetChainPoolQuery,
  useGetChainValidatorsQuery,
} from '../../lib/chainApi';
import { chainPoolEndpoint } from "../../lib/chainApiEndpoints";


function Validators(props) {
  
  //get all validators data for bonded, unbonded and unbounding
  const allValidators =  props?.validators

  //get total bonded tokens
  const getChainPool = useGetChainPoolQuery()
  const bondedTokensFromPool = props?.poolData === undefined?  props?.poolData?.pool?.bonded_tokens : null
 console.log(props)
  const validatorsDetails = {
    allValidators: allValidators,
    totalBondedTokens: bondedTokensFromPool
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

  res.setHeader(
   'Cache-Control',
   'public, s-maxage=10, stale-while-revalidate=59'
 )

 return {
   props: {
     poolData,
   },
 }

} catch (error) {
   
}
  } 


export default Validators

Validators.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>
};