import { NextPage } from "next";
import { AppProps } from "next/app";
import "../styles/global.css";
import { ReactElement, ReactNode, useEffect, useState } from "react";
const { default: AbortController } = require("abort-controller");
const { default: fetch, Headers, Request, Response } = require("node-fetch");
import "bootstrap/dist/css/bootstrap.min.css";
import { SSRProvider } from "react-bootstrap";
import { wrapper } from "../lib/store";
import Error from "next/error";
import ErrorBoundary from "../components/ErrorBoundary";
import { ErrorFallback } from "../components/ErrorFallback";
import { BaseChainApi } from "../lib/baseChainApi";
import { ChainAllValidatorsEndpoint, chainTxsByHashEndpoint } from "../lib/chainApiEndpoints";
import axios from "axios";
import { useRouter } from "next/router";

Object.assign(globalThis, {
  fetch,
  Headers,
  Request,
  Response,
  AbortController,
});

//dynamic layout
type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export function App({ Component, pageProps }: AppPropsWithLayout) {
  //error handling
  if (pageProps?.error) {
    return (
      <Error
        statusCode={pageProps.error.statusCode}
        title={pageProps.error.message}
      />
    );
  }

  const getLayout = Component.getLayout ?? ((page) => page);

  const router = useRouter();
  const query = router.query;

  const [getAllValidators, setAllValidators] = useState([]);

  //general query for all components
  //get all validators
  useEffect(() => {
    axios
      .get(BaseChainApi() + ChainAllValidatorsEndpoint)
      .then((response) => {
        setAllValidators(response?.data?.validators);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const allValidators = getAllValidators ? getAllValidators : null;
 
  return getLayout(
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <SSRProvider>
        <Component
          {...pageProps}
          getAllValidators={allValidators}
          chain_id={query}
        />
      </SSRProvider>
    </ErrorBoundary>
  );
}

export default wrapper.withRedux(App);
