import styled from "styled-components";
import SearchBar from "./SearchBar";
import ConnectWallet from "./ConnectWallet";
import WalletButton from "./ConnectWallet/walletButton";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../lib/hooks";
import { toggleConnectWalletModal, toggleDarkMode, toggleSidebar } from "../../../lib/features/generalSlice";
import Modal from "./Modal";
import ModalContent from "./Modal/ModalContent";


function Header() {
  //const {  searchBarProps,  connectWallet1Data } = props;
  const dispatch = useAppDispatch()
  const darkMode = useAppSelector(state => state.general.darkMode)
  const [isToggled, toggle] = useState(false)

  return (
    <TopNavBar className={darkMode && 'dark-mode'}>
      <FlexBetween>
        <MobileSideBarToggler onClick={() => dispatch(toggleSidebar(true))}>
          <button type="button" style={{ backgroundColor: darkMode ? "#19172D" : "" }} className="hamburger" aria-label="burger"><svg viewBox="0 0 24 24" width="35px" height="35px" focusable="false" className="chakra-icon css-fi0ww0" aria-hidden="true"><path fill="#37458d" d="M 3 5 A 1.0001 1.0001 0 1 0 3 7 L 21 7 A 1.0001 1.0001 0 1 0 21 5 L 3 5 z M 3 11 A 1.0001 1.0001 0 1 0 3 13 L 21 13 A 1.0001 1.0001 0 1 0 21 11 L 3 11 z M 3 17 A 1.0001 1.0001 0 1 0 3 19 L 21 19 A 1.0001 1.0001 0 1 0 21 17 L 3 17 z"></path></svg></button>
        </MobileSideBarToggler>
        <SearchBar src={searchBarData.src} />
        
        <ConnectWallet
          toggle={(val) => dispatch(toggleConnectWalletModal(val))}
          asset62={connectWallet1Data.asset62}
          asset72={connectWallet1Data.asset72}
          asset63={connectWallet1Data.asset63}
          asset73={connectWallet1Data.asset73}
          outlineMediaShuffle={connectWallet1Data.outlineMediaShuffle}
          outlineMediaShuffleWhite={connectWallet1Data.outlineMediaShuffleWhite}
        />
        <NightmodeButton onClick={() => dispatch(toggleDarkMode())} className={darkMode ? 'dark-mode' : ''}>
          <OutlineGeneralMoon src={!darkMode ? '/img/outline-general-moon@2x.svg' : '/img/outline-general-moon-white@2x.png'} />
        </NightmodeButton>
        <WalletButton className={''} />
        <Modal>
          <ModalContent toggle={(val) => dispatch(toggleConnectWalletModal(val))} />
        </Modal>
      </FlexBetween>
    </TopNavBar>

  )
}

export const searchBarData = {
  src: "/img/outline-interface-search@2x.png",
  className: "search-bar-1",
};

const connectWallet1Data = {
  asset62: "/img/asset-6-2@2x.png",
  asset72: "/img/asset-7-1@2x.png",
  asset63: "/img/asset-6-3@2x.png",
  asset73: "/img/asset-7-2@2x.png",
  outlineMediaShuffle: "/img/outline-media-shuffle@2x.png",
  outlineMediaShuffleWhite: "/img/outline-media-shuffle-white@2x.png",
};

const FlexBetween = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`;

const MobileSideBarToggler = styled.div`
  display: none;
  width: 100px;
  @media screen and (max-width: 1074px){
    display: block;
  }
`;

const TopNavBar = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  align-items: center;
  &.dark-mode{
    background-color: #0b0a15;
  }
`;

const NightmodeButton = styled.div`
  height: 50px;
  margin-left: 16px;
  display: flex;
  padding: 10px;
  justify-content: flex-end;
  align-items: flex-start;
  min-width: 50px;
  background-color: var(--white);
  border-radius: 32px;
  box-shadow: 0px 0px 7px 5px #d0d0d036;
  @media screen and (max-width: 775px){
    display: none;
  }
  &.dark-mode{
    background-color: #19172D !important;
    box-shadow: 0px -1px 20px 0px #23232329 !important;
  }
  cursor: pointer;
`;

const OutlineGeneralMoon = styled.img`
  width: 31px;
  height: 31px;
`;

export default Header