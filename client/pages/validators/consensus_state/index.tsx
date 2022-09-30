import Layout from "../../../components/layout/Layout";
import ConsensusDetails from "../../../components/Validators/Consensus";
import { allChainValidatorsEndpoint, chainPoolEndpoint, consensusStateEndpoint } from "../../../lib/chainApiEndpoints";

const isServerReq = req => !req.url.startsWith('/_next');

function ValidatorsConsensusState(props) {
  
  //get all validators data for bonded, unbonded and unbounding
  const ValidatorsData = !props?.chainAllValidators ? null : props?.chainAllValidators?.validators?.map((validator: any) => {
   return  validator
  })

  //get total bonded tokens
  const bondedTokensFromPool = !props?.poolData ? null : props?.poolData?.pool?.bonded_tokens

  //consensus state for the validators
  const consensusState = !props?.consensusState ? null : props?.consensusState 
 
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
  
  let consensusState, poolData, chainAllValidators;
   
  try {
  // Fetch data from external API
  //get Pool
    const getConsensusState =  isServerReq(req) ? await fetch(consensusStateEndpoint) : null
    !getConsensusState.ok ? { props: { consensusState: Object.assign({}, null) }} : consensusState = await  getConsensusState.json()
  
    const getPool =  isServerReq(req) ? await fetch(chainPoolEndpoint) : null
    !getPool.ok ? { props: { poolData: Object.assign({}, null) }} : poolData = await getPool.json()

    const getAllChainValidators =  isServerReq(req) ? await fetch(allChainValidatorsEndpoint) : null
    !getAllChainValidators.ok ? { props: { chainAllValidators: Object.assign({}, null) }} : chainAllValidators = await getAllChainValidators.json();

  res.setHeader(
   'Cache-Control',
   'public, s-maxage=600, stale-while-revalidate=900'
 )

  if(!consensusState || !poolData || !chainAllValidators){
      return {
        props: {
          consensusState: Object.assign({}, null),
          poolData: Object.assign({}, null),
          chainAllValidators: Object.assign({}, null) 
        },
      }
  } else {
      return {
        props: {
          consensusState: Object.assign({}, consensusState),
          poolData: Object.assign({}, poolData),
          chainAllValidators: Object.assign({}, chainAllValidators) 
        },
      }
  }

} catch (error) {
     console.log("Error" + error)
    }
  } 


export default ValidatorsConsensusState

ValidatorsConsensusState.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>
};