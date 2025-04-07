import { WeatherData } from '../types/weather'
import { FaStar, FaRegStar } from 'react-icons/fa'
import { WiHumidity, WiStrongWind, WiBarometer, WiSunrise, WiSunset } from 'react-icons/wi'
import { getWeatherIcon } from '../utils/weatherIcons'
import './CurrentWeather.css'

interface CurrentWeatherProps {
  weather: WeatherData
  units: 'metric' | 'imperial'
  isFavorite: boolean
  onToggleFavorite: () => void
}

const CurrentWeather = ({ weather, units, isFavorite, onToggleFavorite }: CurrentWeatherProps) => {
  const date = new Date(weather.dt * 1000)
  const sunrise = new Date(weather.sys.sunrise * 1000)
  const sunset = new Date(weather.sys.sunset * 1000)
  
  const tempUnit = units === 'metric' ? '°C' : '°F'
  const windUnit = units === 'metric' ? 'm/s' : 'mph'
  
  return (
    <div className="current-weather">
      <div className="weather-header">
        <h1 className="city-name">
          {weather.name}, {weather.sys.country}
          <button 
            className={`favorite-button ${isFavorite ? 'active' : ''}`}
            onClick={onToggleFavorite}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorite ? <FaStar /> : <FaRegStar />}
          </button>
        </h1>
        <p className="weather-description">
          {weather.weather[0].description}
        </p>
        <p className="weather-date">
          {date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
      </div>
      
      <div className="weather-main">
        <div className="temperature-section">
          <div className="weather-icon">
            {getWeatherIcon(weather.weather[0].icon)}
          </div>
          <div className="temperature">
            {Math.round(weather.main.temp)}{tempUnit}
          </div>
          <div className="feels-like">
            Feels like: {Math.round(weather.main.feels_like)}{tempUnit}
          </div>
        </div>
        
        <div className="weather-details">
          <div className="detail-item">
            <WiHumidity className="detail-icon" />
            <span className="detail-value">{weather.main.humidity}%</span>
            <span className="detail-label">Humidity</span>
          </div>
          
          <div className="detail-item">
            <WiStrongWind className="detail-icon" />
            <span className="detail-value">
              {Math.round(weather.wind.speed)} {windUnit}
            </span>
            <span className="detail-label">Wind</span>
          </div>
          
          <div className="detail-item">
            <WiBarometer className="detail-icon" />
            <span className="detail-value">{weather.main.pressure} hPa</span>
            <span className="detail-label">Pressure</span>
          </div>
          
          <div className="detail-item">
            <WiSunrise className="detail-icon" />
            <span className="detail-value">
              {sunrise.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
            <span className="detail-label">Sunrise</span>
          </div>
          
          <div className="detail-item">
            <WiSunset className="detail-icon" />
            <span className="detail-value">
              {sunset.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
            <span className="detail-label">Sunset</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CurrentWeather