import { Slider } from "@mui/material";
import CheckBoxForm from "../checkboxForm";
import { getSliderMarks } from "../../utils/settingsUtils";
import {useWindowDimensions, MOBILE_WIDTH}  from "../../utils/useWindowDimensions"
export default function NumberSettings(props) {
  const { gridSize, difficulty, setGridSize, setDifficulty, handleStartGame, showTimer, setShowTimer } =
    props;
  const {width, height} = useWindowDimensions();
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
        <p>Difficulty {width <= MOBILE_WIDTH ? <b>{difficulty}</b> : null}</p> 
        <Slider
          aria-label="Difficulty"
          className="difficulty-slider"
          value={difficulty}
          min={3}
          max={Math.min(gridSize * gridSize, 25)}
          marks={width <= MOBILE_WIDTH ? getSliderMarks(3, 25, 2): getSliderMarks(3, 25, 1)}
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
      <CheckBoxForm isChecked={showTimer} setChecked={setShowTimer} label="Show Timer?"></CheckBoxForm>
      <button className="start-button" onClick={handleStartGame}>
        Start
      </button>
    </div>
  );
}
