import { useEffect, useState } from "react";
import ReactCardFlip from "react-card-flip";

export default function MatchingCell(props) {
  const {
    object,
    playing,
    setPlaying,
    flippedCard,
    setFlippedCard,
    win,
    setWin,
    matchedCards,
    setMatchedCards,
    incorrect,
    setIncorrect,
  } = props;
  const [faceDown, setFaceDown] = useState(true);
  const [matched, setMatched] = useState(false);
  const { name, faclasses, color } = object;

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  useEffect(() => {
    async function callSleep() {
      await sleep(750);
    }
    if (incorrect) {
      callSleep();
    }
    if (!playing) {
      setFaceDown(false);
    }
    if (name in matchedCards) {
      setMatched(true);
    } else if (playing) {
      setFaceDown(true);
    }
  }, [playing, win, matchedCards, incorrect]);

  function handleClick(e) {
    e.preventDefault();
    if (playing && !faceDown) {
      return;
    }
    if (faceDown && flippedCard === name) {
      setFaceDown(false);
      setMatched(true);
      setMatchedCards((prev) => new Set(prev).add(name));
    } else if (faceDown && flippedCard != name) {
      setFaceDown(false);
      setIncorrect(true);
    }
  }

  return (
    <ReactCardFlip
      className="matching-icon-container"
      isFlipped={faceDown}
      flipDirection="horizontal"
    >
      <i
        className={faclasses.concat(["matching-card", "card-front"]).join(" ")}
        style={{ color: color }}
        onClick={handleClick}
      ></i>

      <div
        className="matching-card card-back"
        style={{ background: "black", border: "2px solid black" }}
        onClick={handleClick}
      ></div>
    </ReactCardFlip>
  );
}
