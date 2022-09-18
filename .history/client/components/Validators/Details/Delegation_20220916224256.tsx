import Link from "next/link";
import router from "next/router";
import  React, { useState } from "react";
import ReactPaginate from "react-paginate";
import styled from "styled-components";
import { useAppSelector } from "../../../lib/hooks";
import { COIN, DENOM } from "../../../lib/Util/constants";
import { formatHash, sortDelegatorsByAmount } from "../../../lib/Util/format";

function DelegationsContent(props) {
  
  const darkMode = useAppSelector(state => state.general.darkMode)

  const [currentPage, setCurrentPage] = useState(0);
   
    const delegatorsData = props?.delegation_responses !== undefined? props?.delegation_responses?.map((delegator) => {
        return delegator
    }) : null
  sortDelegatorsByAmount(delegatorsData)  
  
   //add pagination to signatures
   const PER_PAGE = 10;
   const offset = currentPage * PER_PAGE;
   const currentDelegatorsData= delegatorsData?.slice(offset, offset + PER_PAGE) 
   const pageCount = Math.ceil(delegatorsData?.length / PER_PAGE);
   function handlePageClick({ selected: selectedPage }) {
     setCurrentPage(selectedPage);
   }
  
  return (
    <>
      <Delegation>
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
                      </tr>
                    </thead>

                    {currentDelegatorsData?.map(data =>
                    <>
                      <tr className="striped">
                        <td onClick={() => router.push(`/account/${data.delegation?.delegator_address}`)}>
                          <Flex style={{ alignItems: 'center' }}>
                          
                            <div className="ml-3">{data.delegation? data.delegation?.delegator_address : null}</div>
                          </Flex>
                        </td>
                        <td>
                          {data.balance? (data.balance.amount/DENOM).toFixed(2) : null} {COIN} 
                        </td>
                      </tr>
                    </>
                    )}
                  </table>
                </Responsive>

      </Delegation>
      {currentDelegatorsData?.length !== 0 ? 
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
    </>
  );
}

const Delegation = styled.div`
  display: block;
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

export default DelegationsContent;
