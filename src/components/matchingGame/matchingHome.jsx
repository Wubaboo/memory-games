import { useEffect, useState } from "react";
// import NumberGame from "./numberGame";
import MatchingSettings from "./matchingSettings";
import { getCells, shuffleArray } from "../../utils/gridUtils";
import ICONS from "../../data/icons";
import "../../styles/matching.css";

export default function NumberGameHome() {
  const [grid, setGrid] = useState([]);
  const [gridSize, setGridSize] = useState(4);
  const [startGame, setStartGame] = useState(false);

  // Create a new `size` * `size` grid with pairs of icons filled in random cells
  function getNewGrid(size) {
    const shuffled = getCells(size);
    const icons = shuffleArray(ICONS);
    let newArr = new Array(size).fill(0);
    for (let i = 0; i < size; i++) {
      newArr[i] = new Array(size).fill(0);
    }
    for (let i = 0; i < size * size; i += 2) {
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
      {/* {startGame && (
        <NumberGame
          grid={numbers}
          gridSize={gridSize}
          setStartGame={setStartGame}
        ></NumberGame>
      )} */}
    </div>
  );
}
