import Layout from "../../components/layout/Layout";
import ValidatorsContent from "../../components/Validators";
import {
  useGetChainPoolQuery,
  useGetChainValidatorsQuery,
} from '../../lib/chainApi';

function Validators() {
  


  return (
   <> 
  <ValidatorsContent {...validatorsDetails } />
  </>
  );
}


export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://.../data`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}




export default Validators

Validators.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>
};