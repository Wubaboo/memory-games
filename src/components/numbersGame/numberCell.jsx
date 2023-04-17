import { useState, useEffect } from "react";
import { useWindowDimensions } from "../../utils/useWindowDimensions";

export default function NumberCell(props) {
  const {
    value,
    nextValue,
    setNextValue,
    playing,
    setPlaying,
    win,
    setWin,
    difficulty,
    gridSize,
  } = props;
  const [classes, setClasses] = useState(["grid-cell", "hidden"]);
  const { width, height } = useWindowDimensions();
  useEffect(() => {
    let classes = ["grid-cell"];
    if (win) {
      classes.push("win-cell");
    } else if (win === false) {
      classes.push("wrong-cell");
    } else if (value === 0 || (playing && value >= nextValue))
      classes.push("hidden");
    if (value !== 0) classes.push("value-cell");
    setClasses(classes);
  }, [playing, win, value]);

  function handleClick() {
    if (win !== undefined) {
      return;
    }
    if (classes.includes("hidden")) {
      setClasses(["grid-cell"]);
      setPlaying(true);
    }
    if (value !== nextValue) {
      setClasses(["grid-cell", "wrong-cell"]);
      setPlaying(false);
      setWin(false);
    } else if (value === difficulty) {
      setWin(true);
      setPlaying(false);
    } else {
      setNextValue(nextValue + 1);
      setPlaying(true);
    }
  }

  const cellStyle = {
    width: `${70 / gridSize}${width <= height ? "vw" : "vh"}`,
    height: `${70 / gridSize}${width <= height ? "vw" : "vh"}`,
  };

  return (
    <div className={classes.join(" ")} onClick={handleClick} style={cellStyle}>
      {value ? value : null}
    </div>
  );
}
