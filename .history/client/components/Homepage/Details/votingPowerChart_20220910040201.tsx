import React, { useEffect, useState } from 'react';
import {CircleProgress} from 'react-gradient-progress'
import { useAppSelector } from '../../../lib/hooks';

 
function OnlineVotingPowerChart(props) {
  const darkMode = useAppSelector(state => state.general.darkMode)

  const [percentage, setPercentage] = useState(0);
  useEffect(() => {
  setPercentage(props.percentageOfVotingPower)
  })
 
  return (
    <div className="app">
      <div style={{ width: 90, marginTop: -25, marginLeft: 90}}>
      <CircleProgress percentage={percentage} strokeWidth={8} width={100} } />
      </div>
    </div>
  );
}
 
export default OnlineVotingPowerChart;