import React, { useState, FormEvent } from 'react';
import { FaSearch, FaLocationArrow } from 'react-icons/fa';
import { useCurrentLocation } from '../hooks/useCurrentLocation';

interface SearchBarProps {
  onSearch: (city: string) => void;
  onLocationSearch: (lat: number, lon: number) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onLocationSearch }) => {
  const [city, setCity] = useState('');
  const { getCurrentLocation, locationError, isLocating } = useCurrentLocation();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
    }
  };

  const handleLocationClick = async () => {
    try {
      const { lat, lon } = await getCurrentLocation();
      onLocationSearch(lat, lon);
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

  return (
    <div className="search-container mb-4">
      <form onSubmit={handleSubmit} className="d-flex align-items-center gap-3">
        <div className="position-relative flex-grow-1">
          <FaSearch className="position-absolute top-50 start-3 translate-middle-y text-muted" />
          <input
            type="search"
            placeholder="Search for a city..."
            className="form-control ps-5 py-3 rounded-pill shadow-sm"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <button 
          type="submit" 
          className="btn btn-primary rounded-pill px-4 py-3 shadow-sm"
        >
          <FaSearch className="me-2" /> Search
        </button>
        <button
          type="button"
          className="btn btn-outline-primary rounded-circle p-3 shadow-sm"
          onClick={handleLocationClick}
          disabled={isLocating}
          title="Use current location"
        >
          <FaLocationArrow />
        </button>
      </form>
      {locationError && <div className="text-danger mt-2">{locationError}</div>}
    </div>
  );
};

export default SearchBar;