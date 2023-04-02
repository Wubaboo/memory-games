import { Slider } from "@mui/material";
import { getSliderMarks } from "../../utils/settingsUtils";
export default function MatchingSettings(props) {
  const { gridSize, setGridSize, handleStartGame } = props;

  function handleGridSize(e) {
    setGridSize(e.target.value);
  }

  return (
    <div className="settings">
      <p>Remember the image positions and match them.</p>
      <div className="grid-size-row">
        <p>Grid Size</p>
        <Slider
          className="grid-size-slider"
          aria-label="Grid Size"
          defaultValue={gridSize}
          min={12}
          max={40}
          marks={getSliderMarks(12, 40, 4)}
          step={null}
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
