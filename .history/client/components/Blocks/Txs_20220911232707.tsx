import React from "react";
import styled from "styled-components";
import { sha256 } from "@cosmjs/crypto";
import { Bech32, fromBase64, toHex, fromHex, toBech32 } from "@cosmjs/encoding";
import { useAppSelector } from "../../lib/hooks";
import ReactPaginate from "react-paginate";


const TxsData = (props) => {
  const darkMode = useAppSelector(state => state.general.darkMode)
   
 const allTxs = prop

    return (
        <Container className="w-100">
        <Responsive>
      <table className={darkMode ? 'w-100 mt-3 dark-mode' : 'w-100 mt-3'}>
        <thead>
          <tr>
            <th>Height</th>
            <th>Hash</th>
            <th>Proposer</th>
            <th>No of Txs</th>
            <th>Time</th>
          </tr>
        </thead>
                <tbody>
                <tr>
                <td>Daniel</td>
                  <td>Daniel</td>
                  <td>Daniel</td>
                  <td>Daniel</td>
                  <td>Daniel</td>
                </tr> 
                <tr>
                <td>Daniel</td>
                  <td>Daniel</td>
                  <td>Daniel</td>
                  <td>Daniel</td>
                  <td>Daniel</td>
                </tr>
                </tbody>
                
      </table>
    </Responsive>
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >>"
            onPageChange={() => { }}
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