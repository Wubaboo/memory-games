import { useState } from "react";
import GameSettings from "../gameSettings";
import SetsGame from "./setsGame";

import "../../styles/sets.css";

export default function SetsHome() {
  const [deckCount, setDeckCount] = useState(1);
  const [startGame, setStartGame] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  function handleStartGame() {
    setStartGame(!startGame);
  }

  const settings = [
    {
      type: "instructions",
      name: "Instructions",
      deets: { description: "Remember which objects have been seen." },
    },
    {
      type: "slider",
      name: "Deck of Cards",
      deets: { value: deckCount, min: 0, max: 5, step: 1 },
      onChange: (e) => setDeckCount(e.target.value),
    },
    {
      type: "slider",
      name: "Number of Words",
      deets: { value: deckCount, min: 2, max: 4, step: 1 },
      onChange: (e) => setDeckCount(e.target.value),
    },
    {
      type: "slider",
      name: "Numbers",
      deets: { value: deckCount, min: 2, max: 4, step: 1 },
      onChange: (e) => setDeckCount(e.target.value),
    },
    {
      type: "slider",
      name: "Number of Colours",
      deets: { value: deckCount, min: 2, max: 4, step: 1 },
      onChange: (e) => setDeckCount(e.target.value),
    },
  ];

  return (
    <div className="sets-container">
      <h1 style={{ margin: "1em 0em" }}>Sets</h1>
      {!startGame ? (
        <GameSettings
          objs={settings}
          handleStart={handleStartGame}
          showTimer={showTimer}
          setShowTimer={setShowTimer}
        ></GameSettings>
      ) : (
        <SetsGame
          deckCount={deckCount}
          setStartGame={setStartGame}
          showTimer={showTimer}
        ></SetsGame>
      )}
    </div>
  );
}
