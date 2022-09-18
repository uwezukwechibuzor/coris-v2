import React from 'react'
import styled from "styled-components";
import { useAppSelector } from '../../../lib/hooks';
import {
  UrbanistNormalBlack24px,
  UrbanistSemiBoldBlack24px,
  ValignTextMiddle,
} from "../../../styledMixins";

function NodeInfoParams(props) {

  const darkMode = useAppSelector(state => state.general.darkMode)

    const nodeInfoData = props;

    return (
       <>
            <GridItem>
          <FlexColumn>
            <span>Node Info</span>
            <Card className={darkMode ? 'dark-mode w-100' : 'w-100'}>
              <FlexBetween>
                <span>Cosmos SDK Version</span>
                <strong>{nodeInfoData?.data?.application_version?.cosmos_sdk_version ? nodeInfoData.data.application_version.cosmos_sdk_version : null}</strong>
              </FlexBetween>
              <FlexBetween>
                <span>Tendermint Version</span>
                <strong>{nodeInfoData?.data?.node_info?.version ? nodeInfoParametersData.nodeInfoData.data.node_info.version : null}</strong>
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

const GridItem = styled.div`
  display:block;
`
const Card = styled.div`
  box-shadow: 0px 7px 30px #0015da29;
  border-radius: 20px;
  height: 100%;
  margin-top: 10px;
  padding: 20px 10px;
  &.dark-mode{
    background-color:#19172d !important;
    box-shadow: 0px -1px 20px 0px #23232329 !important;
  }
`
const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`
const FlexBetween = styled.div`
  display: flex;
  justify-content:space-between;
  padding: 5px 0px;
`


export default NodeInfoParams