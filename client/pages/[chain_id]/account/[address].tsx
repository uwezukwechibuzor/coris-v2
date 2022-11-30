import React, { useEffect, useState } from "react";
import Layout from "../../../components/layout/Layout";
import { useRouter } from "next/router";
import AccountContents from "../../../components/Account";
import {
  accountBalanceEndpoint,
  accountDelegationRewardsEndpoint,
  accountDelegationsEndpoint,
  accountReDelegationsEndpoint,
  accountTxsByEventsEndpoint,
  accountUnDelegationsEndpoint,
  authAccountEndpoint,
} from "../../../lib/chainApiEndpoints";
import axios from "axios";
import { BaseChainApi } from "../../../lib/baseChainApi";
import { fromBech32, fromHex, toBech32, toHex } from "@cosmjs/encoding";

function AccountDetails(props) {
  const [getAllAccountTxsByEvents, setAllAccountTxsByEvents] = useState([]);
  const [getAuthAccount, setAuthAccount] = useState([]);
  const [getAccountBalance, setAccountBalance] = useState([]);
  const [getDelegatorRewards, setDelegationReward] = useState([]);
  const [getAccountDelegations, setAccountDelegations] = useState([]);
  const [getAccountReDelegations, setAccountReDelegations] = useState([]);
  const [getAccountUnDelegations, setAccountUnDelegations] = useState([]);

  const router = useRouter();
  const query = router.query;

  const chain_id = props?.chain_id?.chain_id;

  //get auth account
  useEffect(() => {
    axios
      .get(BaseChainApi() + authAccountEndpoint(query.address))
      .then((response) => {
        setAuthAccount(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [query.address]);

  //get account Txs By Events
  useEffect(() => {
    axios
      .get(BaseChainApi() + accountTxsByEventsEndpoint(query.address))
      .then((response) => {
        setAllAccountTxsByEvents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [query.address]);

  //get account balance
  useEffect(() => {
    axios
      .get(BaseChainApi() + accountBalanceEndpoint(query.address))
      .then((response) => {
        setAccountBalance(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [query.address]);

  //get delegation Rewards
  useEffect(() => {
    axios
      .get(BaseChainApi() + accountDelegationRewardsEndpoint(query.address))
      .then((response) => {
        setDelegationReward(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [query.address]);

  //get Acccount Delegations
  useEffect(() => {
    axios
      .get(BaseChainApi() + accountDelegationsEndpoint(query.address))
      .then((response) => {
        setAccountDelegations(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [query.address]);

  //get Acccount ReDelegations
  useEffect(() => {
    axios
      .get(BaseChainApi() + accountReDelegationsEndpoint(query.address))
      .then((response) => {
        setAccountReDelegations(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [query.address]);
 
  //get Acccount UnDelegations
  useEffect(() => {
    axios
      .get(BaseChainApi() + accountUnDelegationsEndpoint(query.address))
      .then((response) => {
        setAccountUnDelegations(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [query.address]);


  const accountDetails = {
    authAccount: getAuthAccount,
    accountBalance: getAccountBalance,
    delegationRewards: getDelegatorRewards,
    accountDelegations: getAccountDelegations,
    accountRedelegations: getAccountReDelegations,
    accountUnboundingDelegations: getAccountUnDelegations,
    getAllAccountTxsByEvents: getAllAccountTxsByEvents,
    chain_id: chain_id,
  };

  return (
    <>
      <AccountContents {...accountDetails} />
    </>
  );
}

export default AccountDetails;

AccountDetails.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
