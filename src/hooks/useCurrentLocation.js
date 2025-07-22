import { useState } from 'react';
export const useCurrentLocation = () => {
    const [locationError, setLocationError] = useState(null);
    const [isLocating, setIsLocating] = useState(false);
    const getCurrentLocation = () => {
        return new Promise((resolve, reject) => {
            setIsLocating(true);
            setLocationError(null);
            if (!navigator.geolocation) {
                setLocationError('Geolocation is not supported by your browser');
                setIsLocating(false);
                reject(new Error('Geolocation not supported'));
                return;
            }
            navigator.geolocation.getCurrentPosition((position) => {
                setIsLocating(false);
                resolve({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                });
            }, (error) => {
                setIsLocating(false);
                let message = 'Unable to retrieve your location';
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        message = 'Location access was denied';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        message = 'Location information is unavailable';
                        break;
                    case error.TIMEOUT:
                        message = 'The request to get location timed out';
                        break;
                }
                setLocationError(message);
                reject(error);
            });
        });
    };
    return { getCurrentLocation, locationError, isLocating };
};
