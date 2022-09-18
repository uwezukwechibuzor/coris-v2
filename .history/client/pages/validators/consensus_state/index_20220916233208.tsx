import Layout from "../../../components/layout/Layout";
import ValidatorsContent from "../../../components/Validators";
import ConsensusDetails from "../../../components/Validators/Consensus";
import {
  useGetChainPoolQuery,
  useGetChainValidatorsConsensusStateQuery,
  useGetChainValidatorsQuery,
} from '../../../lib/chainApi';
import { allChainValidatorsEndpoint, chainPoolEndpoint, consensusStateEndpoint } from "../../../lib/chainApiEndpoints";

const isServerReq = req => !req.url.startsWith('/_next');

function Validators(props) {
  
  //get all validators data for bonded, unbonded and unbounding
  const getValidators =  useGetChainValidatorsQuery()
  const ValidatorsData = getValidators.isLoading === false? getValidators?.data?.validators?.map((validator: any) => {
   return  validator
  }): null

  //get total bonded tokens
  const bondedTokensFromPool = props.poolData !== undefined?  getChainPool?.data?.pool?.bonded_tokens : null

  //consensus state for the validators
  const consensusState = props?.consensusState !== undefined ? props?.consensusState : null
 
  const validatorsDetails = {
    validators: ValidatorsData,
    totalBondedTokens: bondedTokensFromPool,
    consensusState: consensusState
  }
  
  return (
   <> 
  <ConsensusDetails {...validatorsDetails} />
  </>
  );
}

export async function getServerSideProps({res, req}) {
  
  try {
     // Fetch data from external API
  //get Pool
  const getConsensusState =  isServerReq(req) ? await fetch(`https:${consensusStateEndpoint}`) : null
  const consensusState = await  getConsensusState.json()
  
  const getPool =  isServerReq(req) ? await fetch(`https:${chainPoolEndpoint}`) : null
  const poolData = await getPool.json()

  const getAllChainValidators =  isServerReq(req) ? await fetch(`https:${allChainValidatorsEndpoint}`) : null
  const chainAllValidators = await getAllChainValidators.json();
   
 
  res.setHeader(
   'Cache-Control',
   'public, s-maxage=600, stale-while-revalidate=900'
 )

 return {
   props: {
     consensusState: Object.assign({}, consensusState),
     poolData: Object.assign({}, poolData),
     chainAllValidators: Object.assign({}, chainAllValidators) 
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