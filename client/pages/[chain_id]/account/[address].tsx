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
      .get(BaseChainApi(chain_id) + authAccountEndpoint(query.address))
      .then((response) => {
        setAuthAccount(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [query.address, chain_id]);

  //get account Txs By Events
  useEffect(() => {
    axios
      .get(BaseChainApi(chain_id) + accountTxsByEventsEndpoint(query.address))
      .then((response) => {
        setAllAccountTxsByEvents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [query.address, chain_id]);

  //get account balance
  useEffect(() => {
    axios
      .get(BaseChainApi(chain_id) + accountBalanceEndpoint(query.address))
      .then((response) => {
        setAccountBalance(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [query.address, chain_id]);

  //get delegation Rewards
  useEffect(() => {
    axios
      .get(
        BaseChainApi(chain_id) + accountDelegationRewardsEndpoint(query.address)
      )
      .then((response) => {
        setDelegationReward(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [query.address, chain_id]);

  //get Acccount Delegations
  useEffect(() => {
    axios
      .get(BaseChainApi(chain_id) + accountDelegationsEndpoint(query.address))
      .then((response) => {
        setAccountDelegations(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [query.address, chain_id]);

  //get Acccount ReDelegations
  useEffect(() => {
    axios
      .get(BaseChainApi(chain_id) + accountReDelegationsEndpoint(query.address))
      .then((response) => {
        setAccountReDelegations(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [query.address, chain_id]);

  //get Acccount UnDelegations
  useEffect(() => {
    axios
      .get(BaseChainApi(chain_id) + accountUnDelegationsEndpoint(query.address))
      .then((response) => {
        setAccountUnDelegations(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [query.address, chain_id]);

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
