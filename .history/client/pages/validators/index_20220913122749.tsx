import Layout from "../../components/layout/Layout";
import ValidatorsContent from "../../components/Validators";
import {
  getChainValidators,
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

import { wrapper } from "../../lib/store";

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

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    
      store.dispatch(getChainValidators.initiate());
    

    await Promise.all(getRunningOperationPromises());

    return {
      props: {},
    };
  }
);

export default Validators

Validators.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>
};