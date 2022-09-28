import React from 'react'
import Layout from "../../components/layout/Layout";
import styled from 'styled-components';
import { useAppSelector } from '../../lib/hooks';
import { Accordion, Table } from 'react-bootstrap'
import Arrow from './Arrow';

function Relayers(props) {
  const darkMode = useAppSelector(state => state.general.darkMode)
  return (
    <div style={{ marginTop: "40px", "padding": "10px" }}>
      <h3>Relayers</h3>
      <Card className={darkMode && 'dark-mode'}>
        <Accordion defaultActiveKey="1" >
          <Accordion.Item eventKey="0" className="accordion-item" style={{ background: darkMode ? 'transparent' : '#fff' }}>
            <Accordion.Header className={darkMode ? 'dark-mode relayers' : 'relayers'} style={{ color: darkMode ? 'white !important' : 'black !important' }}>
              <div className="w-100" style={{ display: "flex", justifyContent: "space-between", }}>
                <div className="h-100 align-items-center">
                  <ImageContainer>ds</ImageContainer>
                  <div className="ml-3">
                    <div>
                      <strong style={{ fontSize: "20px" }}>KAVA</strong>
                    </div>
                    <small style={{ color: "grey" }}>kava_2222-10</small>
                  </div>
                </div>
                <div>
                  <div className="flex aligh-items-center status-badge">
                    <span className="status-dot"></span>
                    <span className="status-label">Opened</span>
                  </div>
                  <div>Channel 3 / 3</div>
                </div>
                {/* <h4 className={darkMode ? 'text-white' : 'text-dark'} >KAVA <strong>sdsdd</strong></h4> */}
              </div>
            </Accordion.Header>
            <Accordion.Body className={darkMode ? 'dark-mode' : ''}>
              <Responsive>
                <table className="w-100" style={{ tableLayout: "auto" }}>
                  <colgroup>
                    <col />
                    <col style={{ width: "100px" }} />
                    <col />
                    <col style={{ width: "100px" }} />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th style={{ minWidth: "150px" }}>
                        <div className="d-flex alig-items-center">
                          <span><img src="" alt="" /></span>
                          <span className='ml-3'>Cosmos</span>
                        </div>
                      </th>
                      <th></th>
                      <th style={{ minWidth: "150px" }}>
                        <div className="d-flex alig-items-center">
                          <span><img src="" alt="" /></span>
                          <span className='ml-3'>Cava</span>
                        </div>
                      </th>
                      <th>Operating Period</th>
                      <th style={{ textAlign: "right" }}>24h Txs</th>
                      <th style={{ textAlign: "right" }}>24h Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        1
                      </td>
                      <td>
                        chanel-277
                      </td>
                      <td><Arrow color="green" width={20} /></td>
                      <td>chanel-0</td>
                      <td>250 days</td>
                      <td>
                        <div style={{ textAlign: "right" }}>98</div>
                        <div style={{ textAlign: "right", color: "red" }}>100%</div>
                      </td>
                      <td>
                        <div style={{ textAlign: "right" }}>98</div>
                        <div style={{ textAlign: "right", color: "red" }}>100%</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Responsive>

            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Card>
      <style jsx>{`
        .accordion-button{
          background: transparent !important;
        } 
    `}</style>
    </div>
  )
}

Relayers.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>
};

export default Relayers

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
  overflow:hidden;
  &.img{
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
`;

const Responsive = styled.div`
  width: 100%;
  overflow-x: auto;
  @media screen and (max-width: 700px){
    width: calc(100vw - 80px);
  }
  `;