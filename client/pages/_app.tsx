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
import { ChainAllValidatorsEndpoint } from "../lib/chainApiEndpoints";
import axios from "axios";

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

  const [getAllValidators, setAllValidators] = useState([]);

  //general query for all components
  //get all validators
  const fetchAllValidators = async () => {
    try {
      const response = await axios.get(
        BaseChainApi() + ChainAllValidatorsEndpoint
      );
      if (response.status === 200) {
        setAllValidators(await response.data.validators);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllValidators();
  }, []);

  const allValidators = getAllValidators ? getAllValidators : null;

  return getLayout(
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <SSRProvider>
        <Component {...pageProps} getAllValidators={allValidators} />
      </SSRProvider>
    </ErrorBoundary>
  );
}

export default wrapper.withRedux(App);
