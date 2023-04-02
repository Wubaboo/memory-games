import { useState } from "react";
import MatchingCell from "./matchingCell";

export default function MatchingGame(props) {
  const { grid, gridSize, dims, setStartGame } = props;
  const [win, setWin] = useState(true); //if the game is won
  const [playing, setPlaying] = useState(true); //if the game is currently being played
  const [flippedCard, setFlippedCard] = useState(undefined);
  const [incorrect, setIncorrect] = useState(false);
  const [matchedCards, setMatchedCards] = useState(new Set());
  function handleNewGame() {
    setStartGame(false);
  }
  const gridStyling = {
    gridTemplateColumns: `repeat(${dims[1]}, 1fr)`,
    display: "grid",
    gridGap: "1em",
  };

  return (
    <div className="matching-game">
      <div className="matching-game-grid" style={gridStyling}>
        {grid.map((row, i) =>
          row.map((cell, j) => (
            <MatchingCell
              key={(i, j)}
              object={cell}
              playing={playing}
              setPlaying={setPlaying}
              flippedCard={flippedCard}
              setFlippedCard={setFlippedCard}
              win={win}
              setWin={setWin}
              matchedCards={matchedCards}
              setMatchedCards={setMatchedCards}
              incorrect={incorrect}
              setIncorrect={setIncorrect}
            ></MatchingCell>
          ))
        )}
      </div>
      {win !== undefined ? (
        <button className="new-game-button" onClick={handleNewGame}>
          New Game
        </button>
      ) : null}
    </div>
  );
}
