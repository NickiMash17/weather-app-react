import { motion } from 'framer-motion';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { WeatherData } from '../types/weather';
import WeatherIcon from '../components/WeatherIcon';

type CurrentWeatherProps = {
  data?: WeatherData;
  units: 'metric' | 'imperial';
  isFavorite: boolean;
  onFavoriteToggle: () => void;
};

const CurrentWeather = ({ data, units, isFavorite, onFavoriteToggle }: CurrentWeatherProps) => {
  if (!data) return null;

  const windUnit = units === 'metric' ? 'm/s' : 'mph';
  const tempUnit = units === 'metric' ? '°C' : '°F';

  return (
    <div className="current-weather">
      <motion.div 
        className="weather-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="city-info">
          <h1>
            {data.city}, {data.country}
            <button 
              className="favorite-btn"
              onClick={onFavoriteToggle}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              {isFavorite ? <FaStar /> : <FaRegStar />}
            </button>
          </h1>
          <p className="weather-description">{data.weather.description}</p>
          <p className="weather-details">
            Humidity: {data.humidity}% • Wind: {data.wind_speed} {windUnit}
          </p>
        </div>
      </motion.div>

      <motion.div 
        className="weather-main"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="temperature-display">
          <WeatherIcon icon={data.weather.icon} size={120} />
          <div className="temp-value">
            {data.temp}
            <span className="temp-unit">{tempUnit}</span>
          </div>
        </div>

        <div className="weather-feels-like">
          Feels like: {data.feels_like}{tempUnit}
        </div>
      </motion.div>
    </div>
  );
};

export default CurrentWeather;