import { useEffect, useState } from "react";
import NumberGame from "./numberGame";
import { getCells } from "../../utils/gridUtils";
import GameSettings from "../gameSettings";
import "../../styles/numbers.css";
import {
  useWindowDimensions,
  MOBILE_WIDTH,
} from "../../utils/useWindowDimensions";

export default function NumberGameHome() {
  const { width, height } = useWindowDimensions();
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

  function handleGridSize(e) {
    if (difficulty > e.target.value * e.target.value) {
      setDifficulty(5);
    }
    setGridSize(e.target.value);
  }

  const settings = [
    {
      type: "instructions",
      name: "Instructions",
      deets: {
        description:
          "Remember the numbers and their positions. Click on the boxes in increasing order.",
      },
    },
    {
      type: "slider",
      name: `Difficulty` + (width <= MOBILE_WIDTH ? `: ${difficulty}` : ''),
      deets: {
        value: difficulty,
        min: 3,
        max: Math.min(gridSize * gridSize, 25),
        step: width <= MOBILE_WIDTH ? 2 : 1,
      },
      onChange: (e) => setDifficulty(e.target.value),
    },
    {
      type: "slider",
      name: "Grid Size",
      deets: { value: gridSize, min: 3, max: 10, step: 1 },
      onChange: handleGridSize,
    },
  ];

  return (
    <div className="number-game-container">
      <h1 style={{ margin: "1em 0em" }}>Numbers</h1>
      {!startGame && (
        <GameSettings
          objs={settings}
          handleStart={handleStartGame}
          showTimer={showTimer}
          setShowTimer={setShowTimer}
        ></GameSettings>
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
