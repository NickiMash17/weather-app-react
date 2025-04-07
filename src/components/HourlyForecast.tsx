import { HourlyForecast } from '../types/weather';
import { format, fromUnixTime } from 'date-fns';

interface HourlyForecastProps {
  data: HourlyForecast[];
  units: 'metric' | 'imperial';
}

const HourlyForecast = ({ data, units }: HourlyForecastProps) => {
  const temperatureUnit = units === 'metric' ? '°C' : '°F';

  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white border-opacity-20 mt-6 animate-fadeIn">
      <h2 className="text-2xl font-bold text-white mb-4">Hourly Forecast</h2>
      <div className="flex overflow-x-auto pb-4 -mx-2">
        {data.map((hour, index) => (
          <div
            key={index}
            className="flex-shrink-0 bg-white bg-opacity-10 rounded-xl p-4 mx-2 min-w-[100px] text-center transition-all duration-300 hover:bg-opacity-20 hover:scale-105"
          >
            <p className="text-gray-200 text-sm">
              {format(fromUnixTime(hour.time), 'h a')}
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${hour.condition.icon}@2x.png`}
              alt={hour.condition.description}
              className="w-16 h-16 mx-auto my-2"
            />
            <p className="text-xl font-bold text-white">
              {Math.round(hour.temperature)}{temperatureUnit}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;