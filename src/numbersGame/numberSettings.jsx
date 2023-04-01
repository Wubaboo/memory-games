import { Slider } from "@mui/material";
export default function NumberSettings(props) {
  const { gridSize, setGridSize, setDifficulty, setPlaying } = props;

  function getMarks(min, max) {
    let marks = [];
    for (let i = 3; i < 25; i++) {
      marks.push({ value: i, label: i });
    }
    return marks;
  }

  return (
    <div className="settings">
      <div className="difficulty-row">
        <p>Difficulty</p>
        <Slider
          aria-label="Difficulty"
          className="difficulty-slider"
          defaultValue={5}
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
          defaultValue={5}
          min={3}
          max={10}
          marks={getMarks(3, 10)}
          steps={null}
          valueLabelDisplay="auto"
          onChange={(e) => setGridSize(e.target.value)}
        ></Slider>
      </div>
      <button className="start-button" onClick={setPlaying(true)}>
        Start
      </button>
    </div>
  );
}
