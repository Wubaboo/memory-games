import { useEffect, useState } from "react";
import "../styles/timer.css";

export default function Timer({ paused, visible }) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval = null;
    if (!paused) {
      interval = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  });

  function formatTime(ms) {
    return new Date(time).toISOString().slice(14, -1);
  }

  return (
    <div className="timer">{paused || visible ? formatTime(time) : null}</div>
  );
}
