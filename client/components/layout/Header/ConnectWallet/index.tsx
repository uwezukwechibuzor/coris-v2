import React, { useState } from "react";
import styled from "styled-components";
import { useAppSelector } from "../../../../lib/hooks";

function ConnectWallet(props) {
  const {
    asset62,
    asset72,
    asset63,
    asset73,
    outlineMediaShuffle,
    outlineMediaShuffleWhite,
    className,
  } = props;
  const [open, setOpen] = useState(false);
  const darkMode = useAppSelector((state) => state.general.darkMode);

  return (
    <ConnectWallet1
      onClick={() => props.toggle(true)}
      className={`connect-wallet ${className || ""} ${
        darkMode ? "dark-mode" : ""
      }`}
    >
      <Flex>
        {darkMode && className !== "mobile" ? (
          <>
            <Asset62 className="asset-6-2" src={asset63} />
            <Asset72 className="asset-7-2" src={asset73} />
          </>
        ) : (
          <>
            <Asset62 className="asset-6-2" src={asset62} />
            <Asset72 className="asset-7-2" src={asset72} />
          </>
        )}
      </Flex>
      <OutlineMediaShuffle
        className="outline-media-shuffle"
        src={darkMode ? outlineMediaShuffleWhite : outlineMediaShuffle}
      />
    </ConnectWallet1>
  );
}

const Flex = styled.div`
  display: flex;
  align-items: center;
`;

const ConnectWallet1 = styled.div`
  height: 50px;
  cursor: pointer;
  display: flex;
  padding: 5px 19px;
  justify-content: space-between;
  background-color: var(--white);
  align-items: center;
  border-radius: 59px;
  box-shadow: 0px 0px 7px 5px #d0d0d036;
  width: 200px;
  @media screen and (max-width: 775px) {
    display: none;
  }

  &.connect-wallet.connect-wallet-1 {
    padding: unset;
    justify-content: unset;
    align-items: unset;
  }
  &.mobile {
    @media screen and (max-width: 775px) {
      display: none;
    }
  }
  &.dark-mode {
    background-color: #19172d !important;
    box-shadow: 0px -1px 20px 0px #23232329 !important;
  }
  &.dark-mode.mobile {
    background-color: #0b0a15 !important;
    box-shadow: 0px -1px 20px 0px #23232329 !important;
  }
`;

const Asset62 = styled.img`
  width: 30px;
  margin-bottom: 1px;
  object-fit: cover;
`;

const Asset72 = styled.img`
  width: 45px;
  margin-bottom: 1px;
  object-fit: cover;
`;

const OutlineMediaShuffle = styled.img`
  width: 40px;
  align-self: flex-start;
`;

export default ConnectWallet;
