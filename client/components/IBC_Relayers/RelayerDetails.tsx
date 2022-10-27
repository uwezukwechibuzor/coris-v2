import React from 'react'
import Layout from "../layout/Layout";
import styled from 'styled-components';
import { useAppSelector } from '../../lib/hooks';
import { Accordion, Table } from 'react-bootstrap'

function RelayerDetails(props) {
    const darkMode = useAppSelector(state => state.general.darkMode)
    return (
        <div style={{ marginTop: "40px", "padding": "10px" }}>
            <h3>Relayers Detail</h3>
            <Grid>
                <GridItem>
                    Test
                </GridItem>
                <GridItem>
                    Test
                </GridItem>
                <GridItem>
                    Test
                </GridItem>
                <GridItem>
                    Test
                </GridItem>
            </Grid>
        </div>
    )
}

RelayerDetails.getLayout = function getLayout(page: any) {
    return <Layout>{page}</Layout>
};

export default RelayerDetails

const Grid = styled.div`
    display: grid;
    grid-template-columns: auto auto auto auto;
    grid-gap: 10px;
    width: 100%
`

const GridItem = styled.div`
    height: 40px;
    background: grey;
    border-radius: 10px;
`
const Card = styled.div`
  border-radius: 20px;
  box-shadow: 0px 7px 30px #0015da29;
  word-break: break-all;
  &.last-grid-item{
    grid-column: 1 / span 2;
  }
  @media screen and (max-width: 520px){
   grid-column: 1 / span 2;
  }
  &.dark-mode{
    background-color:#19172d !important;
    box-shadow: 0px -1px 20px 0px #23232329 !important;
  }
`;

const ImageContainer = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: grey;
`;

const Responsive = styled.div`
  width: 100%;
  overflow-x: auto;
  @media screen and (max-width: 700px){
    width: calc(100vw - 80px);
  }
  `;