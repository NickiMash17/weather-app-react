import React from 'react';
import { ForecastItem, Unit } from '../types/weather';
import { formatTime } from '../utils/weatherUtils';

interface HourlyForecastProps {
  hourlyData: ForecastItem[];
  unit: Unit;
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ hourlyData, unit }) => {
  const tempUnit = unit === 'metric' ? '°C' : '°F';

  return (
    <div className="hourly-forecast mb-5">
      <h3 className="mb-3">Hourly Forecast</h3>
      <div className="d-flex overflow-auto pb-3" style={{ gap: '1rem' }}>
        {hourlyData.map((hour, index) => (
          <div key={index} className="hourly-item text-center p-3 rounded-3 shadow-sm" style={{ minWidth: '100px' }}>
            <div className="fw-bold">{formatTime(new Date(hour.dt * 1000))}</div>
            <img 
              src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`} 
              alt={hour.weather[0].description}
              className="img-fluid my-2"
              style={{ width: '50px', height: '50px' }}
            />
            <div className="fs-5 fw-bold">{Math.round(hour.main.temp)}{tempUnit}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;