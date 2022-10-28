import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import {
  toggleConnectWalletModal,
  toggleDarkMode,
  toggleSidebar,
} from "../../../lib/features/generalSlice";
import { useAppDispatch, useAppSelector } from "../../../lib/hooks";
import {
  UrbanistSemiBoldSoap24px,
  UrbanistSemiBoldBlueBell24px,
  ValignTextMiddle,
} from "../../../styledMixins";
import { searchBarData } from "../Header";
import ConnectWallet from "../Header/ConnectWallet";
import SearchBar from "../Header/SearchBar";
import Logo from "./Logo";

function SideNavBar(props) {
  const { sidebarToggled, darkMode } = useAppSelector((state) => state.general);
  const [selectedPage, setSelectedPage] = useState("/");
  const dispatch = useAppDispatch();
  const [isToggled, toggle] = useState(false);
  const router = useRouter();
  const {
    solidGeneralChartPie,
    iconUser,
    iconUser1,
    icon1,
    icon2,
    icon3,
    overview,
    validators,
    consensus,
    blocks,
    proposals,
    parameters,
    assetIcon,
    assets,
    relayerIcon,
    chain_id,
  } = props;

  const navigate = (selectedPage) => {
    dispatch(toggleSidebar(false));
    setSelectedPage(selectedPage);
    router.push(selectedPage);
  };

  if (chain_id?.chain_id === "cosmos") {
    return (
      <SideNavigation
        className={`${sidebarToggled && "show"} ${darkMode && "dark-mode"}`}
      >
        <Close onClick={() => dispatch(toggleSidebar(false))}>&times;</Close>
        <Clicker onClick={() => navigate("/cosmos")}>
          <Logo />
        </Clicker>
        <SearchBar src={searchBarData.src} className="mobile" />
        <Wrapper>
          <Clicker onClick={() => navigate("/cosmos")} title="Overview">
            <a className="m-24">
              <FlexRow>
                <FlexCell>
                  <SolidGeneralChartPie src={solidGeneralChartPie} />
                </FlexCell>
                <FlexCell>
                  <Overview
                    style={{ color: selectedPage === "/cosmos" && "white" }}
                  >
                    {overview}
                  </Overview>
                </FlexCell>
              </FlexRow>
            </a>
          </Clicker>
          <br />
          <Clicker
            onClick={() => navigate("/cosmos/validators")}
            title="Validators"
          >
            <a className="m-24">
              <FlexRow>
                <FlexCell>
                  <IconUser src={iconUser} />
                </FlexCell>
                <FlexCell>
                  <Validators
                    style={{
                      color: selectedPage === "/cosmos/validators" && "white",
                    }}
                  >
                    {validators}
                  </Validators>
                </FlexCell>
              </FlexRow>
            </a>
          </Clicker>
          <br />
          <Clicker onClick={() => navigate("/cosmos/blocks")} title="Blocks">
            <a className="m-24">
              <FlexRow>
                <FlexCell>
                  <IconUser src={icon1} />
                </FlexCell>
                <FlexCell>
                  <Blocks
                    style={{
                      color: selectedPage === "/cosmos/blocks" && "white",
                    }}
                  >
                    {blocks}
                  </Blocks>
                </FlexCell>
              </FlexRow>
            </a>
          </Clicker>
          <br />
          <Clicker
            onClick={() => navigate("/cosmos/proposals")}
            title="Proposals"
          >
            <a className="m-24">
              <FlexRow>
                <FlexCell>
                  <Icon src={icon2} />
                </FlexCell>
                <FlexCell>
                  <Proposals
                    style={{
                      color: selectedPage === "/cosmos/proposals" && "white",
                    }}
                  >
                    {proposals}
                  </Proposals>
                </FlexCell>
              </FlexRow>
            </a>
          </Clicker>
          <br />
          <Clicker
            onClick={() => navigate("/cosmos/params")}
            title="Parameters"
          >
            <a className="m-24">
              <FlexRow>
                <FlexCell>
                  <Icon1 src={icon3} />
                </FlexCell>
                <FlexCell>
                  <Parameters
                    style={{
                      color: selectedPage === "/cosmos/params" && "white",
                    }}
                  >
                    {parameters}
                  </Parameters>
                </FlexCell>
              </FlexRow>
            </a>
          </Clicker>
          <br />
          <Clicker
            onClick={() => navigate("/cosmos/validators/consensus_state")}
            title="Consensus"
          >
            <a className="m-24">
              <FlexRow>
                <FlexCell>
                  <IconUser src={iconUser1} />
                </FlexCell>
                <FlexCell>
                  <Consensus
                    style={{
                      color: selectedPage === "/cosmos/consensus" && "white",
                    }}
                  >
                    {consensus}
                  </Consensus>
                </FlexCell>
              </FlexRow>
            </a>
          </Clicker>
          <br />
          <Clicker onClick={() => navigate("/cosmos/assets")} title="Assets">
            <a className="m-24">
              <FlexRow>
                <FlexCell>
                  <Icon1 src={assetIcon} />
                </FlexCell>
                <FlexCell>
                  <Assets
                    style={{
                      color: selectedPage === "/cosmos/assets" && "white",
                    }}
                  >
                    {assets}
                  </Assets>
                </FlexCell>
              </FlexRow>
            </a>
          </Clicker>
          <br />
          <Clicker onClick={() => navigate("/cosmos/relayers")} title="Assets">
            <a className="m-24">
              <FlexRow>
                <FlexCell>
                  <Icon1 src={relayerIcon} />
                </FlexCell>
                <FlexCell>
                  <Assets
                    style={{
                      color: selectedPage === "/cosmos/assets" && "white",
                    }}
                  >
                    Relayers
                  </Assets>
                </FlexCell>
              </FlexRow>
            </a>
          </Clicker>
        </Wrapper>
        <ConnectWallet
          className="mobile"
          toggle={(val) => dispatch(toggleConnectWalletModal(val))}
          asset62={connectWallet1Data.asset62}
          asset72={connectWallet1Data.asset72}
          outlineMediaShuffle={connectWallet1Data.outlineMediaShuffle}
        />
        <div
          className="d-flex align-items-end justify-content-center"
          style={{ marginTop: "50px" }}
        >
          <NightmodeButton
            onClick={() => dispatch(toggleDarkMode())}
            className={darkMode ? "dark-mode mobile" : "mobile"}
          >
            <OutlineGeneralMoon
              src={
                !darkMode
                  ? "/img/outline-general-moon@2x.svg"
                  : "/img/outline-general-moon-white@2x.png"
              }
            />
          </NightmodeButton>
        </div>
      </SideNavigation>
    );
  } else if (chain_id?.chain_id === "umee") {
    return (
      <SideNavigation
        className={`${sidebarToggled && "show"} ${darkMode && "dark-mode"}`}
      >
        <Close onClick={() => dispatch(toggleSidebar(false))}>&times;</Close>
        <Clicker onClick={() => navigate("/umee/")}>
          <Logo />
        </Clicker>
        <SearchBar src={searchBarData.src} className="mobile" />
        <Wrapper>
          <Clicker onClick={() => navigate("/umee")} title="Overview">
            <a className="m-24">
              <FlexRow>
                <FlexCell>
                  <SolidGeneralChartPie src={solidGeneralChartPie} />
                </FlexCell>
                <FlexCell>
                  <Overview
                    style={{ color: selectedPage === "/umee" && "white" }}
                  >
                    {overview}
                  </Overview>
                </FlexCell>
              </FlexRow>
            </a>
          </Clicker>
          <br />
          <Clicker
            onClick={() => navigate("/umee/validators")}
            title="Validators"
          >
            <a className="m-24">
              <FlexRow>
                <FlexCell>
                  <IconUser src={iconUser} />
                </FlexCell>
                <FlexCell>
                  <Validators
                    style={{
                      color: selectedPage === "/umee/validators" && "white",
                    }}
                  >
                    {validators}
                  </Validators>
                </FlexCell>
              </FlexRow>
            </a>
          </Clicker>
          <br />
          <Clicker onClick={() => navigate("/umee/blocks")} title="Blocks">
            <a className="m-24">
              <FlexRow>
                <FlexCell>
                  <IconUser src={icon1} />
                </FlexCell>
                <FlexCell>
                  <Blocks
                    style={{
                      color: selectedPage === "/umee/blocks" && "white",
                    }}
                  >
                    {blocks}
                  </Blocks>
                </FlexCell>
              </FlexRow>
            </a>
          </Clicker>
          <br />
          <Clicker
            onClick={() => navigate("/umee/proposals")}
            title="Proposals"
          >
            <a className="m-24">
              <FlexRow>
                <FlexCell>
                  <Icon src={icon2} />
                </FlexCell>
                <FlexCell>
                  <Proposals
                    style={{
                      color: selectedPage === "/umee/proposals" && "white",
                    }}
                  >
                    {proposals}
                  </Proposals>
                </FlexCell>
              </FlexRow>
            </a>
          </Clicker>
          <br />
          <Clicker onClick={() => navigate("/umee/params")} title="Parameters">
            <a className="m-24">
              <FlexRow>
                <FlexCell>
                  <Icon1 src={icon3} />
                </FlexCell>
                <FlexCell>
                  <Parameters
                    style={{
                      color: selectedPage === "/umee/params" && "white",
                    }}
                  >
                    {parameters}
                  </Parameters>
                </FlexCell>
              </FlexRow>
            </a>
          </Clicker>
          <br />
          <Clicker
            onClick={() => navigate("/umee/validators/consensus_state")}
            title="Consensus"
          >
            <a className="m-24">
              <FlexRow>
                <FlexCell>
                  <IconUser src={iconUser1} />
                </FlexCell>
                <FlexCell>
                  <Consensus
                    style={{
                      color: selectedPage === "/umee/consensus" && "white",
                    }}
                  >
                    {consensus}
                  </Consensus>
                </FlexCell>
              </FlexRow>
            </a>
          </Clicker>
          <br />
          <Clicker onClick={() => navigate("/umee/assets")} title="Assets">
            <a className="m-24">
              <FlexRow>
                <FlexCell>
                  <Icon1 src={assetIcon} />
                </FlexCell>
                <FlexCell>
                  <Assets
                    style={{
                      color: selectedPage === "/umee/assets" && "white",
                    }}
                  >
                    {assets}
                  </Assets>
                </FlexCell>
              </FlexRow>
            </a>
          </Clicker>
          <br />
          <Clicker onClick={() => navigate("/umee/relayers")} title="Assets">
            <a className="m-24">
              <FlexRow>
                <FlexCell>
                  <Icon1 src={relayerIcon} />
                </FlexCell>
                <FlexCell>
                  <Assets
                    style={{
                      color: selectedPage === "/umee/assets" && "white",
                    }}
                  >
                    Relayers
                  </Assets>
                </FlexCell>
              </FlexRow>
            </a>
          </Clicker>
        </Wrapper>
        <ConnectWallet
          className="mobile"
          toggle={(val) => dispatch(toggleConnectWalletModal(val))}
          asset62={connectWallet1Data.asset62}
          asset72={connectWallet1Data.asset72}
          outlineMediaShuffle={connectWallet1Data.outlineMediaShuffle}
        />
        <div
          className="d-flex align-items-end justify-content-center"
          style={{ marginTop: "50px" }}
        >
          <NightmodeButton
            onClick={() => dispatch(toggleDarkMode())}
            className={darkMode ? "dark-mode mobile" : "mobile"}
          >
            <OutlineGeneralMoon
              src={
                !darkMode
                  ? "/img/outline-general-moon@2x.svg"
                  : "/img/outline-general-moon-white@2x.png"
              }
            />
          </NightmodeButton>
        </div>
      </SideNavigation>
    );
  }
}

const connectWallet1Data = {
  asset62: "/img/asset-6-2@2x.png",
  asset72: "/img/asset-7-1@2x.png",
  outlineMediaShuffle: "/img/outline-media-shuffle@2x.png",
};

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
  box-shadow: 0px 7px 30px #0015da29;
  &.mobile {
    @media screen and (min-width: 775px) {
      display: none;
    }
  }
  &.dark-mode {
    background-color: #0b0a15 !important;
    box-shadow: 0px -1px 20px 0px #23232329 !important;
  }
`;

const OutlineGeneralMoon = styled.img`
  width: 31px;
  height: 31px;
`;

const Clicker = styled.div`
  cursor: pointer;
`;
const Close = styled.div`
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
  font-size: 40px;
  color: white;
  display: none;
  @media screen and (max-width: 1074px) {
    display: block !important;
  }
`;

const Wrapper = styled.div`
  margin-top: 50px;
  @media screen and (max-width: 775px) {
    margin-top: 30px;
  }
`;

const FlexCell = styled.div`
  margin: 0px 10px;
  display: flex;
  align-items: center;
`;
const SideNavigation = styled.div`
  z-index: 2;
  height: 100%;
  width: 240px;
  margin: 0;
  @media screen and (max-width: 1334px) {
    width: 100px;
  }
  @media screen and (max-width: 1074px) {
    display: none;
    width: 300px;
    z-index: 1;
  }
  border-radius: 0px 30px 30px 0px;
  box-shadow: 0px 7px 10px #000d7d99;
  background-color: var(--chambray);
  padding: 40px 20px;
  position: fixed;
  left: 0px;
  &.show {
    @media screen and (max-width: 1074px) {
      display: block;
      position: fixed !important;
      top: 0px;
      left: 0px;
      z-index: 2;
    }
  }
  @media screen and (max-width: 1074px) {
    position: fixed;
  }
  &.dark-mode {
    background-color: #19172d !important;
    box-shadow: 0px 0px 7px 3px #16151e !important;
  }
`;

const FlexRow = styled.div`
  display: flex;
  &:hover {
    background: #ebedff0d;
    border-radius: 20px;
  }
  @media screen and (min-width: 800px) {
    margin-top: -20px;
  }
  @media screen and (max-width: 800px) {
    margin-top: -22px;
  }
`;

const FlexCol = styled.div`
  width: 41px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 486px;
`;

const SolidGeneralChartPie = styled.img`
  width: 40px;
  height: 40px;
`;

const IconUser = styled.img`
  width: 40px;
`;

const Icon = styled.img`
  width: 40px;
  height: 41px;
`;

const Icon1 = styled.img`
  width: 40px;
  height: 41px;
`;

const Overview = styled.div`
  ${ValignTextMiddle}
  height: 29px;
  font-family: var(--font-family-urbanist);
  font-weight: 600;
  color: var(--blue-bell);
  font-size: var(--font-size-xxxxl);
  letter-spacing: 0;
  display: flex;
  align-items: center;
  @media screen and (max-width: 1334px) {
    display: none;
  }
  @media screen and (max-width: 1074px) {
    display: flex;
  }
`;

const Validators = styled.div`
  ${ValignTextMiddle}
  ${UrbanistSemiBoldBlueBell24px}
  height: 29px;
  letter-spacing: 0;
  @media screen and (max-width: 1334px) {
    display: none;
  }
  @media screen and (max-width: 1074px) {
    display: flex;
  }
`;

const Consensus = styled.div`
  ${ValignTextMiddle}
  ${UrbanistSemiBoldBlueBell24px}
  height: 29px;
  letter-spacing: 0;
  @media screen and (max-width: 1334px) {
    display: none;
  }
  @media screen and (max-width: 1074px) {
    display: flex;
  }
`;

const Blocks = styled.div`
  ${ValignTextMiddle}
  ${UrbanistSemiBoldSoap24px}
            height: 29px;
  letter-spacing: 0;
  @media screen and (max-width: 1334px) {
    display: none;
  }
  @media screen and (max-width: 1074px) {
    display: flex;
  }
`;

const Proposals = styled.div`
  ${ValignTextMiddle}
  ${UrbanistSemiBoldSoap24px}
            height: 29px;
  letter-spacing: 0;
  @media screen and (max-width: 1334px) {
    display: none;
  }
  @media screen and (max-width: 1074px) {
    display: flex;
  }
`;
const Parameters = styled.div`
  ${ValignTextMiddle}
  ${UrbanistSemiBoldSoap24px}
            height: 29px;
  letter-spacing: 0;
  @media screen and (max-width: 1334px) {
    display: none;
  }
  @media screen and (max-width: 1074px) {
    display: flex;
  }
`;

const Assets = styled.div`
  ${ValignTextMiddle}
  ${UrbanistSemiBoldSoap24px}
            height: 29px;
  letter-spacing: 0;
  @media screen and (max-width: 1334px) {
    display: none;
  }
  @media screen and (max-width: 1074px) {
    display: flex;
  }
`;

export default SideNavBar;
