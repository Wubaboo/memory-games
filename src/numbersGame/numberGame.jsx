import { useState, useEffect } from "react";
import NumberCell from "./numberCell";

export default function NumberGame(props) {
  const [reset, setReset] = useState(true);
  const [nextValue, setNextValue] = useState(1);
  const [playing, setPlaying] = useState(false);
  const [win, setWin] = useState(null);
  const { gridSize, grid, difficulty} = props;
  
  const gameStyling = {
    gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
    display: "grid",
    gap: '2em',
    width: `${6*gridSize}em`
  };

  function handleReset() {
    setReset(true);
    setWin(undefined);
    setPlaying(false);
    setNextValue(1);
  }

  return (
    <div className="number-game" style={gameStyling}>
      {(grid || []).map((row, i) => {
        return row.map((cell, j) => (
          <NumberCell key={i+j} value={cell} reset={reset} handleReset={handleReset} nextValue={nextValue} setNextValue={setNextValue} playing={playing} setPlaying={setPlaying} win={win} setWin={setWin} difficulty={difficulty}></NumberCell>
        ));
      })}
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}
