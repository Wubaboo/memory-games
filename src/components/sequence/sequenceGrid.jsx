import React, { useEffect, useRef, forwardRef, useState } from "react";

const SequenceCell = React.forwardRef((props, ref) => (
  <li
    style={{
      display: "inline",
    }}
  >
    <div
      style={{
        width: 70,
        padding: 10,
        margin: 2,
        border: `2px solid ${props.selected ? "red" : "black"}`,
      }}
      ref={ref}
    >
      <p style={{ color: props.selected ? "red" : "black", fontSize: 50 }}>
        {props.children}
      </p>
    </div>
  </li>
));

const KEYCODE_A = 65;
const KEYCODE_LEFT = 37;
const KEYCODE_RIGHT = 39;
const KEYCODE_D = 68;
const KEY_REPEAT = 40;
// How many cells shown to the far right when scrolling.
const SCROLL_OFF = 2;

const RIGHT_SCROLL = -1;
const LEFT_SCROLL = 1;

export default function SequenceGrid({ sequence }) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [scrollDir, setScrollDir] = useState(RIGHT_SCROLL);
  const currentCell = useRef(null);

  useEffect(() => {
    var last = 0;
    document.addEventListener("keydown", (e) => {
      // Rate limit on keypresses
      if (Date.now() - last < KEY_REPEAT) return;

      if (e.keyCode === KEYCODE_RIGHT || e.keyCode === KEYCODE_D) {
        setSelectedIdx((currentIdx) =>
          Math.min(currentIdx + 1, sequence.length - 1)
        );
        setScrollDir(RIGHT_SCROLL);
      } else if (e.keyCode == KEYCODE_LEFT || e.keyCode === KEYCODE_A) {
        setSelectedIdx((currentIdx) => Math.max(currentIdx - 1, 0));
        setScrollDir(LEFT_SCROLL);
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
    <div
      style={{
        display: "flex",
        margin: 30,
        padding: 20,
        width: 500,
        overflowX: "scroll",
      }}
      id="TestID"
    >
      {sequence.map((item, idx) => (
        <SequenceCell
          selected={selectedIdx === idx}
          key={idx}
          ref={
            selectedIdx === idx + scrollDir * SCROLL_OFF ? currentCell : null
          }
        >
          {item}
        </SequenceCell>
      ))}
    </div>
  );
}
