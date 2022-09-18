import React from "react";
import styles from "./Layout.module.css"
import Footer from "./Footer";
import Header from "./Header";
import SideNavBar from "./SideBar";
import styled from "styled-components";
import Head from "next/head";


const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      </Head>
      <SideNavBar {...sideNavBarData} />
      <FlexCol2>
        <div className="d-table w-100">
          <div className="d-table-row w-100 main-header">
            <Header/>
          </div>
          <div className="d-table-row w-100">
            <div className="d-table w-100">
              <div className="d-table-row w-100">
                <div style={{ minHeight: "400px", paddingTop: "50px"}}>
                  {children}
                </div>
              </div>
              <div className="d-table-row w-100">
                <Footer {...footerData} />
              </div>
            </div>            
          </div>
        </div> 
      </FlexCol2>
      <div id="modal"></div>
    </>
  );
}

const sideNavBarData = {
  solidGeneralChartPie: "/img/solid-general-chart-pie@2x.png",
  iconUser: "/img/outline-communication-user@2x.png",
  iconUser1: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNzUycHQiIGhlaWdodD0iNzUycHQiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDc1MiA3NTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiA8Zz4KICA8cmVjdCB3aWR0aD0iNzUyIiBoZWlnaHQ9Ijc1MiIgZmlsbD0iIzM5NDI4OSIvPgogIDxwYXRoIGQ9Im00OTQuNCAzNDYuNHYtMTQuODAxaDczLjk5NmM4LjE3OTcgMCAxNC44MDEtNi42MjUgMTQuODAxLTE0LjgwMWwtMC4wMDM5MDYtODguNjhjMC0wLjI2MTcyIDAtMC41MTk1My0wLjAxNTYyNS0wLjc3MzQ0LTAuMTQ0NTMtMy4zNzUtMS40Mjk3LTYuNDYwOS0zLjQ2ODgtOC44ODI4bC0wLjAxNTYyNS0wLjAxNTYyNWMtMC4yNTc4MS0wLjMxMjUtMC41NDY4OC0wLjYxNzE5LTAuODM1OTQtMC45MDYyNWwtNDQuMzk4LTQ0LjM5OGMtMi43NzM0LTIuNzczNC02LjUzMTItNC4zMzU5LTEwLjQ2MS00LjMzNTloLTg4Ljc5N2MtOC4xNzk3IDAtMTQuODAxIDYuNjI1LTE0LjgwMSAxNC44MDF2ODguNzk3YzAgMy45MjU4IDEuNTYyNSA3LjY4NzUgNC4zMzU5IDEwLjQ2NWw0MC4wNjIgNDAuMDYydjguNjY4aC0yOS41OThjLTAuMTEzMjggMC0wLjIxMDk0IDAuMDYyNS0wLjMyNDIyIDAuMDY2NDA3LTEzLjUyLTE3LjkwMi0zNC43NjYtMjkuNjY0LTU4Ljg3NS0yOS42NjRzLTQ1LjM1NSAxMS43NjItNTguODc1IDI5LjY2NGMtMC4xMTMyOC0wLjAwMzkwNy0wLjIwNzAzLTAuMDY2NDA3LTAuMzIwMzEtMC4wNjY0MDdoLTI5LjU5OHYtOC42NzE5bDQwLjA2Mi00MC4wNjJjMi43NzM0LTIuNzczNCA0LjMzMi02LjUzOTEgNC4zMzItMTAuNDYxdi04OC43OTdjMC04LjE3MTktNi42MjExLTE0LjgwMS0xNC44MDEtMTQuODAxaC04OC43OTNjLTMuOTI5NyAwLTcuNjg3NSAxLjU2MjUtMTAuNDY1IDQuMzM1OWwtNDQuMzk4IDQ0LjM5OGMtMC4yODkwNiAwLjI4OTA2LTAuNTc4MTIgMC41OTM3NS0wLjgzNTk0IDAuOTEwMTYgMC4wNDI5NjgtMC4wMDc4MTMtMC4wMTU2MjUgMC4wMjM0MzctMC4wMTU2MjUgMC4wMTU2MjUtMi4wMzkxIDIuNDIxOS0zLjMyNDIgNS41MDc4LTMuNDY4OCA4Ljg4MjgtMC4wMTU2MjUgMC4yNS0wLjAxNTYyNSAwLjUxMTcyLTAuMDE1NjI1IDAuNzY5NTN2ODguNjg0YzAgOC4xNzE5IDYuNjIxMSAxNC44MDEgMTQuODAxIDE0LjgwMWg3My45OTZ2MTQuODAxYzAgOC4xNzE5IDYuNjIxMSAxNC44MDEgMTQuODAxIDE0LjgwMWgzMS4wOTRjLTAuOTc2NTYgNC43NzczLTEuNDk2MSA5LjcyNjYtMS40OTYxIDE0Ljc5MyAwIDI0LjEwOSAxMS43NjIgNDUuMzU1IDI5LjY2NCA1OC44NzUtMC4wMDM5MDcgMC4xMTMyOC0wLjA2NjQwNyAwLjIxMDk0LTAuMDY2NDA3IDAuMzI0MjJ2MjkuNTk4aC04LjY3MTlsLTQwLjA2Mi00MC4wNjJjLTIuNzczNC0yLjc3MzQtNi41MzEyLTQuMzM1OS0xMC40NjEtNC4zMzU5aC04OC43OTdjLTguMTc5NyAwLTE0LjgwMSA2LjYyNS0xNC44MDEgMTQuODAxdjg4Ljc5N2MwIDMuOTI1OCAxLjU2MjUgNy42ODc1IDQuMzM1OSAxMC40NjVsNDQuMzg3IDQ0LjM4N2MxLjM2NzIgMS4zNzExIDMuMDAzOSAyLjQ1NyA0LjgyMDMgMy4yMDcgMS44MDg2IDAuNzQ2MDkgMy43MzA1IDEuMTM2NyA1LjY1NjIgMS4xMzY3aDg4Ljc5N2M4LjE3OTcgMCAxNC44MDEtNi42MjUgMTQuODAxLTE0LjgwMXYtNzMuOTk2aDE0LjgwMWM4LjE3OTcgMCAxNC44MDEtNi42MjUgMTQuODAxLTE0LjgwMXYtMzEuMDk0YzQuNzc3MyAwLjk3NjU2IDkuNzI2NiAxLjUgMTQuNzkzIDEuNXMxMC4wMTYtMC41MTk1MyAxNC44MDEtMS40OTYxdjMxLjA5NGMwIDguMTcxOSA2LjYyMTEgMTQuODAxIDE0LjgwMSAxNC44MDFoMTQuODAxdjczLjk5NmMwIDguMTcxOSA2LjYyMTEgMTQuODAxIDE0LjgwMSAxNC44MDFoODguNzk3YzEuOTI1OCAwIDMuODQ3Ny0wLjM5NDUzIDUuNjU2Mi0xLjE0MDYgMS44MTY0LTAuNzUzOTEgMy40NTMxLTEuODM1OSA0LjgyMDMtMy4yMDdsNDQuMzg3LTQ0LjM4N2MyLjc2OTUtMi43NzczIDQuMzI4MS02LjU0MyA0LjMyODEtMTAuNDY1di04OC43OTdjMC04LjE3MTktNi42MjExLTE0LjgwMS0xNC44MDEtMTQuODAxaC04OC43OTdjLTMuOTI5NyAwLTcuNjg3NSAxLjU2MjUtMTAuNDY1IDQuMzM1OWwtNDAuMDU5IDQwLjA2MmgtOC42NzE5di0yOS41OThjMC0wLjExMzI4LTAuMDYyNS0wLjIxMDk0LTAuMDY2NDA3LTAuMzI0MjIgMTcuOTAyLTEzLjUyIDI5LjY2OC0zNC43NjYgMjkuNjY4LTU4Ljg3NSAwLTUuMDY2NC0wLjUxOTUzLTEwLjAxNi0xLjQ5NjEtMTQuODAxbDMxLjA5NCAwLjAwMzkwNmM4LjE3OTcgMCAxNC44MDEtNi42Mjg5IDE0LjgwMS0xNC44MDF6bS0yMDcuMi02NS4zMjR2LTQ2Ljk0MWwxNC44MDEtMTQuODAxdjQ2Ljk0MXptLTUzLjA2Ni04Mi42NjhoNDYuOTQxbC0xNC44MDEgMTQuODAxaC00Ni45NDF6bTIzLjQ2OSAxMDMuNTloLTU5LjE5NXYtNTkuMTk1aDU5LjE5OXptMjMuNDczIDE2Mi43OWgtNDYuOTQxbC0xNC44MDEtMTQuODAxaDQ2Ljk0MXptLTgyLjY2OCA2LjEyODkgMTQuODAxIDE0LjgwMXY0Ni45NDFsLTE0LjgwMS0xNC44MDF6bTEwMy41OSA4Mi42NjhoLTU5LjE5NXYtNTkuMTk5aDU5LjE5OXptMjA3LjE5IDBoLTU5LjE5OXYtNTkuMTk5aDU5LjE5OXptMjkuNTk4LTIwLjkyNnYtNDYuOTQxbDE0LjgwMS0xNC44MDF2NDYuOTQxem0tNTMuMDY2LTgyLjY2OGg0Ni45NDFsLTE0LjgwMSAxNC44MDFoLTQ2Ljk0MXptLTEwOS43My0yOS42MDJjLTI0LjQ4NCAwLTQ0LjM5OC0xOS45MTQtNDQuMzk4LTQ0LjM5OHMxOS45MTQtNDQuMzk4IDQ0LjM5OC00NC4zOTggNDQuMzk4IDE5LjkxNCA0NC4zOTggNDQuMzk4LTE5LjkxNCA0NC4zOTgtNDQuMzk4IDQ0LjM5OHptMTc3LjU5LTE3Ny41OXY1OS4xOTloLTU5LjE5OWwwLjAwMzkwNy01OS4xOTl6bS0yMC45MjYtMjkuNjAyaC00Ni45NDFsLTE0LjgwMS0xNC44MDFoNDYuOTQxem0tODIuNjY4IDUzLjA3di00Ni45NDFsMTQuODAxIDE0LjgwMXY0Ni45NDF6IiBmaWxsPSIjZDBkNmZmIi8+CiAgPHBhdGggZD0ibTM5Ny40MiAzNDcuOTZjLTcuMzEyNS0zLjY1NjItMTYuMTg4LTAuNjk5MjItMTkuODU5IDYuNjIxMWwtNS42MjExIDExLjIzOC0wLjI3MzQ0LTAuMjgxMjVjLTUuNzgxMi01Ljc4MTItMTUuMTQ1LTUuNzgxMi0yMC45MjYgMHMtNS43ODEyIDE1LjE0NSAwIDIwLjkyNmwxNC44MDEgMTQuODAxYzIuNzg1MiAyLjc5MyA2LjU3MDMgNC4zMzIgMTAuNDU3IDQuMzMyIDAuNzgxMjUgMCAxLjU3NDItMC4wNjY0MDYgMi4zNzExLTAuMTg3NSA0LjY5NTMtMC43NjU2MiA4Ljc0MjItMy43MzQ0IDEwLjg2Ny03Ljk5MjJsMTQuODAxLTI5LjU5OGMzLjY1NjItNy4zMTY0IDAuNjk1MzEtMTYuMjAzLTYuNjE3Mi0xOS44NTl6IiBmaWxsPSIjZDBkNmZmIi8+CiA8L2c+Cjwvc3ZnPgo=",
  icon1: "/img/outline-interface-stack@2x.png",
  icon2: "/img/outline-interface-edit@2x.png",
  icon3: "/img/outline-interface-settings-adjust@2x.png",
  overview: "Overview",
  validators: "Validators",
  consensus: "Consensus",
  blocks: "Blocks",
  proposals: "Proposals",
  parameters: "Parameters",
  assets: "Assets",
  assetIcon: ""
}

const footerData = {
  company: "Company",
  about1: "About",
  security1: "Security",
  place4: "Contact",
  climate1: "Climate",
  ourProjects: "Our Projects",
  testnetPortal1: "Testnet Portal",
  stakingPortal1: "Staking",
  community: "Community",
  about2: "About",
  security2: "Security",
  place5: "Contact",
  climate2: "Climate",
  iconPaper_Plane: "/img/solid-brands-telegram@2x.png",
  iconLinkedin: "/img/solid-brands-linkedin@2x.png",
  iconInstagram: "/img/solid-brands-instagram@2x.png",
  iconTwitter: "/img/solid-brands-twitter@2x.png",
  solidBrandsYoutube: "/img/solid-brands-youtube@2x.png",
  solidBrandsChrome: "/img/solid-brands-chrome@2x.png",
  eosadolor382GmailCom: "eosadolor382@gmail.com",
  resources: "Resources",
  about3: "About",
  security3: "Security",
  place6: "Contact",
  climate3: "Climate",
  learn: "Learn",
  testnetPortal2: "Testnet",
  stakingPortal2: "Staking",
}

const FlexCol2 = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  padding-left: 320px;
  @media screen and (max-width: 1334px){
    padding-left: 120px;
  };
  @media screen and (max-width: 1074px){
    padding: 10px !important;
  };
`;

export default Layout
