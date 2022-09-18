import Link from "next/link";
import router from "next/router";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import styled from "styled-components";
import { COIN, DENOM } from "../../../lib/Util/constants";
import { formatHash, formatTimeDateYear, sortUnDelegationsByBalance, toDay } from "../../../lib/Util/format";

function UndelegationsContent(props) {
   
  const [currentPage, setCurrentPage] = useState(0);

  const unDelegationsData = props?.unbonding_responses !== undefined ? props?.unbonding_responses?.map((delegator) => {
    return delegator
  }) : null
  sortUnDelegationsByBalance(unDelegationsData)


   //add pagination to signatures
   const PER_PAGE = 10;
   const offset = currentPage * PER_PAGE;
   const currentunDelegationsData = unDelegationsData?.slice(offset, offset + PER_PAGE) 
   const pageCount = Math.ceil(unDelegationsData?.length / PER_PAGE);
   function handlePageClick({ selected: selectedPage }) {
     setCurrentPage(selectedPage);
   }
 

  return (
    <>
      <Underdelegation>
        <Responsive>
          <table className="w-100">
            <thead>
              <tr>
                <th>
                  <h4>Address</h4>
                </th>
                <th>
                  <h4>Amount</h4>
                </th>
                <th>
                  <h4> Height</h4>
                </th>
                <th>
                  <h4>Entries</h4>
                </th>
                <th>
                  <h4>Date</h4>
                </th>
              </tr>
            </thead>

            {currentunDelegationsData.length !== 0 ?  currentunDelegationsData?.map(data =>
              <tbody>
                <tr className="striped">
                    <td onClick={() => router.push(`/account/${data?.delegator_address}`)}>
                      <Flex style={{ alignItems: 'center' }}>
                        <div>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M15.619 16.7619C10.9367 16.7619 7.04364 20.1409 6.24514 24.5934C4.22535 22.3024 3 19.2943 3 16C3 8.8203 8.8203 3 16 3C23.1797 3 29 8.8203 29 16C29 19.6408 27.5033 22.9321 25.0916 25.292C24.5948 20.4992 20.5433 16.7619 15.619 16.7619ZM16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32ZM16 16.7619C18.9455 16.7619 21.3333 14.3741 21.3333 11.4286C21.3333 8.48305 18.9455 6.09524 16 6.09524C13.0545 6.09524 10.6667 8.48305 10.6667 11.4286C10.6667 14.3741 13.0545 16.7619 16 16.7619Z" fill="#C4C4C4" />
                          </svg>
                        </div>
                        <div className="ml-3">{data ? formatHash(data.delegator_address, 10, '...') : null}</div>
                      </Flex>
                    </td>
                  <td>
                    {data?.entries ? ((data.entries[data.entries.length - 1].balance)/DENOM).toFixed(2) : null} {COIN}
                  </td>
                  <td>
                    {data?.entries ? data.entries[data.entries.length - 1].creation_height : null}
                  </td>
                  <td>
                    {data ? data.entries.length : null}
                  </td>
                  <td>
                    {data?.entries ? toDay(data.entries[data.entries.length - 1].completion_time, 'from') : null}
                  </td>
                </tr>    ):  <td></td>
                <td></td>
                <td>NO Undelegation(s)</td>
                <td></td>
                <td></td>
               </tr>
                </tbody>
          <tbody>
               <tr>
              
              </tbody>}
          </table>
        </Responsive>
      </Underdelegation>
      {currentunDelegationsData.length !== 0 ? 
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
          /> : null }
   
   <style jsx>{`
       table {
          font-family: arial, sans-serif;
          border-collapse: collapse;
          width: 100%;
        }

        td, th {
          border: 1px solid #3a428a;
          text-align: left;
          padding: 8px;
        }

        tr:nth-child(even) {
          background-color: red;
        }
      
      `}</style>
    </>
  )
}

const Underdelegation = styled.div`
  display: block;
`

const Tooltip = styled.div`
  width: 80px;
  height: 90px;
  background: #324239;
  display: none;
  transform: translate(-35%, -110%);
  border-radius: 10px;
  color: white;
  font-size: 12px;
  padding: 3px;
  text-align: center;
`

const Flex = styled.div`
  display: flex;
`

const Responsive = styled.div`
  width: 100%;
  overflow-x: auto;
  @media screen and (max-width: 700px){
    width: calc(100vw - 50px);
  }
`
export default UndelegationsContent