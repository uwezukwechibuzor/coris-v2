import Layout from "../../../components/layout/Layout";
import { useRouter } from "next/router";
import AccountContents from "../../../components/Account";
import {
  accountBalanceEndpoint,
  accountDelegationRewardsEndpoint,
  accountDelegationsEndpoint,
  accountReDelegationsEndpoint,
  accountUnDelegationsEndpoint,
  authAccountEndpoint,
} from "../../../lib/chainApiEndpoints";
import { BaseChainApi } from "../../../lib/baseChainApi";
import useSWR from "swr";
import { fetcher } from "../../../lib/Util/fetcher";
import { accountTxsByEvents } from "../../../lib/commonQueries";

function AccountDetails(props) {
  const router = useRouter();
  const query = router.query;

  const chain_id = props?.chain_id?.chain_id;

  // get auth account
  const { data: getAuthAccount } = useSWR(
    query.address
      ? BaseChainApi(chain_id) + authAccountEndpoint(query.address)
      : null,
    fetcher
  );

  const getAllAccountTxsByEvents = accountTxsByEvents(chain_id, query.address);

  // get account balance
  const { data: getAccountBalance } = useSWR(
    query.address
      ? BaseChainApi(chain_id) + accountBalanceEndpoint(query.address)
      : null,
    fetcher
  );

  // get delegation Rewards
  const { data: getDelegatorRewards } = useSWR(
    query.address
      ? BaseChainApi(chain_id) + accountDelegationRewardsEndpoint(query.address)
      : null,
    fetcher
  );

  // get Acccount Delegations
  const { data: getAccountDelegations } = useSWR(
    query.address
      ? BaseChainApi(chain_id) + accountDelegationsEndpoint(query.address)
      : null,
    fetcher
  );

  // get Acccount ReDelegations
  const { data: getAccountReDelegations } = useSWR(
    query.address
      ? BaseChainApi(chain_id) + accountReDelegationsEndpoint(query.address)
      : null,
    fetcher
  );

  // get Acccount UnDelegations
  const { data: getAccountUnDelegations } = useSWR(
    query.address
      ? BaseChainApi(chain_id) + accountUnDelegationsEndpoint(query.address)
      : null,
    fetcher
  );

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
