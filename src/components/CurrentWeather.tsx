import { WeatherData } from '../types/weather';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { WiHumidity, WiStrongWind, WiBarometer, WiSunrise, WiSunset } from 'react-icons/wi';
import { format, fromUnixTime } from 'date-fns';

interface CurrentWeatherProps {
  data: WeatherData;
  units: 'metric' | 'imperial';
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const CurrentWeather = ({ data, units, isFavorite, onToggleFavorite }: CurrentWeatherProps) => {
  const temperatureUnit = units === 'metric' ? '°C' : '°F';
  const windUnit = units === 'metric' ? 'm/s' : 'mph';
  const visibilityUnit = units === 'metric' ? 'km' : 'mi';
  const visibilityValue = units === 'metric' 
    ? (data.details.visibility / 1000).toFixed(1)
    : (data.details.visibility / 1609).toFixed(1);

  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white border-opacity-20 animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="text-center md:text-left mb-6 md:mb-0">
          <div className="flex items-center justify-center md:justify-start">
            <h1 className="text-4xl font-bold text-white">
              {data.city}, {data.country}
            </h1>
            <button
              onClick={onToggleFavorite}
              className="ml-3 text-2xl text-yellow-400 hover:text-yellow-300 transition-colors duration-300"
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              {isFavorite ? <FaStar /> : <FaRegStar />}
            </button>
          </div>
          <p className="text-lg text-gray-200 mt-2">
            {format(fromUnixTime(data.time), 'EEEE, h:mm a')}
          </p>
          <p className="text-xl text-gray-200 mt-2 capitalize">
            {data.condition.description}
          </p>
        </div>

        <div className="flex items-center">
          <img
            src={`https://openweathermap.org/img/wn/${data.condition.icon}@4x.png`}
            alt={data.condition.description}
            className="w-32 h-32 object-contain"
          />
          <div className="ml-4">
            <div className="text-7xl font-bold text-white">
              {Math.round(data.temperature.current)}{temperatureUnit}
            </div>
            <p className="text-lg text-gray-200 mt-2">
              Feels like {Math.round(data.temperature.feels_like)}{temperatureUnit}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <div className="bg-white bg-opacity-10 rounded-xl p-4 flex flex-col items-center">
          <WiHumidity className="text-4xl text-blue-300" />
          <span className="text-2xl font-bold text-white mt-2">{data.details.humidity}%</span>
          <span className="text-gray-200 text-sm">Humidity</span>
        </div>
        <div className="bg-white bg-opacity-10 rounded-xl p-4 flex flex-col items-center">
          <WiStrongWind className="text-4xl text-blue-300" />
          <span className="text-2xl font-bold text-white mt-2">
            {Math.round(data.details.wind_speed)} {windUnit}
          </span>
          <span className="text-gray-200 text-sm">Wind</span>
        </div>
        <div className="bg-white bg-opacity-10 rounded-xl p-4 flex flex-col items-center">
          <WiBarometer className="text-4xl text-blue-300" />
          <span className="text-2xl font-bold text-white mt-2">{data.details.pressure} hPa</span>
          <span className="text-gray-200 text-sm">Pressure</span>
        </div>
        <div className="bg-white bg-opacity-10 rounded-xl p-4 flex flex-col items-center">
          <div className="text-4xl text-blue-300">👁️</div>
          <span className="text-2xl font-bold text-white mt-2">{visibilityValue} {visibilityUnit}</span>
          <span className="text-gray-200 text-sm">Visibility</span>
        </div>
      </div>

      <div className="flex justify-around mt-8">
        <div className="flex items-center text-white">
          <WiSunrise className="text-3xl mr-2" />
          <div>
            <p className="text-sm text-gray-300">Sunrise</p>
            <p className="font-medium">{format(fromUnixTime(data.details.sunrise), 'h:mm a')}</p>
          </div>
        </div>
        <div className="flex items-center text-white">
          <WiSunset className="text-3xl mr-2" />
          <div>
            <p className="text-sm text-gray-300">Sunset</p>
            <p className="font-medium">{format(fromUnixTime(data.details.sunset), 'h:mm a')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;