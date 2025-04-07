import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWeather } from './hooks/useWeather';
import { useFavorites } from './hooks/useFavorites';
import NavTabs from './components/NavTabs';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import WeatherDetails from './components/WeatherDetails';
import SettingsPanel from './components/SettingsPanel';
import SearchBar from './components/SearchBar';
import ParticleBackground from './components/ParticleBackground';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/main.css';

const App = () => {
  const [activeTab, setActiveTab] = useState('current');
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const {
    weatherData,
    forecastData,
    hourlyData,
    loading,
    error,
    searchCity,
    getWeatherByLocation,
    units,
    setUnits,
  } = useWeather();

  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`app-container ${darkMode ? 'dark' : 'light'}`}>
      <ParticleBackground weatherCondition={weatherData?.weather[0].icon} />
      
      <motion.div 
        className="app"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <SearchBar 
          onSearch={searchCity} 
          onLocationClick={getWeatherByLocation}
          favorites={favorites}
          onFavoriteClick={searchCity}
        />

        <NavTabs activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="tab-content">
          <AnimatePresence mode="wait">
            {activeTab === 'current' && (
              <motion.div
                key="current"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CurrentWeather 
                  data={weatherData} 
                  units={units}
                  isFavorite={isFavorite(weatherData?.name)}
                  onFavoriteToggle={() => weatherData?.name && 
                    (isFavorite(weatherData.name) 
                      ? removeFavorite(weatherData.name) 
                      : addFavorite(weatherData.name))}
                />
              </motion.div>
            )}

            {activeTab === 'forecast' && (
              <motion.div
                key="forecast"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Forecast data={forecastData} hourlyData={hourlyData} units={units} />
              </motion.div>
            )}

            {activeTab === 'details' && (
              <motion.div
                key="details"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <WeatherDetails data={weatherData} />
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <SettingsPanel 
                  darkMode={darkMode}
                  onDarkModeToggle={toggleDarkMode}
                  units={units}
                  onUnitsChange={setUnits}
                  favorites={favorites}
                  onRemoveFavorite={removeFavorite}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default App;