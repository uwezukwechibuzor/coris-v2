import React from "react";
import styled from "styled-components";
import { UrbanistBoldBlack40px, UrbanistBoldWhite20px, UrbanistNormalBlack24px, UrbanistSemiBoldBlack24px, ValignTextMiddle } from "../../../../styledMixins";


function YesVoteOptions(){
    return (
        <>
         
        </>
    )
}

const Responsive = styled.div`
  width: 100%;
  overflow-x: auto;
  @media screen and (max-width: 1075px){
    width: calc(100vw - 40px);
  }
`;

const Flex = styled.div`
  display: flex;
`

const FlexRow3 = styled.div`
  ${UrbanistSemiBoldBlack24px}
  align-self: flex-start;
  margin-top: 32px;
  margin-left: 16px;
  display: flex;
  align-items: center;
  min-width: 1231px;
`;

const Yes = styled.div`
  width: 34px;
  height: 34px;
  background-color: var(--forest-green);
  border-radius: 5px;
  margin-left: 40px;
`;


const No = styled.div`
  width: 34px;
  height: 34px;
  margin-left: 350px;
  background-color: var(--hot-magenta);
  border-radius: 5px;
`;

const Veto = styled.div`
  width: 34px;
  height: 34px;
  margin-left: 290px;
  background-color: var(--purple-heart);
  border-radius: 5px;
`;

const Abstain = styled.div`
  width: 34px;
  height: 34px;
  margin-left: 299px;
  background-color: var(--electric-violet);
  border-radius: 5px;
`;

const CorContainer = styled.div`
  ${UrbanistNormalBlack24px}
  margin-top: 11px;
  margin-right: 3px;
  display: flex;
  align-items: flex-start;
  min-width: 1291px;
`;

const YesValue = styled.div`
  ${ValignTextMiddle}
  height: 29px;
  min-width: 223px;
  letter-spacing: 0;
`;

const NoValue = styled.div`
  ${ValignTextMiddle}
  height: 29px;
  margin-left: 147px;
  min-width: 209px;
  letter-spacing: 0;
`;

const VetoValue = styled.div`
  ${ValignTextMiddle}
  height: 29px;
  margin-left: 177px;
  min-width: 200px;
  letter-spacing: 0;
`;

const AbstainValue = styled.div`
  ${ValignTextMiddle}
  height: 29px;
  margin-left: 90px;
  letter-spacing: 0;
`;

const DownBoard = styled.div`
  width: 1336px;
  height: 300px;
  margin-top: 16px;
  background-color: var(--white);
  border-radius: 20px;
  box-shadow: 0px 7px 30px #0015da29;
`;


export default YesVoteOptions