import { useState } from 'react';
export const useFavorites = () => {
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('favorites');
        return saved ? JSON.parse(saved) : [];
    });
    const addFavorite = (city) => {
        if (!favorites.includes(city)) {
            const updated = [...favorites, city];
            setFavorites(updated);
            localStorage.setItem('favorites', JSON.stringify(updated));
        }
    };
    const removeFavorite = (city) => {
        const updated = favorites.filter(fav => fav !== city);
        setFavorites(updated);
        localStorage.setItem('favorites', JSON.stringify(updated));
    };
    const isFavorite = (city) => favorites.includes(city);
    return { favorites, addFavorite, removeFavorite, isFavorite };
};
