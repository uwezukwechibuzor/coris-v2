import React from "react";
import Link from 'next/link';
import Plot from 'react-plotly.js';
import { formatTimeDateYear} from "../../../lib/Util/format";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGithub,
  faTwitter,
  faDiscord,
  faTelegram,
  faFirefoxBrowser
} from "@fortawesome/free-brands-svg-icons";
import { priceChartType } from "./types";

let getTotalIndex;
let coinID = 'cosmos'

class PriceChart extends React.Component<{}, priceChartType> {
    constructor(props) {
        super(props);
        this.state = {
            priceChartXValues: [],
            priceChartYValues: [],
        }
    }

    componentDidMount() {
        this.fetchPrice();
    }

    fetchPrice() {
        const pointerToThis = this;
        let API_Call = `https://api.coingecko.com/api/v3/coins/${coinID}/market_chart?vs_currency=usd&days=1`;
        let priceChartXValuesFunction = [];
        let priceChartYValuesFunction = [];
        
        fetch(API_Call)
          .then(
            function(response) {
                return response.json();
            }
          )
          .then(
            function(data) {
               for (var item in data.prices) {
                 priceChartXValuesFunction.push(formatTimeDateYear(data.prices[item][0]))
                 priceChartYValuesFunction.push(data.prices[item][1])
                 getTotalIndex = item
               } 
               
              pointerToThis.setState({
                priceChartXValues: priceChartXValuesFunction,
                priceChartYValues: priceChartYValuesFunction,
              })
            }
          )
          .catch(error => console.log(error)) 
    }

    render() {
      const coinData: any = this.props
     
      return (
        <div className="container" >
          <div>
            <h2>
            <img src={coinData?.coinData?.image?.small} alt="" />
            {coinData?.coinData?  coinData?.coinData?.symbol?.toUpperCase()  : null}
            </h2>
            <br />
            <div className="icon">
            <Link href="" as={coinData?.coinData?.links? coinData?.coinData?.links.homepage[0] : null}>
              <a><FontAwesomeIcon icon={ faFirefoxBrowser} size='2x' color="black"  /></a>
            </Link> 
            <Link href="" as={coinData?.coinData?.links?.repos_url? coinData?.coinData.links.repos_url?.github[0] : null}>
              <a><FontAwesomeIcon icon={ faGithub} size='2x' color="black"  /></a>
            </Link>
            <Link href="" as={coinData?.coinData?.links?.twitter_screen_name? `https://twitter.com/${coinData?.coinData.links.twitter_screen_name}` : null}>
              <a><FontAwesomeIcon icon={ faTwitter} size='2x' color="black"  /></a>
            </Link>
            <Link href="" as={coinData?.coinData?.links? coinData?.coinData.links?.chat_url[0] : null}>
              <a><FontAwesomeIcon icon={ faDiscord} size='2x' color="black" /></a>
            </Link>
            <Link href="" as={coinData?.coinData?.links?.telegram_channel_identifier? `https://t.me/${coinData?.coinData.links?.telegram_channel_identifier}` : null}>
              <a><FontAwesomeIcon icon={ faTelegram} size='2x' color="black" /></a>
            </Link> 
            </div>
            <p className="coin_price">${coinData?.coinData?.market_data?.current_price? coinData?.coinData?.market_data?.current_price?.usd : null}</p>
          </div>
         <Plot
          data={[
            {
              x: this.state.priceChartXValues,
              y: this.state.priceChartYValues,
              type: 'scatter',
              mode: 'lines+markers',
              marker: {color: 'blue'},
            },
          ]}
          layout={{ 
            xaxis: {title: 'Time',
            tickformat: '%',
            //type: this.state.priceChartXValues,
            tickvals: [this.state.priceChartXValues[0], this.state.priceChartXValues[Math.round(getTotalIndex/2)],  this.state.priceChartXValues.slice(-1)],
            showline:true,
          },
            yaxis: {title: 'Price in USD'},
            title: 'Price Chart',
            autosize: true,
        }}
          useResizeHandler= {true}
          style ={{width: "100%", height: "100%"}}
        />
         <style jsx>{`
        .icon {
          margin-left:200px;
          margin-top: -50px;
          font-size: 12px;
        }
        .coin_price {
        margin-left:200px;
        margin-top: 50px;
        font-size:20px;
        color: blue;
        }
      `}</style>
        </div>
      );
    }
}

export default PriceChart;