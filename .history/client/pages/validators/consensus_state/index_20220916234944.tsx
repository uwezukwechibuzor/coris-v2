import Layout from "../../../components/layout/Layout";
import ValidatorsContent from "../../../components/Validators";
import ConsensusDetails from "../../../components/Validators/Consensus";
import { allChainValidatorsEndpoint, chainPoolEndpoint, consensusStateEndpoint } from "../../../lib/chainApiEndpoints";

const isServerReq = req => !req.url.startsWith('/_next');

function ValidatorsConsensusState(props) {
  
  //get all validators data for bonded, unbonded and unbounding
  const ValidatorsData = props?.chainAllValidators !== undefined ? props?.chainAllValidators?.validators?.map((validator: any) => {
   return  validator
  }): null

  //get total bonded tokens
  const bondedTokensFromPool = props?.poolData !== undefined?  props?.poolData?.pool?.bonded_tokens : null

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


export default ValidatorsConsensusState

ValidatorsConsensusState.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>
};