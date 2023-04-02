import { useEffect, useState } from "react";
import MatchingGame from "./matchingGame";
import MatchingSettings from "./matchingSettings";
import {
  getCells,
  shuffleArray,
  getDimensions,
  getRandomColor,
} from "../../utils/gridUtils";
import ICONS from "../../data/icons";
import "../../styles/matching.css";

export default function MatchingGameHome() {
  const [grid, setGrid] = useState([]);
  const [gridSize, setGridSize] = useState(4);
  const [dims, setDims] = useState([2, 2]);
  const [startGame, setStartGame] = useState(false);

  // Create a new `size` * `size` grid with pairs of icons filled in random cells
  function getNewGrid(size) {
    const [rows, cols] = getDimensions(size);
    setDims([rows, cols]);
    const shuffled = getCells(rows, cols);
    const icons = shuffleArray(ICONS);
    let newArr = new Array(rows).fill(0);
    for (let i = 0; i < rows; i++) {
      newArr[i] = new Array(cols).fill(0);
    }
    for (let i = 0; i < size; i += 2) {
      icons[Math.floor(i / 2)].color = getRandomColor();
      const [x, y] = shuffled[i];
      newArr[x][y] = icons[Math.floor(i / 2)];
      const [x2, y2] = shuffled[i + 1];
      newArr[x2][y2] = icons[Math.floor(i / 2)];
    }
    return newArr;
  }

  function updateGrid() {
    setGrid(getNewGrid(gridSize));
  }

  function handleStartGame() {
    updateGrid();
    setStartGame(!startGame);
  }

  useEffect(() => {
    updateGrid();
  }, [gridSize]);

  return (
    <div className="matching-game-container">
      <h1 style={{ margin: "1em 0em" }}>Matching Game</h1>
      {!startGame && (
        <MatchingSettings
          handleStartGame={handleStartGame}
          setGridSize={setGridSize}
          gridSize={gridSize}
        ></MatchingSettings>
      )}
      {startGame && (
        <MatchingGame
          grid={grid}
          gridSize={gridSize}
          setStartGame={setStartGame}
          dims={dims}
        ></MatchingGame>
      )}
    </div>
  );
}
