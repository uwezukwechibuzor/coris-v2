import React from "react";
import styled from "styled-components";
import { UrbanistBoldBlack40px } from "../../styledMixins";
import { sha256 } from "@cosmjs/crypto";
import { Bech32, fromBase64, fromHex, toBech32 } from "@cosmjs/encoding";
import { useAppSelector } from "../../lib/hooks";
import { Tab, Tabs } from "react-bootstrap";
import TxsData from "./Txs";
import BlocksData from "./Blocks";

function BlocksContent(props) {
  const darkMode = useAppSelector((state) => state.general.darkMode);
  const { getBlocks, getAllTxs, activeValidators, chain_id } = props;

  getBlocks?.map((block) => {
    //convert proposer address to cosmosvalcons
    const proposerToBech32 = toBech32("umeevalcons", fromHex(block?.proposer));

    activeValidators?.validators?.map((validator) => {
      //fetch just the active validators
      //get the consensus pubkey
      const ed25519PubkeyRaw = fromBase64(validator?.consensus_pubkey?.key);
      const addressData = sha256(ed25519PubkeyRaw).slice(0, 20);
      const bech32Address = Bech32.encode("umeevalcons", addressData);

      //attached validators details to the blocks they proposed
      if (bech32Address?.includes(proposerToBech32)) {
        block.operator_address = validator?.operator_address;
        block.website = validator?.description?.website;
        block.moniker = validator?.description?.moniker;
        delete block.signatures;
        return block;
      }
    });
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
                <BlocksData getBlocks={getBlocks} chain_id={chain_id} />
              </Responsive>
            </Container>
          </Responsive>
        </Tab>
        <Tab eventKey="inactive" title="Transactions">
          <Responsive>
            <Container className="w-100">
              <Responsive>
                <TxsData getAllTxs={getAllTxs} chain_id={chain_id} />
              </Responsive>
            </Container>
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
  @media screen and (max-width: 1075px) {
    width: 100vw;
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
