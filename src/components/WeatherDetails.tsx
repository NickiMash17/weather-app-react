import React from 'react';
import { WeatherData } from '../types/weather';
import { WiSunrise, WiSunset, WiHumidity, WiStrongWind, WiBarometer } from 'react-icons/wi';
import { BsThermometer, BsEye, BsCloud } from 'react-icons/bs';
import { formatTime } from '../utils/weatherUtils';

interface WeatherDetailsProps {
  weather: WeatherData;
}

const WeatherDetails: React.FC<WeatherDetailsProps> = ({ weather }) => {
  return (
    <div className="weather-details">
      <h3 className="mb-4">Weather Details</h3>
      <div className="row g-3">
        <div className="col-md-6">
          <div className="detail-card p-3 rounded-3 shadow-sm">
            <div className="d-flex align-items-center mb-2">
              <WiSunrise size={30} className="me-3" />
              <div>
                <div className="text-muted small">Sunrise</div>
                <div className="fw-bold">{formatTime(new Date(weather.sys.sunrise * 1000))}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="detail-card p-3 rounded-3 shadow-sm">
            <div className="d-flex align-items-center mb-2">
              <WiSunset size={30} className="me-3" />
              <div>
                <div className="text-muted small">Sunset</div>
                <div className="fw-bold">{formatTime(new Date(weather.sys.sunset * 1000))}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="detail-card p-3 rounded-3 shadow-sm">
            <div className="d-flex align-items-center mb-2">
              <BsCloud size={20} className="me-3" />
              <div>
                <div className="text-muted small">Cloudiness</div>
                <div className="fw-bold">{weather.clouds.all}%</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="detail-card p-3 rounded-3 shadow-sm">
            <div className="d-flex align-items-center mb-2">
              <WiHumidity size={30} className="me-3" />
              <div>
                <div className="text-muted small">Humidity</div>
                <div className="fw-bold">{weather.main.humidity}%</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="detail-card p-3 rounded-3 shadow-sm">
            <div className="d-flex align-items-center mb-2">
              <WiStrongWind size={30} className="me-3" />
              <div>
                <div className="text-muted small">Wind Speed</div>
                <div className="fw-bold">{weather.wind.speed.toFixed(1)} m/s</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="detail-card p-3 rounded-3 shadow-sm">
            <div className="d-flex align-items-center mb-2">
              <WiBarometer size={30} className="me-3" />
              <div>
                <div className="text-muted small">Pressure</div>
                <div className="fw-bold">{weather.main.pressure} hPa</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;