import { NextPage } from "next";
import { AppProps } from "next/app";
import '../styles/global.css'
import { ReactElement, ReactNode } from "react";
const { default: AbortController } = require("abort-controller");
const { default: fetch, Headers, Request, Response } = require("node-fetch");
import 'bootstrap/dist/css/bootstrap.min.css';
import { SSRProvider } from 'react-bootstrap';
import { wrapper } from "../lib/store";
import Error from "next/error";
import ErrorBoundary from "../components/ErrorBoundary";
import { ErrorFallback } from "../components/ErrorFallback";
import { allChainValidatorsEndpoint } from "../lib/chainApiEndpoints";


Object.assign(globalThis, {
  fetch,
  Headers,
  Request,
  Response,
  AbortController,
});

//dynamic layout
type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export function App({ Component, pageProps }: AppPropsWithLayout) {
  //error handling
  if (pageProps.error) {
    return <Error statusCode={pageProps.error.statusCode} title={pageProps.error.message} />;
  }
  
    const getLayout = Component.getLayout ?? ((page) => page);
   console.log(pageProps)
    return getLayout(
      <ErrorBoundary FallbackComponent={ErrorFallback}>
      <SSRProvider>
        <Component {...pageProps} />
    </SSRProvider>
    </ErrorBoundary>
    );
   
}

export async function getServerSideProps({ res }) {

  try {
     // Fetch data from external API
 
  //get all validators on the chain
  const getAllChainValidators =  await fetch(`https:${allChainValidatorsEndpoint}`)
  const chainAllValidators = await getAllChainValidators.json();


  res.setHeader(
   'Cache-Control',
   'public, s-maxage=10, stale-while-revalidate=59'
 )

 return {
   props: {
     chainAllValidators,
     poolData 
   },
 }

} catch (error) {
   
}
} 
  

export default wrapper.withRedux(App);

