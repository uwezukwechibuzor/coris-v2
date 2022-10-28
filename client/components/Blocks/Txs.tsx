import React, { useState } from "react";
import styled from "styled-components";
import { sha256 } from "@cosmjs/crypto";
import { Bech32, fromBase64, toHex, fromHex, toBech32 } from "@cosmjs/encoding";
import { useAppSelector } from "../../lib/hooks";
import ReactPaginate from "react-paginate";
import { abbrMessage, formatHash, toDay } from "../../lib/Util/format";
import Link from "next/link";
import router from "next/router";

const denom = 1000000;
const coin = "ATOM";

const TxsData = (props) => {
  const darkMode = useAppSelector((state) => state.general.darkMode);

  const allTxs = props?.getAllTxs;

  //add pagination
  //const [currentPage, setCurrentPage] = useState(0);

  //function handlePageClick({ selected: selectedPage }) {
  //setCurrentPage(selectedPage);
  //}

  //const PER_PAGE = 15;
  //const offset = currentPage * PER_PAGE;
  //const currentPageData = allTxs.slice(offset, offset + PER_PAGE)
  //const pageCount = Math.ceil(allTxs.length / PER_PAGE);
  //console.log(currentPageData, pageCount)

  return (
    <table
      className={darkMode ? "mt-3 dark-mode w-100" : "w-100 mt-3"}
      style={{ tableLayout: "fixed" }}
    >
      <thead className="w-100">
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

const Container = styled.div`
  display: block;
`;

const Responsive = styled.div`
  width: 100%;
`;

export default TxsData;
