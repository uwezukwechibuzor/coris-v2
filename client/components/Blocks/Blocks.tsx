import React, { useState } from "react";
import { useAppSelector } from "../../lib/hooks";
import {
  formatHash,
  getValidatorsLogoFromWebsites,
  toDay,
} from "../../lib/Util/format";
import router from "next/router";

const BlocksData = (props) => {
  const darkMode = useAppSelector((state) => state.general.darkMode);
  
  return (
    <table className={darkMode ? "w-100 mt-3 dark-mode" : "w-100 mt-3"}>
      <thead>
        <tr>
          <th>Height</th>
          <th>Hash</th>
          <th>Proposer</th>
          <th>No of Txs</th>
          <th>Time</th>
        </tr>
      </thead>

      {props?.getBlocks?.map((data) => (
        <tr
          onClick={() =>
            router.push(`/${props?.chain_id}/blocks/${data?.height}`)
          }
        >
          <td>{data?.height ? data.height : null}</td>
          <td>{data?.hash ? formatHash(data?.hash, 15, ".....") : null}</td>
          <td
            onClick={() =>
              router.push(
                `/${props?.chain_id}/validators/${data?.operator_address}`
              )
            }
          >
            <img
              className="img"
              width={30}
              src={getValidatorsLogoFromWebsites(data?.website)}
              alt=""
            />
            <p
              style={{
                display: "inline",
                marginLeft: "10px",
              }}
            >
              {data?.moniker ? data?.moniker : ""}
            </p>
          </td>

          <td>{data?.noTxs}</td>
          <td>{data?.time ? toDay(data?.time, "from") : null}</td>
        </tr>
      ))}
    </table>
  );
};

export default BlocksData;
