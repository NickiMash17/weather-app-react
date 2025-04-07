import { motion } from 'framer-motion';
import WeatherIcon from './WeatherIcon';
import WeatherChart from '../components/WeatherChart';
import { ForecastData, HourlyForecast } from '../types/weather';

interface ForecastProps {
  data?: ForecastData[];
  hourlyData?: HourlyForecast[];
  units: 'metric' | 'imperial';
}

const Forecast = ({ data, hourlyData, units }: ForecastProps) => {
  if (!data || !hourlyData) return null;

  return (
    <div className="forecast-container">
      <h2>5-Day Forecast</h2>
      
      <div className="hourly-forecast-container">
        <h3>Next 12 Hours</h3>
        <div className="hourly-items">
          {hourlyData.map((hour) => (
            <motion.div
              key={hour.dt}
              className="hourly-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="hourly-time">
                {new Date(hour.dt).toLocaleTimeString([], { hour: '2-digit' })}
              </div>
              <WeatherIcon icon={hour.weather.icon} size={36} />
              <div className="hourly-temp">
                {hour.temp}°{units === 'metric' ? 'C' : 'F'}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="daily-forecast-container">
        {data.map((day) => (
          <motion.div
            key={day.dt}
            className="forecast-day"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="forecast-date">
              {new Date(day.dt).toLocaleDateString([], { weekday: 'short' })}
            </div>
            <WeatherIcon icon={day.weather.icon} size={48} />
            <div className="forecast-temps">
              <span className="temp-max">{day.temp_max}°</span>
              <span className="temp-min">{day.temp_min}°</span>
            </div>
          </motion.div>
        ))}
      </div>

      <WeatherChart data={data} units={units} />
    </div>
  );
};

export default Forecast;