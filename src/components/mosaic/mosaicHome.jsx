import { useState } from "react";
import GameSettings from "../gameSettings";
import MosaicGame from "./mosaicGame";

import "../../styles/mosaic.css";

export default function MosaicHome() {
  const [gridSize, setGridSize] = useState(12);
  const [colors, setColors] = useState(1);
  const [startGame, setStartGame] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  function handleStartGame() {
    setStartGame(!startGame);
  }

  const settings = [
    {
      type: "instructions",
      name: "Instructions",
      deets: { description: "Recreate the mosaic." },
    },
    {
      type: "slider",
      name: "Number of Colors",
      deets: { value: colors, min: 1, max: 8, step: 1 },
      onChange: (e) => setColors(e.target.value),
    },
    {
      type: "slider",
      name: "Grid Size",
      deets: { value: gridSize, min: 12, max: 40, step: 4 },
      onChange: (e) => setGridSize(e.target.value),
    },
  ];

  return (
    <div className="mosaic-container">
      <h1 style={{ margin: "1em 0em" }}>Mosaic</h1>
      {!startGame && (
        <GameSettings
          objs={settings}
          handleStart={handleStartGame}
          showTimer={showTimer}
          setShowTimer={setShowTimer}
        ></GameSettings>
      )}
      {startGame && (
        <MosaicGame
          colors={colors}
          gridSize={gridSize}
          setStartGame={setStartGame}
          showTimer={showTimer}
        ></MosaicGame>
      )}
    </div>
  );
}
