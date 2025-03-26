import React, {useContext} from 'react';
import './ToggleSwitch.css';
import CurrentTempUnitContext from '../../contexts/CurrentTempUnit';


export default function ToggleSwitch() {
    const {handleToggleSwitchChange, currentTempUnit} = useContext(CurrentTempUnitContext);

    return <label className="toggle__switch">
        <input onChange={handleToggleSwitchChange} type="checkbox" className="toggle__switch-checkbox" />
        <span className="toggle__switch-slider"></span>
        <span style={{ color: `${currentTempUnit === "F" ? "white" : "" }`}} className="toggle__switch-text toggle__switch-text_F">F</span>
        <span style={{ color: `${currentTempUnit === "C" ? "white" : "" }`}} className="toggle__switch-text toggle__switch-text_C">C</span>

    </label>
};