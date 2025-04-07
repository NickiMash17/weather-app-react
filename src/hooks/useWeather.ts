import { WeatherData, ForecastData } from '../types/weather'

const API_KEY = '2344c92a7ff896b70d4ee84a698a321d'

export const fetchWeather = async (city: string, units: 'metric' | 'imperial' = 'metric'): Promise<WeatherData> => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`
  )
  const data = await response.json()
  
  if (data.cod !== 200) {
    throw new Error(data.message || 'Failed to fetch weather data')
  }
  
  return {
    name: data.name,
    dt: data.dt,
    weather: data.weather.map((w: any) => ({
      description: w.description,
      icon: w.icon,
      main: w.main
    })),
    main: {
      temp: data.main.temp,
      feels_like: data.main.feels_like,
      temp_min: data.main.temp_min,
      temp_max: data.main.temp_max,
      pressure: data.main.pressure,
      humidity: data.main.humidity
    },
    wind: {
      speed: data.wind.speed,
      deg: data.wind.deg
    },
    clouds: {
      all: data.clouds.all
    },
    visibility: data.visibility,
    sys: {
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,
      country: data.sys.country
    }
  }
}

export const fetchForecast = async (city: string, units: 'metric' | 'imperial' = 'metric'): Promise<ForecastData> => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=${units}`
  )
  const data = await response.json()
  
  if (data.cod !== '200') {
    throw new Error(data.message || 'Failed to fetch forecast data')
  }
  
  return {
    list: data.list.map((item: any) => ({
      dt: item.dt,
      main: {
        temp: item.main.temp,
        temp_min: item.main.temp_min,
        temp_max: item.main.temp_max,
        humidity: item.main.humidity
      },
      weather: item.weather.map((w: any) => ({
        description: w.description,
        icon: w.icon,
        main: w.main
      })),
      wind: {
        speed: item.wind.speed
      },
      clouds: {
        all: item.clouds.all
      }
    })),
    city: {
      name: data.city.name,
      country: data.city.country
    }
  }
}