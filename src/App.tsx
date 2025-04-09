import React, { useState, useEffect } from 'react';
import { Container, Alert } from 'react-bootstrap';
import { useWeather } from './hooks/useWeather';
import { useFavorites } from './hooks/useFavorites';
import SearchBar from './components/SearchBar';
import NavTabs from './components/NavTabs';
import CurrentWeather from './components/CurrentWeather';
import HourlyForecast from './components/HourlyForecast';
import Forecast from './components/Forecast';
import WeatherDetails from './components/WeatherDetails';
import SettingsPanel from './components/SettingsPanel';
import WeatherChart from './components/WeatherChart';
import ParticleBackground from './components/ParticleBackground';
import { WeatherCondition, Unit } from './types/weather';
import { getWeatherCondition } from './utils/weatherUtils';
import './App.css';

const App: React.FC = () => {
  const [city, setCity] = useState<string>(() => {
    return localStorage.getItem('lastCity') || 'New York';
  });
  const [activeTab, setActiveTab] = useState('current');
  const [unit, setUnit] = useState<Unit>(() => {
    return (localStorage.getItem('units') as Unit) || 'metric';
  });
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });
  const [weatherCondition, setWeatherCondition] = useState<WeatherCondition>('clear');

  const { weather, forecast, loading, error, fetchWeatherByCoords } = useWeather(city, unit);
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    if (weather) {
      const condition = getWeatherCondition(weather.weather[0].icon);
      setWeatherCondition(condition);
    }
  }, [weather]);

  useEffect(() => {
    document.body.className = darkMode ? 'bg-dark text-light' : 'bg-light text-dark';
  }, [darkMode]);

  const handleSearch = (searchCity: string) => {
    setCity(searchCity);
  };

  const handleLocationSearch = (lat: number, lon: number) => {
    fetchWeatherByCoords(lat, lon);
  };

  const handleToggleFavorite = () => {
    if (!weather) return;
    if (isFavorite(weather.name)) {
      removeFavorite(weather.name);
    } else {
      addFavorite(weather.name);
    }
  };

  const handleUnitChange = (newUnit: Unit) => {
    setUnit(newUnit);
    localStorage.setItem('units', newUnit);
  };

  const handleDarkModeChange = (newDarkMode: boolean) => {
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', String(newDarkMode));
  };

  return (
    <div className={`app-container ${weatherCondition}`}>
      <ParticleBackground weatherCondition={weatherCondition} />
      
      <Container className="py-4">
        <div className={`weather-app p-4 rounded-4 shadow-lg ${darkMode ? 'bg-dark' : 'bg-light'}`}>
          <h1 className="text-center mb-4">Weather Forecast</h1>
          
          <SearchBar 
            onSearch={handleSearch} 
            onLocationSearch={handleLocationSearch} 
          />
          
          {loading && (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Loading weather data...</p>
            </div>
          )}
          
          {error && (
            <Alert variant="danger" className="text-center">
              {error}
            </Alert>
          )}
          
          {weather && forecast && !loading && (
            <>
              <NavTabs activeTab={activeTab} onSelect={setActiveTab} />
              
              {activeTab === 'current' && (
                <>
                  <CurrentWeather 
                    weather={weather} 
                    unit={unit} 
                    isFavorite={isFavorite(weather.name)} 
                    onToggleFavorite={handleToggleFavorite} 
                  />
                  <HourlyForecast 
                    hourlyData={forecast.list.slice(0, 12)} 
                    unit={unit} 
                  />
                </>
              )}
              
              {activeTab === 'forecast' && (
                <>
                  <Forecast forecast={forecast} unit={unit} />
                  <WeatherChart 
                    forecast={forecast} 
                    unit={unit} 
                    darkMode={darkMode} 
                  />
                </>
              )}
              
              {activeTab === 'details' && (
                <WeatherDetails weather={weather} />
              )}
              
              {activeTab === 'settings' && (
                <SettingsPanel 
                  unit={unit} 
                  onUnitChange={handleUnitChange} 
                  darkMode={darkMode} 
                  onDarkModeChange={handleDarkModeChange} 
                />
              )}
            </>
          )}
        </div>
        
        <footer className={`mt-4 p-3 text-center rounded-3 ${darkMode ? 'bg-secondary' : 'bg-light'}`}>
          <p className="m-0">
            This project was coded by{' '}
            <a href="https://github.com/Reney17" target="_blank" rel="noopener noreferrer">
              Nicolette Mashaba
            </a>, is{' '}
            <a href="https://github.com/Reney17/weather_app_vanilla.git" target="_blank" rel="noopener noreferrer">
              open-sourced on GitHub
            </a>{' '}
            and{' '}
            <a href="https://nicoweatherapp.netlify.app" target="_blank" rel="noopener noreferrer">
              hosted on Netlify
            </a>
          </p>
        </footer>
      </Container>
    </div>
  );
};

export default App;