import React, { useEffect, useState } from 'react';
import {CircleProgress} from 'react-gradient-progress'

 
function OnlineVotingPowerChart(props) {
  
  const [percentage, setPercentage] = useState(0);
  useEffect(() => {
  setPercentage(props.percentageOfVotingPower)
  })
 
  return (
    <div className="app">
      <div style={{ width: 90, marginTop: -25, marginLeft: 90}}>
      <CircleProgress percentage={percentage} strokeWidth={8} width={100} primaryColor={['#3a428a','#d1d6ff']} />
      </div>
    </div>
  );
}
 
export default OnlineVotingPowerChart;