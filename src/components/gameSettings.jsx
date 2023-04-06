import { Slider } from "@mui/material";
import { getSliderMarks } from "../utils/settingsUtils";
import CheckBoxForm from "./checkboxForm";
import "../styles/settings.css"
import {useWindowDimensions, MOBILE_WIDTH} from "../utils/useWindowDimensions"

export default function GameSettings({objs, handleStart, showTimer, setShowTimer}) {
  const {width, height} = useWindowDimensions();
    function renderComponent(obj, i) { 
        const {name, type, deets, onChange} = obj;
        if (type === "instructions") {
            return (<p key={i}>{deets.description}</p>)
        }
        else if (type === "slider") {
           return (<div className="slider-row" key={i} style={width <= MOBILE_WIDTH ? {display: 'flex', flexDirection:'column', gap:'1em'} : null}>
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
      </div>)
        }

    }
    return (<div className="settings">
        {objs.map((obj, i )=> renderComponent(obj, i))}
        <CheckBoxForm isChecked={showTimer} setChecked={setShowTimer} label="Show Timer?"></CheckBoxForm>
        <button className="start-button" onClick={handleStart}>
        Start
      </button>
    </div>)
}