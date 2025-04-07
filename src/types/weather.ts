// src/types/weather.ts

export interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
  }
  
  export interface MainWeatherData {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number;
    grnd_level?: number;
  }
  
  export interface Wind {
    speed: number;
    deg: number;
    gust?: number;
  }
  
  export interface Clouds {
    all: number;
  }
  
  export interface Sys {
    type?: number;
    id?: number;
    country?: string;
    sunrise?: number;
    sunset?: number;
  }
  
  export interface WeatherApiResponse {
    coord?: {
      lon: number;
      lat: number;
    };
    weather: Weather[];
    base?: string;
    main: MainWeatherData;
    visibility?: number;
    wind: Wind;
    clouds: Clouds;
    rain?: {
      '1h'?: number;
      '3h'?: number;
    };
    snow?: {
      '1h'?: number;
      '3h'?: number;
    };
    dt: number;
    sys: Sys;
    timezone?: number;
    id?: number;
    name: string;
    cod: number | string;
    message?: string;
  }
  
  export interface ForecastItem {
    dt: number;
    main: MainWeatherData;
    weather: Weather[];
    clouds: Clouds;
    wind: Wind;
    visibility: number;
    pop?: number;
    rain?: {
      '3h'?: number;
    };
    snow?: {
      '3h'?: number;
    };
    sys?: {
      pod?: string;
    };
    dt_txt: string;
  }
  
  export interface ForecastApiResponse {
    cod: string;
    message: number | string;
    cnt: number;
    list: ForecastItem[];
    city: {
      id: number;
      name: string;
      coord: {
        lat: number;
        lon: number;
      };
      country: string;
      population?: number;
      timezone?: number;
      sunrise?: number;
      sunset?: number;
    };
  }
  
  export interface WeatherData {
    city: string;
    country: string;
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
    wind_speed: number;
    wind_deg: number;
    visibility: number;
    sunrise: number;
    sunset: number;
    weather: Weather;
    dt: number;
    timezone: number;
  }
  
  export interface ForecastData {
    dt: number;
    temp: number;
    temp_min: number;
    temp_max: number;
    weather: Weather;
  }
  
  export interface HourlyForecast {
    dt: number;
    temp: number;
    weather: Weather;
  }
  // Add this interface
export interface ForecastItem {
    dt: number;
    main: MainWeatherData;
    weather: Weather[];
    clouds: Clouds;
    wind: Wind;
    visibility: number;
    pop?: number;
    rain?: {
      '3h'?: number;
    };
    snow?: {
      '3h'?: number;
    };
    sys?: {
      pod?: string;
    };
    dt_txt: string;
  }
  
  // Update ForecastApiResponse to use ForecastItem
  export interface ForecastApiResponse {
    cod: string;
    message: number | string;
    cnt: number;
    list: ForecastItem[];
    city: {
      id: number;
      name: string;
      coord: {
        lat: number;
        lon: number;
      };
      country: string;
      population?: number;
      timezone?: number;
      sunrise?: number;
      sunset?: number;
    };
  }
  export interface ForecastItem {
    dt: number;
    main: MainWeatherData;
    weather: Weather[];
    clouds: Clouds;
    wind: Wind;
    visibility: number;
    pop?: number;
    rain?: { '3h'?: number };
    snow?: { '3h'?: number };
    sys?: { pod?: string };
    dt_txt: string;
  }