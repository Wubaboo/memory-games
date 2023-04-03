import { useState } from "react";
import NumberCell from "./numberCell";

export default function NumberGame(props) {
  const [nextValue, setNextValue] = useState(1);
  const [playing, setPlaying] = useState(false);
  const [win, setWin] = useState(undefined);
  const { gridSize, grid, difficulty, setStartGame } = props;

  const gameStyling = {
    gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
    display: "grid",
    gridGap: "1.5em",
    // rowGap: "1.5em",
    // columnGap: "1.5em",
    // width: `${4.5 * gridSize}em`,
    // height: `${4.5 * gridSize}em`,
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
      {win !== undefined ? (
        <button className="new-game-button" onClick={handleNewGame}>
          New Game
        </button>
      ) : null}
    </div>
  );
}