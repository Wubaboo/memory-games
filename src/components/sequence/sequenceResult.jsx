import * as constants from "./sequenceConstants";

export default function sequenceResult({
  score,
  submissionDuration,
  sequence,
  currentAnswer,
  reportFontSize,
  handleNewGame,
}) {
  const start = Math.max(0, score - constants.REPORT_WINDOW);

  return (
    <>
      <div style={{ fontSize: "1.5rem" }}>
        {score > 0
          ? `You correctly recalled the first {score} digits correctly in{" "}
        {submissionDuration / constants.MILLISECONDS_IN_SECOND} seconds.`
          : "You failed to remember any of the initial digits correctly. Better luck next time."}
      </div>
      <div
        style={{
          fontSize: { reportFontSize },
          margin: "30px auto",
          textAlign: "left",
          width: reportFontSize * (2 * constants.REPORT_WINDOW + 1),
        }}
      >
        <p>
          {score > constants.REPORT_WINDOW ? "..." : ""}
          {sequence.slice(start, score)}
          <span style={{ color: "red" }}>{sequence[score]}</span>
          {sequence.slice(score + 1, start + 2 * constants.REPORT_WINDOW + 1)}
          ...
        </p>
        <p>
          {score > constants.REPORT_WINDOW ? "..." : ""}
          {currentAnswer
            .slice(start, start + 2 * constants.REPORT_WINDOW + 1)
            .join("")
            .padEnd(2 * constants.REPORT_WINDOW + 1, " ")}
        </p>
        {currentAnswer - score > constants.REPORT_WINDOW ? "..." : ""}
      </div>
      <button className="new-game-button" onClick={handleNewGame}>
        New Game
      </button>
    </>
  );
}
