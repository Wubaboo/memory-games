import { useEffect, useState } from "react";
import Timer from "../timer";
import SequenceGrid from "./sequenceGrid";

import {
  shuffleArray,
  getDimensions,
  getRandomColor,
} from "../../utils/gridUtils";
import {
  useWindowDimensions,
  MOBILE_WIDTH,
} from "../../utils/useWindowDimensions";
import Countdown from "react-countdown";

const MILLISECONDS_IN_SECOND = 1000;

export default function SequenceGame({
  timeLimit,
  showTimer,
  onNewGame,
  theSequence,
}) {
  const [won, setWon] = useState();
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
      <Countdown
        date={Date.now() + timeLimit * MILLISECONDS_IN_SECOND}
        renderer={countdownRenderer}
        onComplete={() => {
          setSolving(true);
        }}
      />
      {!solving ? (
        <div>
          <SequenceGrid sequence={theSequence} />{" "}
        </div>
      ) : null}

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
