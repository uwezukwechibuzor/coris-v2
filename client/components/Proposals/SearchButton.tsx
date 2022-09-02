import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import styled from "styled-components";
import { useAppSelector } from '../../lib/hooks';


function SearchButton (props) {
  const darkMode = useAppSelector(state => state.general.darkMode)
    return (
        <Search>
        <Form className="d-flex">
        <FormControl
          placeholder="Search Proposer"
          className={darkMode ? 'dark-mode me-2' : 'me-2'}
          aria-label="Search"
          name='search'
          onChange={event => props.setQuery(event.target.value)}
        />
        </Form>
        </Search>
    )
}

const Search = styled.div`
  display: flex;
  padding: 5px 19px;
  align-items: center;
  min-width: 280px;
  justify-content: flex-end;
  width: 100%;
`;

export default SearchButton