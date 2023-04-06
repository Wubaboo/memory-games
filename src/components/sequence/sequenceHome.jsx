import { useEffect, useState } from "react";
import SequenceGame from "./sequenceGame";
import SequenceSettings from "./sequenceSettings";
import GameSettings from "../gameSettings";

import "../../styles/matching.css";

const MIN_TIME_LIMIT = 15;
const MAX_DIGITS_PER_SECOND = 3;

export default function SeqeunceGameHome() {
  const [timeLimit, setTimeLimit] = useState(MIN_TIME_LIMIT);
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
        min: MIN_TIME_LIMIT,
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
          showTimer={false}
          onNewGame={() => {
            setStartGame(!startGame);
          }}
          theSequence={Array.from(
            { length: timeLimit * MAX_DIGITS_PER_SECOND },
            () => Math.floor(Math.random() * 10)
          )}
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
