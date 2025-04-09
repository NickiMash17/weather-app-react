import React from 'react';
import { ForecastData, Unit } from '../types/weather';
import { formatDay } from '../utils/weatherUtils';

interface ForecastProps {
  forecast: ForecastData;
  unit: Unit;
}

const Forecast: React.FC<ForecastProps> = ({ forecast, unit }) => {
  const tempUnit = unit === 'metric' ? '°C' : '°F';
  
  // Get one forecast per day (around noon)
  const dailyForecast = forecast.list.filter((_, index) => index % 8 === 4).slice(0, 5);

  return (
    <div className="forecast mb-5">
      <h3 className="mb-4">5-Day Forecast</h3>
      <div className="row g-3">
        {dailyForecast.map((day, index) => (
          <div key={index} className="col-12 col-md-6 col-lg">
            <div className="forecast-day p-3 rounded-3 shadow-sm h-100">
              <div className="fw-bold mb-2">{formatDay(new Date(day.dt * 1000))}</div>
              <img 
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} 
                alt={day.weather[0].description}
                className="img-fluid my-2"
                style={{ width: '70px', height: '70px' }}
              />
              <div className="d-flex justify-content-between">
                <span className="fw-bold">{Math.round(day.main.temp_max)}{tempUnit}</span>
                <span className="text-muted">{Math.round(day.main.temp_min)}{tempUnit}</span>
              </div>
              <div className="text-capitalize small mt-2">{day.weather[0].description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;