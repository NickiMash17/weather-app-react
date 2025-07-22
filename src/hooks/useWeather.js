import { useState, useEffect } from 'react';
import axios from 'axios';
const API_KEY = '2344c92a7ff896b70d4ee84a698a321d';
export const useWeather = (city, unit) => {
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fetchWeather = async (city) => {
        setLoading(true);
        setError(null);
        try {
            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${unit}`;
            const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=${unit}`;
            const [weatherResponse, forecastResponse] = await Promise.all([
                axios.get(weatherUrl),
                axios.get(forecastUrl)
            ]);
            setWeather(weatherResponse.data);
            setForecast(forecastResponse.data);
            localStorage.setItem('lastCity', city);
        }
        catch (err) {
            setError('City not found. Please try another location.');
            console.error('Error fetching weather data:', err);
        }
        finally {
            setLoading(false);
        }
    };
    const fetchWeatherByCoords = async (lat, lon) => {
        setLoading(true);
        setError(null);
        try {
            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}`;
            const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}`;
            const [weatherResponse, forecastResponse] = await Promise.all([
                axios.get(weatherUrl),
                axios.get(forecastUrl)
            ]);
            setWeather(weatherResponse.data);
            setForecast(forecastResponse.data);
            localStorage.setItem('lastCity', weatherResponse.data.name);
        }
        catch (err) {
            setError('Unable to fetch weather for your location.');
            console.error('Error fetching weather data:', err);
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (city) {
            fetchWeather(city);
        }
    }, [city, unit]);
    return { weather, forecast, loading, error, fetchWeatherByCoords };
};
