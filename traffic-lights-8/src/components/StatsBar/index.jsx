import React from "react";
import PropTypes from "prop-types";
import './styles.css';

const StatsBar = ({ orientation, setOrientation, data, updateLightSettings }) => {
  return (
    <div className="stats-bar bg-base-200 p-6 rounded-lg shadow-lg">
      <ul className="space-y-4">
        {data.map((light) => (
          <li key={light.id} className="bg-base-100 p-4 rounded-md shadow">
            <p className="text-lg font-semibold">{light.description}: <span className="font-bold">{light.clickcount}</span></p>
            <div className="controls mt-2">
              <label className="flex items-center space-x-2">
                <span>Яскравість:</span>
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.1"
                  value={light.brightness}
                  onChange={(e) => updateLightSettings(light.id, "brightness", parseFloat(e.target.value))}
                  className="range range-primary"
                />
              </label>
              <label className="flex items-center space-x-2 mt-2">
                <span>Кількість моргань:</span>
                <input
                  type="number"
                  min="1"
                  value={light.blinkCount}
                  onChange={(e) => updateLightSettings(light.id, "blinkCount", parseInt(e.target.value))}
                  className="input input-bordered w-16"
                />
              </label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

StatsBar.propTypes = {
  orientation: PropTypes.string.isRequired,
  setOrientation: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      clickcount: PropTypes.number.isRequired,
      brightness: PropTypes.number.isRequired,
      blinkCount: PropTypes.number.isRequired,
    })
  ).isRequired,
  updateLightSettings: PropTypes.func.isRequired,
};

export default StatsBar;
