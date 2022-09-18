import React, { useEffect, useState } from "react";
import Link from "next/link";
import { formatTime, formatHash, getValidatorsLogoFromWebsites, numberWithSpaces, formatNumbers, toDay } from "../../lib/Util/format"
import styled from "styled-components";
import Details from './Details'
import Details2 from './Details2'
import {
  UrbanistBoldBlack26px,
  UrbanistNormalBlack24px,
  UrbanistBoldChambray21px,
  UrbanistLightBlack24px,
  UrbanistBoldBlack40px,
} from "../../styledMixins";
import { sha256 } from "@cosmjs/crypto";
import { Bech32, fromBase64, toHex, fromHex, toBech32 } from "@cosmjs/encoding";
import { useGetChainActiveValidatorsQuery, useGetChainPoolQuery, useGetChainValidatorsQuery } from "../../lib/chainApi";
import dynamic from 'next/dynamic'
import axios from "axios";
import OnlineVotingPowerChart from "./Details/votingPowerChart";
import ActiveValidatorsChart from "./Details2/activeValidatorsChart";
import { useAppSelector } from "../../lib/hooks";
import ReactPaginate from "react-paginate";



//importing dynamically
const PriceChart = dynamic(() => import('./Details/priceChart'), {
  ssr: false
})

const PoolChart = dynamic(() => import('./Details/poolChart'), {
  ssr: false
})

let coinID = 'juno-network'
const denom = 1000000;

function HomePageContent(props) {
  const darkMode = useAppSelector(state => state.general.darkMode)
  const {
    title,
    apr,
    aprValue,
    place1,
    inflation,
    inflationValue,
    communityPool,
    communityPoolValue,
    latestBlocks,
    viewAll,
    getBlocks,
  } = props;

  //function that receieves proposer address and returns the validators details
  const getChainValidators = useGetChainActiveValidatorsQuery()
  const joinedBlocksValidatorsData = getBlocks.map((block) => {
    //convert proposer address to cosmosvalcons
    const proposerToBech32 = toBech32("cosmosvalcons", fromHex(block.proposer))
    const getActiveChainValidators = getChainValidators?.data?.validators.map((validator) => {
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

  //function to get coin details
  const [coinData, setCoin]: any = useState([])
  let API_Call = `https://api.coingecko.com/api/v3/coins/${coinID}`
  useEffect(() => {
    axios.get(API_Call).then((response) => {
      setCoin(response.data)
    }).catch((error) => {
      console.log(error)
    })
  }, []);

  //get price data and pass to price chart component
  const [priceChart, setPriceChart]: any = useState([])
  let API_PriceData = `https://api.coingecko.com/api/v3/coins/${coinID}/market_chart?vs_currency=usd&days=1`
  useEffect(() => {
    axios.get(API_PriceData).then((response) => {
      const getPrice = response.data.prices
        setPriceChart(getPrice)
    }).catch((error) => {
      console.log(error)
    })
  }, [])
  //console.log(priceChart)

  //get Bonded Token and Not bonded Token
  const getPool = useGetChainPoolQuery()
  const bondedTokens = getPool.isLoading == false ? (getPool?.data?.pool?.bonded_tokens / denom).toFixed(2) : null
  const notBondedTokens = getPool.isLoading == false ? (getPool?.data?.pool?.not_bonded_tokens / denom).toFixed(2) : null

  //get voting power and the active validators
  const getAllValidators = useGetChainValidatorsQuery()
  const getAllActiveValidators = useGetChainActiveValidatorsQuery()
  const totalValidators = getAllValidators.isLoading == false ? getAllValidators?.data?.validators?.length : null
  const totalActiveValidators = getAllActiveValidators.isLoading == false ? getAllActiveValidators?.data?.validators?.length : null

  //percentage of active Validators
  const percentageOfActiveValidators = totalActiveValidators != undefined && totalValidators != undefined ? Math.round(Number(totalActiveValidators / totalValidators) * 100) : null

  //get the validators total voting power
  let totalVotingPower = 0
  getAllValidators.isLoading == false ? getAllValidators?.data?.validators.map(validatorsDetails => {
    totalVotingPower += Number(validatorsDetails.tokens / denom)
    return totalVotingPower
  }) : null

  //get the validators total active voting power
  let totalActiveVotingPower = 0
  getAllActiveValidators.isLoading == false ? getAllActiveValidators?.data?.validators.map(validatorsDetails => {
    totalActiveVotingPower += Number(validatorsDetails.tokens / denom)
    return totalActiveVotingPower
  }) : null

  //percentage of online Voting Power
  const percentageOfVotingPower = getAllValidators.isLoading == false && getAllActiveValidators.isLoading == false ? Math.round(Number(totalActiveVotingPower / totalVotingPower) * 100) : null
 

  const detailsData = {
    onlineVotingPower: "Online Voting power",
    x36516M1: formatNumbers(totalActiveVotingPower),
    place: "from",
    x36516M2: formatNum totalVotingPower,
  };

  const details2Data = {
    activeValidators: "Active Validators",
    number1: totalActiveValidators,
    outOf: "out of",
    number2: totalValidators,
  };

  return (
    <Wrapper className={darkMode ? 'dark-mode' : ''}>
      <Title className={darkMode ? 'dark-mode' : ''}>{title}</Title>
      <Grid>
        <GridItem className={darkMode ? 'dark-mode first-item chart' : 'first-item chart'}>
          <Icon>
            {
              darkMode ? (
                <><img className="asset-6-2" src={coinData?.image?.large} height="40" /> {coinData?.symbol?.toUpperCase()}</>
              ) : (
                <><img className="asset-6-2" src={coinData?.image?.large} height="40" />   {coinData?.symbol?.toUpperCase()}</>
              )
            }
          </Icon>
          <Stat>
            {Math.sign(coinData?.market_data?.current_price?.usd) === 1? <Amount>${coinData?.market_data?.current_price?.usd}</Amount>: Math.sign(coinData?.market_data?.current_price?.usd) === -1? <Amount style={{color: 'red'}}>${coinData?.market_data?.current_price?.usd}</Amount> : null }
            <Flex>
              <FlexCol>
                {/* <Increase>
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 10L7 0L14 10H0Z" fill="#59B17D" />
                  </svg>
                </Increase> */}
                <Decrease>
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 10L7 0L14 10H0Z" fill={Math.sign(coinData?.market_data?.price_change_percentage_24h) === 1? '#2ec169' : Math.sign(coinData?.market_data?.price_change_percentage_24h) === -1? 'red' : null} />
                  </svg>
                </Decrease>
              </FlexCol>
              <p style={{marginTop: '-12px'}}>{coinData?.market_data?.price_change_percentage_24h? coinData?.market_data?.price_change_percentage_24h.toFixed(2)+'%': null} (24h)</p>
            </Flex>
          </Stat>
          <br />
          <PriceChart {...priceChart} />
        </GridItem>
        <GridItem className={darkMode ? 'dark-mode second-item p-3' : 'second-item p-3'}>
          <FlexCol className="h-100">
            <Flex className="h-50 align-items-center">
              <MarketCapDef className="w-50">marketCap</MarketCapDef>
              <MarketCapVal className="w-50">${coinData?.market_data?.market_cap ? numberWithSpaces(coinData.market_data.market_cap.usd) : null}</MarketCapVal>
            </Flex>
            <Flex className="h-50 align-items-center">
              <MarketCapDef className="w-50">marketCapRank</MarketCapDef>
              <MarketCapVal className="w-50">{coinData?.market_cap_rank ? coinData.market_cap_rank : null}</MarketCapVal>
            </Flex>
            <Flex className="h-50 align-items-center">
              <MarketCapDef className="w-50">24h Vol</MarketCapDef>
              <MarketCapVal className="w-50">${coinData?.market_data?.total_volume ? numberWithSpaces(coinData?.market_data?.total_volume?.usd) : null}</MarketCapVal>
            </Flex>
          </FlexCol>
        </GridItem>
        <GridItem className={darkMode ? 'dark-mode third-item' : 'third-item'}>
          <Flex className="h-100">
            <FlexCol className="w-50 align-items-center justify-content-center">
              <LatestBlock className={darkMode ? 'dark-mode' : ''}>latest Block</LatestBlock>
              <Phone00 className={darkMode ? 'dark-mode' : ''}>{getBlocks ? numberWithSpaces(getBlocks[0]?.height) : null}</Phone00>
            </FlexCol>
            <Divider></Divider>
            <FlexCol className="w-50 align-items-center justify-content-center">
              <BlockTime className={darkMode ? 'dark-mode' : ''}>Block Time</BlockTime>
              <X602s className={darkMode ? 'dark-mode' : ''}>{getBlocks ? toDay(getBlocks[0]?.time, 'from') : null}</X602s>
            </FlexCol>
            <Divider></Divider>
            <FlexCol className="w-50 align-items-center justify-content-center">
              <Chain className={darkMode ? 'dark-mode' : ''}>chain</Chain>
              <Corichain1 className={darkMode ? 'dark-mode' : ''}>{coinData ? coinData?.symbol?.toUpperCase() : null}</Corichain1>
            </FlexCol>
          </Flex>
        </GridItem>
      </Grid>
      <Grid1>
        <GridItem1 className={darkMode ? 'dark-mode first-item' : 'first-item'}>
          <FlexCenter className="h-100">
            <div className="p-3">
              <APR1 className={darkMode ? 'dark-mode' : ''}>
              Coingecko Rank
                {/* {apr} */}
              </APR1>
              <Text1 className={darkMode ? 'dark-mode' : ''} title={aprValue}>{coinData?.coingecko_rank}</Text1>
            </div>
          </FlexCenter>
        </GridItem1>
        <GridItem1 className={darkMode ? 'dark-mode second-item' : 'second-item'}>
          <FlexCenter className="h-100">
            <OverlapGroup13>
              <Place className={darkMode ? 'dark-mode' : ''}>{place1}</Place>
              <Address className={darkMode ? 'dark-mode' : ''}>{coinData?.market_data?.total_supply !== null? formatNumbers(coinData?.market_data?.total_supply) +' '+ coinData?.symbol?.toUpperCase() : 'Null'} </Address>
            </OverlapGroup13>
          </FlexCenter>
        </GridItem1>
        <GridItem1 className={darkMode ? 'dark-mode third-item' : 'third-item'}>
          <OnlineVotingPower>
            <Details
              onlineVotingPower={detailsData.onlineVotingPower}
              x36516M1={detailsData.x36516M1}
              place={detailsData.place}
              x36516M2={detailsData.x36516M2}
            />
            <OverlapGroup2 style={{ position: 'relative' }}>
              <Percent style={{ position: 'absolute', right: '10px;' }}>
                <OnlineVotingPowerChart percentageOfVotingPower={percentageOfVotingPower} />
              </Percent>
            </OverlapGroup2>
          </OnlineVotingPower>
        </GridItem1>
        <GridItem1 className={darkMode ? 'dark-mode fourth-item' : 'fourth-item'}>
          <ActiveValidators>
            <Details2
              activeValidators={details2Data.activeValidators}
              number1={details2Data.number1}
              outOf={details2Data.outOf}
              number2={details2Data.number2}
            />
            <OverlapGroup3 style={{ position: 'relative'}}>
              <Percent1 style={{position: 'absolute', right: '10px;'}}>
                 <ActiveValidatorsChart percentageOfActiveValidators={percentageOfActiveValidators} />
              </Percent1>
            </OverlapGroup3>
          </ActiveValidators>
        </GridItem1>
      </Grid1>
      <Grid1>
        <GridItem1 className={darkMode ? 'dark-mode first-item' : 'first-item'}>
          <FlexCenter className="h-100">
            <Inflation>
              <APR1 className={darkMode ? 'dark-mode' : ''}>{inflation}</APR1>
              <Text1 className={darkMode ? 'dark-mode' : ''}>{inflationValue}</Text1>
            </Inflation>
          </FlexCenter>
        </GridItem1>
        <GridItem1 className={darkMode ? 'dark-mode second-item' : 'second-item'}>
          <FlexCenter className="h-100">
            <OverlapGroup14>
              <Place className={darkMode ? 'dark-mode' : ''}>{communityPool}</Place>
              <Address className={darkMode ? 'dark-mode' : ''}>{communityPoolValue}</Address>
            </OverlapGroup14>
          </FlexCenter>
        </GridItem1>
        <GridItem1 style={{height: 'fit-content'}} className={darkMode ? 'dark-mode third-item span-last-ends' : 'third-item span-last-ends'}>
          <Flex className="h-100 w-100 align-items-center" style={{ padding: "20px" }}>
            <FlexCol className="w-100">
              <APR1 className={darkMode ? 'dark-mode' : ''}>Pool</APR1>
              <Flex>
                <FlexCol><Bullet /></FlexCol>
                <FlexCol style={{ margin: '0px 20px' }}>
                  <Place1 className={darkMode ? 'dark-mode' : ''}>Bonded</Place1>
                  <Phone className={darkMode ? 'dark-mode' : ''}>{formatNumbers(bondedTokens)}</Phone>
                </FlexCol>
                <FlexCol><Bullet className="light" /></FlexCol>
                <FlexCol style={{ margin: '0px 20px' }}>
                  <Bonded className={darkMode ? 'dark-mode' : ''}>Not Bonded</Bonded>
                  <Phone1 className={darkMode ? 'dark-mode' : ''}>{formatNumbers(notBondedTokens)}</Phone1>
                </FlexCol>
              </Flex>
            </FlexCol>
            <Flex className="h-100 p-3">
              <OverlapGroup2>
                <PoolChart bondedTokens={bondedTokens} notBondedTokens={notBondedTokens} />
              </OverlapGroup2>
            </Flex>
          </Flex>
        </GridItem1>
      </Grid1>

      <Flex className="align-items-center justify-content-between">
        <LatestBlocks className={darkMode ? 'dark-mode' : ''}>{latestBlocks}</LatestBlocks>
        <Link href='/blocks' ><a><ViewAll className={darkMode ? 'dark-mode' : ''}>{viewAll}</ViewAll></a></Link>
      </Flex>
      <Container className={darkMode ? 'dark-mode w-100' : 'w-100'}>
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
                    <tr>
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
    </Wrapper>
  )
}

const Increase = styled.div`
  margin-top: -3px;
`

const Decrease = styled.div`
  transform: rotate(180deg);
  margin-top: 3px;
`

const Amount = styled.div`
  color: #2ec169;
  font-size:24px;
  font-weight: bolder;
  text-align:right;
  margin-bottom: 10px;
`;

const Icon = styled.div`
  position: absolute;
  left: 20px;
  top: 10px;
`;

const Stat = styled.div`
  position: absolute;
  right: 20px;
  top: 10px;
`;

const Wrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  padding-top: 50px;
  padding: 10px;
`;

const Responsive = styled.div`
  width: 100%;
  overflow-x: auto;
  @media screen and (max-width: 1075px){
    width: calc(100vw - 70px);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  margin: 20px 0px;
  width: 100%;
  grid-gap: 20px;
  @media screen and (max-width:1272px){
      grid-template-columns: repeat(6, 1fr);
    }
`;

const GridItem = styled.div`
  position: relative;
  display: block;
  box-shadow: 0px 7px 30px #0015da29;
  border-radius: 20px;
  height: 150px;
  &.chart{
    height:auto !important;
    min-height: 250px !important;
  }
  &.first-item{
    grid-column: 1 / 4;
    grid-row: 1 / span 2;
    height: unset;
    @media screen and (max-width:1272px){
      grid-column: 1 / span 8;
    }
    @media screen and (max-width:838px){
      grid-column: 1 / span 8;
    }
  }
  &.second-item{
    grid-column: 4 / span 2;
    @media screen and (max-width:1272px){
      grid-column: 1 / span 3;
    };
    @media screen and (max-width:838px){
      grid-column: 1 / span 8;
    };
  }
  &.third-item{
    grid-column: 4 / span 2;
    @media screen and (max-width:1272px){
      grid-column: 4/ 9;
    };
    @media screen and (max-width:838px){
      grid-column: 1 / span 8;
    }
  }
  &.w-200px{
    width: 200px;
  }
  &.h-200px{
    height: 200px;
  }
  &.dark-mode{
    background-color:#19172d !important;
    box-shadow: 0px -1px 20px 0px #23232329 !important;
  }
`;

const Grid1 = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  margin: 20px 0px;
  width: 100%;
  grid-gap: 20px;
`;

const GridItem1 = styled.div`
  display: block;
  box-shadow: 0px 7px 30px #0015da29;
  border-radius: 20px;
  height: 160px;
  @media screen and (max-width:1272px){
    grid-column: 1/ 5;
  }
  @media screen and (max-width:838px){
      grid-column: 1 / span 11;
    }
  &.second-item{
    grid-column: 2 / 4;
    @media screen and (max-width:1272px){
      grid-column: 5/ 11;
    }
    @media screen and (max-width:838px){
      grid-column: 1 / span 11;
    }
  }
  &.third-item{
    grid-column: 4 / 7;
    @media screen and (max-width:1272px){
      grid-column: 1/ 5;
    }
    @media screen and (max-width:838px){
      grid-column: 1 / span 11;
    }
  }
  &.fourth-item{
    grid-column: 7 / 10;
    @media screen and (max-width:1272px){
      grid-column: 5/ 11;
    }
    @media screen and (max-width:838px){
      grid-column: 1 / span 11;
    }
  }
  &.span-last-ends{
    grid-column: 4 / 10;
    @media screen and (max-width:1272px){
      grid-column: 1/ 11;
    }
    @media screen and (max-width:838px){
      grid-column: 1 / span 11;
    }
  }
  &.dark-mode{
    background-color:#19172d !important;
    box-shadow: 0px -1px 20px 0px #23232329 !important;
  }
`;

const Container = styled.div`
  display: block;
  box-shadow: 0px 7px 30px #0015da29;
  border-radius: 20px;
  padding: 20px;
  margin: 20px 0px;
  &.dark-mode{
    background-color:#19172d !important;
    box-shadow: 0px -1px 20px 0px #23232329 !important;
  }
`;

const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
`;

const Flex = styled.div`
  display: flex;
`;

const MarketCapDef = styled.div`
  display: flex;
  flex-direction: column;
`;

const MarketCapVal = styled.div`
  font-weight: bold;
  font-size: 20px;
`;

const Divider = styled.div`
  width: 5px;
  height: 90%;
  background: radial-gradient( 50% 50% at 50% 50%,rgba(57.9999965429306,66.00001126527786,138.00000697374344,0.2199999988079071) 0%,rgba(93.00000205636024,83.00000265240669,213.00000250339508,0) 100% );
`;

const FlexCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Bullet = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  background: #3a428a;
  &.light{
    background: #d1d6ff;
  }
`;

const Title = styled.h1`
  ${UrbanistBoldBlack40px}
  min-height: 48px;
  letter-spacing: 0;
  margin-top: 40px;
`;

const Rectangle32 = styled.div`
  position: absolute;
  width: 5px;
  height: 174px;
  top: 0;
  left: 314px;
  background: radial-gradient(
    50% 50% at 50% 50%,
    rgba(57.9999965429306, 66.00001126527786, 138.00000697374344, 0.2199999988079071) 0%,
    rgba(93.00000205636024, 83.00000265240669, 213.00000250339508, 0) 100%
  );
`;

const FlexRow2 = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: flex-start;
  min-width: 1334px;
`;

const APR = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
`;

const APR1 = styled.div`
  ${UrbanistNormalBlack24px}
  min-height: 29px;
  letter-spacing: 0;
  margin-left: 20px
`;

const Text1 = styled.div`
  ${UrbanistBoldBlack26px}
  letter-spacing: 2.08px;
  width: 120px;
  overflow: hidden;
  font-size: 24px !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left: 30px;
`;

const OverlapGroup13 = styled.div`
  width: 435px;
  margin-left: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Place = styled.div`
  ${UrbanistNormalBlack24px}
  min-height: 29px;
  margin-top: 5px;
  letter-spacing: 0;
`;

const Address = styled.div`
  ${UrbanistBoldBlack26px}
  letter-spacing: 2.08px;
  font-size: 16px !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`;

const OnlineVotingPower = styled.div`
  height: 90%;
  display: flex;
  padding: 39px 16px;
  width: 100px;
  padding-right: 30px;
  justify-content: space-between;
`;

const OverlapGroup2 = styled.div`
  position: relative;
  align-items: center;
  margin-left: 8px;
  border-radius: 47.5px;
`;

const Percent = styled.div`
  ${UrbanistBoldChambray21px}
  position: relative;
  top: 35px;
  left:1px;
  letter-spacing: 1.68px;
`;

const Ellipse9 = styled.div`
  position: absolute;
  width: 95px;
  height: 95px;
  top: 0;
  left: -21px;
  border-radius: 47.5px;
  border: 10px solid var(--chambray);
`;

const ActiveValidators = styled.div`
  height: 174px;
  position: relative;
  margin-left: 16px;
  display: flex;
  padding: 39px 16px;
  align-items: center;
  justify-content: space-between;
`;

const OverlapGroup3 = styled.div`
  width: 95px;
  height: 95px;
  position: relative;
  align-self: flex-end;
  border-radius: 47.5px;
  border: 10px solid var(--fog);
`;

const Vector = styled.img`
  position: absolute;
  width: 56px;
  height: 55px;
  top: -10px;
  left: 29px;
`;

const Percent1 = styled.div`
  ${UrbanistBoldChambray21px}
  position: absolute;
  top: 25px;
  left: 16px;
  letter-spacing: 1.68px;
`;

const FlexRow3 = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: flex-start;
  min-width: 1346px;
`;

const Inflation = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 31px 19px;
  align-items: flex-start;
`;

const OverlapGroup14 = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 26px 18px;
`;

const OverlapGroup15 = styled.div`
  height: 174px;
  margin-left: 16px;
  display: flex;
  padding: 0 15px;
  align-items: center;
  min-width: 720px;
  background-color: var(--white);
  border-radius: 20px;
  box-shadow: 0px 7px 30px #0015da29;
`;

const FlexCol5 = styled.div`
  width: 347px;
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 100px;
`;

const FlexRow4 = styled.div`
  ${UrbanistLightBlack24px}
  height: 34px;
  margin-top: 15px;
  margin-left: 1px;
  display: flex;
  align-items: flex-start;
  min-width: 314px;
`;

const Rectangle28 = styled.div`
  width: 29px;
  height: 29px;
  align-self: flex-end;
  background-color: var(--chambray);
  border-radius: 10px;
`;

const Place1 = styled.div`
  letter-spacing: 0;
`;

const Bonded = styled.div`
  letter-spacing: 0;
`;


const Phone = styled.div`
    font-weight: bold;
  letter-spacing: 1.28px;
`;

const Phone1 = styled.div`
  letter-spacing: 1.28px;
  font-weight: bold;
`;


const LatestBlocks = styled.div`
  font-family: var(--font-family-urbanist);
  font-weight: 700;
  color: var(--black);
  font-size: 32px;
  letter-spacing: 0;
`;

const ViewAll = styled.div`
  ${UrbanistNormalBlack24px}
  letter-spacing: 0;
`;

const LatestBlock = styled.div`
  ${UrbanistNormalBlack24px}
  min-height: 29px;
  margin-left: 2px;
  letter-spacing: 0;
`;

const Phone00 = styled.div`
  ${UrbanistBoldBlack26px}
  min-height: 31px;
  margin-top: 16px;
  letter-spacing: 2.08px;
`;

const BlockTime = styled.div`
  ${UrbanistNormalBlack24px}
  min-height: 29px;
  letter-spacing: 0;
`;

const X602s = styled.div`
  ${UrbanistBoldBlack26px}
  min-height: 31px;
  margin-top: 16px;
  letter-spacing: 2.08px;
`;

const Chain = styled.div`
  ${UrbanistNormalBlack24px}
  min-height: 29px;
  letter-spacing: 0;
`;

const Corichain1 = styled.div`
  ${UrbanistBoldBlack26px}
  min-height: 40px;
  margin-top: 16px;
  letter-spacing: 0;
`;

export default HomePageContent
