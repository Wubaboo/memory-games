import { useEffect, useState } from "react";
import MatchingGame from "./matchingGame";
import MatchingSettings from "./matchingSettings";

import "../../styles/matching.css";

export default function MatchingGameHome() {
  const [gridSize, setGridSize] = useState(12);
  const [startGame, setStartGame] = useState(false);
  const [showTimer, setShowTimer] = useState(false);

  function handleStartGame() {
    setStartGame(!startGame);

  }

  return (
    <div className="matching-game-container">
      <h1 style={{ margin: "1em 0em" }}>Matching Game</h1>
      {!startGame && (
        <MatchingSettings
          handleStartGame={handleStartGame}
          setGridSize={setGridSize}
          gridSize={gridSize}
          showTimer={showTimer}
          setShowTimer={setShowTimer}
        ></MatchingSettings>
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

function useTimer(endTime) {
  const [startTime, setStartTime] = useState(new Date());

  return endTime - startTime;
}