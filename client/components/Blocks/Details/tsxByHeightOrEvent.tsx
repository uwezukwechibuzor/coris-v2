import React, { useState } from "react";
import router from "next/router";
import { COIN, DENOM } from "../../../lib/Util/constants";
import { useAppSelector } from "../../../lib/hooks";
import { abbrMessage, formatHash, toDay } from "../../../lib/Util/format";
import styled from "styled-components";
import ReactPaginate from "react-paginate";

const TxsByHeightEvent = (props) => {
  const darkMode = useAppSelector((state) => state.general.darkMode);

  const { txs, chain_id } = props;
 
  const [currentTxsPage, setCurrentTxsPage] = useState(0);

  //add pagination to TXS
  const PER_PAGE = 10;
  const txsPER_PAGE = 5;
  const offsetTxs = currentTxsPage * txsPER_PAGE;
  const currentTxsData = txs?.tx_responses?.slice(
    offsetTxs,
    offsetTxs + PER_PAGE
  );
  const txspageCount = Math.ceil(txs?.tx_responses?.length / txsPER_PAGE);
  function handleTxsPageClick({ selected: selectedPage }) {
    setCurrentTxsPage(selectedPage);
  }

  return (
    <Card className={darkMode ? "dark-mode w-100" : "w-100"}>
    <Responsive className="p-3">
            <table
              className={
                darkMode
                  ? "dark-mode w-100 mt-3 table table-responsive"
                  : "w-100 mt-3 table table-responsive"
              }
            >
              <thead>
                <tr style={{ fontWeight: "bold" }}>
                  <th>Tx hash</th>
                  <th>Height</th>
                  <th>Status</th>
                  <th>Fee</th>
                  <th>Message</th>
                  <th>Time</th>
                </tr>
              </thead>
              {currentTxsData?.length !== 0 ? (
                currentTxsData?.map((tx) => (
                  <tbody>
                    <tr>
                      <td
                        onClick={() =>
                          router.push(`/${chain_id}/transaction/${tx.txhash}`)
                        }
                      >
                        {formatHash(tx?.txhash, 20, "..")}
                      </td>
                      <td>{tx?.height}</td>
                      <td
                        className={
                          tx.code === 0 ? "text-success" : "text-danger"
                        }
                      >
                        {tx.code === 0 ? "Success" : "failed"}
                      </td>
                      <td>
                        {tx?.tx?.auth_info?.fee?.amount[0]?.amount / DENOM}{" "}
                        {COIN}
                      </td>
                      <td>{abbrMessage(tx.tx.body.messages)}</td>
                      <td>{toDay(tx?.timestamp, "from")}</td>
                    </tr>
                  </tbody>
                ))
              ) : (
                <tbody>
                  <tr>
                    <td></td>
                    <td></td>
                    <td>No Txs</td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              )}
            </table>
          </Responsive>
          {currentTxsData?.length !== 0 ? (
            <ReactPaginate
              previousLabel={"←"}
              nextLabel={"→"}
              pageCount={txspageCount}
              onPageChange={handleTxsPageClick}
              containerClassName={"pagination"}
              previousLinkClassName={"pagination__link"}
              nextLinkClassName={"pagination__link"}
              disabledClassName={"pagination__link--disabled"}
              activeClassName={"pagination__link--active"}
            />
          ) : null}
          </Card>
  );
};


const Card = styled.div`
  border-radius: 20px;
  box-shadow: 0px 7px 30px #0015da29;
  word-break: break-all;
  &.last-grid-item {
    grid-column: 1 / span 2;
  }
  @media screen and (max-width: 520px) {
    grid-column: 1 / span 2;
  }
  &.dark-mode {
    background-color: #19172d !important;
    box-shadow: 0px -1px 20px 0px #23232329 !important;
  }
`;

const Responsive = styled.div`
  width: 100%;
  overflow-x: auto;
  @media screen and (max-width: 1075px) {
    width: calc(100vw - 40px);
  }
`;

export default TxsByHeightEvent;