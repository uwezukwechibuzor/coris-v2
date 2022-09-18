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
 allTxs?.map(tx => {
    
 })

 const  itemsPerPage = 5
 const [pageCount, setPageCount] = useState(0);
 const [itemOffset, setItemOffset] = useState(0);
 const endOffset = itemOffset + itemsPerPage;

 allTxs.slice(itemOffset, endOffset)
 setPageCount(Math.ceil(allTxs.length / itemsPerPage))
 const handlePageClick = (event) => {
  const newOffset = (event.selected * itemsPerPage) % allTxs.length;
  console.log(
    `User requested page number ${event.selected}, which is offset ${newOffset}`
  );
  setItemOffset(newOffset);
};


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
          {allTxs.map(tx =>
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
            breakLabel="..."
            nextLabel="next >>"
            onPageChange={ha}
            pageRangeDisplayed={2}
            pageCount={20}
            previousLabel="<< previous"
            renderOnZeroPageCount={null}
            className="pagination"
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