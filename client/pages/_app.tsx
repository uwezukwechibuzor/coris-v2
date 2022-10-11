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

const isServerReq = req => !req.url.startsWith('/_next');

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
  Component: NextPageWithLayout,
}

export function App({ Component, pageProps }: AppPropsWithLayout) {
  //error handling
  if (pageProps?.error) {
    return <Error statusCode={pageProps.error.statusCode} title={pageProps.error.message} />;
  }
  
    const getLayout = Component.getLayout ?? ((page) => page);
  
    return getLayout(
      <ErrorBoundary FallbackComponent={ErrorFallback}>
      <SSRProvider>
        <Component {...pageProps}  />
    </SSRProvider>
    </ErrorBoundary>
    );
   
}


/*App.getInitialProps = async (res, req) => {
  
  let chainAllValidators

  try {
     // Fetch data from external API
  const getAllChainValidators = isServerReq(req) ? await fetch(allChainValidatorsEndpoint) : null
  !getAllChainValidators.ok ? { props: {chainAllValidators: Object.assign({}, null) }} : chainAllValidators = await getAllChainValidators.json();

  res.setHeader(
   'Cache-Control',
   'public, s-maxage=600, stale-while-revalidate=900'
 )

 if(!chainAllValidators || chainAllValidators == undefined) {
   return {
     props: {
       chainAllValidators: Object.assign({}, null)
     }
   }
 } else {
   return {
     props: {
       chainAllValidators: Object.assign({}, chainAllValidators)
     }
   }
 }

} catch (error) {
   console.log("Error" + error)
}
} 
*/

export default wrapper.withRedux(App);

