import { useState } from 'react';
import { FaSearch, FaLocationArrow } from 'react-icons/fa';

interface SearchBarProps {
  onSearch: (city: string) => void;
  onLocationClick: () => void;
  favorites: string[];
  onFavoriteClick: (city: string) => void;
}

const SearchBar = ({ onSearch, onLocationClick, favorites, onFavoriteClick }: SearchBarProps) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput);
      setSearchInput('');
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search for a city..."
            className="search-input"
          />
        </div>
        <button type="submit" className="search-button">
          <FaSearch /> Search
        </button>
        <button
          type="button"
          className="location-button"
          onClick={onLocationClick}
          aria-label="Use current location"
        >
          <FaLocationArrow />
        </button>
      </form>

      {favorites.length > 0 && (
        <div className="favorite-cities">
          {favorites.map((city) => (
            <button
              key={city}
              className="favorite-city"
              onClick={() => onFavoriteClick(city)}
            >
              {city}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;