import React from "react";
import styles from "./Layout.module.css"
import Footer from "./Footer";
import Header from "./Header";
import SideNavBar from "./SideBar";
import styled from "styled-components";
import Head from "next/head";
import { useAppSelector } from "../../lib/hooks";


const Layout = ({ children }: { children: React.ReactNode }) => {
  const { darkMode } = useAppSelector(state => state.general)
  console.log(children)
  return (
    <MainParent className={darkMode && 'dark-mode'}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      </Head>
      <SideNavBar {...sideNavBarData} />
      <FlexCol2>
        <div className="d-table w-100" style={{height: "100vh"}}>
          <div className={`${darkMode && 'dark-mode'} d-table-row w-100 main-header`}>
            <Header />
          </div>
          <div className="d-table-row w-100 h-100">
            <div className="d-table w-100 h-100">
              <div className="d-table-row w-100">
                <Wrapper className={darkMode && 'dark-mode'}>
                  {children}
                </Wrapper>
              </div>
              <div className="d-table-row w-100">
                <div className="w-100 h-100" style={{
                  display: "flex",
                  alignItems: "flex-end"
                }}><Footer {...footerData} /></div> 
              </div>
            </div>
          </div>
        </div>
      </FlexCol2>
      <div id="modal"></div>
    </ MainParent>
  );
}

const sideNavBarData = {
  solidGeneralChartPie: "/img/solid-general-chart-pie@2x.png",
  iconUser: "/img/outline-communication-user@2x.png",
  iconUser1: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNzUycHQiIGhlaWdodD0iNzUycHQiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDc1MiA3NTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiA8ZyBmaWxsPSIjZmZmIj4KICA8cGF0aCBkPSJtNDk0LjQgMzQ2LjR2LTE0LjgwMWg3My45OTZjOC4xNzk3IDAgMTQuODAxLTYuNjI1IDE0LjgwMS0xNC44MDFsLTAuMDAzOTA2LTg4LjY4YzAtMC4yNjE3MiAwLTAuNTE5NTMtMC4wMTU2MjUtMC43NzM0NC0wLjE0NDUzLTMuMzc1LTEuNDI5Ny02LjQ2MDktMy40Njg4LTguODgyOGwtMC4wMTU2MjUtMC4wMTU2MjVjLTAuMjU3ODEtMC4zMTI1LTAuNTQ2ODgtMC42MTcxOS0wLjgzNTk0LTAuOTA2MjVsLTQ0LjM5OC00NC4zOThjLTIuNzczNC0yLjc3MzQtNi41MzEyLTQuMzM1OS0xMC40NjEtNC4zMzU5aC04OC43OTdjLTguMTc5NyAwLTE0LjgwMSA2LjYyNS0xNC44MDEgMTQuODAxdjg4Ljc5N2MwIDMuOTI1OCAxLjU2MjUgNy42ODc1IDQuMzM1OSAxMC40NjVsNDAuMDYyIDQwLjA2MnY4LjY2OGgtMjkuNTk4Yy0wLjExMzI4IDAtMC4yMTA5NCAwLjA2MjUtMC4zMjQyMiAwLjA2NjQwNy0xMy41Mi0xNy45MDItMzQuNzY2LTI5LjY2NC01OC44NzUtMjkuNjY0cy00NS4zNTUgMTEuNzYyLTU4Ljg3NSAyOS42NjRjLTAuMTEzMjgtMC4wMDM5MDctMC4yMDcwMy0wLjA2NjQwNy0wLjMyMDMxLTAuMDY2NDA3aC0yOS41OTh2LTguNjcxOWw0MC4wNjItNDAuMDYyYzIuNzczNC0yLjc3MzQgNC4zMzItNi41MzkxIDQuMzMyLTEwLjQ2MXYtODguNzk3YzAtOC4xNzE5LTYuNjIxMS0xNC44MDEtMTQuODAxLTE0LjgwMWgtODguNzkzYy0zLjkyOTcgMC03LjY4NzUgMS41NjI1LTEwLjQ2NSA0LjMzNTlsLTQ0LjM5OCA0NC4zOThjLTAuMjg5MDYgMC4yODkwNi0wLjU3ODEyIDAuNTkzNzUtMC44MzU5NCAwLjkxMDE2IDAuMDQyOTY4LTAuMDA3ODEzLTAuMDE1NjI1IDAuMDIzNDM3LTAuMDE1NjI1IDAuMDE1NjI1LTIuMDM5MSAyLjQyMTktMy4zMjQyIDUuNTA3OC0zLjQ2ODggOC44ODI4LTAuMDE1NjI1IDAuMjUtMC4wMTU2MjUgMC41MTE3Mi0wLjAxNTYyNSAwLjc2OTUzdjg4LjY4NGMwIDguMTcxOSA2LjYyMTEgMTQuODAxIDE0LjgwMSAxNC44MDFoNzMuOTk2djE0LjgwMWMwIDguMTcxOSA2LjYyMTEgMTQuODAxIDE0LjgwMSAxNC44MDFoMzEuMDk0Yy0wLjk3NjU2IDQuNzc3My0xLjQ5NjEgOS43MjY2LTEuNDk2MSAxNC43OTMgMCAyNC4xMDkgMTEuNzYyIDQ1LjM1NSAyOS42NjQgNTguODc1LTAuMDAzOTA3IDAuMTEzMjgtMC4wNjY0MDcgMC4yMTA5NC0wLjA2NjQwNyAwLjMyNDIydjI5LjU5OGgtOC42NzE5bC00MC4wNjItNDAuMDYyYy0yLjc3MzQtMi43NzM0LTYuNTMxMi00LjMzNTktMTAuNDYxLTQuMzM1OWgtODguNzk3Yy04LjE3OTcgMC0xNC44MDEgNi42MjUtMTQuODAxIDE0LjgwMXY4OC43OTdjMCAzLjkyNTggMS41NjI1IDcuNjg3NSA0LjMzNTkgMTAuNDY1bDQ0LjM4NyA0NC4zODdjMS4zNjcyIDEuMzcxMSAzLjAwMzkgMi40NTcgNC44MjAzIDMuMjA3IDEuODA4NiAwLjc0NjA5IDMuNzMwNSAxLjEzNjcgNS42NTYyIDEuMTM2N2g4OC43OTdjOC4xNzk3IDAgMTQuODAxLTYuNjI1IDE0LjgwMS0xNC44MDF2LTczLjk5NmgxNC44MDFjOC4xNzk3IDAgMTQuODAxLTYuNjI1IDE0LjgwMS0xNC44MDF2LTMxLjA5NGM0Ljc3NzMgMC45NzY1NiA5LjcyNjYgMS41IDE0Ljc5MyAxLjVzMTAuMDE2LTAuNTE5NTMgMTQuODAxLTEuNDk2MXYzMS4wOTRjMCA4LjE3MTkgNi42MjExIDE0LjgwMSAxNC44MDEgMTQuODAxaDE0LjgwMXY3My45OTZjMCA4LjE3MTkgNi42MjExIDE0LjgwMSAxNC44MDEgMTQuODAxaDg4Ljc5N2MxLjkyNTggMCAzLjg0NzctMC4zOTQ1MyA1LjY1NjItMS4xNDA2IDEuODE2NC0wLjc1MzkxIDMuNDUzMS0xLjgzNTkgNC44MjAzLTMuMjA3bDQ0LjM4Ny00NC4zODdjMi43Njk1LTIuNzc3MyA0LjMyODEtNi41NDMgNC4zMjgxLTEwLjQ2NXYtODguNzk3YzAtOC4xNzE5LTYuNjIxMS0xNC44MDEtMTQuODAxLTE0LjgwMWgtODguNzk3Yy0zLjkyOTcgMC03LjY4NzUgMS41NjI1LTEwLjQ2NSA0LjMzNTlsLTQwLjA1OSA0MC4wNjJoLTguNjcxOXYtMjkuNTk4YzAtMC4xMTMyOC0wLjA2MjUtMC4yMTA5NC0wLjA2NjQwNy0wLjMyNDIyIDE3LjkwMi0xMy41MiAyOS42NjgtMzQuNzY2IDI5LjY2OC01OC44NzUgMC01LjA2NjQtMC41MTk1My0xMC4wMTYtMS40OTYxLTE0LjgwMWwzMS4wOTQgMC4wMDM5MDZjOC4xNzk3IDAgMTQuODAxLTYuNjI4OSAxNC44MDEtMTQuODAxem0tMjA3LjItNjUuMzI0di00Ni45NDFsMTQuODAxLTE0LjgwMXY0Ni45NDF6bS01My4wNjYtODIuNjY4aDQ2Ljk0MWwtMTQuODAxIDE0LjgwMWgtNDYuOTQxem0yMy40NjkgMTAzLjU5aC01OS4xOTV2LTU5LjE5NWg1OS4xOTl6bTIzLjQ3MyAxNjIuNzloLTQ2Ljk0MWwtMTQuODAxLTE0LjgwMWg0Ni45NDF6bS04Mi42NjggNi4xMjg5IDE0LjgwMSAxNC44MDF2NDYuOTQxbC0xNC44MDEtMTQuODAxem0xMDMuNTkgODIuNjY4aC01OS4xOTV2LTU5LjE5OWg1OS4xOTl6bTIwNy4xOSAwaC01OS4xOTl2LTU5LjE5OWg1OS4xOTl6bTI5LjU5OC0yMC45MjZ2LTQ2Ljk0MWwxNC44MDEtMTQuODAxdjQ2Ljk0MXptLTUzLjA2Ni04Mi42NjhoNDYuOTQxbC0xNC44MDEgMTQuODAxaC00Ni45NDF6bS0xMDkuNzMtMjkuNjAyYy0yNC40ODQgMC00NC4zOTgtMTkuOTE0LTQ0LjM5OC00NC4zOThzMTkuOTE0LTQ0LjM5OCA0NC4zOTgtNDQuMzk4IDQ0LjM5OCAxOS45MTQgNDQuMzk4IDQ0LjM5OC0xOS45MTQgNDQuMzk4LTQ0LjM5OCA0NC4zOTh6bTE3Ny41OS0xNzcuNTl2NTkuMTk5aC01OS4xOTlsMC4wMDM5MDctNTkuMTk5em0tMjAuOTI2LTI5LjYwMmgtNDYuOTQxbC0xNC44MDEtMTQuODAxaDQ2Ljk0MXptLTgyLjY2OCA1My4wN3YtNDYuOTQxbDE0LjgwMSAxNC44MDF2NDYuOTQxeiIvPgogIDxwYXRoIGQ9Im0zOTcuNDIgMzQ3Ljk2Yy03LjMxMjUtMy42NTYyLTE2LjE4OC0wLjY5OTIyLTE5Ljg1OSA2LjYyMTFsLTUuNjIxMSAxMS4yMzgtMC4yNzM0NC0wLjI4MTI1Yy01Ljc4MTItNS43ODEyLTE1LjE0NS01Ljc4MTItMjAuOTI2IDBzLTUuNzgxMiAxNS4xNDUgMCAyMC45MjZsMTQuODAxIDE0LjgwMWMyLjc4NTIgMi43OTMgNi41NzAzIDQuMzMyIDEwLjQ1NyA0LjMzMiAwLjc4MTI1IDAgMS41NzQyLTAuMDY2NDA2IDIuMzcxMS0wLjE4NzUgNC42OTUzLTAuNzY1NjIgOC43NDIyLTMuNzM0NCAxMC44NjctNy45OTIybDE0LjgwMS0yOS41OThjMy42NTYyLTcuMzE2NCAwLjY5NTMxLTE2LjIwMy02LjYxNzItMTkuODU5eiIvPgogPC9nPgo8L3N2Zz4K",
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
  assetIcon: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNzUycHQiIGhlaWdodD0iNzUycHQiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDc1MiA3NTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiA8ZyBmaWxsPSIjZmZmIj4KICA8cGF0aCBkPSJtMzc2IDQ2Mi45MmMtMjMuMDYyIDAtNDUuMTg0LTkuMTY0MS02MS40OTItMjUuNDczLTE2LjMxMi0xNi4zMDktMjUuNDczLTM4LjQzLTI1LjQ3My02MS40OTYgMC0yMy4wNjYgOS4xNjAyLTQ1LjE4NCAyNS40NzMtNjEuNDk2IDE2LjMwOS0xNi4zMDkgMzguNDMtMjUuNDY5IDYxLjQ5Mi0yNS40NjkgMjMuMDY2IDAgNDUuMTg4IDkuMTYwMiA2MS40OTYgMjUuNDY5IDE2LjMwOSAxNi4zMTIgMjUuNDczIDM4LjQzIDI1LjQ3MyA2MS40OTYtMC4wMTk1MzEgMjMuMDU5LTkuMTg3NSA0NS4xNjgtMjUuNDkyIDYxLjQ3Ny0xNi4zMDUgMTYuMzA1LTM4LjQxNCAyNS40NzMtNjEuNDc3IDI1LjQ5MnptMC0xNjUuMzJjLTIwLjc4MSAwLTQwLjcxMSA4LjI1MzktNTUuNDA2IDIyLjk0OS0xNC42OTEgMTQuNjk1LTIyLjk0OSAzNC42MjUtMjIuOTQ5IDU1LjQwNnM4LjI1NzggNDAuNzExIDIyLjk0OSA1NS40MDZjMTQuNjk1IDE0LjY5NSAzNC42MjUgMjIuOTQ5IDU1LjQwNiAyMi45NDlzNDAuNzE1LTguMjUzOSA1NS40MDYtMjIuOTQ5YzE0LjY5NS0xNC42OTUgMjIuOTUzLTM0LjYyNSAyMi45NTMtNTUuNDA2LTAuMDIzNDM3LTIwLjc3My04LjI4NTItNDAuNjg4LTIyLjk3Ny01NS4zNzUtMTQuNjkxLTE0LjY4OC0zNC42MDktMjIuOTQ1LTU1LjM4My0yMi45NjF6Ii8+CiAgPHBhdGggZD0ibTM3NiA0MzkuNDRjLTE2LjgzNiAwLTMyLjk4LTYuNjkxNC00NC44ODctMTguNTk0LTExLjkwNi0xMS45MDYtMTguNTk0LTI4LjA1NS0xOC41OTQtNDQuODkxIDAtMTYuODM2IDYuNjg3NS0zMi45OCAxOC41OTQtNDQuODg3czI4LjA1MS0xOC41OTQgNDQuODg3LTE4LjU5NCAzMi45ODQgNi42ODc1IDQ0Ljg5MSAxOC41OTRjMTEuOTAyIDExLjkwNiAxOC41OTQgMjguMDUxIDE4LjU5NCA0NC44ODctMC4wMTE3MTkgMTYuODM2LTYuNzAzMSAzMi45NzMtMTguNjA5IDQ0Ljg3NS0xMS45MDIgMTEuOTA2LTI4LjAzOSAxOC41OTgtNDQuODc1IDE4LjYwOXptMC0xMTguMzVjLTE0LjU1MSAwLTI4LjUwOCA1Ljc4MTItMzguNzk3IDE2LjA3LTEwLjI5MyAxMC4yODktMTYuMDc0IDI0LjI0Ni0xNi4wNzQgMzguODAxIDAuMDAzOTA2IDE0LjU1MSA1Ljc4NTIgMjguNTA4IDE2LjA3NCAzOC44MDEgMTAuMjkzIDEwLjI4OSAyNC4yNSAxNi4wNyAzOC44MDEgMTYuMDY2IDE0LjU1NSAwIDI4LjUxMi01Ljc4MTIgMzguODAxLTE2LjA3NCAxMC4yODktMTAuMjg5IDE2LjA3LTI0LjI0NiAxNi4wNjYtMzguODAxLTAuMDExNzE5LTE0LjU0Ny01Ljc5NjktMjguNDk2LTE2LjA4Mi0zOC43ODUtMTAuMjg5LTEwLjI4NS0yNC4yMzgtMTYuMDctMzguNzg5LTE2LjA3OHoiLz4KICA8cGF0aCBkPSJtMzk1Ljk5IDM5OC4yOWMtMS43NDYxIDIuNTU0Ny00LjE1MjMgNC41ODk4LTYuOTY0OCA1Ljg4MjgtMy4yNzM0IDEuNTI3My02LjgyMDMgMi4zODY3LTEwLjQzNCAyLjUzMTJ2Ni4wOTc3LTAuMDAzOTA2YzAuMDIzNDM4IDAuNjkxNDEtMC4yMzgyOCAxLjM1OTQtMC43MjI2NiAxLjg0NzctMS4wNzQyIDAuOTU3MDMtMi42ODc1IDAuOTc2NTYtMy43ODUyIDAuMDQ2ODc1LTAuNDk2MDktMC41LTAuNzYxNzItMS4xODc1LTAuNzIyNjYtMS44OTQ1di02LjA5MzhjLTUuOTY4OC0wLjM1MTU2LTExLjgzNi0xLjcxNDgtMTcuMzQ4LTQuMDM1Mi0wLjY5OTIyLTAuMjkyOTctMS4yOTY5LTAuNzg1MTYtMS43MjI3LTEuNDE4LTEuMDE1Ni0xLjQxOC0wLjg5MDYyLTMuMzU5NCAwLjMwMDc4LTQuNjM2NyAwLjY0ODQ0LTAuNzEwOTQgMS41NzQyLTEuMTAxNiAyLjUzNTItMS4wNzQyIDAuNTYyNSAwIDEuMTE3MiAwLjExNzE5IDEuNjMyOCAwLjM0Mzc1IDQuNjA5NCAyLjA1NDcgOS41NjI1IDMuMjI2NiAxNC42MDIgMy40NDUzdi0xOS43NjJjLTMuMzcxMS0wLjg0Mzc1LTYuNjY0MS0xLjk2NDgtOS44NDc3LTMuMzUxNi0yLjU5MzgtMS4xNDQ1LTQuODc4OS0yLjg5ODQtNi42NTYyLTUuMTA5NC0xLjgzNTktMi4zOTQ1LTIuNzc3My01LjM1NTUtMi42NjAyLTguMzcxMS0wLjAxOTUzMS0yLjkwMjMgMC43MzgyOC01Ljc1MzkgMi4xOTkyLTguMjU3OCAxLjU3ODEtMi42MzY3IDMuODMyLTQuODAwOCA2LjUyNzMtNi4yNjk1IDMuMjE0OC0xLjc2MTcgNi43NzczLTIuNzg5MSAxMC40MzgtMy4wMTU2di02LjAyNzNjLTAuMDE1NjI1LTAuNjk5MjIgMC4yNDIxOS0xLjM3ODkgMC43MjI2Ni0xLjg4NjcgMC40ODA0Ny0wLjUxMTcyIDEuMTU2Mi0wLjc5Mjk3IDEuODU1NS0wLjc3MzQ0IDAuNzA3MDMtMC4wMDc4MTIgMS4zODY3IDAuMjczNDQgMS44ODY3IDAuNzczNDRzMC43NzM0NCAxLjE3OTcgMC43NjU2MiAxLjg4Njd2NS45MjU4YzUuMTA1NSAwLjEzMjgxIDEwLjE1MiAxLjA4OTggMTQuOTUzIDIuODM1OSAxLjUwNzggMC40NDE0MSAyLjUwNzggMS44NzUgMi40MDIzIDMuNDQ1MyAwIDAuOTE3OTctMC4zMzU5NCAxLjgwNDctMC45NDUzMSAyLjQ5MjItMC42MTMyOCAwLjczODI4LTEuNTM1MiAxLjE0ODQtMi40OTYxIDEuMTE3Mi0wLjQ3MjY2LTAuMDMxMjUtMC45Mzc1LTAuMTQ4NDQtMS4zNjcyLTAuMzQ3NjYtNC4wNDMtMS4zOTg0LTguMjczNC0yLjE3OTctMTIuNTQ3LTIuMzE2NHYyMC40NDFjMy41MDM5IDAuNzc3MzQgNi45Mzc1IDEuODM1OSAxMC4yNjYgMy4xNzU4IDIuNjY4IDEuMTA1NSA1LjAxNTYgMi44NjMzIDYuODMyIDUuMTA5NCAxLjkyOTcgMi41NzgxIDIuOTAyMyA1Ljc1MzkgMi43NDYxIDguOTcyNyAwLjAzNTE1NiAyLjk0MTQtMC44MjAzMSA1LjgyNDItMi40NDUzIDguMjczNHptLTMxLjA5LTMwLjMxNmMyLjU4OTggMS42NjQxIDUuNDUzMSAyLjg1OTQgOC40NjA5IDMuNTE5NXYtMTguODkxYy0yLjk4NDQgMC4yODEyNS01LjgzMiAxLjM2MzMtOC4yNSAzLjEzNjctMi4wMDM5IDEuNTAzOS0zLjE1MjMgMy44OTA2LTMuMDg1OSA2LjM5NDUtMC4xMDU0NyAyLjMxMjUgMC45ODA0NyA0LjUxNTYgMi44NzUgNS44Mzk4em0yNS44MDUgMjEuNTU1YzAuMDM5MDYzLTIuMTY0MS0xLjEzNjctNC4xNzE5LTMuMDQ2OS01LjE5NTMtMi44NTU1LTEuNTU0Ny01LjkwNjItMi43MjI3LTkuMDY2NC0zLjQ4MDV2MTguNDY1YzguMDgyLTAuNTcwMzEgMTIuMTIxLTMuODMyIDEyLjExMy05Ljc4OTF6Ii8+CiAgPHBhdGggZD0ibTM3NS45NCA0MTYuMjRjLTAuOTAyMzQgMC4wMjM0MzgtMS43NzczLTAuMzA4NTktMi40Mzc1LTAuOTIxODgtMC42NzE4OC0wLjY2MDE2LTEuMDM1Mi0xLjU3MDMtMS0yLjUxMTd2LTUuMzAwOGMtNS43ODkxLTAuNDIxODgtMTEuNDczLTEuNzg5MS0xNi44MjQtNC4wNDY5LTAuODQ3NjYtMC4zNTkzOC0xLjU3NDItMC45NTcwMy0yLjA4NTktMS43MjI3LTEuMjEwOS0xLjY0ODQtMS4xNDQ1LTMuOTEwMiAwLjE2NDA2LTUuNDgwNSAxLjMwODYtMS41NzAzIDMuNTE1Ni0yLjA1MDggNS4zNTk0LTEuMTY0MSA0LjIzNDQgMS44ODI4IDguNzY1NiAzIDEzLjM4NyAzLjMwODZ2LTE4LjE3MmMtMy4xODc1LTAuODI4MTItNi4zMDQ3LTEuOTA2Mi05LjMyNDItMy4yMjI3LTIuNzE4OC0xLjIwNy01LjEwOTQtMy4wNDMtNi45NzI3LTUuMzU5NC0xLjk2MDktMi41NDY5LTIuOTY4OC01LjY5OTItMi44NTU1LTguOTEwMi0wLjAxOTUzMS0zLjA0NjkgMC43NzczNC02LjA0MyAyLjMwODYtOC42NzU4IDEuNjU2Mi0yLjc2MTcgNC4wMTU2LTUuMDM1MiA2LjgzOTgtNi41ODIgMy4wODk4LTEuNjk5MiA2LjQ5NjEtMi43MzQ0IDEwLjAwNC0zLjA0M3YtNS4yMzA1Yy0wLjA0Njg3NS0xLjQyNTggMC43ODkwNi0yLjczODMgMi4xMDU1LTMuMjkzIDEuMzIwMy0wLjU1NDY5IDIuODM5OC0wLjIzNDM4IDMuODI4MSAwLjc5Njg4IDAuNjcxODggMC42NTYyNSAxLjA0MyAxLjU1ODYgMS4wMjM0IDIuNDk2MXY1LjEwNTVjNC45MTggMC4yMDMxMiA5Ljc3MzQgMS4xNjQxIDE0LjM5NSAyLjg1MTYgMS44Mzk4IDAuNTY2NDEgMy4wNjI1IDIuMzEyNSAyLjk1NyA0LjIzODMgMCAxLjEyMTEtMC40MDYyNSAyLjIwMzEtMS4xNDQ1IDMuMDQ2OS0wLjc3NzM0IDAuOTI5NjktMS45NDE0IDEuNDUzMS0zLjE1NjIgMS40MjE5LTAuNTg1OTQtMC4wMzEyNS0xLjE2MDItMC4xNjc5Ny0xLjY5NTMtMC40MTAxNi0zLjY2NDEtMS4yNjE3LTcuNDg0NC0yLjAwNzgtMTEuMzU1LTIuMjEwOXYxOC44NzljMy4zMjAzIDAuNzY1NjIgNi41NzQyIDEuNzg5MSA5LjczNDQgMy4wNjI1IDIuNzk2OSAxLjE2NDEgNS4yNjE3IDMuMDA3OCA3LjE2OCA1LjM1OTQgMi4wNTQ3IDIuNzM4MyAzLjA5MzggNi4xMDE2IDIuOTM3NSA5LjUxOTUgMC4wMjczNDQgMy4wOTc3LTAuODcxMDkgNi4xMzI4LTIuNTgyIDguNzE4OC0xLjgzOTggMi42Nzk3LTQuMzY3MiA0LjgxNjQtNy4zMjAzIDYuMTgzNi0zLjEyODkgMS40NjA5LTYuNTAzOSAyLjMyODEtOS45NDkyIDIuNTU0N3Y1LjMwMDhjMC4wMjczNDQgMC45MTc5Ny0wLjMzMjAzIDEuODA0Ny0wLjk4NDM3IDIuNDQ5Mi0wLjY3NTc4IDAuNjUyMzQtMS41ODU5IDEtMi41MjM0IDAuOTY0ODR6bS0xOC44MDktMTkuODRjLTAuNzE4NzUtMC4wMjczNDQtMS40MTQxIDAuMjY1NjItMS44OTQ1IDAuNzk2ODctMC45MjE4OCAwLjk4MDQ3LTEuMDE5NSAyLjQ3NjYtMC4yMzQzOCAzLjU2NjQgMC4zMjgxMiAwLjQ5MjE5IDAuNzk2ODggMC44Nzg5MSAxLjM0MzggMS4xMDk0IDUuNDI1OCAyLjI4MTIgMTEuMTk1IDMuNjI1IDE3LjA3IDMuOTcyN2wwLjgwODU5IDAuMDQ2ODc1djYuOTE0MWMtMC4wMzUxNTYgMC40NjQ4NCAwLjEzMjgxIDAuOTI1NzggMC40NjA5NCAxLjI2NTYgMC43NTM5MSAwLjYxNzE5IDEuODQ3NyAwLjYwNTQ3IDIuNTgyLTAuMDM1MTU2IDAuMzI4MTItMC4zMjQyMiAwLjUtMC43NzM0NCAwLjQ3NjU2LTEuMjMwNXYtNi45MTQxbDAuODEyNS0wLjA0Mjk2OXYtMC4wMDM5MDZjMy40OTYxLTAuMTQ0NTMgNi45MzM2LTAuOTc2NTYgMTAuMTA5LTIuNDQ5MiAyLjY2OC0xLjIzNDQgNC45NTctMy4xNjggNi42MTcyLTUuNTkzOCAxLjUxOTUtMi4yOTY5IDIuMzIwMy00Ljk5NjEgMi4zMDA4LTcuNzUgMC4xNTIzNC0zLjAyMzQtMC43NS02LjAwMzktMi41NTA4LTguNDMzNi0xLjczMDUtMi4xMzY3LTMuOTYwOS0zLjgwNDctNi40OTYxLTQuODU5NC0zLjI4NTItMS4zMTY0LTYuNjcxOS0yLjM2MzMtMTAuMTI5LTMuMTMyOGwtMC42Njc5Ny0wLjE1NjI1IDAuMDAzOTA3LTIyLjAwOCAwLjg5NDUzIDAuMDM1MTU2YzQuMzU5NCAwLjE0NDUzIDguNjc1OCAwLjk0MTQxIDEyLjgwMSAyLjM2MzMgMC4zMzU5NCAwLjE2NDA2IDAuNzAzMTIgMC4yNjU2MiAxLjA3ODEgMC4yOTY4OCAwLjcxMDk0IDAuMDM1MTU2IDEuMzkwNi0wLjI2NTYyIDEuODQzOC0wLjgxMjUgMC40NzY1Ni0wLjUzMTI1IDAuNzM4MjgtMS4yMjI3IDAuNzM0MzgtMS45MzM2IDAuMTA5MzgtMS4yMDMxLTAuNjY0MDYtMi4zMTI1LTEuODMyLTIuNjIxMS00LjcxNDgtMS43MTA5LTkuNjc1OC0yLjY1MjMtMTQuNjkxLTIuNzg1MmwtMC44MzIwMy0wLjAzNTE1NiAwLjAwMzkwNy02Ljc2NTZjMC4wMTU2MjQtMC40ODA0Ny0wLjE2Nzk3LTAuOTQ5MjItMC41MTU2My0xLjI4OTEtMC4zMjgxMi0wLjMzOTg0LTAuNzgxMjUtMC41MjczNC0xLjI1LTAuNTI3MzQtMC40NzI2NiAwLTAuOTI1NzggMC4xODc1LTEuMjUzOSAwLjUyNzM0LTAuMzI4MTIgMC4zNDc2Ni0wLjUwNzgxIDAuODEyNS0wLjQ5MjE5IDEuMjg5MXY2LjgwMDhsLTAuNzkyOTcgMC4wNzAzMTNoMC4wMDM5MDZjLTMuNTMxMiAwLjIxODc1LTYuOTcyNyAxLjIwNy0xMC4wODIgMi44OTg0LTIuNTU4NiAxLjM5MDYtNC43MDcgMy40Mzc1LTYuMjE0OCA1LjkzMzYtMS4zNzUgMi4zNzExLTIuMDg5OCA1LjA2NjQtMi4wNzAzIDcuODA4Ni0wLjExMzI4IDIuODIwMyAwLjc2MTcyIDUuNTg5OCAyLjQ2ODggNy44MzIgMS42OTUzIDIuMTA1NSAzLjg2NzIgMy43NzczIDYuMzM5OCA0Ljg2NzIgMy4xMzY3IDEuMzYzMyA2LjM4MjggMi40NjQ4IDkuNjk5MiAzLjMwNDdsMC42NDA2MiAwLjE2Nzk3djIxLjMxNmwtMC44OTg0NC0wLjAzOTA2M2MtNS4xNDg0LTAuMjI2NTYtMTAuMjA3LTEuNDE4LTE0LjkxNC0zLjUxMTctMC40MDYyNS0wLjE3MTg4LTAuODQzNzUtMC4yNjE3Mi0xLjI4MTItMC4yNTM5MXptMjAuNjA1IDMuODQzOC0wLjAwMzkwNi0yMC41MTIgMS4wODU5IDAuMjk2ODhjMy4yNDIyIDAuNzczNDQgNi4zNjcyIDEuOTcyNyA5LjI5MyAzLjU3MDMgMi4xNjQxIDEuMTc5NyAzLjQ5MjIgMy40NjQ4IDMuNDQxNCA1LjkyOTcgMCA2LjQ1Ny00LjM0NzcgMTAuMDQzLTEyLjkxNCAxMC42NDh6bTEuNzIyNy0xOC4yNS0wLjAwMzkwNiAxNi4zOThjNi45ODgzLTAuNzA3MDMgMTAuMzg3LTMuNjA5NCAxMC4zODctOC44NTE2aDAuMDAzOTA2YzAuMDM1MTU2LTEuODY3Mi0wLjk4NDM4LTMuNTk3Ny0yLjYzNjctNC40NjQ4LTIuNDQ1My0xLjM0NzctNS4wNTQ3LTIuMzgyOC03Ljc2MTctMy4wNzgxem0tNS4yMzQ0LTkuMzg2Ny0xLjA4Mi0wLjI4NTE2LTAuMDAzOTA2IDAuMDAzOTA3Yy0zLjEwNTUtMC42ODc1LTYuMDY2NC0xLjkyNTgtOC43MzgzLTMuNjU2Mi0yLjEyNS0xLjQ4MDUtMy4zNDc3LTMuOTQ5Mi0zLjIzODMtNi41MzkxLTAuMDYyNS0yLjc2NTYgMS4yMDctNS4zOTg0IDMuNDE0MS03LjA3MDMgMi41MzkxLTEuODU5NCA1LjUzNTItMy4wMDM5IDguNjY4LTMuMzEyNWwwLjk3NjU2LTAuMTI4OTF6bS0xLjcyMjctMTkuMDA0LTAuMDAzOTA2IDAuMDAzOTA3Yy0yLjQ4MDUgMC4zNTE1Ni00LjgzNTkgMS4zMTY0LTYuODUxNiAyLjgwODYtMS43OTY5IDEuMzM5OC0yLjgyODEgMy40NzI3LTIuNzYxNyA1LjcxNDgtMC4xMDU0NyAyLjAzNTIgMC44NDc2NiAzLjk4MDUgMi41MTk1IDUuMTQwNiAyLjE3NTggMS40MTggNC41NzAzIDIuNDYwOSA3LjA4OTggMy4wOTM4eiIvPgogIDxwYXRoIGQ9Im0zNzYgMjk3LjYxYy0yLjM3NSAwLTQuMzA0Ny0xLjkyNTgtNC4zMDQ3LTQuMzA0N3YtODYuMDc0YzAtMi4zNzg5IDEuOTI5Ny00LjMwNDcgNC4zMDQ3LTQuMzA0NyAyLjM3ODkgMCA0LjMwODYgMS45MjU4IDQuMzA4NiA0LjMwNDd2ODYuMDc0YzAgMS4xNDQ1LTAuNDU3MDMgMi4yMzgzLTEuMjYxNyAzLjA0NjktMC44MDg1OSAwLjgwNDY5LTEuOTAyMyAxLjI1NzgtMy4wNDY5IDEuMjU3OHoiLz4KICA8cGF0aCBkPSJtMzc2IDIxMS43NmMtNS42MjExLTAuMDA3ODEzLTExLjAwOC0yLjI1MzktMTQuOTc3LTYuMjM0NC0zLjk2ODgtMy45ODQ0LTYuMTk1My05LjM3ODktNi4xODc1LTE1IDAuMDA3ODEyLTUuNjIxMSAyLjI0NjEtMTEuMDEyIDYuMjI2Ni0xNC45ODQgMy45ODA1LTMuOTY4OCA5LjM3NS02LjE5OTIgMTQuOTk2LTYuMTk1M3MxMS4wMTIgMi4yMzgzIDE0Ljk4OCA2LjIxODhjMy45NzI3IDMuOTc2NiA2LjIwNyA5LjM2NzIgNi4yMDcgMTQuOTg4LTAuMDA3ODEyIDUuNjMyOC0yLjI1IDExLjAyNy02LjIzNDQgMTUuMDA0LTMuOTg4MyAzLjk3NjYtOS4zODY3IDYuMjEwOS0xNS4wMiA2LjIwMzF6bTAtMzMuODA1Yy01LjA4OTggMC4wMTk1MzEtOS42NzE5IDMuMDk3Ny0xMS42MDUgNy44MDg2LTEuOTM3NSA0LjcwNy0wLjg0NzY2IDEwLjExNyAyLjc1NzggMTMuNzExIDMuNjA1NSAzLjU5NzcgOS4wMTk1IDQuNjY0MSAxMy43MjMgMi43MTQ4IDQuNzAzMS0xLjk1MzEgNy43NjU2LTYuNTQzIDcuNzY1Ni0xMS42MzctMC4wMDM5MDYtMy4zNDc3LTEuMzM1OS02LjU1NDctMy43MDctOC45MThzLTUuNTg1OS0zLjY4NzUtOC45MzM2LTMuNjc5N3oiLz4KICA8cGF0aCBkPSJtMzc2IDU0OS4wN2MtMi4zNzUgMC00LjMwNDctMS45Mjk3LTQuMzA0Ny00LjMwNDd2LTg2LjEwNWMwLTIuMzc4OSAxLjkyOTctNC4zMDQ3IDQuMzA0Ny00LjMwNDcgMi4zNzg5IDAgNC4zMDg2IDEuOTI1OCA0LjMwODYgNC4zMDQ3djg2LjEwNWMwIDEuMTQwNi0wLjQ1NzAzIDIuMjM0NC0xLjI2MTcgMy4wNDMtMC44MDg1OSAwLjgwODU5LTEuOTAyMyAxLjI2MTctMy4wNDY5IDEuMjYxN3oiLz4KICA8cGF0aCBkPSJtMzc2LjAyIDU4Mi42NmMtNS42MjUgMC0xMS4wMi0yLjIzNDQtMTQuOTk2LTYuMjE0OC0zLjk3NjYtMy45NzY2LTYuMjEwOS05LjM3MTEtNi4yMTA5LTE0Ljk5NiAwLTUuNjIxMSAyLjIzNDQtMTEuMDE2IDYuMjEwOS0xNC45OTYgMy45NzY2LTMuOTc2NiA5LjM3MTEtNi4yMTA5IDE0Ljk5Ni02LjIxMDlzMTEuMDIgMi4yMzQ0IDE0Ljk5NiA2LjIxMDljMy45NzY2IDMuOTgwNSA2LjIxMDkgOS4zNzUgNi4yMTA5IDE0Ljk5Ni0wLjAxMTcxOSA1LjYyMTEtMi4yNSAxMS4wMDgtNi4yMjY2IDE0Ljk4NC0zLjk3MjcgMy45NzI3LTkuMzU5NCA2LjIxMDktMTQuOTggNi4yMjY2em0wLTMzLjgwNWMtNS4wOTM4IDAtOS42ODc1IDMuMDY2NC0xMS42NDEgNy43NzM0LTEuOTQ5MiA0LjcwNy0wLjg3MTA5IDEwLjEyNSAyLjczNDQgMTMuNzMgMy42MDE2IDMuNjAxNiA5LjAxOTUgNC42Nzk3IDEzLjcyNyAyLjczMDUgNC43MDctMS45NDkyIDcuNzc3My02LjU0MyA3Ljc3NzMtMTEuNjQxLTAuMDIzNDM4LTYuOTQ1My01LjY0ODQtMTIuNTc0LTEyLjU5OC0xMi41OTR6Ii8+CiAgPHBhdGggZD0ibTQzNC40NyAzMjEuODRjLTEuNzQyMiAwLTMuMzEyNS0xLjA0NjktMy45NzY2LTIuNjU2Mi0wLjY2Nzk3LTEuNjA5NC0wLjMwMDc4LTMuNDYwOSAwLjkyOTY5LTQuNjkxNGw2MC44NzUtNjAuODc1YzEuNjg3NS0xLjYyODkgNC4zNzUtMS42MDU1IDYuMDM1MiAwLjA1NDY4OCAxLjY2MDIgMS42NjAyIDEuNjgzNiA0LjM0MzggMC4wNTA3ODEgNi4wMzUybC02MC44NzEgNjAuODcxYy0wLjgwODU5IDAuODA4NTktMS45MDIzIDEuMjYxNy0zLjA0MyAxLjI2MTd6Ii8+CiAgPHBhdGggZD0ibTUwNy4xNiAyNjYuMWgtMC4wMzUxNTYgMC4wMDM5MDZjLTYuNTk3Ny0wLjAwMzkwNi0xMi44MTYtMy4wNzAzLTE2LjgzMi04LjMwMDgtNC4wMTE3LTUuMjM0NC01LjM2NzItMTIuMDM1LTMuNjYwMi0xOC40MDYgMS43MDctNi4zNzExIDYuMjc3My0xMS41ODYgMTIuMzcxLTE0LjEwOSA2LjA5MzgtMi41MjczIDEzLjAxNi0yLjA3NDIgMTguNzI3IDEuMjIyNyA1LjcxMDkgMy4yOTY5IDkuNTY2NCA5LjA2MjUgMTAuNDMgMTUuNTk4IDAuODYzMjggNi41MzkxLTEuMzYzMyAxMy4xMDktNi4wMjM0IDE3Ljc3My0zLjk2MDkgMy45OTIyLTkuMzU1NSA2LjIzNDQtMTQuOTggNi4yMjI3em0tMC4wNDI5NjgtMzMuODRjLTYuOTY0OCAwLTEyLjYxMyA1LjY0ODQtMTIuNjEzIDEyLjYxMyAwIDYuOTY4OCA1LjY0ODQgMTIuNjEzIDEyLjYxMyAxMi42MTNoMC4wMjM0MzdjMy4zMzk4IDAuMDA3ODEzIDYuNTM5MS0xLjMyNDIgOC44OTA2LTMuNjk1MyAzLjU4OTgtMy42MTcyIDQuNjU2Mi05LjAzNTIgMi43MDMxLTEzLjc0Mi0xLjk1MzEtNC43MDMxLTYuNTQzLTcuNzczNC0xMS42MzctNy43ODUyeiIvPgogIDxwYXRoIGQ9Im0yNTYuNjYgNDk5LjY1Yy0xLjc0MjIgMC0zLjMxMjUtMS4wNDY5LTMuOTc2Ni0yLjY1NjItMC42Njc5Ny0xLjYwOTQtMC4zMDA3OC0zLjQ2MDkgMC45Mjk2OS00LjY5MTRsNjAuODc1LTYwLjg3NWMwLjgwMDc4LTAuODI4MTIgMS45MDIzLTEuMzAwOCAzLjA1ODYtMS4zMTI1czIuMjY1NiAwLjQ0NTMxIDMuMDgyIDEuMjYxNyAxLjI2OTUgMS45MjU4IDEuMjYxNyAzLjA4MmMtMC4wMTE3MTkgMS4xNTIzLTAuNDg0MzggMi4yNTc4LTEuMzE2NCAzLjA1ODZsLTYwLjg3MSA2MC44NzFjLTAuODA4NTkgMC44MDg1OS0xLjkwMjMgMS4yNjE3LTMuMDQzIDEuMjYxN3oiLz4KICA8cGF0aCBkPSJtMjQ0Ljg4IDUyOC4zNWMtNS42Mjg5IDAtMTEuMDIzLTIuMjM0NC0xNS4wMDgtNi4yMTA5LTMuOTgwNS0zLjk4MDUtNi4yMTg4LTkuMzc1LTYuMjE4OC0xNS4wMDQtMC4wMDM5MDYtNS42Mjg5IDIuMjMwNS0xMS4wMjcgNi4yMDctMTUuMDA4IDUuMDExNy01LjAxNTYgMTIuMTk1LTcuMTk5MiAxOS4xNDgtNS44MjAzIDYuOTUzMSAxLjM3ODkgMTIuNzU4IDYuMTQwNiAxNS40NzMgMTIuNjg4IDIuNzE4OCA2LjU1MDggMS45ODQ0IDE0LjAyMy0xLjk1MzEgMTkuOTE4LTMuOTM3NSA1Ljg5NDUtMTAuNTU5IDkuNDM3NS0xNy42NDggOS40Mzc1em0tMC4wNDY4NzQtMzMuODMyYy0zLjMzNTktMC4wMDM5MDYtNi41MzUyIDEuMzI4MS04Ljg4NjcgMy42OTUzLTIuMzYzMyAyLjM2NzItMy42OTE0IDUuNTgyLTMuNjgzNiA4LjkyOTcgMC4wMDM5MDYgMy4zNDc3IDEuMzM5OCA2LjU1NDcgMy43MTQ4IDguOTE0MSAyLjk4MDUgMi45NjQ4IDcuMjQyMiA0LjI0MjIgMTEuMzU5IDMuNDE0MSA0LjEyMTEtMC44MjgxMiA3LjU1NDctMy42NjAyIDkuMTU2Mi03LjU0MyAxLjYwNTUtMy44ODI4IDEuMTY0MS04LjMxMjUtMS4xNzE5LTExLjgwNS0yLjMzNTktMy40OTIyLTYuMjYxNy01LjU4OTgtMTAuNDYxLTUuNTg5OHoiLz4KICA8cGF0aCBkPSJtNTQ0Ljc3IDM4MC4zMWgtODYuMTA1Yy0yLjM3ODkgMC00LjMwNDctMS45Mjk3LTQuMzA0Ny00LjMwODYgMC0yLjM3NSAxLjkyNTgtNC4zMDQ3IDQuMzA0Ny00LjMwNDdoODYuMTA1YzIuMzc1IDAgNC4zMDQ3IDEuOTI5NyA0LjMwNDcgNC4zMDQ3IDAgMi4zNzg5LTEuOTI5NyA0LjMwODYtNC4zMDQ3IDQuMzA4NnoiLz4KICA8cGF0aCBkPSJtNTYxLjQ1IDM5Ny4yM2MtNS42Mjg5IDAuMDA3ODEyLTExLjAzMS0yLjIyNjYtMTUuMDItNi4yMDMxLTMuOTg0NC0zLjk4MDUtNi4yMjY2LTkuMzc4OS02LjIzMDUtMTUuMDEyLTAuMDAzOTA2LTUuNjMyOCAyLjIzMDUtMTEuMDM1IDYuMjEwOS0xNS4wMnM5LjM3ODktNi4yMjI3IDE1LjAxMi02LjIyMjdjNS42MzI4LTAuMDAzOTA3IDExLjAzNSAyLjIzNDQgMTUuMDE2IDYuMjE0OCAzLjk4NDQgMy45ODA1IDYuMjIyNyA5LjM4MjggNi4yMjI3IDE1LjAxMi0wLjAwNzgxMiA1LjYyNS0yLjI0MjIgMTEuMDItNi4yMTg4IDE0Ljk5Ni0zLjk3NjYgMy45ODA1LTkuMzY3MiA2LjIyMjctMTQuOTkyIDYuMjM0NHptMC0zMy44NDhjLTUuMTA1NS0wLjAwNzgxMi05LjcxMDkgMy4wNTg2LTExLjY3MiA3Ljc3MzQtMS45NjA5IDQuNzE0OC0wLjg4NjcyIDEwLjE0OCAyLjcyMjcgMTMuNzYyIDMuNjA1NSAzLjYxMzMgOS4wMzUyIDQuNjk1MyAxMy43NTQgMi43NDIyIDQuNzE4OC0xLjk0OTIgNy43OTMtNi41NTQ3IDcuNzkzLTExLjY2IDAuMDAzOTA2LTYuOTYwOS01LjYzMjgtMTIuNjA5LTEyLjU5OC0xMi42MTd6Ii8+CiAgPHBhdGggZD0ibTI5My4zMSAzODAuMzFoLTg2LjA3NGMtMi4zNzg5IDAtNC4zMDQ3LTEuOTI5Ny00LjMwNDctNC4zMDg2IDAtMi4zNzUgMS45MjU4LTQuMzA0NyA0LjMwNDctNC4zMDQ3aDg2LjA3NGMyLjM3ODkgMCA0LjMwNDcgMS45Mjk3IDQuMzA0NyA0LjMwNDcgMCAyLjM3ODktMS45MjU4IDQuMzA4Ni00LjMwNDcgNC4zMDg2eiIvPgogIDxwYXRoIGQ9Im0xOTAuNTUgMzk3LjIzYy01LjYzMjggMC4wMDc4MTItMTEuMDM1LTIuMjI2Ni0xNS4wMjMtNi4yMDctMy45ODQ0LTMuOTgwNS02LjIyMjctOS4zODI4LTYuMjI2Ni0xNS4wMTYgMC01LjYzMjggMi4yMzQ0LTExLjAzNSA2LjIxODgtMTUuMDIgMy45ODA1LTMuOTgwNSA5LjM4NjctNi4yMTg4IDE1LjAyLTYuMjE0OCA1LjYzMjggMCAxMS4wMzEgMi4yNDIyIDE1LjAxMiA2LjIyNjYgMy45ODA1IDMuOTg0NCA2LjIxNDggOS4zOTA2IDYuMjA3IDE1LjAyMy0wLjAwMzkwNyA1LjYyMTEtMi4yNDIyIDExLjAxMi02LjIxODggMTQuOTg4LTMuOTcyNyAzLjk3NjYtOS4zNjMzIDYuMjEwOS0xNC45ODggNi4yMTg4em0wLTMzLjg0OGMtNS4xMDE2LTAuMDA3ODEyLTkuNzEwOSAzLjA1ODYtMTEuNjcyIDcuNzY5NS0xLjk2MDkgNC43MTA5LTAuODkwNjIgMTAuMTQxIDIuNzE0OCAxMy43NTggMy42MDE2IDMuNjEzMyA5LjAyNzMgNC43MDMxIDEzLjc0NiAyLjc1NzggNC43MTg4LTEuOTQ1MyA3LjgwMDgtNi41NDMgNy44MDg2LTExLjY0NSAwLjAwMzkwNi02Ljk2NDgtNS42Mjg5LTEyLjYyMS0xMi41OTgtMTIuNjQxeiIvPgogIDxwYXRoIGQ9Im00OTUuMzQgNDk5LjY1Yy0xLjE0MDYgMC0yLjIzODMtMC40NTMxMy0zLjA0My0xLjI2MTdsLTYwLjg3NS02MC44NzFjLTAuODI4MTItMC44MDA3OC0xLjMwMDgtMS45MDYyLTEuMzEyNS0zLjA1ODYtMC4wMTE3MTktMS4xNTYyIDAuNDQ1MzEtMi4yNjU2IDEuMjYxNy0zLjA4MnMxLjkyNTgtMS4yNzM0IDMuMDgyLTEuMjYxN2MxLjE1MjMgMC4wMTE3MTkgMi4yNTc4IDAuNDg0MzggMy4wNTg2IDEuMzEyNWw2MC44NzEgNjAuODc1YzEuMjMwNSAxLjIzMDUgMS42MDE2IDMuMDgyIDAuOTMzNTkgNC42OTE0LTAuNjY3OTcgMS42MDk0LTIuMjM0NCAyLjY1NjItMy45NzY2IDIuNjU2MnoiLz4KICA8cGF0aCBkPSJtNTA3LjEgNTI4LjM1Yy01LjYyMTEgMC4wMTU2MjUtMTEuMDE2LTIuMjE4OC0xNC45NzctNi4yMDMxLTQuNjcxOS00LjY2NDEtNi45MDYyLTExLjIzLTYuMDQ2OS0xNy43NzMgMC44NTU0Ny02LjU0MyA0LjcwNy0xMi4zMTIgMTAuNDE4LTE1LjYxMyA1LjcxMDktMy4zMDQ3IDEyLjYzNy0zLjc2MTcgMTguNzMtMS4yMzgzIDYuMDk3NyAyLjUxOTUgMTAuNjc2IDcuNzM0NCAxMi4zODcgMTQuMTA1IDEuNzEwOSA2LjM3NSAwLjM1OTM4IDEzLjE4LTMuNjU2MiAxOC40MTQtNC4wMTU2IDUuMjM4My0xMC4yMzQgOC4zMDg2LTE2LjgzMiA4LjMwODZ6bTAuMDQ2ODc2LTMzLjgyNHYwLjAwMzkwNmMtNi45NjA5LTAuMDE1NjI1LTEyLjYxNyA1LjYxNzItMTIuNjI5IDEyLjU4Mi0wLjAxMTcxOSA2Ljk2MDkgNS42MjExIDEyLjYxMyAxMi41ODIgMTIuNjI5IDYuOTYwOSAwLjAwNzgxMyAxMi42MTMtNS42Mjg5IDEyLjYyNS0xMi41OSAwLjAwNzgxMy02Ljk2MDktNS42Mjg5LTEyLjYxMy0xMi41OS0xMi42MjF6Ii8+CiAgPHBhdGggZD0ibTMxNy41MyAzMjEuODRjLTEuMTQwNiAwLTIuMjM4My0wLjQ1MzEzLTMuMDQzLTEuMjYxN2wtNjAuODc1LTYwLjg3MWMtMS42Mjg5LTEuNjkxNC0xLjYwNTUtNC4zNzUgMC4wNTQ2ODgtNi4wMzUyIDEuNjYwMi0xLjY2MDIgNC4zNDM4LTEuNjgzNiA2LjAzNTItMC4wNTQ2ODhsNjAuODcxIDYwLjg3NWMxLjIzMDUgMS4yMzA1IDEuNjAxNiAzLjA4MiAwLjkzMzU5IDQuNjkxNC0wLjY2NDA2IDEuNjA5NC0yLjIzNDQgMi42NTYyLTMuOTc2NiAyLjY1NjJ6Ii8+CiAgPHBhdGggZD0ibTI0NC44NiAyNjYuMDhjLTcuNTA3OC0wLjEwOTM4LTE0LjM5OC00LjE3OTctMTguMTE3LTEwLjcwMy0zLjcxODgtNi41MjM0LTMuNzE0OC0xNC41MjMgMC4wMTE3MTktMjEuMDQzIDMuNzI2Ni02LjUxNTYgMTAuNjIxLTEwLjU3OCAxOC4xMjktMTAuNjggNS42MjUtMC4wMTk1MzEgMTEuMDIgMi4yMTg4IDE0Ljk4NCA2LjIwNyAzLjk3MjcgMy45ODQ0IDYuMTk5MiA5LjM4MjggNi4xOTUzIDE1LjAwOHMtMi4yNDIyIDExLjAyLTYuMjE4OCAxNWMtMy45ODA1IDMuOTc2Ni05LjM3NSA2LjIxMDktMTUuMDA0IDYuMjEwOXptMC4wNDI5NjktMzMuODE2Yy02Ljg3NSAwLjExNzE5LTEyLjM5MSA1LjcyMjctMTIuMzk4IDEyLjU5OHM1LjQ5MjIgMTIuNDkyIDEyLjM2NyAxMi42MjVjNS4wODk4LTAuMDE5NTMxIDkuNjcxOS0zLjA4OTggMTEuNjIxLTcuNzkzIDEuOTQ5Mi00LjcwMzEgMC44OTA2Mi0xMC4xMTMtMi42OTE0LTEzLjczLTIuMzUxNi0yLjM3NS01LjU1ODYtMy43MDctOC44OTg0LTMuNjk5MnoiLz4KIDwvZz4KPC9zdmc+Cg=="
}

const Wrapper = styled.div`
  min-height: 400px;
  padding-top: 40px;
  &.dark-mode{
    background-color:#0b0a15 !important;
  }
`
const Parent = styled.div`
  width: 100%;
  height: 100%;
  &.dark-mode{
    background-color:#0b0a15 !important;
  }
`;

const MainParent = styled.div`
  &.dark-mode{
    background-color:#0b0a15 !important
  }
`;

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
  min-height: 100vh;
  @media screen and (min-width: 1074px){
    padding-left: 120px;
    padding-right: 20px;
  }
  @media screen and (min-width: 1334px){
    padding-left: 260px;
    padding-right: 20px;
  }
`;

export default Layout
