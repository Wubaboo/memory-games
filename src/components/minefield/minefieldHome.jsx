import { useState } from "react";
import GameSettings from "../gameSettings";
import MineFieldGame from "./minefieldGame";

import "../../styles/minefield.css";

export default function MinefieldHome() {
  const [gridSize, setGridSize] = useState(16);
  const [startGame, setStartGame] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  function handleStartGame() {
    setStartGame(!startGame);
  }

  const settings = [
    {
      type: "instructions",
      name: "Instructions",
      deets: { description: "Navigate to the goal while avoiding the bombs." },
    },
    {
      type: "slider",
      name: "Grid Size",
      deets: { value: gridSize, min: 20, max: 320, step: 30 },
      onChange: (e) => setGridSize(e.target.value),
    },
  ];

  return (
    <div className="minefield-container">
      <h1 style={{ margin: "1em 0em" }}>Minefield</h1>
      {!startGame ? (
        <GameSettings
          objs={settings}
          handleStart={handleStartGame}
          showTimer={showTimer}
          setShowTimer={setShowTimer}
        ></GameSettings>
      ) : (
        <MineFieldGame
          gridSize={gridSize}
          setStartGame={setStartGame}
          showTimer={showTimer}
        ></MineFieldGame>
      )}
    </div>
  );
}
