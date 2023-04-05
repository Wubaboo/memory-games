import { useState } from "react";
import NumberCell from "./numberCell";

import Timer from "../timer";

export default function NumberGame(props) {
  const [nextValue, setNextValue] = useState(1);
  const [playing, setPlaying] = useState(false);
  const [win, setWin] = useState(undefined);
  const { gridSize, grid, difficulty, setStartGame, showTimer } = props;

  const gameStyling = {
    gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
    display: "grid",
    gridGap: "calc(min(2vw, 2rem))",
    width: "90%",
  };

  function handleNewGame() {
    setStartGame(false);
    setWin(undefined);
    setPlaying(false);
    setNextValue(1);
  }

  return (
    <div className="number-game">
      <div className="number-game-grid" style={gameStyling}>
        {(grid || []).map((row, i) => {
          return row.map((cell, j) => (
            <NumberCell
              key={i + j}
              value={cell}
              nextValue={nextValue}
              setNextValue={setNextValue}
              playing={playing}
              setPlaying={setPlaying}
              win={win}
              setWin={setWin}
              difficulty={difficulty}
            ></NumberCell>
          ));
        })}
      </div>
      <div></div>
      <Timer paused={win !== undefined} visible={showTimer}></Timer>
      {win !== undefined ? (
        <button className="new-game-button" onClick={handleNewGame}>
          New Game
        </button>
      ) : null}
    </div>
  );
}
