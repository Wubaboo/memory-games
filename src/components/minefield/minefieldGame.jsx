import { elementAcceptingRef } from "@mui/utils";
import { useEffect, useState } from "react";
import {
  createGrid,
  getCutVertices,
  removeNode,
  getDimensions,
} from "../../utils/gridUtils";
export default function MinefieldGame({ gridSize, setStartGame, showTimer }) {
  const [dims, setDims] = useState([4, 4]);
  const [grid, setGrid] = useState(Array.from({ length: 16 }, () => 0));

  // Create the initial grid and populate it with bombs
  useEffect(() => {
    const maxMines = Math.floor(gridSize / 2.5);
    const tempDims = getDimensions(gridSize);
    const [r, c] = tempDims;
    setDims(tempDims);
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
  }, []);

  const testGrid = createGrid(4, 4);
  removeNode(testGrid, 5);
  removeNode(testGrid, 6);
  removeNode(testGrid, 7);
  console.log(dims, grid);

  const bombStyle = {
    width: "3em",
    height: "3em",
  };
  const gridStyling = {
    gridTemplateColumns: `repeat(${dims[1]}, 1fr)`,
    display: "grid",
    gridGap: "0px",
    width: `${4 * dims[1]}vw`,
  };
  const cellStyle = {
    border: "1px solid black",
    width: "4vw",
    height: "4vw",
  };
  function renderCellImg(i) {
    if (i === 1) {
      return (
        <img
          className="cell-image bomb"
          src={process.env.PUBLIC_URL + "/assets/bomb.svg"}
          style={bombStyle}
        ></img>
      );
    } else if (i === 2) {
      return (
        <img
          className="cell-image person"
          src={process.env.PUBLIC_URL + "/assets/person.svg"}
        ></img>
      );
    } else if (i === 3) {
      return (
        <img
          className="cell-image flag"
          src={process.env.PUBLIC_URL + "/assets/flag.svg"}
        ></img>
      );
    } else {
      return " ";
    }
  }
  return (
    <div>
      <div className="minefield" style={gridStyling}>
        {grid.map((val, i) => (
          <div className="cell" key={i} style={cellStyle}>
            {renderCellImg(val)}
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          setStartGame(false);
        }}
      >
        New Game
      </button>
    </div>
  );
}
