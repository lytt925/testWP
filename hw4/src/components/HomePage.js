/****************************************************************************
  FileName      [ HomePage.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Home page.  ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import './css/HomePage.css';
import React, { useEffect, useState } from 'react';

const HomePage = ({ startGameOnClick, mineNumOnChange, boardSizeOnChange, mineNum, boardSize /* -- something more... -- */ }) => {
  const [showPanel, setShowPanel] = useState(false);      // A boolean variable. If true, the controlPanel will show.
  const [error, setError] = useState(false);              // A boolean variable. If true, means that the numbers of mines and the board size are invalid to build a game.

  // Advanced TODO: Implementation of Difficult AdjustmentSome functions may be added here!
  const showControlPanel = () => {
    if (!showPanel) {
      setShowPanel(true);
    }
    else {
      setShowPanel(false);
    }
  };

  useEffect(() => {
    if (boardSize * boardSize < mineNum) {
      setError(true);
    } else {
      setError(false);
    }
  }, [boardSize, mineNum])


  return (
    <div className='HomeWrapper'>
      <p className='title'>MineSweeper</p>
      {/* Basic TODO:  Implemen start button */}
      <button className='btn' onClick={error ? null : startGameOnClick}>Start Game</button>
      {/* Advanced TODO: Implementation of Difficult Adjustment
                Useful Hint: <input type = 'range' min = '...' max = '...' defaultValue = '...'> 
                Useful Hint: Error color: '#880000', default text color: '#0f0f4b', invisible color: 'transparent' 
                Reminder: The defaultValue of 'mineNum' is 10, and the defaultValue of 'boardSize' is 8. */}
      <div className='controlContainer'>
        <button className='btn' onClick={showControlPanel}>Difficulty Adjustment</button>
        <div className='controlWrapper' style={{ display: showPanel ? '' : 'None', color: error ? '#880000' : '' }}>
          <div className='error' style={{ opacity: error ? 1 : 0 }}>ERROR: Mines Number and Board Size are invalid!</div>
          <div className='controlPanel'>
            <div className='controlCol'>
              <p className='controlTitle'>Mines Number</p>
              <input type='range' min="5" max="30" defaultValue="10" onChange={mineNumOnChange} />
              <p className='controlNum' style={{ color: error ? '#880000' : '' }}>{mineNum}</p>
            </div>
            <div className='controlCol'>
              <p className='controlTitle'>Board Size (nxn)</p>
              <input type='range' min="3" max="18" defaultValue="8" onChange={boardSizeOnChange} />
              <p className='controlNum' style={{ color: error ? '#880000' : '' }}>{boardSize}</p>
            </div>
          </div>
        </div>
      </div>
    </div >
  );

}
export default HomePage;   