import { FaSearch, FaLocationArrow, FaStar } from 'react-icons/fa'
import { useState } from 'react'
import './SearchBar.css'

interface SearchBarProps {
  onSearch: (city: string) => void
  onLocationClick: () => void
  favorites: string[]
  onFavoriteClick: (city: string) => void
}

const SearchBar = ({ onSearch, onLocationClick, favorites, onFavoriteClick }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim())
      setSearchTerm('')
    }
  }

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search for a city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
          {favorites.map(city => (
            <button 
              key={city} 
              className="favorite-city"
              onClick={() => onFavoriteClick(city)}
            >
              {city} <FaStar className="favorite-star" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchBar