/****************************************************************************
  FileName      [ Dashnoard.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Dashboard. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import React, { useEffect, useState } from 'react';
import "./css/Dashboard.css"


export default function Dashboard({ remainFlagNum, gameOver }) {
  let [time, setTime] = useState(0);
  let [sTime, setSTime] = useState(0);
  let timeIntervalId;
  // Advanced TODO: Implement the timer on the Dashboard
  {/* Useful Hint: Try to understand the difference between time and sTime. */ }

  useEffect(() => {
    timeIntervalId = setTimeout(() => { setTime(time + 1); }, 1000);
    return () => {
      clearTimeout(timeIntervalId);
    };
  }, [time]);

  useEffect(() => {
    setSTime(time);
    if (gameOver) { clearTimeout(timeIntervalId); } else { setTime(0) }
  }, [gameOver]);

  return (
    <div className="dashBoard" >
      <div id='dashBoard_col1' >
        <div className='dashBoard_col'>
          <p className='icon'>🚩</p>
          {remainFlagNum}
        </div>
      </div>
      <div id='dashBoard_col2' >
        <div className='dashBoard_col'>
          <p className='icon'>⏰</p>
          {gameOver ? sTime : time}
        </div>
      </div>
    </div>
  );
}
