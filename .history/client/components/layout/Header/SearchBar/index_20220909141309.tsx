import React, { useState } from "react";
import { Alert, Card } from "react-bootstrap";
import styled from "styled-components";
import { useGetChainValidatorsQuery } from "../../../../lib/chainApi";
import { useAppSelector } from "../../../../lib/hooks";
import Select from "react-select";



export function SearchBar(props) {
  const { src, className } = props;
  const darkMode = useAppSelector(state => state.general.darkMode)




  //search button functionalities
  const [query, setQuery] = useState("")
 const getAllChainValidators = useGetChainValidatorsQuery()
 const searchingValidators = getAllChainValidators.isLoading === false? getAllChainValidators.data?.validators.map(data => data?.operator_address
  ) : null
 
  let searchedData
  let err 
  searchingValidators?.filter(data => {
    if (query === '') {
  
    } else if(query !== data){
      err = 'No Data Found';
    }else if (data?.toLowerCase().includes(query.toLocaleLowerCase()) && data === query) {
      searchedData = data
   }
  })
console.log(searchedData)

    // React state to manage selected options
    const [selectedOptions, setSelectedOptions] = useState();

    // Array of all options
    const optionList = [
      { value: "red", label: "Red" },
      { value: "green", label: "Green" },
      { value: "yellow", label: "Yellow" },
      { value: "blue", label: "Blue" },
      { value: "white", label: "White" }
    ];
  
    // Function triggered on selection
    function handleSelect(data) {
      setSelectedOptions(data);
    }

  return (
    <div className={`search-bar ${className || ""} ${darkMode ? 'dark-mode' : ''}`}>
    
      <div className="dropdown-container">
        <Select
          options={optionList}
          value={searchedData}
          //onChange={handleSelect}
          isSearchable={true}
          placeholder="Search by Block Height / Valoper" type="text" className={darkMode ? "dark-mode" : " "} onChange={event => props.setQuery(event.target.value)}
        />
      </div>
    </div>
  );
}

const SearchBar1 = styled.div`
  height: 50px;
  display: flex;
  padding: 10px 19px;
  align-items: flex-start;
  background-color: var(--white);
  border-radius: 59px;
  box-shadow: 0px 0px 7px 5px #d0d0d036;
  width: 50%;
  margin-right: 20px;

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
