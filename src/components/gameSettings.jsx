import {
  Slider,
  RadioGroup,
  Radio,
  FormControl,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
import { getSliderMarks } from "../utils/settingsUtils";
import CheckBoxForm from "./checkboxForm";
import "../styles/settings.css";

export default function GameSettings({
  objs,
  handleStart,
  showTimer,
  setShowTimer,
}) {
  function renderComponent(obj, i) {
    const { name, type, deets, onChange } = obj;
    if (type === "instructions") {
      return <p key={i}>{deets.description}</p>;
    } else if (type === "slider") {
      return (
        <div className="slider-row" key={i}>
          <p>{name}</p>
          <Slider
            className="slider"
            aria-label={name}
            value={deets.value}
            min={deets.min}
            max={deets.max}
            marks={getSliderMarks(deets.min, deets.max, deets.step)}
            step={null}
            valueLabelDisplay="auto"
            onChange={onChange}
          ></Slider>
        </div>
      );
    } else if (type === "options") {
      return (
        <div className="radio-group-row" key={i}>
          <p>{name}</p>
          <RadioGroup row value={deets.value} onChange={onChange}>
            {deets.options.map((option, i) => (
              <FormControlLabel
                key={i}
                value={option.name}
                control={<Radio />}
                label={option.name}
                labelPlacement="top"
              ></FormControlLabel>
            ))}
          </RadioGroup>
        </div>
      );
    }
  }
  return (
    <div className="settings">
      {objs.map((obj, i) => renderComponent(obj, i))}
      <CheckBoxForm
        isChecked={showTimer}
        setChecked={setShowTimer}
        label="Show Timer?"
      ></CheckBoxForm>
      <button className="start-button" onClick={handleStart}>
        Start
      </button>
    </div>
  );
}
