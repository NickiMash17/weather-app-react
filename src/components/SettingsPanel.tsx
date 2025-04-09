import React from 'react';
import { Unit } from '../types/weather';
import { useFavorites } from '../hooks/useFavorites';

interface SettingsPanelProps {
  unit: Unit;
  onUnitChange: (unit: Unit) => void;
  darkMode: boolean;
  onDarkModeChange: (darkMode: boolean) => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ 
  unit, 
  onUnitChange, 
  darkMode, 
  onDarkModeChange 
}) => {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <div className="settings-panel">
      <div className="mb-4">
        <h4 className="mb-3">Temperature Unit</h4>
        <div className="btn-group w-100">
          <button
            className={`btn ${unit === 'metric' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => onUnitChange('metric')}
          >
            Celsius (°C)
          </button>
          <button
            className={`btn ${unit === 'imperial' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => onUnitChange('imperial')}
          >
            Fahrenheit (°F)
          </button>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="mb-3">Appearance</h4>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            id="darkModeSwitch"
            checked={darkMode}
            onChange={(e) => onDarkModeChange(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="darkModeSwitch">
            Dark Mode
          </label>
        </div>
      </div>

      <div>
        <h4 className="mb-3">Favorite Cities</h4>
        {favorites.length === 0 ? (
          <p className="text-muted">No favorite cities yet.</p>
        ) : (
          <ul className="list-group">
            {favorites.map((city, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                {city}
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => removeFavorite(city)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SettingsPanel;