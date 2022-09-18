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
  Component: NextPageWithLayout,
  chainAllValidators?: any
}

export function App({ Component, pageProps, chainAllValidators }: AppPropsWithLayout) {
  //error handling
  if (pageProps?.error) {
    return <Error statusCode={pageProps.error.statusCode} title={pageProps.error.message} />;
  }

  
    const getLayout = Component.getLayout ?? ((page) => page);
  
    return getLayout(
      <ErrorBoundary FallbackComponent={ErrorFallback}>
      <SSRProvider>
        <Component {...pageProps} {...chainAllValidators} />
    </SSRProvider>
    </ErrorBoundary>
    );
   
}

/*
App.getInitialProps = async (res, ctx) => {
  
  try {
  //this is needed  so the search button can function in all pages
  //get all validators on the chain
  if(!ctx.req) {
    return {chainAllValidators: []}
  }
  const getAllChainValidators =  await fetch(`https:${allChainValidatorsEndpoint}`)
  const chainAllValidators = await getAllChainValidators.json();
 
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=600, stale-while-revalidate=900'
  )
 return {props: chainAllValidators }

} catch (error) {
   
}

} 
  

export default wrapper.withRedux(App);

