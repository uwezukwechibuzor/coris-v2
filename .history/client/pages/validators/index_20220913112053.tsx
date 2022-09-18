import Layout from "../../components/layout/Layout";
import ValidatorsContent from "../../components/Validators";
import {
  getChainValidators,
  useGetChainPoolQuery,
  useGetChainValidatorsQuery,
} from '../../lib/chainApi';

function Validators({validatorsDetails}) {
  


  return (
   <> 
  <ValidatorsContent {...validatorsDetails } />
  </>
  );
}


export async function getServerSideProps() {
    //get all validators data for bonded, unbonded and unbounding
    const getValidators =  getChainValidators()
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
  // Pass data to the page via props
  return { props: { validatorsDetails } }
}




export default Validators

Validators.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>
};