import { useState } from "react";
import "./App.css";

function Square({ value, onSquareClick ,xIsNext}) {
  function handleClick(event) {
    event.preventDefault();
    onSquareClick();
  }

   return (
    <button className={`square ${xIsNext ? 'square-x' : 'square-o'}`} onClick={handleClick}>
      {value}
    </button>
  );

}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function restartGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
  

    


    <div className="board-container">
      <div class="container">
        <div class="row">
          <div class="col-md-12 text-center">
            <h3 class="animate-charcter"> XO</h3>
          </div>
        </div>
      </div>
      <div className="status">
        <h4> {status} </h4></div>
      <div className="board">
        <div className="board-row">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} xIsNext={xIsNext} />

          <Square value={squares[1]} onSquareClick={() => handleClick(1)} xIsNext={xIsNext} />

          <Square value={squares[2]} onSquareClick={() => handleClick(2)} xIsNext={xIsNext} />

        </div>
        <div className="board-row">

          <Square value={squares[3]} onSquareClick={() => handleClick(3)} xIsNext={xIsNext} /> 
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} xIsNext={xIsNext} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} xIsNext={xIsNext} />
        </div>
        <div className="board-row">

          <Square value={squares[6]} onSquareClick={() => handleClick(6)} xIsNext={xIsNext} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} xIsNext={xIsNext} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} xIsNext={xIsNext} />
        </div>
      </div>
      <button className="restart-button" onClick={restartGame}>
        Restart
      </button>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}
