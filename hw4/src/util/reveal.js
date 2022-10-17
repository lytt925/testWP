/****************************************************************************
  FileName      [ reveal.js ]
  PackageName   [ src/util ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file states the reaction when left clicking a cell. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

export const revealed = (board, x, y, newNonMinesCount) => {
  board[x][y].revealed = true;
  newNonMinesCount--;


  // Advanced TODO: reveal cells in a more intellectual way.
  // Useful Hint: If the cell is already revealed, do nothing.
  //              If the value of the cell is not 0, only show the cell value.
  //              If the value of the cell is 0, we should try to find the value of adjacent cells until the value we found is not 0.
  //              The input variables 'newNonMinesCount' and 'board' may be changed in this function.
  // const checked = board.slice(0, board.length);

  const revealAdj = ([x, y]) => {
    if (x < 0 || x >= board.length || y < 0 || y >= board.length || board[x][y].revealed || board[x][y].flagged || board[x][y].value === '💣') {
      return;
    } else if (board[x][y].value !== 0) {
      if (!board[x][y].revealed) {
        board[x][y].revealed = true;
        newNonMinesCount--;
      }
      return;
    } else if (board[x][y].value === 0) {
      if (!board[x][y].revealed) {
        board[x][y].revealed = true;
        newNonMinesCount--;
      }
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          revealAdj([x + i, y + j]);
        }
      }
    }
  }

  if (board[x][y].value === 0) {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        revealAdj([x + i, y + j]);
      }
    }
  }


  return { board, newNonMinesCount };
};
