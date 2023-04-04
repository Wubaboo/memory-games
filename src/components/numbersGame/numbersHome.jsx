import { useEffect, useState } from "react";
import NumberGame from "./numberGame";
import NumberSettings from "./numberSettings";
import { getCells } from "../../utils/gridUtils";
import "../../styles/numbers.css";

export default function NumberGameHome() {
  const [numbers, setNumbers] = useState([]);
  const [difficulty, setDifficulty] = useState(5);
  const [gridSize, setGridSize] = useState(5);
  const [startGame, setStartGame] = useState(false);
  const [showTimer, setShowTimer] = useState(false);

  // Create a new `size` * `size` grid with `difficulty` numbers filled in random cells
  function getNewGrid(size) {
    const shuffled = getCells(size, size);
    let newArr = new Array(size).fill(0);
    for (let i = 0; i < size; i++) {
      newArr[i] = new Array(size).fill(0);
    }
    for (let i = 0; i < difficulty; i++) {
      const [x, y] = shuffled[i];
      newArr[x][y] = i + 1;
    }
    return newArr;
  }

  function updateGrid() {
    setNumbers(getNewGrid(gridSize));
  }

  function handleStartGame() {
    updateGrid();
    setStartGame(!startGame);
  }

  useEffect(() => {
    updateGrid();
  }, [gridSize, difficulty]);

  return (
    <div className="number-game-container">
      <h1 style={{ margin: "1em 0em" }}>Number Game</h1>
      {!startGame && (
        <NumberSettings
          handleStartGame={handleStartGame}
          setDifficulty={setDifficulty}
          setGridSize={setGridSize}
          gridSize={gridSize}
          difficulty={difficulty}
          showTimer={showTimer}
          setShowTimer={setShowTimer}
        ></NumberSettings>
      )}
    
      {startGame && (
        <NumberGame
          grid={numbers}
          gridSize={gridSize}
          difficulty={difficulty}
          setStartGame={setStartGame}
          showTimer={showTimer}
        ></NumberGame>
      )}
    </div>
  );
}
