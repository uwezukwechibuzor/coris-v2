import React, { useRef } from "react";
import Link from 'next/link';
import Plot from 'react-plotly.js';
import { formatTimeDateYear } from "../../../lib/Util/format";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGithub,
  faTwitter,
  faDiscord,
  faTelegram,
  faFirefoxBrowser
} from "@fortawesome/free-brands-svg-icons";
import { priceChartType } from "./types";
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { useAppSelector } from "../../../lib/hooks";


let getTotalIndex;
let coinID = 'cosmos'
     

const PriceChart = () => {
  const darkMode = useAppSelector(state => state.general.darkMode)
  const chartRef = useRef()



  let API_Call = `https://api.coingecko.com/api/v3/coins/${coinID}/market_chart?vs_currency=usd&days=1`;
  let priceChartValuesFunction = []

  fetch(API_Call)
    .then(
      function (response) {
        return response.json();
      }
    )
    .then(
      function (data) {
         priceChartValuesFunction.push(data.prices)
      }
    )
    .catch(error => console.log(error))
    
   priceChartValuesFunction.map(x => {
    console.log(x)
   })
   
   console.log(priceChartValuesFunction)

  //var data = priceChartXValuesFunction //priceChartYValuesFunction

   /* var data = [
      [1220832000000, 22.56],
      [1220918400000, 21.67],
      [1221004800000, 21.66],
      [1221091200000, 21.81],
      [1221177600000, 21.28],
      [1221436800000, 20.05],
      [1221523200000, 19.98],
      [1221609600000, 18.26],
      [1221696000000, 19.16],
      [1221782400000, 20.13],
      [1222041600000, 18.72],
      [1222128000000, 18.12],
      [1222214400000, 18.39],
      [1222300800000, 18.85],
      [1222387200000, 18.32],
      [1222646400000, 15.04],
      [1222732800000, 16.24],
      [1222819200000, 15.59],
      [1222905600000, 14.3],
      [1222992000000, 13.87],
      [1223251200000, 14.02],
      [1223337600000, 12.74],
      [1223424000000, 12.83],
      [1223510400000, 12.68],
      [1223596800000, 13.8],
      [1223856000000, 15.75],
      [1223942400000, 14.87],
      [1224028800000, 13.99],
      [1224115200000, 14.56],
      [1224201600000, 13.91],
      [1224460800000, 14.06],
      [1224547200000, 13.07],
      [1224633600000, 13.84],
      [1224720000000, 14.03],
      [1224806400000, 13.77],
      [1225065600000, 13.16],
      [1225152000000, 14.27],
      [1225238400000, 14.94],
      [1225324800000, 15.86],
      [1225411200000, 15.37],
      [1225670400000, 15.28],
      [1225756800000, 15.86],
      [1225843200000, 14.76],
      [1225929600000, 14.16],
      [1226016000000, 14.03],
      [1226275200000, 13.7],
      [1226361600000, 13.54],
      [1226448000000, 12.87],
      [1226534400000, 13.78],
      [1226620800000, 12.89],
      [1226880000000, 12.59],
      [1226966400000, 12.84],
      [1227052800000, 12.33],
      [1227139200000, 11.5],
      [1227225600000, 11.8],
      [1227484800000, 13.28],
      [1227571200000, 12.97],
      [1227657600000, 13.57],
      [1227830400000, 13.24],
      [1228089600000, 12.7],
      [1228176000000, 13.21],
      [1228262400000, 13.7],
      [1228348800000, 13.06],
      [1228435200000, 13.43],
      [1228694400000, 14.25],
      [1228780800000, 14.29],
      [1228867200000, 14.03],
      [1228953600000, 13.57],
      [1229040000000, 14.04],
      [1229299200000, 13.54]
    ];
*/



  const options = {
    title: {
      text: 'My chart'
    },
    series: [{
      data: [1, 2, 3]
    }]
  }

  var config = {
    chart: {
      zoomType: 'x',
      backgroundColor: 'transparent',
    },
    title: {
      text: ''
    },
    // subtitle: {
    //   text: document.ontouchstart === undefined ?
    //     'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
    // },
    xAxis: {
      type: 'datetime',
      zoomEnabled: true
    },
    yAxis: {
      title: {
        text: 'Exchange rate',
      },
      visible: false
    },
    legend: {
      enabled: false
    },
    plotOptions: {
      area: {
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 1,
            y2: 1
          },
          stops: [
            [0, darkMode ? "#402782" : "#c7aefe"],
            [1, "transparent"]
          ]
        },
        marker: {
          radius: 5,
          fillColor: "#5a55d2",
          lineWidth: "5",
          lineColor: "transparent",
          enabledThreshold: "4"
        },
        lineWidth: 2,
        lineColor: "#5a55d2",
        states: {
          hover: {
            lineWidth: 2
          }
        },
        threshold: null
      }
    },

    series: [{
      type: 'area',
      name: 'USD to EUR',
      data: ''
    }]
  }

  return (
    <HighchartsReact
      highcharts={Highcharts}
      ref={chartRef}
      containerProps={{ style: { width: "100%", height: "100%" } }}
      options={config}
    // highcharts={Highcharts}
    />
  )

}

export default PriceChart;



// class PriceChart extends React.Component<any, priceChartType> {

//   constructor(props) {
//     super(props);
//     this.state = {
//       priceChartXValues: [],
//       priceChartYValues: [],

//     }
//   }

//   componentDidMount() {
//     this.fetchPrice();
//   }

//   fetchPrice() {
//     const pointerToThis = this;
//     let API_Call = `https://api.coingecko.com/api/v3/coins/${coinID}/market_chart?vs_currency=usd&days=1`;
//     let priceChartXValuesFunction = [];
//     let priceChartYValuesFunction = [];

//     fetch(API_Call)
//       .then(
//         function (response) {
//           return response.json();
//         }
//       )
//       .then(
//         function (data) {
//           for (var item in data.prices) {
//             priceChartXValuesFunction.push(formatTimeDateYear(data.prices[item][0]))
//             priceChartYValuesFunction.push(data.prices[item][1])
//             getTotalIndex = item
//           }

//           pointerToThis.setState({
//             priceChartXValues: priceChartXValuesFunction,
//             priceChartYValues: priceChartYValuesFunction,
//           })
//         }
//       )
//       .catch(error => console.log(error))
//   }

//   render() {
//     const coinData: any = this.props
//     const darkMode = this.props.darkMode
//     // return (
//     //   <div className="container" >
//     //     <div>
//     //       <h2>
//     //       <img src={coinData?.coinData?.image?.small} alt="" />
//     //       {coinData?.coinData?  coinData?.coinData?.symbol?.toUpperCase()  : null}
//     //       </h2>
//     //       <br />
//     //       <div className="icon">
//     //       <Link href="" as={coinData?.coinData?.links? coinData?.coinData?.links.homepage[0] : null}>
//     //           <a><FontAwesomeIcon icon={faFirefoxBrowser} size='2x' color={darkMode? "#fff" : "black"}  /></a>
//     //       </Link>
//     //       <Link href="" as={coinData?.coinData?.links?.repos_url? coinData?.coinData.links.repos_url?.github[0] : null}>
//     //           <a><FontAwesomeIcon icon={faGithub} size='2x' color={darkMode ? "#fff" : "black"}  /></a>
//     //       </Link>
//     //       <Link href="" as={coinData?.coinData?.links?.twitter_screen_name? `https://twitter.com/${coinData?.coinData.links.twitter_screen_name}` : null}>
//     //           <a><FontAwesomeIcon icon={faTwitter} size='2x' color={darkMode ? "#fff" : "black"}  /></a>
//     //       </Link>
//     //       <Link href="" as={coinData?.coinData?.links? coinData?.coinData.links?.chat_url[0] : null}>
//     //           <a><FontAwesomeIcon icon={faDiscord} size='2x' color={darkMode ? "#fff" : "black"} /></a>
//     //       </Link>
//     //       <Link href="" as={coinData?.coinData?.links?.telegram_channel_identifier? `https://t.me/${coinData?.coinData.links?.telegram_channel_identifier}` : null}>
//     //           <a><FontAwesomeIcon icon={faTelegram} size='2x' color={darkMode ? "#fff" : "black"} /></a>
//     //       </Link>
//     //       </div>
//     //       <p className="coin_price">${coinData?.coinData?.market_data?.current_price? coinData?.coinData?.market_data?.current_price?.usd : null}</p>
//     //     </div>
//     //    <Plot
//     //     data={[
//     //       {
//     //         x: this.state.priceChartXValues,
//     //         y: this.state.priceChartYValues,
//     //         type: 'scatter',
//     //         mode: 'lines+markers',
//     //         marker: {color: 'blue'},
//     //       },
//     //     ]}
//     //     layout={{
//     //       xaxis: {title: 'Time',
//     //       tickformat: '%',
//     //       //type: this.state.priceChartXValues,
//     //       tickvals: [this.state.priceChartXValues[0], this.state.priceChartXValues[Math.round(getTotalIndex/2)],  this.state.priceChartXValues.slice(-1)],
//     //       showline:true,
//     //     },
//     //       yaxis: {title: 'Price in USD'},
//     //       title: 'Price Chart',
//     //       autosize: true,
//     //   }}
//     //     useResizeHandler= {true}
//     //       style={{ width: "100%", height: "100%" }}
//     //       bgColor="red"
//     //   />
//     //    <style jsx>{`
//     //   .icon {
//     //     margin-left:200px;
//     //     margin-top: -50px;
//     //     font-size: 12px;
//     //   }
//     //   .coin_price {
//     //   margin-left:200px;
//     //   margin-top: 50px;
//     //   font-size:20px;
//     //   color: blue;
//     //   }
//     // `}</style>
//     //   </div>
//     // );
//     return (
//       <HighchartsReact
//         options={this.state.chartOptions}
//         highcharts={Highcharts}
//         constructorType={'mapChart'}
//         allowChartUpdate={true}
//         immutable={false}
//         updateArgs={[true, true, true]}
//         containerProps={{ className: 'chartContainer' }}
//       // callback={this.chartCallback}
//       />
//     )
//   }
// }