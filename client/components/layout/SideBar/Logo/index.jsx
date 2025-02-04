import React from "react";
import styled from "styled-components";

function Logo(props) {
  const { className } = props;

  return (
    <Logo1 className={`logo ${className || ""}`}>
      <Logo2 className="logo-1" src="/img/asset-3-1@2x.png" />
      <CorisName className="coris-name">
        <Asset41 className="asset-4-1" src="/img/asset-4-1@2x.png" />
        <Asset51 className="asset-5-1" src="/img/asset-5-1@2x.png" />
      </CorisName>
    </Logo1>
  );
}

const Logo1 = styled.div`
  margin-left: 4px;
  display: flex;
  align-items: flex-start;
  min-width: 150px;

  &.logo.logo-2 {
    width: 150px;
    align-items: unset;
    min-width: unset;
  }
`;

const Logo2 = styled.img`
  width: 52px;
  height: 50px;
  object-fit: cover;
`;

const CorisName = styled.div`
  width: 82px;
  margin-left: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 50px;
  @media screen and (max-width: 1334px) {
    display: none;
  }
  @media screen and (max-width: 775px) {
    display: flex;
  }
`;

const Asset41 = styled.img`
  width: 82px;
  height: 36px;
  margin-right: 0.5px;
  object-fit: cover;
`;

const Asset51 = styled.img`
  width: 46px;
  height: 9px;
  margin-top: 5px;
  margin-right: 0.5px;
  object-fit: cover;
`;

export default Logo;
