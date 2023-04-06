import { useState } from "react";
import COLORS from "../../data/colors";
export default function MosaicCell({
  selectedColor,
  color,
  playerBoard,
  setPlayerBoard,
  cell,
  win,
}) {
  function handleClick() {
    if (win !== undefined) return;

    const tempBoard = [...playerBoard];
    if (color !== selectedColor) {
      tempBoard[cell] = selectedColor;
    } else {
      tempBoard[cell] = 0;
    }
    setPlayerBoard(tempBoard);
  }

  function handleDrag() {
    if (win !== undefined) return;
    const tempBoard = [...playerBoard];
    tempBoard[cell] = selectedColor;
    setPlayerBoard(tempBoard);
  }
  return (
    <div
      className="mosaic-cell"
      style={{
        backgroundColor: COLORS[color],
        border:
          win === true
            ? "3px solid green"
            : win === false
            ? "3px solid red"
            : null,
        transition: "background 0.25s",
      }}
      onClick={handleClick}
      onDragOver={handleDrag}
      draggable={win === undefined}
    ></div>
  );
}
