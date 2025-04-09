import React from 'react';
import { WeatherData, Unit } from '../types/weather';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { WiHumidity, WiStrongWind, WiRaindrop, WiBarometer } from 'react-icons/wi';
import { BsThermometer, BsEye } from 'react-icons/bs';
import { formatDate, formatTime, getWeatherCondition } from '../utils/weatherUtils';

interface CurrentWeatherProps {
  weather: WeatherData;
  unit: Unit;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ 
  weather, 
  unit, 
  isFavorite, 
  onToggleFavorite 
}) => {
  const weatherCondition = getWeatherCondition(weather.weather[0].icon);
  const tempUnit = unit === 'metric' ? '°C' : '°F';
  const windUnit = unit === 'metric' ? 'm/s' : 'mph';
  const visibilityUnit = unit === 'metric' ? 'km' : 'mi';
  const visibilityValue = unit === 'metric' 
    ? (weather.visibility / 1000).toFixed(1) 
    : (weather.visibility / 1609).toFixed(1);

  return (
    <div className="weather-data mb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="m-0">
          {weather.name}, {weather.sys.country}
          <button 
            className="btn btn-link p-0 ms-2" 
            onClick={onToggleFavorite}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorite ? (
              <FaStar className="text-warning" />
            ) : (
              <FaRegStar className="text-muted" />
            )}
          </button>
        </h1>
        <div className="text-muted">
          {formatDate(new Date(weather.dt * 1000))}
        </div>
      </div>

      <div className="d-flex flex-column flex-md-row align-items-center justify-content-between mb-4">
        <div className="text-center mb-4 mb-md-0">
          <img 
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} 
            alt={weather.weather[0].description}
            className="weather-icon"
            style={{ width: '150px', height: '150px' }}
          />
          <h3 className="text-capitalize">{weather.weather[0].description}</h3>
        </div>

        <div className="text-center">
          <div className="display-1 fw-bold">
            {Math.round(weather.main.temp)}{tempUnit}
          </div>
          <div className="fs-5">
            Feels like {Math.round(weather.main.feels_like)}{tempUnit}
          </div>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-6 col-md-3">
          <div className="weather-info-card p-3 rounded-3 shadow-sm">
            <WiHumidity size={40} />
            <div className="fs-4 fw-bold">{weather.main.humidity}%</div>
            <div className="text-muted">Humidity</div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="weather-info-card p-3 rounded-3 shadow-sm">
            <WiStrongWind size={40} />
            <div className="fs-4 fw-bold">{weather.wind.speed.toFixed(1)} {windUnit}</div>
            <div className="text-muted">Wind</div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="weather-info-card p-3 rounded-3 shadow-sm">
            <BsEye size={30} />
            <div className="fs-4 fw-bold">{visibilityValue} {visibilityUnit}</div>
            <div className="text-muted">Visibility</div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="weather-info-card p-3 rounded-3 shadow-sm">
            <WiBarometer size={40} />
            <div className="fs-4 fw-bold">{weather.main.pressure} hPa</div>
            <div className="text-muted">Pressure</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;