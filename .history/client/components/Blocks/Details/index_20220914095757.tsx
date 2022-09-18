import React, { useState } from 'react'
import styled from "styled-components";
import { abbrMessage, formatHash, formatTime, formatTimeDateYear, getValidatorsLogoFromWebsites, toDay } from '../../../lib/Util/format';
import {
  UrbanistBoldBlack26px,
  UrbanistNormalBlack24px,
  UrbanistBoldBlack40px,
} from "../../../styledMixins";
import { sha256 } from "@cosmjs/crypto";
import { Bech32, fromBase64, fromHex, toBech32 } from "@cosmjs/encoding";
import { useGetChainActiveValidatorsQuery } from '../../../lib/chainApi';
import Link from "next/link";
import { useAppSelector } from '../../../lib/hooks';
import ReactPaginate from 'react-paginate';
import { COIN, DENOM } from '../../../lib/Util/constants';

function BlockHeightContent(props: any) {
  const darkMode = useAppSelector(state => state.general.darkMode)
  const {
    title,
    blockData,
    txs
  } = props;
  //console.log(txs)

  const [currentPage, setCurrentPage] = useState(0);
  const [currentTxsPage, setCurrentTxsPage] = useState(0);


  //convert single proposer address
  const proposerToBech32FromBlockQuery = blockData?.block?.header != undefined ? blockData?.block?.header?.proposer_address : null

  //get the proposer adddress from signatures
  const getChainValidators = useGetChainActiveValidatorsQuery()
  const validatorsSignaturesDetails = blockData?.block?.last_commit?.signatures.map((validatorSignatureData) => {
    //convert proposer address from signatures to cosmosvalcons
    const proposerToBech32 = toBech32("cosmosvalcons", fromHex(validatorSignatureData.validator_address))
    const getActiveChainValidators = getChainValidators?.data?.validators.map((validator) => {
      //fetch just the active validators
      //get the consensus pubkey
      const ed25519PubkeyRaw = fromBase64(validator.consensus_pubkey.key);
      const addressData = sha256(ed25519PubkeyRaw).slice(0, 20);
      const bech32Address = Bech32.encode("cosmosvalcons", addressData);
      if (bech32Address === proposerToBech32) {
        return { validator, validatorSignatureData }
      }
    })
    return getActiveChainValidators
  })

  //get the block proposer
  //get the proposer name from the active validators existing in the total vaidators
  let proposerName
  validatorsSignaturesDetails?.map((details) => details?.map((data) => data?.validatorSignatureData?.validator_address === proposerToBech32FromBlockQuery ? proposerName = data : null))

  //add pagination to signatures
  const PER_PAGE = 10;
  const offset = currentPage * PER_PAGE;
  const currentValidatorSignatureData = validatorsSignaturesDetails?.slice(offset, offset + PER_PAGE) 
  const pageCount = Math.ceil(validatorsSignaturesDetails?.length / PER_PAGE);
  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }

  //get total transactions fee
  let totalTxsFee = 0
  let denom
  txs?.tx_responses !== null ? txs?.tx_responses?.map(tx => {
    totalTxsFee += Number(tx?.tx?.auth_info?.fee?.amount[0]?.amount)
    denom = tx?.tx?.auth_info?.fee?.amount[0]?.denom
  }) : null

    //add pagination to TXS 
    const txsPER_PAGE = 5;
    const offsetTxs = currentTxsPage * txsPER_PAGE;
    const currentTxsData = txs?.tx_responses.slice(offsetTxs, offsetTxs + PER_PAGE) 
    const txspageCount = Math.ceil(txs?.tx_responses?.length / txsPER_PAGE);
    function handleTxsPageClick({ selected: selectedPage }) {
      setCurrentTxsPage(selectedPage);
    }

  return (
    <div className={darkMode ? 'dark-mode' : ''}>
      <Title className={darkMode ? 'dark-mode' : ''}>{title}</Title>
      <Container>
        <Grid>
          <Card className={darkMode ? 'dark-mode' : ''} style={{ height: "100px" }}>
            <FlexCenter>
              <div>
                <h4>{blockData?.block?.header ? blockData?.block?.header.height : null}</h4>
                <h6 className="text-center">Height</h6>
              </div>
            </FlexCenter>
          </Card>
          <Card className={darkMode ? 'dark-mode' : ''} style={{ height: "100px" }}>
            <FlexCenter>
              <div>
                <h4>{blockData?.block?.header ? toDay(blockData?.block?.header?.time, 'from') : null}</h4>
                <h6 className="text-center">Time</h6>
              </div>
            </FlexCenter>
          </Card>
          <Card className={darkMode ? 'dark-mode' : ''} style={{ height: "100px" }}>
            <FlexCenter>
              <div>
                <Link href='/validators[address]' as={`/validators/${proposerName?.validator?.operator_address}`} ><a>
                  <Flex style={{ alignItems: "center" }}>
                    <img className="img" width={30} src={getValidatorsLogoFromWebsites(proposerName?.validator?.description?.website)} alt="" />
                    <h4 className="text-primary" style={{ marginLeft: "10px", marginBottom: "0px" }}>{proposerName?.validator?.description ? proposerName?.validator?.description?.moniker : null}</h4>
                  </Flex>
                </a></Link>
                <h6 className="text-center">Proposer</h6>
              </div>
            </FlexCenter>
          </Card>
          <Card className={darkMode ? 'dark-mode' : ''} style={{ height: "100px" }}>
            <FlexCenter>
              <div>
                <h4>{proposerName?.validatorSignatureData ? toDay(proposerName?.validatorSignatureData?.timestamp) : null}</h4>
                <h6 className="text-center">Time</h6>
              </div>
            </FlexCenter>
          </Card>
          <Card className={darkMode ? 'dark-mode' : ''} style={{ height: "100px" }}>
            <FlexCenter>
              <div>
                <h4>{blockData?.block?.data?.txs ? blockData.block.data.txs.length : null}</h4>
                <h6 className="text-center">Number of Txs</h6>
              </div>
            </FlexCenter>
          </Card>
          <Card className={darkMode ? 'dark-mode' : ''} style={{ height: "100px" }}>
            <FlexCenter>
              <div>
                <h4>{totalTxsFee} {COIN}</h4>
                <h6 className="text-center">Txs Total Fee</h6>
              </div>
            </FlexCenter>
          </Card>
          <Card className={darkMode ? 'dark-mode last-grid-item' : 'last-grid-item'} style={{ height: "100px" }}>
            <FlexCenter>
              <div>
                <h6 className="text-center">Hash</h6>
                <Hash>{blockData?.block_id ? blockData?.block_id?.hash : null}</Hash>
              </div>
            </FlexCenter>
          </Card>
          <Card className={darkMode ? 'dark-mode last-grid-item' : 'last-grid-item'} style={{ height: "100px" }}>
            <FlexCenter>
              <div>
                <h6 className="text-center">App Hash</h6>
                <Hash>{blockData?.block?.header ? blockData?.block?.header?.app_hash : null}</Hash>
              </div>
              <div>
                <h6 className="text-center">Consensus Hash</h6>
                <Hash>{blockData?.block?.header ? blockData?.block?.header?.consensus_hash : null}</Hash>
              </div>
            </FlexCenter>
          </Card>
          <Card className={darkMode ? 'dark-mode last-grid-item' : 'last-grid-item'} style={{ height: "100px" }}>
            <FlexCenter>
              <div>
                <h6 className="text-center">Data_Hash</h6>
                <Hash>{blockData?.block?.header ? blockData?.block?.header?.data_hash : null}</Hash>
              </div>
              <div>
                <h6 className="text-center">Evidence Hash</h6>
                <Hash>{blockData?.block?.header ? blockData?.block?.header?.evidence_hash : null}</Hash>
              </div>
            </FlexCenter>
          </Card>
          <Card className={darkMode ? 'dark-mode last-grid-item' : 'last-grid-item'} style={{ height: "100px" }}>
            <FlexCenter>
              <div>
                <h6 className="text-center">Last Commit Hash</h6>
                <Hash>{blockData?.block?.header ? blockData?.block?.header?.last_commit_hash : null}</Hash>
              </div>
              <div>
                <h6 className="text-center">Last Results Hash</h6>
                <Hash>{blockData?.block?.header ? blockData?.block?.header?.last_results_hash : null}</Hash>
              </div>
            </FlexCenter>
          </Card>
          <Card className={darkMode ? 'dark-mode last-grid-item' : 'last-grid-item'} style={{ height: "100px" }}>
            <FlexCenter>
              <div>
                <h6 className="text-center">Next Validators Hash</h6>
                <Hash>{blockData?.block?.header ? blockData?.block?.header?.next_validators_hash : null}</Hash>
              </div>
              <div>
                <h6 className="text-center">Validators Hash</h6>
                <Hash>{blockData?.block?.header ? blockData?.block?.header?.validators_hash : null}</Hash>
              </div>
            </FlexCenter>
          </Card>
        </Grid>
      </Container>
      <Container className='my-3'>
        <h5>Signatures</h5>
        <Card className={darkMode ? 'dark-mode p-3' : ' p-3'}>
          <Responsive>
            <table className="w-100 mt-3">
              <thead>
                <tr>
                  <th>Validators</th>
                  <th>Time</th>
                </tr>
              </thead>
              {currentValidatorSignatureData?.map((details) => {
                return details?.map((data) => {
                  if (data !== undefined) {
                    return (
                      <tbody>
                      <tr>
                        <Link href='/validators[address]' as={`/validators/${data.validator.operator_address}`} ><a>
                          <td>
                            <img className="img" width={30} src={getValidatorsLogoFromWebsites(data?.validator?.description?.website)} alt="" />
                            <p style={{ display: 'inline', marginLeft: '10px' }}>{data?.validator?.description ? data?.validator?.description?.moniker : null}</p>
                          </td>
                        </a></Link>
                        <td>{data?.validatorSignatureData ? toDay(data?.validatorSignatureData?.timestamp, 'from') : null}
                        </td>
                      </tr>
                      </tbody>
                    )
                  }
                })
              })
              }
            </table>
          </Responsive>
          { currentValidatorSignatureData !== ' ' ? 
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
        </Card>
      </Container>

      <Container className='w-100'>
        <h5>Transactions</h5>
        <Card className={darkMode ? 'dark-mode w-100' : 'w-100'}>
          <Responsive className="p-3">
            <table className={darkMode ? "dark-mode w-100 mt-3 table table-responsive" : 'w-100 mt-3 table table-responsive'}>
              <thead>
                <tr style={{ fontWeight: "bold" }}>
                  <th>Tx hash</th>
                  <th>Height</th>
                  <th>Status</th>
                  <th>Fee</th>
                  <th>Message</th>
                  <th>Time</th>
                </tr>
              </thead>
              {currentTxsData !== null ? currentTxsData?.map(tx =>
                <tbody>
                  <tr>
                      <td>
                      <Link href='/transaction[hash]' as={`/transaction/${tx.txhash}`} ><a>
                        {formatHash(tx?.txhash, 20, '..')}
                      </a></Link>
                      </td>
                    <td>{tx?.height}</td>
                    <td className={tx.code === 0 ? "text-success" : 'text-danger'}>{tx.code === 0 ? 'Success' : 'failed'}</td>
                    <td>{tx?.tx?.auth_info?.fee?.amount[0]?.amount/DENOM} {COIN}</td>
                    <td>{abbrMessage(tx.tx.body.messages)}</td>
                    <td>{toDay(tx?.timestamp, 'from')}</td>
                  </tr>
                </tbody>
              ) : <p>NO </p>}
            </table>
          </Responsive>
          { currentTxsData !== ' ' ? 
          <ReactPaginate
            previousLabel={"←"}
            nextLabel={"→"}
            pageCount={txspageCount}
            onPageChange={handleTxsPageClick}
            containerClassName={"pagination"}
            previousLinkClassName={"pagination__link"}
            nextLinkClassName={"pagination__link"}
            disabledClassName={"pagination__link--disabled"}
            activeClassName={"pagination__link--active"}
          /> : null }
        </Card>
      </Container>
      {/* <OverlapGroupContainer>
            <OverlapGroup18>
              <Address>{address1}</Address>
              <Height>{height1}</Height>
            </OverlapGroup18>
            <OverlapGroup14>
              <Text1>{text1}</Text1>
              <Time>{time1}</Time>
            </OverlapGroup14>
          </OverlapGroupContainer>
          <OverlapGroupContainer1>
            <OverlapGroup13>
              <Ellipse8></Ellipse8>
              <FlexCol3>
                <Mannyel>{mannyel}</Mannyel>
                <Proposer>{proposer}</Proposer>
              </FlexCol3>
            </OverlapGroup13>
            <OverlapGroup15>
              <Address1>{address2}</Address1>
              <TimeAgo>{timeAgo}</TimeAgo>
            </OverlapGroup15>
          </OverlapGroupContainer1>
          <OverlapGroupContainer2>
            <OverlapGroup12>
              <Number>{number1}</Number>
              <NoOfCRs>{noOfCrs}</NoOfCRs>
            </OverlapGroup12>
            <OverlapGroup17>
              <X0975CORIS>{x0975Coris}</X0975CORIS>
              <CRTotalFee>{crTotalFee}</CRTotalFee>
            </OverlapGroup17>
          </OverlapGroupContainer2>
          <OverlapGroup16>
            <FlexCol4>
              <X34gd73874gf783ff374g>{x34Gd73874Gf783Ff374G}</X34gd73874gf783ff374g>
              <Hash>{hash1}</Hash>
            </FlexCol4>
            <OutlineFilesCopy src={iconCopy} />
          </OverlapGroup16>
          <Signatures>{signatures}</Signatures>
          <LatestBlocks>
            <Validators1>{validators2}</Validators1>
            <OverlapGroup10>
              <Ellipse81></Ellipse81>
              <DgtizeStake>{dgtizeStake1}</DgtizeStake>
            </OverlapGroup10>
            <OverlapGroup9>
              <Ellipse82></Ellipse82>
              <DgtizeStake>{dgtizeStake2}</DgtizeStake>
            </OverlapGroup9>
            <OverlapGroup8>
              <Ellipse83></Ellipse83>
              <DgtizeStake>{dgtizeStake3}</DgtizeStake>
            </OverlapGroup8>
            <OverlapGroup9>
              <Ellipse84></Ellipse84>
              <DgtizeStake>{dgtizeStake4}</DgtizeStake>
            </OverlapGroup9>
            <OverlapGroup8>
              <Ellipse85></Ellipse85>
              <DgtizeStake>{dgtizeStake5}</DgtizeStake>
            </OverlapGroup8>
            <OverlapGroup9>
              <Ellipse86></Ellipse86>
              <DgtizeStake>{dgtizeStake6}</DgtizeStake>
            </OverlapGroup9>
            <OverlapGroup8>
              <Ellipse87></Ellipse87>
              <DgtizeStake>{dgtizeStake7}</DgtizeStake>
            </OverlapGroup8>
            <OverlapGroup9>
              <Ellipse81></Ellipse81>
              <DgtizeStake>{dgtizeStake8}</DgtizeStake>
            </OverlapGroup9>
            <OverlapGroup8>
              <Ellipse88></Ellipse88>
              <DgtizeStake>{dgtizeStake9}</DgtizeStake>
            </OverlapGroup8>
            <OverlapGroup9>
              <Ellipse89></Ellipse89>
              <DgtizeStake>{dgtizeStake10}</DgtizeStake>
            </OverlapGroup9>
            <OverlapGroup8>
              <Ellipse810></Ellipse810>
              <DgtizeStake>{dgtizeStake11}</DgtizeStake>
            </OverlapGroup8>
          </LatestBlocks>
          <Transactions>{transactions}</Transactions>
          <OverlapGroup11>
            <LatestBlocksTilte>
              <Height1>{height2}</Height1>
              <Hash1>{hash2}</Hash1>
              <Status>{status}</Status>
              <Fee>{fee}</Fee>
              <Message>{message}</Message>
              <Type>{type}</Type>
              <Time1>{time2}</Time1>
            </LatestBlocksTilte>
            <OverlapGroup19>
              <Phone>{phone1}</Phone>
              <X34567efe34g6j7k85h>{x34567EfE34G6J7K85H1}</X34567efe34g6j7k85h>
              <Place>{place1}</Place>
              <Number1>{number2}</Number1>
              <Number2>{number3}</Number2>
              <X34567efe34g6j7k85h1>{x34567EfE34G6J7K85H2}</X34567efe34g6j7k85h1>
              <X6sAgo>{x6SAgo1}</X6sAgo>
            </OverlapGroup19>
            <OverlapGroup2>
              <Phone1>{phone2}</Phone1>
              <X34567efe34g6j7k85h2>{x34567EfE34G6J7K85H3}</X34567efe34g6j7k85h2>
              <Place1>{place2}</Place1>
              <Number3>{number4}</Number3>
              <Number4>{number5}</Number4>
              <X34567efe34g6j7k85h3>{x34567EfE34G6J7K85H4}</X34567efe34g6j7k85h3>
              <X6sAgo1>{x6SAgo2}</X6sAgo1>
            </OverlapGroup2>
            <OverlapGroup>
              <Phone1>{phone3}</Phone1>
              <X34567efe34g6j7k85h2>{x34567EfE34G6J7K85H5}</X34567efe34g6j7k85h2>
              <Place1>{place3}</Place1>
              <Number3>{number6}</Number3>
              <Number5>{number7}</Number5>
              <X34567efe34g6j7k85h3>{x34567EfE34G6J7K85H6}</X34567efe34g6j7k85h3>
              <X6sAgo1>{x6SAgo3}</X6sAgo1>
            </OverlapGroup>
            <OverlapGroup4>
              <Phone1>{phone4}</Phone1>
              <X34567efe34g6j7k85h2>{x34567EfE34G6J7K85H7}</X34567efe34g6j7k85h2>
              <Place1>{place4}</Place1>
              <Number3>{number8}</Number3>
              <Number6>{number9}</Number6>
              <X34567efe34g6j7k85h4>{x34567EfE34G6J7K85H8}</X34567efe34g6j7k85h4>
              <X6sAgo1>{x6SAgo4}</X6sAgo1>
            </OverlapGroup4>
            <OverlapGroup3>
              <Phone1>{phone5}</Phone1>
              <X34567efe34g6j7k85h2>{x34567EfE34G6J7K85H9}</X34567efe34g6j7k85h2>
              <Place1>{place5}</Place1>
              <Number7>{number10}</Number7>
              <Number8>{number11}</Number8>
              <X34567efe34g6j7k85h5>{x34567EfE34G6J7K85H10}</X34567efe34g6j7k85h5>
              <X6sAgo1>{x6SAgo5}</X6sAgo1>
            </OverlapGroup3>
          </OverlapGroup11> */}
    </div>
  )
}

const Hash = styled.h4`
  text-align: center;
  padding: 0px 20px;
  font-size: 14px;
  @media screen and (max-width: 520px){
   font-size: 10px;
  }
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

const Flex = styled.div`
  display: flex
`;

const FlexCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;


const InLineFlex = styled.div`
  display:inline-flex;
  flex-wrap: wrap;
  align-items:center;
  justify-content: center;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns:auto auto;
  grid-gap: 20px;
  @media screen and (max-width: 520px){
    grid-gap: 10px;
  }
`;

const Container = styled.div`
  display: block;
`;

const Responsive = styled.div`
  width: 100%;
  overflow-x: auto;
  @media screen and (max-width: 1075px){
    width: calc(100vw - 40px);
  }
`;

const Circle = styled.div`
  width: 23px;
  height: 23px;
  border-radius: 50%;
  background:red;
`;

const Title = styled.h1`
  ${UrbanistBoldBlack40px}
  min-height: 48px;
  margin-top: 54px;
  letter-spacing: 0;
`;

const OverlapGroupContainer = styled.div`
  height: 128px;
  margin-top: 30px;
  display: flex;
  align-items: flex-start;
  min-width: 1336px;
`;

const OverlapGroup18 = styled.div`
  width: 660px;
  display: flex;
  flex-direction: column;
  padding: 29px 268px;
  align-items: flex-end;
  min-height: 128px;
  background-color: var(--white);
  border-radius: 20px;
  box-shadow: 0px 7px 30px #0015da29;
`;

const Address = styled.div`
  ${UrbanistBoldBlack26px}
  min-height: 31px;
  min-width: 123px;
  letter-spacing: 2.08px;
`;

const Height = styled.div`
  ${UrbanistNormalBlack24px}
  min-height: 29px;
  align-self: center;
  margin-top: 8px;
  min-width: 68px;
  letter-spacing: 0;
`;

const OverlapGroup14 = styled.div`
  width: 660px;
  margin-left: 16px;
  display: flex;
  flex-direction: column;
  padding: 29px 0;
  align-items: center;
  min-height: 128px;
  background-color: var(--white);
  border-radius: 20px;
  box-shadow: 0px 7px 30px #0015da29;
`;

const Text1 = styled.div`
  ${UrbanistBoldBlack26px}
  min-height: 31px;
  min-width: 268px;
  letter-spacing: 2.08px;
`;

const Time = styled.div`
  ${UrbanistNormalBlack24px}
  min-height: 29px;
  margin-top: 8px;
  margin-left: 1px;
  min-width: 53px;
  letter-spacing: 0;
`;

export default BlockHeightContent