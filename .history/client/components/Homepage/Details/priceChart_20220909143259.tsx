import React, { useRef } from "react";
import { priceChartType } from "./types";
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { useAppSelector } from "../../../lib/hooks";


const PriceChart = (props) => {
  const darkMode = useAppSelector(state => state.general.darkMode)
  const chartRef = useRef()
  
  const getPriceData = props
  
  let y = []
  let x = []
  for(const i in getPriceData) {
    x.push(getPriceData[i][0])
    y.push(getPriceData[i][1])
  }

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
      zoomEnabled: true,
      categories: x,
      tickInterval: 60, 
      labels: {
        formatter: function() {
          return Highcharts.dateFormat('%Y-%m-%d %I:%M:%S %p', this.value);
        },
      },
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
      name: 'USD',
      data: y,
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