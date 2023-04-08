import { useEffect, useState } from "react";
import Timer from "../timer";
import SequenceGrid from "./sequenceGrid";
import Countdown from "react-countdown";

const MILLISECONDS_IN_SECOND = 100;

export default function SequenceGame({
  timeLimit,
  showTimer,
  onNewGame,
  sequence,
}) {
  const [won, setWon] = useState();
  const [currentAnswer, setCurrentAnswer] = useState([""]);

  // Indicate solving phase (instead of memorizing phase)
  const [solving, setSolving] = useState(false);

  // Renderer callback with condition
  const countdownRenderer = ({ minutes, seconds }) => {
    return (
      <span>
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </span>
    );
  };

  return (
    <div className="sequence-game">
      {!solving ? (
        <>
          <div>
            <SequenceGrid sequence={sequence} />{" "}
          </div>
          <Countdown
            date={Date.now() + timeLimit * MILLISECONDS_IN_SECOND}
            renderer={countdownRenderer}
            onComplete={() => {
              setSolving(true);
            }}
          />
        </>
      ) : (
        <>
          <p>Enter remembered numbers.</p>
          <SequenceGrid sequence={currentAnswer} acceptInput />
        </>
      )}
      <Timer paused={won} visible={showTimer}></Timer>
      {won !== undefined ? (
        <>
          <div style={{ fontSize: "1.5rem" }}>My name is Jeff</div>

          <button className="new-game-button" onClick={onNewGame}>
            New Game
          </button>
        </>
      ) : null}
    </div>
  );
}
// {mistakes > 0 ? `Mistakes: ${mistakes}` : "A Perfect Game!"}
