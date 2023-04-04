import { Slider } from "@mui/material";
import { getSliderMarks } from "../../utils/settingsUtils";
export default function MatchingSettings(props) {
  const { gridSize, setGridSize, handleStartGame, showTimer, setShowTimer } = props;

  function handleGridSize(e) {
    setGridSize(e.target.value);
  }

  return (
    <div className="settings">
      <p>Remember and match the pairs of images.</p>
      <div className="grid-size-row">
        <p>Grid Size</p>
        <Slider
          className="grid-size-slider"
          aria-label="Grid Size"
          value={gridSize}
          min={12}
          max={40}
          marks={getSliderMarks(12, 40, 4)}
          step={null}
          valueLabelDisplay="auto"
          onChange={handleGridSize}
        ></Slider>
      </div>
      <div className="show-timer-row">
      <label htmlFor="showTimer">Show Timer?</label>
      <input id="showTimer" type="checkbox" className="checkbox" checked={showTimer} onChange={e => (setShowTimer(e.target.checked))}></input>
      </div>
      <button className="start-button" onClick={handleStartGame}>
        Start
      </button>
    </div>
  );
}
