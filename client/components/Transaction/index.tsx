import React, { useState } from "react";
import { Accordion } from "react-bootstrap";
import styled from "styled-components";
import { abbrMessage, toDay } from "../../lib/Util/format";
import { UrbanistBoldBlack40px } from "../../styledMixins";
import { useAppSelector } from "../../lib/hooks";
import { COIN, DENOM } from "../../lib/Util/constants";

function TransactionContents(props) {
  const darkMode = useAppSelector((state) => state.general.darkMode);
  const [isFormattedView, toggleView] = useState(true);
  const txDetails = props;

  const rawJSON = JSON.stringify(txDetails?.txDetails, null, 1);
  const rawJSONMessages = JSON.stringify(
    txDetails?.txDetails?.tx_response?.tx?.body?.messages,
    null,
    1
  );

  return (
    <div
      className={darkMode ? "dark-mode" : ""}
      style={{
        paddingTop: "40px",
        padding: "20px",
      }}
    >
      <Flex
        style={{ justifyContent: "space-between", alignItems: "center" }}
        className="w-100 block-sm"
      >
        <Flex style={{ alignItems: "center", marginTop: "20px" }}>
          <div>
            <div>
              <Title
                style={{ marginTop: "0" }}
                className={darkMode ? "dark-mode" : ""}
              >
                Transaction Details
              </Title>
            </div>
            <div className="my-3">
              <button
                className={`${isFormattedView ? "selected" : ""} formatted`}
                onClick={() => toggleView(true)}
              >
                Formatted
              </button>
              <button
                className={`${!isFormattedView ? "selected" : ""} formatted`}
                onClick={() => toggleView(false)}
              >
                Raw
              </button>
            </div>
          </div>
        </Flex>
        <div className="version">beta v.0.319.293</div>
      </Flex>
      {isFormattedView ? (
        <Formatted className={darkMode ? "dark-mode" : ""}>
          <SubTitle>Overview</SubTitle>
          <Container>
            <Card
              style={{ padding: "20px", marginBottom: "20px" }}
              className={darkMode ? "dark-mode" : ""}
            >
              <table style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <td>Height</td>
                    <td>
                      {txDetails?.txDetails
                        ? txDetails.txDetails?.tx_response?.height
                        : null}
                    </td>
                  </tr>
                  <tr>
                    <td>Time</td>
                    <td>
                      {txDetails?.txDetails
                        ? toDay(
                            txDetails?.txDetails?.tx_response?.timestamp,
                            "from"
                          )
                        : null}
                    </td>
                  </tr>
                  <tr>
                    <td>Status</td>
                    <td>
                      <span
                        className={
                          txDetails?.txDetails?.tx_response?.code === 0
                            ? "text-success"
                            : txDetails?.txDetails?.tx_response?.code ===
                              undefined
                            ? null
                            : "text-danger"
                        }
                      >
                        {txDetails?.txDetails?.tx_response?.code === 0
                          ? "Success"
                          : txDetails?.txDetails?.tx_response?.code ===
                            undefined
                          ? null
                          : "Failed"}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Gas</td>
                    <td>
                      {txDetails?.txDetails
                        ? txDetails?.txDetails?.tx_response?.gas_used + "/"
                        : null}

                      {txDetails?.txDetails
                        ? txDetails?.txDetails?.tx_response?.gas_wanted
                        : null}
                    </td>
                  </tr>
                  <tr>
                    <td>Fee</td>
                    <td>
                      {txDetails?.txDetails?.tx_response?.tx?.auth_info?.fee
                        ?.amount[0]
                        ? txDetails?.txDetails?.tx_response?.tx?.auth_info?.fee
                            ?.amount[0]?.amount /
                            DENOM +
                          COIN
                        : null}
                    </td>
                  </tr>
                  <tr>
                    <td>Activity</td>
                    <td>
                      {txDetails?.txDetails?.tx_response?.tx
                        ? abbrMessage(
                            txDetails?.txDetails?.tx_response?.tx?.body
                              ?.messages
                          )
                        : null}
                    </td>
                  </tr>
                  <tr>
                    <td>Memo</td>
                    <td>
                      {txDetails?.txDetails?.tx_response?.tx?.body
                        ? txDetails?.txDetails?.tx_response?.tx?.body?.memo
                        : null}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ wordBreak: "break-word" }}>Time out height</td>
                    <td>
                      {txDetails?.txDetails?.tx_response?.tx?.body
                        ? txDetails?.txDetails?.tx_response?.tx?.body
                            ?.timeout_height
                        : null}
                    </td>
                  </tr>
                  <tr>
                    <td>Hash</td>
                    <td>
                      {txDetails?.txDetails?.tx_response
                        ? txDetails?.txDetails?.tx_response?.txhash
                        : null}
                    </td>
                  </tr>
                </thead>
              </table>
            </Card>
          </Container>
          <SubTitle>Messages</SubTitle>
          <Container className="my-3">
            {txDetails?.txDetails?.tx_response?.tx?.body?.messages?.map(
              (message) => (
                <Accordion defaultActiveKey="0">
                  <Accordion.Item
                    eventKey="0"
                    className="accordion-item"
                    style={{ background: darkMode ? "#19172d" : "#fff" }}
                  >
                    <Accordion.Header className="accordion-header">
                      <div>
                        <h4 className="font-xl text-dark">
                          Type: <strong>{abbrMessage(message)}</strong>
                        </h4>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body className={darkMode ? "dark-mode" : ""}>
                      <Pre className={darkMode ? "dark-mode" : ""}>
                        <pre style={{ color: darkMode ? "#fff" : "#3a428a" }}>
                          {txDetails ? rawJSONMessages : null}
                        </pre>
                      </Pre>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              )
            )}
          </Container>
        </Formatted>
      ) : (
        <Raw>
          <SubTitle>Overview</SubTitle>
          <Container>
            <Card className={darkMode ? "dark-mode" : ""}>
              <Pre className={darkMode ? "dark-mode" : ""}>
                <pre style={{ color: darkMode ? "#fff" : "#3a428a" }}>
                  {txDetails ? rawJSON : null}
                </pre>
              </Pre>
            </Card>
          </Container>
          <style jsx>{`
            pre {
              white-space: pre-wrap; /* Since CSS 2.1 */
              white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
              white-space: -pre-wrap; /* Opera 4-6 */
              white-space: -o-pre-wrap; /* Opera 7 */
              word-wrap: break-word; /* Internet Explorer 5.5+ */
            }
          `}</style>
        </Raw>
      )}
    </div>
  );
}

const Formatted = styled.div`
  display: block;
`;

const Raw = styled.div`
  display: block;
`;

const SubTitle = styled.h4`
  font-size: 24px;
`;

const Hash = styled.h4`
  text-align: center;
  padding: 0px 20px;
  @media screen and (max-width: 520px) {
    font-size: 14px;
  }
`;

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

const Flex = styled.div`
  display: flex;
`;

const FlexCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 20px;
  @media screen and (max-width: 520px) {
    grid-gap: 10px;
  }
`;

const Pre = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 20px;
  @media screen and (max-width: 520px) {
    grid-gap: 10px;
  }
  &.dark-mode {
    background-color: #19172d !important;
    box-shadow: 0px -1px 20px 0px #23232329 !important;
    color: white !important;
  }
`;

const Container = styled.div`
  display: block;
`;

const Title = styled.h1`
  ${UrbanistBoldBlack40px}
  min-height: 48px;
  margin-top: 54px;
  letter-spacing: 0;
`;

export default TransactionContents;
