import { Slider } from "@mui/material";
export default function NumberSettings(props) {
  const { gridSize, difficulty, setGridSize, setDifficulty, handleStartGame } =
    props;

  function getMarks(min, max) {
    let marks = [];
    for (let i = 3; i < 25; i++) {
      marks.push({ value: i, label: i });
    }
    return marks;
  }

  function handleGridSize(e) {
    if (difficulty > e.target.value * e.target.value) {
      setDifficulty(5);
    }
    setGridSize(e.target.value);
  }
  return (
    <div className="settings">
      <p>
        Remember the numbers and their positions. Click on the boxes in
        increasing order.
      </p>
      <div className="difficulty-row">
        <p>Difficulty</p>
        <Slider
          aria-label="Difficulty"
          className="difficulty-slider"
          defaultValue={difficulty}
          min={3}
          max={Math.min(gridSize * gridSize, 25)}
          marks={getMarks(3, 25)}
          steps={null}
          valueLabelDisplay="auto"
          onChange={(e) => setDifficulty(e.target.value)}
        ></Slider>
      </div>
      <div className="grid-size-row">
        <p>Grid Size</p>
        <Slider
          className="grid-size-slider"
          aria-label="Grid Size"
          defaultValue={gridSize}
          min={3}
          max={10}
          marks={getMarks(3, 10)}
          steps={null}
          valueLabelDisplay="auto"
          onChange={handleGridSize}
        ></Slider>
      </div>
      <button className="start-button" onClick={handleStartGame}>
        Start
      </button>
    </div>
  );
}
