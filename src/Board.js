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

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard);
  
  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    // let initialBoard = [];
    // TODO: DONE create array-of-arrays of true/false values
    const initialBoard = Array.from({length: nrows}, () => 
      Array.from({length: ncols}, () => 
      Math.random() < chanceLightStartsOn));  // instead of checking if it's greater than chanceLightStartsOn

    return initialBoard;
  }

  function hasWon() {
    // TODO: DONE check the board in state to determine whether the player has won.
    return board.every(row=>row.every(cell=>!cell));  // use every operator for shorter syntax
    // for (let row of board){
    //   if (row.includes(true)) return false;  //.every to check if all is false
    // }
    // return true;
  }
  const won = hasWon();


  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      let newBoard = oldBoard.map(row=>row.map(cell=>cell));

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y,x, newBoard);
      flipCell(y-1,x, newBoard);
      flipCell(y+1,x, newBoard);
      flipCell(y,x+1, newBoard);
      flipCell(y,x-1, newBoard);
     
      // TODO: return the copy
      return newBoard;
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  // make table board

  if (won) return <p> "You won!"</p> ;
  return (
    <table>
      {board.map((row,y)=>{
          return (
          <tr>
            {row.map((col,x)=>{
              return <Cell isLit={col} flipCellsAroundMe={flipCellsAround.bind(null, `${y}-${x}`)}/>
            })}
          </tr>
        )}
      )}
  </table>
  );
}

export default Board;
