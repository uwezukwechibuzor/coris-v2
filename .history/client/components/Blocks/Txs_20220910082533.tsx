import React from "react";
import Link from "next/link";
import { formatTime, formatHash, getValidatorsLogoFromWebsites, toDay } from "../../lib/Util/format"
import styled from "styled-components";
import {
  UrbanistNormalNewCar172px,
  UrbanistNormalBlack172px,
  UrbanistMediumAbsoluteZero172px,
  UrbanistBoldBlack40px
} from "../../styledMixins";
import { sha256 } from "@cosmjs/crypto";
import { Bech32, fromBase64, toHex, fromHex, toBech32 } from "@cosmjs/encoding";
import { useGetChainActiveValidatorsQuery } from "../../lib/chainApi";
import { useAppSelector } from "../../lib/hooks";
import ReactPaginate from "react-paginate";


const Txs = () => {
  const darkMode = useAppSelector(state => state.general.darkMode)

    return (
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

                <tr>
                    <td>Daniel</td>
                  <td>Daniel</td>
                  <td>Daniel</td>
                </tr>
      </table>
    </Responsive>
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >>"
            onPageChange={() => { }}
            pageRangeDisplayed={2}
            pageCount={20}
            previousLabel="<< previous"
            renderOnZeroPageCount={null}
            className="pagination"
          />
        </Container>
    )
}

const Card = styled.div`
  border-radius: 20px;
  box-shadow: 0px 7px 30px #0015da29;
`;

const Flex = styled.div`
  display: flex
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
`;

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

const LatestBlocks1 = styled.div`
  width: 1336px;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 18.2px 16px;
  align-items: flex-start;
  min-height: 797px;
  background-color: var(--white);
  border-radius: 20px;
  box-shadow: 0px 7px 30px #0015da29;
`;

const OverlapGroup10 = styled.div`
  height: 60px;
  margin-top: 19px;
  display: flex;
  padding: 13.8px 14.6px;
  align-items: center;
  min-width: 1303px;
  background-color: var(--titan-white);
`;

const HeightValue = styled.div`
  ${UrbanistMediumAbsoluteZero172px}
  min-height: 21px;
  margin-top: 0.33px;
  min-width: 74px;
  letter-spacing: 0;
`;

const HashValue = styled.div`
  ${UrbanistNormalBlack172px}
  min-height: 21px;
  margin-left: 125px;
  margin-top: 0.33px;
  min-width: 167px;
  letter-spacing: 0;
`;

const ProposerValue = styled.div`
  ${UrbanistNormalNewCar172px}
  min-height: 21px;
  margin-left: 140px;
  margin-top: 0.33px;
  min-width: 99px;
  letter-spacing: 0;
`;

const NumberOfTxs = styled.div`
  ${UrbanistNormalBlack172px}
  min-height: 21px;
  margin-left: 300px;
  margin-top: 0.33px;
  min-width: 9px;
  letter-spacing: 0;
`;

const TimeValue = styled.div`
  ${UrbanistNormalBlack172px}
  min-height: 21px;
  margin-left: 186px;
  margin-top: 0.33px;
  min-width: 51px;
  letter-spacing: 0;
`;