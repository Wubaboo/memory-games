import { useState, useEffect } from "react";
import COLORS from "../../data/colors";
import { getDimensions } from "../../utils/gridUtils";
import MosaicCell from "./mosaicCell";
import Timer from "../timer";
import {
  useWindowDimensions,
  MOBILE_WIDTH,
} from "../../utils/useWindowDimensions";

export default function MosaicGame({
  colors,
  gridSize,
  setStartGame,
  showTimer,
}) {
  const [selectedColor, setSelectedColor] = useState(1);
  const [playing, setPlaying] = useState(false);
  const [target, setTarget] = useState([]);
  const [playerBoard, setPlayerBoard] = useState([]);
  const [dims, setDims] = useState(getDimensions(gridSize));
  const [win, setWin] = useState(undefined);

  const { width, height } = useWindowDimensions();

  function createGrid() {
    let res = [];
    for (let i = 0; i < gridSize; i++) {
      res.push(Math.floor(Math.random() * (1 + colors)));
    }
    return res;
  }

  useEffect(() => {
    if (width <= MOBILE_WIDTH) {
      const newDims = [Math.floor(gridSize / 4), 4];
      setDims(newDims);
    } else {
      const newDims = getDimensions(gridSize);
      setDims(newDims);
    }
  }, [width]);

  const gridStyling = {
    gridTemplateColumns: `repeat(${dims[1]}, 1fr)`,
    display: "grid",
  };

  useEffect(() => {
    setTarget(createGrid());
    setPlayerBoard(Array(gridSize).fill(0));
  }, []);

  function handleEndGame() {
    setStartGame(false);
  }

  function handleSelectColor(i) {
    setSelectedColor(i);
  }

  function handleSubmit() {
    setPlaying(false);
    for (let i = 0; i < gridSize; i++) {
      if (target[i] !== playerBoard[i]) {
        setWin(false);
        return;
      }
    }
    setWin(true);
  }
  return (
    <div className="mosaic-game">
      <div className="palette-row">
        <i
          className={
            "fa-solid fa-xl" +
            (selectedColor === 0 ? " fa-eraser" : " fa-paintbrush")
          }
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: selectedColor === 0 ? "black" : COLORS[selectedColor],
          }}
        ></i>
        {COLORS.slice(0, colors + 1).map((col, i) => (
          <div
            key={i}
            className="color-picker"
            style={{ backgroundColor: col, border: "1px solid black" }}
            onClick={() => {
              handleSelectColor(i);
            }}
          ></div>
        ))}
      </div>

      <div
        className="mosaic-boards"
        style={{ flexDirection: width <= MOBILE_WIDTH ? "column" : "row" }}
      >
        {!playing || win !== undefined ? (
          <div className="target-grid" style={gridStyling}>
            {target.map((cell, i) => (
              <div
                className="mosaic-cell"
                key={i}
                style={{
                  backgroundColor: COLORS[cell],
                  border:
                    win === true
                      ? "3px solid green"
                      : win === false
                      ? "3px solid red"
                      : null,
                }}
              ></div>
            ))}
          </div>
        ) : null}
        {playing || win !== undefined ? (
          <div className="player-board" style={gridStyling}>
            {playerBoard.map((val, i) => (
              <MosaicCell
                key={i}
                selectedColor={selectedColor}
                cell={i}
                playerBoard={playerBoard}
                setPlayerBoard={setPlayerBoard}
                color={playerBoard[i]}
                win={win}
              ></MosaicCell>
            ))}
          </div>
        ) : null}
      </div>
      {win === undefined &&
        (!playing ? (
          <button
            className="ready-button"
            onClick={(e) => {
              setPlaying(true);
            }}
          >
            Ready!
          </button>
        ) : (
          <button
            className="submit-mosaic-button"
            onClick={(e) => {
              handleSubmit();
            }}
          >
            Submit
          </button>
        ))}

      <div className="mosaic-info">
        <Timer paused={win !== undefined} visible={showTimer}></Timer>
        {win === true ? (
          <h2>Nice job!</h2>
        ) : win === false ? (
          <h2>Good try</h2>
        ) : null}
      </div>
      {win !== undefined ? (
        <button className="new-game-button" onClick={(e) => handleEndGame()}>
          New Game
        </button>
      ) : null}
    </div>
  );
}
