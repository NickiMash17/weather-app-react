import { useState, useEffect } from 'react'

const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('favorites')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  const addFavorite = (city: string) => {
    if (!favorites.includes(city)) {
      setFavorites([...favorites, city])
    }
  }

  const removeFavorite = (city: string) => {
    setFavorites(favorites.filter(fav => fav !== city))
  }

  return { favorites, addFavorite, removeFavorite }
}

export default useFavorites