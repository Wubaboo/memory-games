import { useEffect, useState } from "react";
import NumberGame from "./numberGame";
import NumberSettings from "./numberSettings";
import "./numbers.css";

export default function NumberGameHome() {
  const [numbers, setNumbers] = useState([]);
  const [difficulty, setDifficulty] = useState(5);
  const [gridSize, setGridSize] = useState(5);
  const [playing, setPlaying] = useState(false);

  // Create a new grid
  function getNewGrid() {
    const shuffled = getCells(gridSize);
    let newArr = new Array(gridSize).fill(0);
    for (let i = 0; i < gridSize; i++) {
      newArr[i] = new Array(gridSize).fill(0);
    }
    for (let i = 0; i < difficulty; i++) {
      const [x, y] = shuffled[i];
      newArr[x][y] = i + 1;
    }
    return newArr;
  }

  useEffect(() => {
    setNumbers(getNewGrid());
  }, [gridSize, difficulty]);

  return (
    <div className="number-game-container">
      <NumberSettings
        setDifficulty={setDifficulty}
        setGridSize={setGridSize}
        gridSize={gridSize}
        setPlaying={setPlaying}
      ></NumberSettings>
      <NumberGame grid={numbers} gridSize={gridSize}></NumberGame>
    </div>
  );
}

// create an array of cell coordinates and shuffle the order
function getCells(size) {
  const cells = [];
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      cells.push([i, j]);
    }
  }
  // Durstenfeld Shuffle https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  for (let i = cells.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = cells[i];
    cells[i] = cells[j];
    cells[j] = temp;
  }
  return cells;
}
