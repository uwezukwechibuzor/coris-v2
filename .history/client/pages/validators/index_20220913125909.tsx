import Layout from "../../components/layout/Layout";
import ValidatorsContent from "../../components/Validators";
import {
  getChainValidators,
  getRunningOperationPromises,
  useGetChainPoolQuery,
  useGetChainValidatorsQuery,
} from '../../lib/chainApi';

  /*function Validators() {
  
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
*/

import { makeStore, wrapper } from "../../lib/store";

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

  </>
  );
}


export async function getServerSideProps() {
  const store = makeStore();
  const result = await store.dispatch(getChainValidators.initiate());
  const y = JSON.parse(ste)
 console.log(result)
  return { props: 0 }
}

export default Validators

Validators.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>
};