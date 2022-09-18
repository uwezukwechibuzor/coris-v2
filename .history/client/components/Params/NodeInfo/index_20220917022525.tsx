import React from 'react'
import styled from "styled-components";
import {
  UrbanistNormalBlack24px,
  UrbanistSemiBoldBlack24px,
  ValignTextMiddle,
} from "../../../styledMixins";

function NodeInfoParams(props) {
    const {
        cosmosSdkVersion,
        tendermintVersion,
        binaryVersion,
        nodeInfoData
      } = props;

    return (
       <>
            <GridItem>
          <FlexColumn>
            <span>Node Info</span>
            <Card className={darkMode ? 'dark-mode w-100' : 'w-100'}>
              <FlexBetween>
                <span>Cosmos SDK Version</span>
                <strong>{nodeInfoParametersData.nodeInfoData?.data?.application_version?.cosmos_sdk_version ? nodeInfoParametersData.nodeInfoData.data.application_version.cosmos_sdk_version : null}</strong>
              </FlexBetween>
              <FlexBetween>
                <span>Tendermint Version</span>
                <strong>{nodeInfoParametersData.nodeInfoData?.data?.node_info?.version ? nodeInfoParametersData.nodeInfoData.data.node_info.version : null}</strong>
              </FlexBetween>
              <FlexBetween>
                <span>Binary Version</span>
                <strong>{nodeInfoParametersData.nodeInfoData?.data?.application_version?.cosmos_sdk_version ? nodeInfoParametersData.nodeInfoData.data.application_version.version : null}</strong>
              </FlexBetween>
            </Card>
          </FlexColumn>
        </GridItem>
      </>       
    )
}



export default NodeInfoParams