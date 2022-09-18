import React from "react";
import Plot from 'react-plotly.js';
import {Chart} from 'react-chartjs-2';



//interface priceChartType {
  //priceChartXValues: number[],
 // priceChartYValues: number[]
//}

class PriceChart extends React.Component {
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
        let API_Call = `https://api.coingecko.com/api/v3/coins/cosmos/market_chart?vs_currency=usd&days=30
        `;
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
                //console.log(data.prices)

               for (var item in data.prices) {
                 priceChartXValuesFunction.push(data.prices[item][0])
                 priceChartYValuesFunction.push(data.prices[item][1])
               } 
               
              pointerToThis.setState({
                priceChartXValues: priceChartXValuesFunction,
                priceChartYValues: priceChartYValuesFunction
              })
            }
          ) 
    }



    render() {
      return (
        <Plot
          data={[
            {
              x: [1, 2, 3],
              y: [2, 6, 3],
              type: 'scatter',
              mode: 'lines+markers',
              marker: {color: 'red'},
            },
            {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
          ]}
          layout={{width: 920, height: 400, title: 'A Fancy Plot'}}
        
        />
      );
    }
}

export default PriceChart;