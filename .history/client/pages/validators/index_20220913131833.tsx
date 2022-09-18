import Layout from "../../components/layout/Layout";
import ValidatorsContent from "../../components/Validators";
import {
  useGetChainPoolQuery,
  useGetChainValidatorsQuery,
} from '../../lib/chainApi';

  function Validators() {
  
  //get all validators data for bonded, unbonded and unbounding
  const getValidators =  useGetChainValidatorsQuery()
  const ValidatorsData = getValidators.isLoading === false? getValidators?.data?.validators?.map((validator: any) => {
   return  validator
  }): null

  //get total bonded tokens
  const getChainPool = useGetChainPoolQuery()
  const bondedTokensFromPool = getChainPool.isLoading === false?  getChainPool?.data?.pool?.bonded_tokens : null
 
  const validatorsDetails = {
    validators: ValidatorsData,
    totalBondedTokens: bondedTokensFromPool
  }

  return (
   <> 
  <ValidatorsContent {...validatorsDetails } />
  </>
  );
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://api.blue.main.network.umee.cc/blocks/latests`)
  const data = await res.json()
 console.log(data)
 console.log(res)
  // Pass data to the page via props
  return { props: { data } }
}


export default Validators

Validators.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>
};