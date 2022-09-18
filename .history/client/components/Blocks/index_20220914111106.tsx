import React from "react";
import Link from "next/link";
import { formatTime, formatHash, getValidatorsLogoFromWebsites, toDay } from "../../lib/Util/format"
import styled from "styled-components";
import {
  UrbanistBoldBlack40px
} from "../../styledMixins";
import { sha256 } from "@cosmjs/crypto";
import { Bech32, fromBase64, toHex, fromHex, toBech32 } from "@cosmjs/encoding";
import { useAppSelector } from "../../lib/hooks";
import ReactPaginate from "react-paginate";
import { Tab, Tabs } from "react-bootstrap";
import TxsData from "./Txs";


function BlocksContent(props) {
  const darkMode = useAppSelector(state => state.general.darkMode)
  const {
    getBlocks,
    getAllTxs,
    activeValidators
  } = props;
  //console.log(getBlocks)

  //function that receieves proposer address and returns the validators details
  const joinedBlocksValidatorsData = getBlocks.map((block) => {
    //convert proposer address to cosmosvalcons
    const proposerToBech32 = toBech32("cosmosvalcons", fromHex(block.proposer))

    const getActiveChainValidators = activeValidators.validators.map((validator) => {
      //fetch just the active validators
      //get the consensus pubkey
      const ed25519PubkeyRaw = fromBase64(validator.consensus_pubkey.key);
      const addressData = sha256(ed25519PubkeyRaw).slice(0, 20);
      const bech32Address = Bech32.encode("cosmosvalcons", addressData);

      if (bech32Address === proposerToBech32) {
        return { validator, block }
      }
    })
    return getActiveChainValidators
  })
  //console.log(joinedBlocksValidatorsData)

  return (
    <div className={darkMode ? 'dark-mode' : ''}>
      <Title className={darkMode ? 'dark-mode' : ''}>Blocks</Title>
      <Tabs defaultActiveKey="active" id="uncontrolled-tab-example" className="" variant="tabs">
        <Tab eventKey="active" title="Blocks" className="w-100">
          <Responsive>
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

            {joinedBlocksValidatorsData.map((details) => {
              return details?.map((data) => {
                if (data !== undefined) {
                  //console.log(data)
                  return (
                    <tr >
                      <Link href='/blocks[height]' as={`/blocks/${data.block.height}`} ><a>
                        <td>{data.block?.height ? data.block.height : null}</td> </a></Link>
                      <td>{data.block?.hash ? formatHash(data.block.hash, 15, '....') : null}</td>
                      <Link href='/validators[address]' as={`/validators/${data.validator.operator_address}`} ><a>
                        <td>
                          <img className="img" width={30} src={getValidatorsLogoFromWebsites(data?.validator?.description?.website)} alt="" />
                          <p style={{ display: 'inline', marginLeft: '10px' }}>{data?.validator?.description?.moniker}</p>
                        </td>
                      </a></Link>
                      <td>{data?.block?.noTxs}</td>
                      <td>{data?.block?.time ? toDay(data?.block.time, 'from') : null}</td>
                    </tr>
                  )
                }
              })
            })
            }
          </table>
        </Responsive>
            </Container>
          </Responsive>
        </Tab>
        <Tab eventKey="inactive" title="Transactions">
          <Responsive>
          <TxsData getAllTxs={getAllTxs} />
          </Responsive>
        </Tab>
      </Tabs>
      {/* <LatestBlocks1>
      <LatestBlocksTilte
        height={BlocksTitleData.height}
        hash={BlocksTitleData.hash}
        proposer={BlocksTitleData.proposer}
        noOfTxs={BlocksTitleData.noOfTxs}
        time={BlocksTitleData.time}
      />
       {joinedBlocksValidatorsData.map((details) => {
          return details?.map((data) => {
             if (data !== undefined){
               console.log(data)
            return(
      <OverlapGroup10>
         <Link href='/blocks[height]' as={`/blocks/${data.block.height }`} ><a>
        <HeightValue>{data.block?.height? data.block.height : null}</HeightValue>
        </a></Link>
        <HashValue>{data.block?.hash? formatHash(data.block.hash, 15, '....') : null}</HashValue>
        <Link href='/validators[address]' as={`/validators/${data.validator.operator_address}`} ><a>
        <ProposerValue>
        <img className="img" src={getValidatorsLogoFromWebsites(data?.validator?.description?.website)} alt="" />
                  {data?.validator?.description?.moniker}
        </ProposerValue>
        </a></Link>
        <NumberOfTxs>{data?.block?.noTxs}</NumberOfTxs>
        <TimeValue>{data?.block?.time? formatTime(data?.block.time): null}</TimeValue>
      </OverlapGroup10>
         )}
        })
    })
   }   
    </LatestBlocks1> */}
      <style jsx>{`
           Link{ 
            text-decoration: inherit;
           }
         `}</style>
    </div>
  );
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

const Title = styled.h1`
  ${UrbanistBoldBlack40px}
  min-height: 48px;
  min-width: 112px;
  letter-spacing: 0;
  margin-top: 50px;
  margin-bottom: 30px;
`;

export default BlocksContent;
