import { WeatherCondition } from '../types/weather';

export const formatDate = (date: Date): string => {
  return date.toLocaleString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
};

export const formatDay = (date: Date): string => {
  return date.toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
};

export const formatTime = (date: Date): string => {
  return date.toLocaleString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

export const getWeatherCondition = (icon: string): WeatherCondition => {
  if (icon.includes('01d')) return 'clear';
  if (icon.includes('01n')) return 'night';
  if (icon.includes('02d') || icon.includes('03') || icon.includes('04')) return 'cloudy';
  if (icon.includes('09') || icon.includes('10')) return 'rainy';
  if (icon.includes('11')) return 'thunderstorm';
  if (icon.includes('13')) return 'snow';
  if (icon.includes('50')) return 'mist';
  return 'clear';
};