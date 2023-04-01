import { useState } from "react";
import NumberCell from "./numberCell";

export default function NumberGame(props) {
  const [allHidden, setAllHidden] = useState(false);
  const { gridSize, grid } = props;
  const gameStyling = {
    gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
    display: "grid",
    gap: '2em',
    width: `${6*gridSize}em`
  };
  return (
    <div className="number-game" style={gameStyling}>
      {(grid || []).map((row, i) => {
        return row.map((cell, j) => (
          <NumberCell key={i+j} value={cell} reset={true} allHidden={allHidden}></NumberCell>
        ));
      })}
    </div>
  );
}
