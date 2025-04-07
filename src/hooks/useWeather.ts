import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  WeatherData, 
  ForecastData, 
  HourlyForecast,
  WeatherApiResponse,
  ForecastApiResponse,
  ForecastItem
} from '../types/weather';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || '2344c92a7ff896b70d4ee84a698a321d';

export const useWeather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData[]>([]);
  const [hourlyData, setHourlyData] = useState<HourlyForecast[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [units, setUnits] = useState<'metric' | 'imperial'>(
    (localStorage.getItem('units') as 'metric' | 'imperial') || 'metric'
  );

  useEffect(() => {
    const lastCity = localStorage.getItem('lastCity');
    if (lastCity) {
      searchCity(lastCity);
    }
  }, [units]);

  const searchCity = async (city: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const [weatherRes, forecastRes] = await Promise.all([
        axios.get<WeatherApiResponse>(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`
        ),
        axios.get<ForecastApiResponse>(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=${units}`
        )
      ]);

      if (String(weatherRes.data.cod) === '200' && String(forecastRes.data.cod) === '200') {
        setWeatherData(transformWeatherData(weatherRes.data));
        setForecastData(transformForecastData(forecastRes.data.list));
        setHourlyData(transformHourlyData(forecastRes.data.list));
        localStorage.setItem('lastCity', city);
      } else {
        throw new Error(
          typeof weatherRes.data.message === 'string' 
            ? weatherRes.data.message 
            : 'Unknown error'
        );
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Failed to fetch weather data');
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
      console.error('Error fetching weather:', err);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherByLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            setLoading(true);
            const { latitude, longitude } = position.coords;
            const [weatherRes, forecastRes] = await Promise.all([
              axios.get<WeatherApiResponse>(
                `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=${units}`
              ),
              axios.get<ForecastApiResponse>(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=${units}`
              )
            ]);

            if (String(weatherRes.data.cod) === '200' && String(forecastRes.data.cod) === '200') {
              setWeatherData(transformWeatherData(weatherRes.data));
              setForecastData(transformForecastData(forecastRes.data.list));
              setHourlyData(transformHourlyData(forecastRes.data.list));
              localStorage.setItem('lastCity', weatherRes.data.name);
            }
          } catch (err) {
            setError('Failed to fetch weather data');
            console.error('Error fetching weather:', err);
          } finally {
            setLoading(false);
          }
        },
        (err: GeolocationPositionError) => {
          setError('Please enable location access to use this feature');
          console.error('Geolocation error:', err);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser');
    }
  };

  const transformWeatherData = (data: WeatherApiResponse): WeatherData => {
    const weather = data.weather?.[0] || {
      id: 0,
      main: '',
      description: '',
      icon: '01d'
    };

    return {
      city: data.name || 'Unknown',
      country: data.sys?.country || '',
      temp: Math.round(data.main?.temp || 0),
      feels_like: Math.round(data.main?.feels_like || 0),
      humidity: data.main?.humidity || 0,
      pressure: data.main?.pressure || 0,
      wind_speed: Math.round(data.wind?.speed || 0),
      wind_deg: data.wind?.deg || 0,
      visibility: (data.visibility || 0) / 1000,
      sunrise: (data.sys?.sunrise || 0) * 1000,
      sunset: (data.sys?.sunset || 0) * 1000,
      weather: {
        main: weather.main,
        description: weather.description,
        icon: weather.icon
      },
      dt: (data.dt || 0) * 1000,
      timezone: data.timezone || 0
    };
  };

  const transformForecastData = (list: ForecastItem[]): ForecastData[] => {
    const dailyData: ForecastData[] = [];
    for (let i = 0; i < list.length && dailyData.length < 5; i += 8) {
      const item = list[i];
      const weather = item.weather?.[0] || {
        main: '',
        description: '',
        icon: '01d'
      };

      dailyData.push({
        dt: (item.dt || 0) * 1000,
        temp: Math.round(item.main?.temp || 0),
        temp_min: Math.round(item.main?.temp_min || 0),
        temp_max: Math.round(item.main?.temp_max || 0),
        weather: {
          main: weather.main,
          description: weather.description,
          icon: weather.icon
        }
      });
    }
    return dailyData;
  };

  const transformHourlyData = (list: ForecastItem[]): HourlyForecast[] => {
    return list.slice(0, 12).map(item => {
      const weather = item.weather?.[0] || {
        main: '',
        description: '',
        icon: '01d'
      };

      return {
        dt: (item.dt || 0) * 1000,
        temp: Math.round(item.main?.temp || 0),
        weather: {
          main: weather.main,
          description: weather.description,
          icon: weather.icon
        }
      };
    });
  };

  return {
    weatherData,
    forecastData,
    hourlyData,
    loading,
    error,
    searchCity,
    getWeatherByLocation,
    units,
    setUnits: (newUnits: 'metric' | 'imperial') => {
      setUnits(newUnits);
      localStorage.setItem('units', newUnits);
      if (weatherData?.city) {
        searchCity(weatherData.city);
      }
    }
  };
};