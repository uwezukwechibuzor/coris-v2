import React, { useState } from "react";
import styled from "styled-components";
import { useAppSelector } from "../../../../lib/hooks";

function ConnectWallet(props) {
  const {
    outlineMediaShuffle,
    outlineMediaShuffleWhite,
    className,
  } = props;
  const [open, setOpen] = useState(false);
  const {darkMode, chain} = useAppSelector((state) => state.general);

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
            <img src={chain.image} alt="" width={40} className="me-3" />
            {chain.name}
          </>
        ) : (
          <>
            <img src={chain.image} alt="" width={40} className="me-3" />
            <span>{chain.name}</span>
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

const OutlineMediaShuffle = styled.img`
  width: 40px;
  align-self: flex-start;
`;

export default ConnectWallet;