import { useEffect, useRef, useState } from "react";

import * as constants from "./sequenceConstants";
import SequenceCell from "./sequenceCell";

import "../../styles/sequence.css";

export default function SequenceGrid({ sequence }) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [scrollDir, setScrollDir] = useState(constants.RIGHT_SCROLL);
  const currentCell = useRef(null);

  useEffect(() => {
    var last = 0;
    document.addEventListener("keydown", (e) => {
      // Rate limit on keypresses
      if (Date.now() - last < constants.KEY_REPEAT) return;

      if (
        e.keyCode === constants.KEYCODE_RIGHT ||
        e.keyCode === constants.KEYCODE_D
      ) {
        setSelectedIdx((currentIdx) =>
          Math.min(currentIdx + 1, sequence.length - 1)
        );
        setScrollDir(constants.RIGHT_SCROLL);
      } else if (
        e.keyCode === constants.KEYCODE_LEFT ||
        e.keyCode === constants.KEYCODE_A
      ) {
        setSelectedIdx((currentIdx) => Math.max(currentIdx - 1, 0));
        setScrollDir(constants.LEFT_SCROLL);
      }
      if (currentCell && currentCell.current)
        currentCell.current.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      last = Date.now();
    });
  }, []);

  return (
    <div className="sequence-game-grid">
      {sequence.map((item, idx) => (
        <SequenceCell
          selected={selectedIdx === idx}
          key={idx}
          ref={
            selectedIdx === idx + scrollDir * constants.SCROLL_OFF
              ? currentCell
              : null
          }
        >
          {item}
        </SequenceCell>
      ))}
    </div>
  );
}
