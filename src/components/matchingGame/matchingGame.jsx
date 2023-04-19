import { useEffect, useState } from "react";
import MatchingCell from "./matchingCell";
import Timer from "../timer";
import {
  shuffleArray,
  getDimensions,
  getRandomColor,
} from "../../utils/gridUtils";
import {
  useWindowDimensions,
  MOBILE_WIDTH,
} from "../../utils/useWindowDimensions";

import ICONS from "../../data/icons";
export default function MatchingGame(props) {
  const { gridSize, setStartGame, showTimer } = props;
  const [win, setWin] = useState(undefined); //if the game is won
  const [grid, setGrid] = useState([]);
  const [playing, setPlaying] = useState(false); //if the game is currently being played
  const [guess, setGuess] = useState(undefined);
  const [incorrect, setIncorrect] = useState(false);
  const [matchedCards, setMatchedCards] = useState(0);
  const [dims, setDims] = useState(getDimensions(gridSize));
  const [mistakes, setMistakes] = useState(0);
  const [wait, setWait] = useState(false);
  const { width, height } = useWindowDimensions();
  const gridStyling = {
    gridTemplateColumns: `repeat(${dims[1]}, 1fr)`,
    display: "grid",
    gridGap: "1em",
  };

  // Create a new `size` * `size` grid with pairs of icons filled in random cells
  function getNewGrid(size) {
    const [rows, cols] = getDimensions(size);
    setDims([rows, cols]);

    const icons = shuffleArray([...ICONS]);
    const newArr = [];
    for (let i = 0; i < size; i += 2) {
      icons[Math.floor(i / 2)].color = getRandomColor();
      newArr.push(icons[Math.floor(i / 2)]);
      newArr.push(icons[Math.floor(i / 2)]);
    }
    shuffleArray(newArr);
    return newArr;
  }

  function updateGrid() {
    const grid = getNewGrid(gridSize);
    for (let cell of grid) {
      cell.hidden = false;
      cell.guessed = false;
      cell.matched = false;
    }
    setGrid(grid);
  }

  // intialize the board
  useEffect(() => {
    async function sleep() {
      await new Promise((r) => setTimeout(r, 800));
      flipFaceDown();
      setIncorrect(false);
      setWait(false);
    }
    if (incorrect) {
      setWait(true);
      sleep();
    }
    if (!playing) {
      updateGrid();
    }
    if (matchedCards === gridSize) {
      setWin(true);
    }
  }, [incorrect, matchedCards]);

  useEffect(() => {
    if (width <= MOBILE_WIDTH) {
      const newDims = [Math.floor(gridSize / 4), 4];
      setDims(newDims);
    } else {
      const newDims = getDimensions(gridSize);
      setDims(newDims);
    }
  }, [width]);
  // go back to the settings page
  function handleNewGame() {
    setStartGame(false);
  }

  // make all unmatched cards facedown
  function flipFaceDown() {
    const copy = [];
    for (let i = 0; i < grid.length; i++) {
      const temp = { ...grid[i] };
      if (!grid[i].matched) temp.hidden = true;
      copy.push(temp);
    }
    setGrid(copy);
  }

  // called when a cell is clicked
  function handleClick(i) {
    if (!playing) {
      setPlaying(true);
      flipFaceDown();
    }
    if (grid[i].hidden) {
      if (guess === undefined) {
        setGuess(i);
        setGrid((prev) => {
          const ret = [...prev];
          ret[i] = { ...prev[i] };
          ret[i].hidden = false;
          return ret;
        });
        // if the guess is correct, complete the matching
      } else if (grid[guess].name === grid[i].name) {
        setGrid((prev) => {
          const ret = [...prev];
          ret[i] = { ...prev[i] };
          ret[i].hidden = false;
          ret[i].matched = true;

          ret[guess] = { ...prev[guess] };
          ret[guess].hidden = false;
          ret[guess].matched = true;
          return ret;
        });
        setGuess(undefined);
        setMatchedCards(matchedCards + 2);
      }
      // guess is incorrect,
      // set the incorrect state, reset the guess state, update grid, incremenent mistakes
      else {
        setIncorrect(true);
        setGuess(undefined);
        setGrid((prev) => {
          const ret = [...prev];
          ret[i] = { ...prev[i] };
          ret[i].hidden = false;
          return ret;
        });
        setMistakes(mistakes + 1);
      }
    }
  }
  return (
    <div className="matching-game">
      <div className="matching-game-grid" style={gridStyling}>
        {grid.map((cell, i) => (
          <MatchingCell
            key={i}
            object={cell}
            idx={i}
            handleClick={handleClick}
            wait={wait}
            win={win}
          ></MatchingCell>
        ))}
      </div>
      <Timer paused={win} visible={showTimer}></Timer>
      {win !== undefined ? (
        <>
          <div style={{ fontSize: "1.5rem" }}>
            {mistakes > 0 ? `Mistakes: ${mistakes}` : "A Perfect Game!"}
          </div>

          <button className="new-game-button" onClick={handleNewGame}>
            New Game
          </button>
        </>
      ) : null}
    </div>
  );
}
