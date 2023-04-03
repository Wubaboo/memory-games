import { useEffect, useState } from "react";
import ReactCardFlip from "react-card-flip";

export default function MatchingCell(props) {
  const { object, idx, handleClick, wait, win } = props;
  function handleCellClick() {
    if (!wait) handleClick(idx);
  }
  return (
    <ReactCardFlip
      className="matching-icon-container"
      isFlipped={object.hidden}
      flipDirection="horizontal"
    >
      <i
        className={object.faclasses
          .concat(["matching-card", "card-front"])
          .join(" ")}
        style={{
          color: object.color,
          backgroundColor: win ? "rgb(174, 255, 174)" : null,
          transition: "background-color 1s",
        }}
        onClick={handleCellClick}
      ></i>

      <div
        className="matching-card card-back"
        style={{ background: "black", border: "2px solid black" }}
        onClick={handleCellClick}
      ></div>
    </ReactCardFlip>
  );
}
