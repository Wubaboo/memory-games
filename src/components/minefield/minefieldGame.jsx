import { elementAcceptingRef } from "@mui/utils";
import Timer from "../timer";
import { useEffect, useState, useRef } from "react";
import {
  createGrid,
  getCutVertices,
  removeNode,
  getDimensions,
  getIndex,
} from "../../utils/gridUtils";
import {
  useWindowDimensions,
  MOBILE_WIDTH,
} from "../../utils/useWindowDimensions";

export default function MinefieldGame({ gridSize, setStartGame, showTimer }) {
  const [dims, setDims] = useState(getDimensions(gridSize));
  const [grid, setGrid] = useState(Array.from({ length: gridSize }, () => 0));
  const [pos, setPos] = useState([0, 0]);
  const [playing, setPlaying] = useState(false);
  const [win, setWin] = useState(undefined);
  const [firstMove, setFirstMove] = useState(false);
  const { width, height } = useWindowDimensions();

  // Create the initial grid and populate it with bombs
  useEffect(() => {
    const maxMines = Math.floor(gridSize / 2.5);
    const tempDims = getDimensions(gridSize);
    const newDims = tempDims;
    // const newDims =
    //   width <= MOBILE_WIDTH ? tempDims.sort((a, b) => b - a) : tempDims;
    const [r, c] = newDims;
    setDims(newDims);
    const setArray = Array.from({ length: gridSize }, () => 0);

    let adjList = createGrid(r, c);
    let [keep, remove] = getCutVertices(adjList);
    let iters = 0;
    while (remove.length > 1 && iters < maxMines) {
      // Remove any node except for the last one (it's the goal)
      const choice = Math.floor(Math.random() * (remove.length - 1));
      setArray[remove[choice]] = 1;
      adjList = removeNode(adjList, remove[choice]);
      [keep, remove] = getCutVertices(adjList);
      iters += 1;
    }
    setArray[0] = 2;
    setArray[gridSize - 1] = 3;
    setGrid(setArray);
    document.getElementById("minefield").focus();
  }, []);

  const gridStyling = {
    gridTemplateColumns: `repeat(${dims[1]}, 1fr)`,
    display: "grid",
    gridGap: "0px",
  };
  console.log(dims);
  function getCellStyle(val) {
    const cellStyle = {
      position: "relative",
      border: "1px solid black",
      maxWidth: "5rem",
      maxHeight: "5rem",
      minWidth: "1rem",
      minHeight: "1rem",
      // width: `${100 / dims[1]}%`,
      aspectRatio: "1 / 1",
      width: width <= height ? `${90 / dims[1]}vw` : `${80 / dims[1]}vh`,
      height: width <= height ? `${90 / dims[1]}vw` : `${80 / dims[1]}vh`,
      transition:
        "border 1s" + (!playing || firstMove ? ", background 0.5s" : ""),
    };
    if (playing && val !== 2 && val !== 3) {
      cellStyle.backgroundColor = "black";
    }
    if (win === true) {
      cellStyle.border = "1px solid rgb(174, 255, 174)";
    } else if (win === false) {
      cellStyle.border = "1px solid red";
    }
    return cellStyle;
  }

  const states = {
    0: { name: "empty", img: null, classes: "" },
    1: {
      name: "bomb",
      img: process.env.PUBLIC_URL + "/assets/minefieldImages/bomb.svg",
    },
    2: {
      name: "person",
      img: process.env.PUBLIC_URL + "/assets/minefieldImages/person.svg",
    },
    3: {
      name: "flag",
      img: process.env.PUBLIC_URL + "/assets/minefieldImages/flag.svg",
    },
    4: {
      name: "win",
      img: process.env.PUBLIC_URL + "/assets/minefieldImages/minefieldWin.svg",
    },
    5: {
      name: "lose",
      img: process.env.PUBLIC_URL + "/assets/minefieldImages/minefieldLose.svg",
    },
  };
  function renderCellImg(i) {
    if (states[i].img) {
      return (
        <img
          className={`cell-image ${states[i].name}`}
          src={states[i].img}
        ></img>
      );
    } else {
      return " ";
    }
  }

  function handleButtonClick(direction) {
    const res = {};
    res.key = direction;
    handleKeyDown(res);
  }

  function handleKeyDown(e) {
    if (win !== undefined) return;
    const clicked = e.key;
    if (!playing) setFirstMove(true);
    if (firstMove) setFirstMove(false);
    setPlaying(true);
    let newPos = [pos[0], pos[1]];
    if (clicked === "ArrowRight" || clicked === "d") {
      if (pos[1] < dims[1] - 1) newPos[1] += 1;
    } else if (clicked === "ArrowDown" || clicked === "s") {
      if (pos[0] < dims[0] - 1) newPos[0] += 1;
    } else if (clicked === "ArrowUp" || clicked === "w") {
      if (pos[0] > 0) newPos[0] -= 1;
    } else if (clicked === "ArrowLeft" || clicked === "a") {
      if (pos[1] > 0) newPos[1] -= 1;
    } else {
      return;
    }
    const newGrid = [...grid];
    const nextSpot = grid[getIndex(newPos[0], newPos[1], dims[0], dims[1])];
    newGrid[getIndex(pos[0], pos[1], dims[0], dims[1])] = 0;
    if (nextSpot === 0 || nextSpot === 2) {
      newGrid[getIndex(newPos[0], newPos[1], dims[0], dims[1])] = 2;
    } else if (nextSpot === 1) {
      newGrid[getIndex(newPos[0], newPos[1], dims[0], dims[1])] = 5;
      setWin(false);
      setPlaying(false);
    } else if (nextSpot === 3) {
      newGrid[getIndex(newPos[0], newPos[1], dims[0], dims[1])] = 4;
      setPlaying(false);
      setWin(true);
    }
    setGrid(newGrid);
    setPos(newPos);
  }
  return (
    <>
      <p style={{ margin: "1em" }}>
        Move the person with W,A,S,D or the arrow keys
      </p>
      <div
        id="minefield"
        className="minefield"
        style={gridStyling}
        onKeyDown={(e) => {
          handleKeyDown(e);
        }}
        tabIndex={0}
        focus="true"
      >
        {grid.map((val, i) => (
          <div className="minefield-cell" key={i} style={getCellStyle(val)}>
            {renderCellImg(val)}
          </div>
        ))}
      </div>
      <div className="minefield-info">
        <Timer paused={win !== undefined} visible={showTimer}></Timer>
        {win === true ? (
          <h2>Nice job!</h2>
        ) : win === false ? (
          <h2>Good try</h2>
        ) : null}
      </div>
      {win === undefined && width < height && (
        <div className="arrow-keys">
          <button
            className="arrow-left"
            onClick={() => {
              handleButtonClick("a");
            }}
          >
            &larr;
          </button>
          <button
            className="arrow-up"
            onClick={() => {
              handleButtonClick("w");
            }}
          >
            &uarr;
          </button>
          <button
            className="arrow-down"
            onClick={() => {
              handleButtonClick("s");
            }}
          >
            &darr;
          </button>
          <button
            className="arrow-right"
            onClick={() => {
              handleButtonClick("d");
            }}
          >
            &rarr;
          </button>
        </div>
      )}
      {win === undefined ? null : (
        <button
          onClick={() => {
            setStartGame(false);
          }}
        >
          New Game
        </button>
      )}
    </>
  );
}
