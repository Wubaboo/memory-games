import { useState } from "react";
import SequenceGame from "./sequenceGame";
import GameSettings from "../gameSettings";
import * as constants from "./sequenceConstants";

import "../../styles/matching.css";

export default function SequenceGameHome() {
  const [timeLimit, setTimeLimit] = useState(constants.MIN_TIME_LIMIT);
  const [startGame, setStartGame] = useState(false);
  const [showTimer, setShowTimer] = useState(false);

  function handleStartGame() {
    setStartGame(!startGame);
  }

  const settings = [
    {
      type: "instructions",
      name: "Instructions",
      deets: {
        description:
          "Remember as many digits as possible in the allotted time.",
      },
    },
    {
      type: "slider",
      name: "Time (s)",
      deets: {
        value: timeLimit,
        min: constants.MIN_TIME_LIMIT,
        max: 120,
        step: 15,
      },
      onChange: (e) => setTimeLimit(e.target.value),
    },
  ];

  return (
    <div className="matching-game-container">
      <h1 style={{ margin: "1em 0em" }}>Sequences</h1>
      {startGame ? (
        <SequenceGame
          timeLimit={timeLimit}
          showTimer={showTimer}
          handleNewGame={() => {
            setStartGame(!startGame);
          }}
        ></SequenceGame>
      ) : (
        <GameSettings
          objs={settings}
          handleStart={handleStartGame}
          showTimer={showTimer}
          setShowTimer={setShowTimer}
        ></GameSettings>
      )}
    </div>
  );
}
