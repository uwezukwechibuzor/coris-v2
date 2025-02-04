import axios from "axios";
import React, { MutableRefObject, useRef, useState } from "react";
import { ListGroup } from "react-bootstrap";
import styled from "styled-components";
import { BaseChainApi } from "../../../../lib/baseChainApi";
import {
  authAccountEndpoint,
  chainBlockHeightDetailsEndpont,
  chainTxsByHashEndpoint,
} from "../../../../lib/chainApiEndpoints";
import { useAppSelector } from "../../../../lib/hooks";

export function SearchBar(props) {
  const chain_id = props?.chain_id?.chain_id;
  const [searchResult, setSearchResult] = useState([] as any);
  const [query, setQuery] = useState([] as any);
  const [searchTxsByHash, setSearchTxsByHash] = useState([] as any);
  const [searchBlockHeight, setSearchBlockHeight] = useState([] as any);
  const [searchAccountAddress, setSearchAccountAddress] = useState([] as any);

  const searchBar: MutableRefObject<HTMLDivElement> = useRef();

  const { src, className } = props;
  const darkMode = useAppSelector((state) => state.general.darkMode);

  //search button functionalities
  let searchedData;
  let err;
  //search query for tranactions Hash
  axios
    .get(BaseChainApi(chain_id) + chainTxsByHashEndpoint(query))
    .then((response) => {
      setSearchTxsByHash(response.data);
    })
    .catch((error) => {
      console.log(error);
    });

  //search query for Block Heights
  axios
    .get(BaseChainApi(chain_id) + chainBlockHeightDetailsEndpont(query))
    .then((response) => {
      setSearchBlockHeight(response.data);
    })
    .catch((error) => {
      console.log(error);
    });

  //search query for Account Address
  axios
    .get(BaseChainApi(chain_id) + authAccountEndpoint(query))
    .then((response) => {
      setSearchAccountAddress(response.data);
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });

  if (query.length === 0) {
  } else if (
    searchTxsByHash?.tx_response?.txhash === query ||
    searchBlockHeight?.block?.header?.height === query ||
    searchAccountAddress?.account?.address === query
  ) {
    searchTxsByHash?.tx_response?.txhash === query
      ? (searchedData = (
          <a
            href={`/${chain_id}/transaction/${searchTxsByHash?.tx_response?.txhash}`}
          >
            {searchTxsByHash?.tx_response?.txhash}
          </a>
        ))
      : searchBlockHeight?.block?.header?.height === query
      ? (searchedData = (
          <a
            href={`/${chain_id}/blocks/${searchBlockHeight?.block?.header?.height}`}
          >
            {searchBlockHeight?.block?.header?.height}
          </a>
        ))
      : searchAccountAddress?.account?.address === query
      ? (searchedData = (
          <a
            href={`/${chain_id}/account/${searchAccountAddress?.account?.address}`}
          >
            {searchAccountAddress?.account?.address}
          </a>
        ))
      : "Nothing Found";
  } else {
    err = "No Data Found";
  }

  const handleWindowsClick = (e) => {
    if (!searchBar?.current?.contains(e.target)) {
      setSearchResult([]);
      window.removeEventListener("click", handleWindowsClick);
    }
  };
  const handleFocus = () => {
    if (searchBar?.current) {
      setSearchResult([searchedData]);
    }
    window.addEventListener("click", handleWindowsClick);
  };

  return (
    <SearchBar1
      ref={searchBar}
      onFocus={handleFocus}
      onClick={handleFocus}
      className={`search-bar ${className || ""} ${darkMode ? "dark-mode" : ""}`}
    >
      <div className="position-relative w-100">
        <div className="d-flex w-100">
          <svg
            width="27"
            height="27"
            viewBox="0 0 27 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M16.9782 18.525C13.1132 21.6205 7.45572 21.3769 3.87291 17.7941C0.0286903 13.9499 0.0286903 7.71714 3.87291 3.87291C7.71714 0.02869 13.9499 0.0286907 17.7941 3.87291C21.3769 7.45572 21.6205 13.1132 18.525 16.9782L26.0436 24.4968C26.4708 24.924 26.4708 25.6165 26.0436 26.0436C25.6165 26.4708 24.924 26.4708 24.4968 26.0436L16.9782 18.525ZM5.41971 16.2473C2.42976 13.2573 2.42976 8.40966 5.41971 5.41971C8.40966 2.42976 13.2573 2.42976 16.2473 5.41971C19.235 8.40747 19.2372 13.2502 16.2539 16.2407C16.2517 16.2429 16.2495 16.245 16.2473 16.2472C16.2451 16.2494 16.2429 16.2516 16.2407 16.2539C13.2502 19.2372 8.40747 19.235 5.41971 16.2473Z"
              fill={darkMode ? "white" : "grey"}
            />
          </svg>
          <TextInput
            placeholder="Block Height, TxHash, Account Address"
            type="text"
            className={darkMode ? "dark-mode" : " "}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
      </div>
      {searchResult.length ? (
        <div className="w-100">
          <hr style={{ border: "1px solid grey" }} className="w-100" />
          <SearchResult>
            <ListGroup className="w-100">
              {searchResult?.map((item) => (
                <ListGroup.Item
                  key={item?.id}
                  className={
                    darkMode
                      ? "dark-mode text-white no-border text-white"
                      : "no-border"
                  }
                >
                  {searchedData || err}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </SearchResult>
        </div>
      ) : (
        <div />
      )}
    </SearchBar1>
  );
}

const SearchResult = styled.div`
  max-height: 400px;
  overflow-y: auto;
`;

const SearchBar1 = styled.div`
  min-height: 50px;
  height: fit-content;
  display: flex;
  padding: 10px 19px;
  align-items: flex-start;
  background-color: var(--white);
  border-radius: 20px;
  box-shadow: 0px 0px 7px 5px #d0d0d036;
  width: 50%;
  margin-right: 20px;
  flex-direction: column;
  transiton: height 2s ease &.search-bar.search-bar-1 {
    margin-top: 2px;
    padding: unset;
    align-items: unset;
  }
  &.dark-mode {
    background-color: #19172d !important;
    box-shadow: 0px -1px 20px 0px #23232329 !important;
  }
  &.dark-mode.mobile {
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
  &.dark-mode {
    color: white;
  }
  &.mobile.dark-mode {
    background: transparent;
  }
  @media screen and (max-width: 775px) {
    font-size: 11px;
  }
`;

export default SearchBar;
