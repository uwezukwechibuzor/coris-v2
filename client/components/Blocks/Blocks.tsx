import React, { useState } from "react";
import { useAppSelector } from "../../lib/hooks";
import {formatHash, getValidatorsLogoFromWebsites, toDay } from "../../lib/Util/format";
import router from "next/router";

const BlocksData = (props) => {
  const darkMode = useAppSelector((state) => state.general.darkMode);

  return (
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

    {props?.joinedBlocksValidatorsData.map((details) => {
      return details?.map((data) => {
        if (data !== undefined) {
          return (
            <tr
              onClick={() =>
                router.push(
                  `/${props?.chain_id}/blocks/${data.block.height}`
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
                    `/${props?.chain_id}/validators/${data.validator.operator_address}`
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
  );
};

export default BlocksData;
