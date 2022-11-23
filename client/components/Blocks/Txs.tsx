import React, { useState } from "react";
import { useAppSelector } from "../../lib/hooks";
import { abbrMessage, formatHash, toDay } from "../../lib/Util/format";
import router from "next/router";

const denom = 1000000;
const coin = "ATOM";

const TxsData = (props) => {
  const darkMode = useAppSelector((state) => state.general.darkMode);

  const allTxs = props?.getAllTxs;

  return (
    <table
      className={darkMode ? "mt-3 dark-mode w-100" : "w-100 mt-3"} 
    >
      <thead>
        <tr>
          <th>Tx Hash</th>
          <th>Type</th>
          <th>Result</th>
          <th>Fee</th>
          <th>Height</th>
          <th>Time</th>
        </tr>
      </thead>
      {allTxs.map((tx) => (
        <tr>
          <td
            onClick={() =>
              router.push(`/${props?.chain_id}/transaction/${tx.txHash}`)
            }
          >
            {formatHash(tx?.txHash, 10, "...")}
          </td>
          <td>{abbrMessage(tx?.messages)}</td>
          <td className={tx.result === 0 ? "text-success" : "text-danger"}>
            {tx.result === 0 ? "Success" : "failed"}
          </td>
          <td>{tx?.fee[0] ? tx?.fee[0].amount / denom + " " + coin : null}</td>
          <td>{tx.height}</td>
          <td>{toDay(tx.time, "from")}</td>
        </tr>
      ))}
    </table>
  );
};

export default TxsData;
