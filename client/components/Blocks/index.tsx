import React from "react";
import {
  formatHash,
  getValidatorsLogoFromWebsites,
  toDay,
} from "../../lib/Util/format";
import styled from "styled-components";
import { UrbanistBoldBlack40px } from "../../styledMixins";
import { sha256 } from "@cosmjs/crypto";
import { Bech32, fromBase64, toHex, fromHex, toBech32 } from "@cosmjs/encoding";
import { useAppSelector } from "../../lib/hooks";
import { Tab, Tabs } from "react-bootstrap";
import TxsData from "./Txs";
import router from "next/router";

function BlocksContent(props) {
  const darkMode = useAppSelector((state) => state.general.darkMode);
  const { getBlocks, getAllTxs, activeValidators, chain_id } = props;
  //console.log(getBlocks)

  let p = [];

  //function that receieves proposer address and returns the validators details
  const joinedBlocksValidatorsData = getBlocks.map((block) => {
    //convert proposer address to cosmosvalcons

    const getActiveChainValidators = activeValidators?.validators?.map(
      (validator) => {
        //fetch just the active validators
        //get the consensus pubkey
        const ed25519PubkeyRaw = fromBase64(validator?.consensus_pubkey?.key);
        const addressData = sha256(ed25519PubkeyRaw).slice(0, 20);
        const bech32Address = Bech32.encode("umeevalcons", addressData);

        const proposerToBech32 = toBech32(
          "umeevalcons",
          fromHex(block?.proposer)
        );

        if (bech32Address === proposerToBech32) {
          return { validator, block };
        }
      }
    );
    return getActiveChainValidators;
  });

  return (
    <div className={darkMode ? "dark-mode" : ""}>
      <Title className={darkMode ? "dark-mode" : ""}>Blocks</Title>
      <Tabs
        defaultActiveKey="active"
        id="uncontrolled-tab-example"
        className=""
        variant="tabs"
      >
        <Tab eventKey="active" title="Blocks" className="w-100">
          <Responsive>
            <Container className="w-100">
              <Responsive>
                <table
                  className={darkMode ? "w-100 mt-3 dark-mode" : "w-100 mt-3"}
                >
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
                          <tr
                            onClick={() =>
                              router.push(
                                `/${chain_id}/blocks/${data.block.height}`
                              )
                            }
                          >
                            <td>
                              {data.block?.height ? data.block.height : null}
                            </td>
                            <td>
                              {data.block?.hash
                                ? formatHash(data.block.hash, 15, "....")
                                : null}
                            </td>
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
                              <p
                                style={{
                                  display: "inline",
                                  marginLeft: "10px",
                                }}
                              >
                                {data?.validator?.description?.moniker}
                              </p>
                            </td>

                            <td>{data?.block?.noTxs}</td>
                            <td>
                              {data?.block?.time
                                ? toDay(data?.block.time, "from")
                                : null}
                            </td>
                          </tr>
                        );
                      }
                    });
                  })}
                </table>
              </Responsive>
            </Container>
          </Responsive>
        </Tab>
        <Tab eventKey="inactive" title="Transactions">
          <Responsive>
            <TxsData getAllTxs={getAllTxs} chain_id={chain_id} />
          </Responsive>
        </Tab>
      </Tabs>

      <style jsx>{`
        Link {
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
  @media screen and (max-width: 700px) {
    width: calc(100vw - 40px);
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
