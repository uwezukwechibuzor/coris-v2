import React, { useState } from "react";
import styled from "styled-components";
import { sha256 } from "@cosmjs/crypto";
import { Bech32, fromBase64, toHex, fromHex, toBech32 } from "@cosmjs/encoding";
import { useAppSelector } from "../../lib/hooks";
import ReactPaginate from "react-paginate";
import { abbrMessage, formatHash, toDay } from "../../lib/Util/format";
import Link from "next/link";

const denom = 1000000
const coin = 'ATOM'


const TxsData = (props) => {
  const darkMode = useAppSelector(state => state.general.darkMode)
   
 const allTxs = props?.getAllTxs
 
 //add pagination
 const [currentPage, setCurrentPage] = useState(0);

 function handlePageClick({ selected: selectedPage }) {
  setCurrentPage(selectedPage);
}

 const PER_PAGE = 15;
 const offset = currentPage * PER_PAGE;
 const currentPageData = allTxs.slice(offset, offset + PER_PAGE)
 const pageCount = Math.ceil(allTxs.length / PER_PAGE);
console.log(currentPageData, pageCount)

    return (
        <Container className="w-100">
        <Responsive>
      <table className={darkMode ? 'w-100 mt-3 dark-mode' : 'w-100 mt-3'}>
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
          {currentPageData.map(tx =>
                <tr>
                     <Link href='/transaction[hash]' as={`/transaction/${tx.txHash}`} ><a>
                 <td>{formatHash(tx?.txHash, 10, '...')}</td>
                    </a></Link>
                  <td>{abbrMessage(tx?.messages)}</td>
                  <td className={tx.result === 0 ? "text-success" : 'text-danger'}>{tx.result === 0 ? 'Success' : 'failed'}</td>
                  <td>{tx?.fee[0]? tx?.fee[0].amount/denom + ' '+ coin : null}</td>
                  <td>{tx.height}</td>
                  <td>{toDay(tx.time, 'from')}</td>
                </tr> 
                )}
      </table>
    </Responsive>
    <ReactPaginate
        previousLabel={"←"}
        nextLabel={"→"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
      />
        </Container>
    )
}

const Container = styled.div`
  display: block;
`;

const Responsive = styled.div`
  width: 100%;
  overflow-x: auto;
  @media screen and (max-width: 700px){
    width: calc(100vw - 40px)
  }
  `;

  export default TxsData