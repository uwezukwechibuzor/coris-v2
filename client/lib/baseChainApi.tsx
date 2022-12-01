import axios from "axios";
import React from "react";
import { chainURL } from "./Util/chainsURL";
import { useRouter } from "next/router";

const baseChainAPI = chainURL.UMEE_API;

export const BaseChainApi = () => {
  //const router = useRouter();
  //const query = router.pathname;
  //let api;
  //if (query === '/umee') {
  //}
  return baseChainAPI;
};
