import React from "react";
import Light from "../Light";
import './styles.css';

const TrafficLights = ({ orientation, data, handleClick, togglePower }) => {
  return (
    <div className={`traffic-light ${orientation}`}>
      {data.map((light) => (
        <div key={light.id} className="light-container">
          <Light 
            tlColor={light.power ? light.color : 'gray'} // Gray when the light is off
            clickCount={light.clickcount} 
            handleClick={() => handleClick(light.id)} 
            brightness={light.brightness}
            blinkCount={light.blinkCount} 
          />
          <button onClick={() => togglePower(light.id)}>
            {light.power ? 'Turn Off' : 'Turn On'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default TrafficLights;
