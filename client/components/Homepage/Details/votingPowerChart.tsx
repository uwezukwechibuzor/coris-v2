import React, { useEffect, useState } from 'react';
import {CircleProgress} from 'react-gradient-progress'

 
function OnlineVotingPowerChart() {
  const [percentage, setPercentage] = useState(0);
 
  useEffect(() => {
        setPercentage(percentage+1);
  }, [percentage]);
 
  return (
    <div className="app">
      <div style={{ width: 90, marginLeft: 40, marginTop: -25}}>
      <CircleProgress percentage={75} strokeWidth={8} width={100} primaryColor={['#3a428a','#3a428a']} />
      </div>
    </div>
  );
}
 
export default OnlineVotingPowerChart;