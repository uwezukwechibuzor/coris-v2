import React from 'react';
import {Pie} from 'react-chartjs-2';

export default class PoolChart extends React.Component {
  render() {
  const tokens = this.props
  //console.log(tokens)
  const state = {
    labels: [],
    datasets: [
      {
        label: 'Pool',
        backgroundColor: [
          '#3a428a',
          '#d1d6ff'
        ],
        data: [tokens.bondedTokens, tokens.notBondedTokens]
      }
    ]
  }
    return (
      <div className='pie'>
        <Pie
          data={state}
          options={{
            title:{
              display:true,
              text:'Pool',
              fontSize:20
            },
            legend:{
              display:true,
              position:'left',
              align: 'start'
            },
            responsive: true
          }}
        />
          <style jsx>{`
          .pie {
             width: 110px
             margin-left: 100px
           }
           @media (max-width: 768px) {
            .pie {
              width: 70px;
             margin-left: -2100px

            }
          }  
      
      `}</style>
      </div>
      
    );
  }
}