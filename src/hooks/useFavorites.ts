import { useState, useEffect } from 'react';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (city: string) => {
    if (!favorites.includes(city)) {
      setFavorites([...favorites, city]);
    }
  };

  const removeFavorite = (city: string) => {
    setFavorites(favorites.filter(fav => fav !== city));
  };

  const isFavorite = (city?: string) => {
    return city ? favorites.includes(city) : false;
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite
  };
};