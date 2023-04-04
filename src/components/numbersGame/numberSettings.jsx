import { Slider } from "@mui/material";
import { getSliderMarks } from "../../utils/settingsUtils";
export default function NumberSettings(props) {
  const { gridSize, difficulty, setGridSize, setDifficulty, handleStartGame, showTimer, setShowTimer } =
    props;

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
          value={difficulty}
          min={3}
          max={Math.min(gridSize * gridSize, 25)}
          marks={getSliderMarks(3, 25, 1)}
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
          value={gridSize}
          min={3}
          max={10}
          marks={getSliderMarks(3, 10, 1)}
          steps={null}
          valueLabelDisplay="auto"
          onChange={handleGridSize}
        ></Slider>
      </div>
      <div className="show-timer-row">
      <label htmlFor="showTimer">Show Timer?</label>
      <input id="showTimer" type="checkbox" className="checkbox" checked={showTimer} onChange={e => {setShowTimer(e.target.checked)}}></input>
      </div>
      <button className="start-button" onClick={handleStartGame}>
        Start
      </button>
    </div>
  );
}
