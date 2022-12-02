import React, { useState } from "react";
import styled from "styled-components";
import { getValidatorsLogoFromWebsites, toDay } from "../../../lib/Util/format";
import { UrbanistBoldBlack40px } from "../../../styledMixins";
import { sha256 } from "@cosmjs/crypto";
import { Bech32, fromBase64, fromHex, toBech32 } from "@cosmjs/encoding";
import Link from "next/link";
import { useAppSelector } from "../../../lib/hooks";
import ReactPaginate from "react-paginate";
import router from "next/router";
import TxsByHeightEvent from "./tsxByHeightOrEvent";
import { assetSymbol } from "../../../lib/Util/constants";

function BlockHeightContent(props: any) {
  const darkMode = useAppSelector((state) => state.general.darkMode);
  const { title, blockData, txs, activeValidators, chain_id } = props;

  const [currentPage, setCurrentPage] = useState(0);

  //convert single proposer address
  const proposerToBech32FromBlockQuery =
    blockData?.block?.header != undefined
      ? blockData?.block?.header?.proposer_address
      : null;

  //get the proposer adddress from signatures
  var validatorsSignaturesDetails = [];
  props?.blockData?.block?.last_commit?.signatures.map(
    (validatorSignatureData: any) => {
      //convert proposer address from signatures to cosmosvalcons
      const proposerToBech32 = toBech32(
        "umeevalcons",
        fromHex(validatorSignatureData.validator_address)
      );
      activeValidators?.validators?.map((validator: any) => {
        //fetch just the active validators
        //get the consensus pubkey
        const ed25519PubkeyRaw = fromBase64(validator.consensus_pubkey.key);
        const addressData = sha256(ed25519PubkeyRaw).slice(0, 20);
        const bech32Address = Bech32.encode("umeevalcons", addressData);
        if (bech32Address?.includes(proposerToBech32)) {
          //append validator data to  validatorSignatureData
          validatorSignatureData.validator = validator;
          validatorsSignaturesDetails.push(validatorSignatureData);
        }
      });
    }
  );

  var proposerName;
  validatorsSignaturesDetails?.map((data) =>
    data?.validator_address === proposerToBech32FromBlockQuery
      ? (proposerName = data)
      : null
  );

  //add pagination to signatures
  const PER_PAGE = 10;
  const offset = currentPage * PER_PAGE;
  const currentValidatorSignatureData = validatorsSignaturesDetails?.slice(
    offset,
    offset + PER_PAGE
  );
  const pageCount = Math.ceil(validatorsSignaturesDetails?.length / PER_PAGE);
  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }

  //get total transactions fee
  let totalTxsFee = 0;
  txs?.tx_responses !== null
    ? txs?.tx_responses?.map((tx) => {
        tx?.tx?.auth_info?.fee?.amount[0]
          ? (totalTxsFee += Number(tx?.tx?.auth_info?.fee?.amount[0]?.amount))
          : null;
      })
    : null;

  return (
    <div className={darkMode ? "dark-mode" : ""}>
      <Title className={darkMode ? "dark-mode" : ""}>{title}</Title>
      <Container>
        <Card
          className={darkMode ? "dark-mode last-grid-item" : "last-grid-item"}
          style={{
            height: "fit-content",
            padding: "20px",
            marginBottom: "20px",
          }}
        >
          <div>Header</div>
          <hr />
          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <td style={{ fontWeight: "bold", width: "150px" }}>Chain Id</td>
                <td>
                  {blockData?.block?.header
                    ? blockData?.block?.header.chain_id
                    : null}
                </td>
              </tr>

              <tr>
                <td style={{ fontWeight: "bold" }}>Height</td>
                <td>
                  {blockData?.block?.header
                    ? blockData?.block?.header.height
                    : null}
                </td>
              </tr>
              <tr>
                <td>Block Time</td>
                <td>
                  {blockData?.block?.header
                    ? toDay(blockData?.block?.header?.time, "from")
                    : null}
                  (
                  {blockData?.block?.header
                    ? toDay(blockData?.block?.header?.time, "")
                    : null}{" "}
                  )
                </td>
              </tr>
              <tr>
                <td>Block Hash</td>
                <td>
                  {blockData?.block_id ? blockData?.block_id?.hash : null}
                </td>
              </tr>
              <tr>
                <td>Number of Tx</td>
                <td>
                  {blockData?.block?.data?.txs
                    ? blockData.block.data.txs.length
                    : null}
                </td>
              </tr>
              <tr>
                <td>Txs Total Fee</td>
                <td>
                  {totalTxsFee} {assetSymbol(chain_id)}
                </td>
              </tr>
              <tr>
                <td>Proposer's Logo</td>
                <td>
                  <img
                    className="img"
                    width={30}
                    src={getValidatorsLogoFromWebsites(
                      proposerName?.validator?.description?.website
                    )}
                    alt=""
                  />
                </td>
              </tr>
              <tr>
                <td>Proposer</td>
                <td>
                  <Link
                    href="/[chain_id]/validators/[address]"
                    as={`/${chain_id}/validators/${proposerName?.validator?.operator_address}`}
                  >
                    <a>
                      {proposerName?.validator?.description
                        ? proposerName?.validator?.description?.moniker
                        : null}
                    </a>
                  </Link>
                </td>
              </tr>
              <tr>
                <td>App Hash</td>
                <td>
                  {blockData?.block?.header
                    ? blockData?.block?.header?.app_hash
                    : null}
                </td>
              </tr>
              <tr>
                <td>Consensus Hash</td>
                <td>
                  {blockData?.block?.header
                    ? blockData?.block?.header?.consensus_hash
                    : null}
                </td>
              </tr>
              <tr>
                <td>Data_Hash</td>
                <td>
                  {blockData?.block?.header
                    ? blockData?.block?.header?.data_hash
                    : null}
                </td>
              </tr>
              <tr>
                <td>App Hash</td>
                <td>
                  {blockData?.block?.header
                    ? blockData?.block?.header?.app_hash
                    : null}
                </td>
              </tr>
              <tr>
                <td>Evidence Hash</td>
                <td>
                  {blockData?.block?.header
                    ? blockData?.block?.header?.evidence_hash
                    : null}
                </td>
              </tr>
              <tr>
                <td>Validators Hash</td>
                <td>
                  {blockData?.block?.header
                    ? blockData?.block?.header?.validators_hash
                    : null}
                </td>
              </tr>
            </thead>
          </table>
        </Card>
      </Container>
      <Container className="my-3">
        <h5>Signatures</h5>
        <Card className={darkMode ? "dark-mode p-3" : " p-3"}>
          <Responsive>
            <table className="w-100 mt-3">
              <thead>
                <tr>
                  <th>Validators</th>
                  <th>Time</th>
                </tr>
              </thead>
              {currentValidatorSignatureData?.map((data) => (
                <tbody>
                  <tr>
                    <td
                      onClick={() =>
                        router.push(
                          `/${chain_id}/validators/${data.validator.operator_address}`
                        )
                      }
                    >
                      <img
                        className="img"
                        width={30}
                        src={getValidatorsLogoFromWebsites(
                          data?.validator?.description?.website
                        )}
                        alt=""
                      />
                      <p style={{ display: "inline", marginLeft: "10px" }}>
                        {data?.validator?.description
                          ? data?.validator?.description?.moniker
                          : null}
                      </p>
                    </td>
                    <td>{data ? toDay(data?.timestamp, "from") : null}</td>
                  </tr>
                </tbody>
              ))}
            </table>
          </Responsive>
          {currentValidatorSignatureData?.length !== 0 ? (
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
            />
          ) : null}
        </Card>
      </Container>

      <Container className="w-100">
        <h5>Transactions</h5>
        <TxsByHeightEvent txs={txs} chain_id={chain_id} />
      </Container>
    </div>
  );
}

const Card = styled.div`
  border-radius: 20px;
  box-shadow: 0px 7px 30px #0015da29;
  word-break: break-all;
  &.last-grid-item {
    grid-column: 1 / span 2;
  }
  @media screen and (max-width: 520px) {
    grid-column: 1 / span 2;
  }
  &.dark-mode {
    background-color: #19172d !important;
    box-shadow: 0px -1px 20px 0px #23232329 !important;
  }
`;

const Container = styled.div`
  display: block;
`;

const Responsive = styled.div`
  width: 100%;
  overflow-x: auto;
  @media screen and (max-width: 1075px) {
    width: calc(100vw - 40px);
  }
`;

const Title = styled.h1`
  ${UrbanistBoldBlack40px}
  min-height: 48px;
  margin-top: 54px;
  letter-spacing: 0;
`;

export default BlockHeightContent;
