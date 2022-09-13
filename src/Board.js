import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows=3, ncols=3, chanceLightStartsOn=0.5 }) {
  const [board, setBoard] = useState(createBoard(nrows, ncols, chanceLightStartsOn));

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard(nrows=3, ncols=3, chanceLightStartsOn=0.5) {
    let initialBoard = [];
    for (let i=0; i<nrows; i++) {
      const row = [];
      for (let j=0; j<ncols; j++) {
        row.push(Math.random() < chanceLightStartsOn)
      }
      initialBoard.push(row);
    }
    // TODO: create array-of-arrays of true/false values
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    for (let i=0; i<nrows; i++) {
      for (let j=0; j<ncols; j++) {
        if (board[i][j]) return false;
      }
    }
    return true;
  }

  function flipCellsAround(coord) {
    console.log("flip")
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const boardCopy = [...oldBoard];

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, boardCopy);
      flipCell(y-1, x, boardCopy);
      flipCell(y+1, x, boardCopy);
      flipCell(y, x-1, boardCopy);
      flipCell(y, x+1, boardCopy);

      // TODO: return the copy
      console.log(boardCopy)
      return boardCopy
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  if (hasWon()) {
    return <div><p className="win">You Won!</p></div>
  }


  // make table board
  let tblBoard = [];
  for (let y=0; y<nrows; y++) {
    let trow = []
    for (let x=0; x<ncols; x++) {
      const coord = `${y}-${x}`
      trow.push(<Cell 
          key={coord}
          isLit={board[y][x]}
          flipCellsAroundMe={() => flipCellsAround(coord)}
        />)
    }
    tblBoard.push(<tr key={y}>{trow}</tr>)
  }

  return (
    <>
      <table className="Board">
        <tbody>{tblBoard}</tbody>
      </table>
    </>
  )
}

export default Board;
