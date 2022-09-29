import React, { useEffect, useState } from 'react';
import {CircleProgress} from 'react-gradient-progress'

 
function ActiveValidatorsChart(props) {
   
  const [percentage, setPercentage] = useState(0);
   useEffect(() => {
   setPercentage(props.percentageOfActiveValidators)
   })

  return (
    <div className="app">
      <div style={{ width: 90, marginTop: -25, marginLeft: -160}}>
      <CircleProgress percentage={percentage} strokeWidth={8} width={100} primaryColor={['#3a428a','#d1d6ff']} />
      </div>
    </div>
  );
}
 
export default ActiveValidatorsChart;