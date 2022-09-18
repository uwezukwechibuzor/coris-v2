import React, { MutableRefObject, useRef, useState } from "react";
import { Alert, Card, ListGroup } from "react-bootstrap";
import styled from "styled-components";
import { useGetChainValidatorsQuery } from "../../../../lib/chainApi";
import { useAppSelector } from "../../../../lib/hooks";

export function SearchBar(props) {
  const [searchResult, setSearchResult] = useState([] as any)
  const searchBar: MutableRefObject<HTMLDivElement> = useRef()
  const { src, className } = props;
  const darkMode = useAppSelector(state => state.general.darkMode)

  //search button functionalities
  const [query, setQuery] = useState("")
  const getAllChainValidators = useGetChainValidatorsQuery()
  const searchingValidators = getAllChainValidators.isLoading === false ? getAllChainValidators.data?.validators.map(data => data
  ) : null

  let searchedData
  let err
  searchingValidators?.filter(data => {
    if (query === '') {

    } else if (query !== data.operator_address) {
      err = 'No Data Found';
    } 
    //else if (data?.operator_address?.toLowerCase().includes(query.toLocaleLowerCase()) && data?.operator_address === query) {
      searchedData = data?.operator_address
    }
    //else if(data?.description?.moniker?.toLowerCase().includes(query.toLocaleLowerCase())  && data?.description?.moniker === query){
       //searchedData = data?.description?.moniker;
      
   // }
  })
  console.log(searchingValidators)

  const handleWindowsClick = (e) => {
    if (!searchBar.current.contains(e.target)) {
      setSearchResult([])
      window.removeEventListener("click", handleWindowsClick)
    }
  }
  const handleFocus = () => {
    if (searchBar.current) {
      setSearchResult([
         searchedData
      ])
    }
    window.addEventListener("click", handleWindowsClick)
  }


  return (
    <SearchBar1 ref={searchBar} onFocus={handleFocus} onClick={handleFocus} className={`search-bar ${className || ""} ${darkMode ? 'dark-mode' : ''}`}>
      <div className="position-relative w-100">
        <div className="d-flex w-100">
          <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.9782 18.525C13.1132 21.6205 7.45572 21.3769 3.87291 17.7941C0.0286903 13.9499 0.0286903 7.71714 3.87291 3.87291C7.71714 0.02869 13.9499 0.0286907 17.7941 3.87291C21.3769 7.45572 21.6205 13.1132 18.525 16.9782L26.0436 24.4968C26.4708 24.924 26.4708 25.6165 26.0436 26.0436C25.6165 26.4708 24.924 26.4708 24.4968 26.0436L16.9782 18.525ZM5.41971 16.2473C2.42976 13.2573 2.42976 8.40966 5.41971 5.41971C8.40966 2.42976 13.2573 2.42976 16.2473 5.41971C19.235 8.40747 19.2372 13.2502 16.2539 16.2407C16.2517 16.2429 16.2495 16.245 16.2473 16.2472C16.2451 16.2494 16.2429 16.2516 16.2407 16.2539C13.2502 19.2372 8.40747 19.235 5.41971 16.2473Z" fill={darkMode ? 'white' : 'grey'} />
          </svg>
          <TextInput placeholder="Search by Validator/Valoper Address ..." type="text" className={darkMode ? "dark-mode" : " "} onChange={event => setQuery(event.target.value)} />
        </div>
      </div>
      {
        searchResult.length ? (
          <div className="w-100">
            <hr style={{ border: "1px solid grey" }} className="w-100" />
            <SearchResult>
              <ListGroup className="w-100">
                {
                  searchResult?.map((item) => (
                    <ListGroup.Item key={item?.id} className={darkMode ? "dark-mode text-white no-border text-white" : "no-border"}>{searchedData? searchedData : err}</ListGroup.Item>
                  ))
                }
              </ListGroup>
            </SearchResult>

          </div >
        ) : <div />
      }

    </SearchBar1>
  );
}

const SearchResult = styled.div`
  max-height: 400px;
  overflow-y: auto;
`

const SearchBar1 = styled.div`
  min-height: 50px;
  height:fit-content;
  display: flex;
  padding: 10px 19px;
  align-items: flex-start;
  background-color: var(--white);
  border-radius: 20px;
  box-shadow: 0px 0px 7px 5px #d0d0d036;
  width: 50%;
  margin-right: 20px;
  flex-direction: column;
  transiton: height 2s ease
  &.search-bar.search-bar-1 {
    margin-top: 2px;
    padding: unset;
    align-items: unset;
  }
  &.dark-mode{
    background-color: #19172D !important;
    box-shadow: 0px -1px 20px 0px #23232329 !important;
  }
  &.dark-mode.mobile{
    background-color: #0b0a15 !important;
    box-shadow: 0px -1px 20px 0px #23232329 !important;
    border: none;
  }
`;

const TextInput = styled.input`
  background-color: transparent !important;
  outline: none;
  border: none;
  padding-left: 20px;
  width: 100%;
  &.dark-mode{
    color: white;
  }
  &.mobile.dark-mode{
    background: transparent;
  }
`
export default SearchBar;
