/****************************************************************************
  FileName      [ Board.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Board. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import './css/Board.css'
import Cell from './Cell';
import Modal from './Modal';
import Dashboard from './Dashboard';
import { revealed } from '../util/reveal';
import createBoard from '../util/createBoard';
import React, { useEffect, useState } from 'react';


const Board = ({ boardSize, mineNum, backToHome }) => {
    const [board, setBoard] = useState([]);                     // An 2-dimentional array. It is used to store the board.
    const [nonMineCount, setNonMineCount] = useState(0);        // An integer variable to store the number of cells whose value are not '💣'.
    const [mineLocations, setMineLocations] = useState([]);     // An array to store all the coordinate of '💣'.
    const [gameOver, setGameOver] = useState(false);            // A boolean variable. If true, means the game is over.
    const [remainFlagNum, setRemainFlagNum] = useState(0);      // An integer variable to store the number of remain flags.
    const [win, setWin] = useState(false);                      // A boolean variable. If true, means that you win the game.

    useEffect(() => {
        // Calling the function
        freshBoard();
    }, []);

    // Creating a board
    const freshBoard = () => {
        const newBoard = createBoard(boardSize, mineNum);
        // Basic TODO: Use `newBoard` created above to set the `Board`.
        // Hint: Read the definition of those Hook useState functions and make good use of them.
        setBoard(newBoard.board);
        setMineLocations(newBoard.mineLocations);
        setNonMineCount(boardSize ** 2 - mineNum);
        setRemainFlagNum(10);
    }

    const restartGame = () => {
        freshBoard();
        setGameOver(false);
        setWin(false);
    }

    // On Right Click / Flag Cell
    const updateFlag = (e, x, y) => {
        // To not have a dropdown on right click
        e.preventDefault();
        // Deep copy of a state
        let newBoard = JSON.parse(JSON.stringify(board));
        let newFlagNum = remainFlagNum;
        console.log('mine', board);

        if (!newBoard[x][y].revealed && !gameOver && !newBoard[x][y].flagged && newFlagNum > 0) {
            newBoard[x][y].flagged = true;
            newFlagNum--;
        } else if (!newBoard[x][y].revealed && !gameOver && newBoard[x][y].flagged) {
            newBoard[x][y].flagged = false;
            newFlagNum++;
        }

        setBoard(newBoard);
        setRemainFlagNum(newFlagNum);
        // Basic TODO: Right Click to add a flag on board[x][y]
        // Remember to check if board[x][y] is able to add a flag (remainFlagNum, board[x][y].revealed)
        // Update board and remainFlagNum in the end

    };

    const revealCell = (x, y) => {
        if (board[x][y].revealed || gameOver || board[x][y].flagged) return;
        let newBoard = JSON.parse(JSON.stringify(board));
        let newReveal = revealed(board, x, y, nonMineCount)
        setBoard(newReveal.board)
        if (board[x][y].value === '💣') {
            console.log('lose')
            setWin(false);
            setGameOver(true);
        } else {
            setNonMineCount(newReveal.newNonMinesCount);
            console.log(nonMineCount)
            console.log(newReveal.newNonMinesCount)
        }
        if (newReveal.newNonMinesCount === 0) {
            console.log('win')
            setWin(true);
            setGameOver(true);
        }
        // console.log(nonMineCount)
        // Basic TODO: Complete the conditions of revealCell (Refer to reveal.js)
        // Hint: If `Hit the mine`, check ...?
        //       Else if `Reveal the number cell`, check ...?
        // Reminder: Also remember to handle the condition that after you reveal this cell then you win the game.

    };
    return (
        <>
            {/* Advanced TODO: Implement Modal based on the state of `gameOver` */}
            {/* Basic TODO: Implement Board 
                Useful Hint: The board is composed of BOARDSIZE*BOARDSIZE of Cell (2-dimention). So, nested 'map' is needed to implement the board.
                Reminder: Remember to use the component <Cell> and <Dashboard>. See Cell.js and Dashboard.js for detailed information. */}
            <div className='boardPage'>
                <div className='boardWrapper' >
                    <div className='boardContainer'>
                        <Dashboard remainFlagNum={remainFlagNum} gameOver={gameOver} />
                        {board.map(row =>
                            <div id={'row' + board.indexOf(row)} style={{ display: 'flex' }} key={board.indexOf(row).toString()}>
                                {row.map(cell => <Cell rowIdx={board.indexOf(row)} colIdx={row.indexOf(cell)} detail={cell} updateFlag={updateFlag} revealCell={revealCell} key={row.indexOf(cell).toString()} />)}
                            </div>)}
                    </div>
                </div>
            </div >
            {gameOver ? <Modal restartGame={restartGame} backToHome={backToHome} win={win} /> : <div></div>}
        </>
    );

}

export default Board