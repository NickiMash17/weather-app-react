export interface WeatherData {
  name: string
  dt: number
  weather: {
    description: string
    icon: string
    main: string
  }[]
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
  }
  wind: {
    speed: number
    deg: number
  }
  clouds: {
    all: number
  }
  visibility: number
  sys: {
    sunrise: number
    sunset: number
    country: string
  }
}

export interface ForecastItem {
  dt: number
  main: {
    temp: number
    temp_min: number
    temp_max: number
    humidity: number
  }
  weather: {
    description: string
    icon: string
    main: string
  }[]
  wind: {
    speed: number
  }
  clouds: {
    all: number
  }
}

export interface ForecastData {
  list: ForecastItem[]
  city: {
    name: string
    country: string
  }
}