import Layout from "../../components/layout/Layout";
import ValidatorsContent from "../../components/Validators";
import {
  getChainValidators,
  useGetChainPoolQuery,
  useGetChainValidatorsQuery,
} from '../../lib/chainApi';
import { makeStore } from "../../lib/store";

  function Validators(props) {
  
  //get all validators data for bonded, unbonded and unbounding
  const getValidators =  

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

export default Validators

Validators.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>
};