import { useState } from "react";
import MatchingGame from "./matchingGame";
import GameSettings from "../gameSettings";

import "../../styles/matching.css";

export default function MatchingGameHome() {
  const [gridSize, setGridSize] = useState(12);
  const [startGame, setStartGame] = useState(false);
  const [showTimer, setShowTimer] = useState(false);

  function handleStartGame() {
    setStartGame(!startGame);
  }
  const settings = [
    {
      type: "instructions",
      name: "Instructions",
      deets: { description: "Remember and match the pairs of images." },
    },
    {
      type: "slider",
      name: "Grid Size",
      deets: { value: gridSize, min: 12, max: 40, step: 4 },
      onChange: (e) => setGridSize(e.target.value),
    },
  ];
  return (
    <div className="matching-game-container">
      <h1 style={{ margin: "1em 0em" }}>Matching</h1>
      {!startGame && (
        <GameSettings
          objs={settings}
          handleStart={handleStartGame}
          showTimer={showTimer}
          setShowTimer={setShowTimer}
        ></GameSettings>
      )}
      {startGame && (
        <MatchingGame
          gridSize={gridSize}
          setStartGame={setStartGame}
          showTimer={showTimer}
        ></MatchingGame>
      )}
    </div>
  );
}
