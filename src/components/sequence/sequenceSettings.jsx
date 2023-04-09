import { Slider } from "@mui/material";
import CheckBoxForm from "../checkboxForm";
import { getSliderMarks } from "../../utils/settingsUtils";
export default function SequenceSettings(props) {
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
      <CheckBoxForm isChecked={showTimer} setChecked={setShowTimer} label="Show Timer?"></CheckBoxForm>
      <button className="start-button" onClick={handleStartGame}>
        Start
      </button>
    </div>
  );
}
