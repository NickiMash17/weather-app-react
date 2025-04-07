import { useState, useEffect } from 'react';
import { WeatherCondition } from './types/weather';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import HourlyForecast from './components/HourlyForecast';
import WeatherChart from './components/WeatherChart';
import ParticleBackground from './components/ParticleBackground';
import NavTabs from './components/NavTabs';
import Forecast from './components/Forecast';
import WeatherDetails from './components/WeatherDetails';
import SettingsPanel from './components/SettingsPanel';
import { useWeather } from './hooks/useWeather';
import { useFavorites } from './hooks/useFavorites';
import { useCurrentLocation } from './hooks/useCurrentLocation';

const App = () => {
  const [city, setCity] = useState<string>('New York');
  const [units, setUnits] = useState<'metric' | 'imperial'>('metric');
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('current');
  
  const { weather, forecast, hourlyForecast, loading, error, weatherCondition } = useWeather(city, units);
  const { favorites, isFavorite, toggleFavorite } = useFavorites(city);
  const { getCurrentLocation } = useCurrentLocation(setCity);

  useEffect(() => {
    // Set dark mode based on user preference or localStorage
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(savedDarkMode || prefersDark);
    
    // Set units from localStorage
    const savedUnits = localStorage.getItem('units') as 'metric' | 'imperial' | null;
    if (savedUnits) setUnits(savedUnits);
    
    // Set last city from localStorage
    const lastCity = localStorage.getItem('lastCity');
    if (lastCity) setCity(lastCity);
  }, []);

  useEffect(() => {
    // Apply dark mode class to body
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  const handleSearch = (searchCity: string) => {
    setCity(searchCity);
    localStorage.setItem('lastCity', searchCity);
  };

  const handleLocationClick = () => {
    getCurrentLocation();
  };

  const handleToggleFavorite = () => {
    toggleFavorite();
  };

  const handleUnitsChange = (newUnits: 'metric' | 'imperial') => {
    setUnits(newUnits);
    localStorage.setItem('units', newUnits);
  };

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-100 to-blue-300'}`}>
      <ParticleBackground weatherCondition={weatherCondition} />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <SearchBar onSearch={handleSearch} onLocationClick={handleLocationClick} />
        
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-50"></div>
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
            <p>{error}</p>
          </div>
        )}
        
        {weather && (
          <>
            <NavTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            
            {activeTab === 'current' && (
              <>
                <CurrentWeather
                  data={weather}
                  units={units}
                  isFavorite={isFavorite}
                  onToggleFavorite={handleToggleFavorite}
                />
                <HourlyForecast data={hourlyForecast} units={units} />
                <WeatherChart forecast={forecast} units={units} darkMode={darkMode} />
              </>
            )}
            
            {activeTab === 'forecast' && (
              <Forecast forecast={forecast} units={units} />
            )}
            
            {activeTab === 'details' && weather && (
              <WeatherDetails weather={weather} units={units} />
            )}
            
            {activeTab === 'settings' && (
              <SettingsPanel
                units={units}
                onUnitsChange={handleUnitsChange}
                darkMode={darkMode}
                onDarkModeToggle={handleDarkModeToggle}
                favorites={favorites}
                onFavoriteClick={handleSearch}
                onRemoveFavorite={toggleFavorite}
              />
            )}
          </>
        )}
        
        <footer className={`mt-12 py-6 border-t ${darkMode ? 'border-gray-700 text-gray-300' : 'border-gray-200 text-gray-600'}`}>
          <div className="text-center">
            <p>
              This project was coded by{' '}
              <a
                href="https://github.com/Reney17"
                target="_blank"
                rel="noopener noreferrer"
                className={`font-semibold ${darkMode ? 'text-blue-300 hover:text-blue-200' : 'text-blue-600 hover:text-blue-500'}`}
              >
                Nicolette Mashaba
              </a>
              , is{' '}
              <a
                href="https://github.com/Reney17/weather_app_vanilla.git"
                target="_blank"
                rel="noopener noreferrer"
                className={`font-semibold ${darkMode ? 'text-blue-300 hover:text-blue-200' : 'text-blue-600 hover:text-blue-500'}`}
              >
                open-sourced on GitHub
              </a>{' '}
              and{' '}
              <a
                href="https://nicoweatherapp.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
                className={`font-semibold ${darkMode ? 'text-blue-300 hover:text-blue-200' : 'text-blue-600 hover:text-blue-500'}`}
              >
                hosted on Netlify
              </a>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;