import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useMemo } from 'react';
import axios from 'axios';
import { Box, Card, CardContent, Typography, IconButton, TextField, InputAdornment, LinearProgress, CircularProgress, Container, AppBar, Toolbar, Paper, useTheme, useMediaQuery, } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Search, LocationOn, WbSunny, Opacity, Air, Visibility, Settings, Navigation, } from '@mui/icons-material';
const getCondition = (icon) => {
    if (icon.includes('01d'))
        return 'sunny';
    if (icon.includes('01n'))
        return 'night';
    if (icon.includes('02') || icon.includes('03') || icon.includes('04'))
        return 'cloudy';
    if (icon.includes('09') || icon.includes('10'))
        return 'rainy';
    return 'cloudy';
};
const getDayName = (dt, timezone) => {
    return new Date((dt + timezone) * 1000).toLocaleDateString(undefined, { weekday: 'short' });
};
const getHour = (dt, timezone) => {
    return new Date((dt + timezone) * 1000).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
};
const WeatherApp = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [searchQuery, setSearchQuery] = useState('New York');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    // Dynamic background gradient based on weather condition
    const backgroundGradient = useMemo(() => {
        const gradients = {
            sunny: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FFD23F 100%)',
            cloudy: 'linear-gradient(135deg, #4A90E2 0%, #7B68EE 50%, #87CEEB 100%)',
            rainy: 'linear-gradient(135deg, #2C3E50 0%, #4A90E2 50%, #5DADE2 100%)',
            night: 'linear-gradient(135deg, #2D1B69 0%, #1A1A2E 50%, #16213E 100%)',
        };
        return gradients[weatherData?.condition || 'sunny'];
    }, [weatherData?.condition]);
    const fetchWeather = async (city) => {
        setLoading(true);
        setError(null);
        try {
            const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
            const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
            const [weatherRes, forecastRes] = await Promise.all([
                axios.get(weatherUrl),
                axios.get(forecastUrl)
            ]);
            const w = weatherRes.data;
            const f = forecastRes.data;
            // Map API data to dashboard structure
            const mapped = {
                location: `${w.name}, ${w.sys.country}`,
                temperature: Math.round(w.main.temp),
                feelsLike: Math.round(w.main.feels_like),
                description: w.weather[0].description,
                humidity: w.main.humidity,
                windSpeed: w.wind.speed,
                windDirection: w.wind.deg,
                visibility: Math.round(w.visibility / 1000),
                pressure: w.main.pressure,
                uvIndex: 6, // OpenWeatherMap free API does not provide UV index directly
                condition: getCondition(w.weather[0].icon),
                hourlyForecast: f.list.slice(0, 8).map((h) => ({
                    time: getHour(h.dt, f.city.timezone),
                    temperature: Math.round(h.main.temp),
                    precipitation: Math.round((h.pop || 0) * 100),
                    condition: getCondition(h.weather[0].icon),
                })),
                dailyForecast: [0, 8, 16, 24, 32].map((i) => {
                    const d = f.list[i];
                    return {
                        day: getDayName(d.dt, f.city.timezone),
                        high: Math.round(d.main.temp_max),
                        low: Math.round(d.main.temp_min),
                        condition: d.weather[0].description,
                        icon: d.weather[0].icon.includes('01d') ? '☀️' : d.weather[0].icon.includes('01n') ? '🌙' : d.weather[0].icon.includes('09') || d.weather[0].icon.includes('10') ? '🌧️' : d.weather[0].icon.includes('13') ? '❄️' : d.weather[0].icon.includes('50') ? '🌫️' : '⛅',
                    };
                })
            };
            setWeatherData(mapped);
        }
        catch {
            setError('City not found or API error.');
        }
        finally {
            setLoading(false);
        }
    };
    React.useEffect(() => {
        fetchWeather(searchQuery);
        // eslint-disable-next-line
    }, []);
    const handleSearch = async () => {
        if (!searchQuery.trim())
            return;
        fetchWeather(searchQuery);
    };
    // Weather detail items
    const weatherDetails = weatherData ? [
        {
            label: 'UV Index',
            value: weatherData.uvIndex,
            unit: '',
            icon: _jsx(WbSunny, {}),
            progress: (weatherData.uvIndex / 11) * 100,
            color: weatherData.uvIndex > 7 ? '#FF4444' : weatherData.uvIndex > 3 ? '#FFA500' : '#4CAF50'
        },
        {
            label: 'Humidity',
            value: weatherData.humidity,
            unit: '%',
            icon: _jsx(Opacity, {}),
            progress: weatherData.humidity,
            color: '#2196F3'
        },
        {
            label: 'Wind Speed',
            value: weatherData.windSpeed,
            unit: ' m/s',
            icon: _jsx(Air, {}),
            progress: (weatherData.windSpeed / 50) * 100,
            color: '#9C27B0'
        },
        {
            label: 'Visibility',
            value: weatherData.visibility,
            unit: ' km',
            icon: _jsx(Visibility, {}),
            progress: (weatherData.visibility / 15) * 100,
            color: '#00BCD4'
        },
    ] : [];
    return (_jsxs(Box, { sx: {
            minHeight: '100vh',
            background: backgroundGradient,
            position: 'relative',
            '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0,0,0,0.1)',
                backdropFilter: 'blur(1px)',
            }
        }, children: [_jsx(AppBar, { position: "sticky", sx: {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                }, children: _jsxs(Toolbar, { sx: { justifyContent: 'space-between' }, children: [_jsx(Typography, { variant: "h5", sx: {
                                fontWeight: 700,
                                background: 'linear-gradient(45deg, #fff, #f0f0f0)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }, children: "Atmosphere" }), _jsx(TextField, { size: "small", placeholder: "Search location...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), onKeyPress: (e) => e.key === 'Enter' && handleSearch(), sx: {
                                width: isMobile ? '200px' : '400px',
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: 'rgba(255,255,255,0.15)',
                                    backdropFilter: 'blur(10px)',
                                    borderRadius: '25px',
                                    '& fieldset': { border: 'none' },
                                    '& input': { color: 'white', '&::placeholder': { color: 'rgba(255,255,255,0.7)' } }
                                }
                            }, InputProps: {
                                endAdornment: (_jsx(InputAdornment, { position: "end", children: _jsx(IconButton, { onClick: handleSearch, sx: { color: 'white' }, children: _jsx(Search, {}) }) })),
                            } }), _jsx(IconButton, { sx: { color: 'white' }, children: _jsx(Settings, {}) })] }) }), _jsxs(Container, { maxWidth: "xl", sx: { py: 3, position: 'relative', zIndex: 1 }, children: [loading && (_jsx(Box, { display: "flex", justifyContent: "center", mb: 2, children: _jsx(CircularProgress, { sx: { color: 'white' } }) })), error && (_jsx(Box, { display: "flex", justifyContent: "center", mb: 2, children: _jsx(Typography, { color: "error", variant: "h6", children: error }) })), weatherData && (_jsxs(Grid, { container: true, spacing: 3, children: [_jsx(Grid, { item: true, xs: 12, md: 6, lg: 5, children: _jsx(Card, { sx: {
                                        background: 'rgba(255,255,255,0.1)',
                                        backdropFilter: 'blur(20px)',
                                        borderRadius: '24px',
                                        border: '1px solid rgba(255,255,255,0.2)',
                                        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                                        height: '400px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        position: 'relative',
                                        overflow: 'hidden',
                                    }, children: _jsxs(CardContent, { sx: { flex: 1, display: 'flex', flexDirection: 'column', p: 4 }, children: [_jsxs(Box, { display: "flex", alignItems: "center", mb: 2, children: [_jsx(LocationOn, { sx: { color: 'white', mr: 1 } }), _jsx(Typography, { variant: "h6", sx: { color: 'white', fontWeight: 500 }, children: weatherData.location })] }), _jsx(Box, { display: "flex", alignItems: "center", justifyContent: "center", flex: 1, children: _jsxs(Box, { textAlign: "center", children: [_jsxs(Typography, { variant: "h1", sx: {
                                                                fontSize: '72px',
                                                                fontWeight: 300,
                                                                color: 'white',
                                                                lineHeight: 0.8,
                                                                mb: 1
                                                            }, children: [weatherData.temperature, "\u00B0"] }), _jsxs(Typography, { variant: "h6", sx: { color: 'rgba(255,255,255,0.8)', mb: 1 }, children: ["Feels like ", weatherData.feelsLike, "\u00B0"] }), _jsx(Typography, { variant: "body1", sx: { color: 'rgba(255,255,255,0.9)' }, children: weatherData.description })] }) }), _jsx(Box, { sx: {
                                                    position: 'absolute',
                                                    top: 20,
                                                    right: 20,
                                                    fontSize: '60px',
                                                    opacity: 0.3,
                                                }, children: weatherData.condition === 'sunny' ? '☀️' : weatherData.condition === 'cloudy' ? '⛅' : weatherData.condition === 'rainy' ? '🌧️' : '🌙' })] }) }) }), _jsx(Grid, { item: true, xs: 12, md: 6, lg: 7, children: _jsx(Card, { sx: {
                                        background: 'rgba(255,255,255,0.1)',
                                        backdropFilter: 'blur(20px)',
                                        borderRadius: '24px',
                                        border: '1px solid rgba(255,255,255,0.2)',
                                        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                                        height: '400px',
                                    }, children: _jsxs(CardContent, { sx: { p: 4 }, children: [_jsx(Typography, { variant: "h6", sx: { color: 'white', mb: 3, fontWeight: 600 }, children: "5-Day Forecast" }), _jsx(Grid, { container: true, spacing: 2, children: weatherData.dailyForecast.map((day, index) => (_jsx(Grid, { item: true, xs: 12, sm: 6, md: 2, children: _jsxs(Paper, { sx: {
                                                            p: 2,
                                                            textAlign: 'center',
                                                            background: 'rgba(255,255,255,0.1)',
                                                            backdropFilter: 'blur(10px)',
                                                            borderRadius: '16px',
                                                            border: '1px solid rgba(255,255,255,0.1)',
                                                            cursor: 'pointer',
                                                            transition: 'all 0.3s ease',
                                                            '&:hover': {
                                                                transform: 'translateY(-4px)',
                                                                background: 'rgba(255,255,255,0.15)',
                                                            }
                                                        }, children: [_jsx(Typography, { variant: "subtitle2", sx: { color: 'white', mb: 1 }, children: day.day }), _jsx(Box, { sx: { fontSize: '32px', mb: 1 }, children: day.icon }), _jsx(Typography, { variant: "body2", sx: { color: 'rgba(255,255,255,0.8)', mb: 1 }, children: day.condition }), _jsxs(Box, { display: "flex", justifyContent: "space-between", children: [_jsxs(Typography, { variant: "body2", sx: { color: 'white', fontWeight: 600 }, children: [day.high, "\u00B0"] }), _jsxs(Typography, { variant: "body2", sx: { color: 'rgba(255,255,255,0.6)' }, children: [day.low, "\u00B0"] })] })] }) }, index))) })] }) }) }), _jsx(Grid, { item: true, xs: 12, children: _jsx(Card, { sx: {
                                        background: 'rgba(255,255,255,0.1)',
                                        backdropFilter: 'blur(20px)',
                                        borderRadius: '24px',
                                        border: '1px solid rgba(255,255,255,0.2)',
                                        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                                    }, children: _jsxs(CardContent, { sx: { p: 4 }, children: [_jsx(Typography, { variant: "h6", sx: { color: 'white', mb: 3, fontWeight: 600 }, children: "24-Hour Timeline" }), _jsx(Box, { sx: {
                                                    display: 'flex',
                                                    gap: 3,
                                                    overflowX: 'auto',
                                                    pb: 1,
                                                    '&::-webkit-scrollbar': {
                                                        height: '4px',
                                                    },
                                                    '&::-webkit-scrollbar-thumb': {
                                                        background: 'rgba(255,255,255,0.3)',
                                                        borderRadius: '2px',
                                                    }
                                                }, children: weatherData.hourlyForecast.map((hour, index) => (_jsxs(Box, { sx: {
                                                        minWidth: '80px',
                                                        textAlign: 'center',
                                                        p: 2,
                                                        borderRadius: '12px',
                                                        background: 'rgba(255,255,255,0.05)',
                                                        border: '1px solid rgba(255,255,255,0.1)',
                                                    }, children: [_jsx(Typography, { variant: "caption", sx: { color: 'rgba(255,255,255,0.8)' }, children: hour.time }), _jsx(Box, { sx: { fontSize: '24px', my: 1 }, children: hour.condition === 'sunny' ? '☀️' : hour.condition === 'cloudy' ? '⛅' : hour.condition === 'rainy' ? '🌧️' : '🌙' }), _jsxs(Typography, { variant: "body2", sx: { color: 'white', fontWeight: 600, mb: 1 }, children: [hour.temperature, "\u00B0"] }), _jsx(Box, { sx: { width: '100%', mb: 1 }, children: _jsx(LinearProgress, { variant: "determinate", value: hour.precipitation, sx: {
                                                                    height: 4,
                                                                    borderRadius: 2,
                                                                    backgroundColor: 'rgba(255,255,255,0.2)',
                                                                    '& .MuiLinearProgress-bar': {
                                                                        backgroundColor: '#2196F3',
                                                                    }
                                                                } }) }), _jsxs(Typography, { variant: "caption", sx: { color: 'rgba(255,255,255,0.6)' }, children: [hour.precipitation, "%"] })] }, index))) })] }) }) }), _jsx(Grid, { item: true, xs: 12, md: 6, lg: 5, children: _jsx(Card, { sx: {
                                        background: 'rgba(255,255,255,0.1)',
                                        backdropFilter: 'blur(20px)',
                                        borderRadius: '24px',
                                        border: '1px solid rgba(255,255,255,0.2)',
                                        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                                        height: '300px',
                                    }, children: _jsxs(CardContent, { sx: { p: 4 }, children: [_jsx(Typography, { variant: "h6", sx: { color: 'white', mb: 3, fontWeight: 600 }, children: "Weather Details" }), _jsx(Grid, { container: true, spacing: 3, children: weatherDetails.map((detail, index) => (_jsx(Grid, { item: true, xs: 6, children: _jsxs(Box, { children: [_jsxs(Box, { display: "flex", alignItems: "center", mb: 1, children: [React.cloneElement(detail.icon, {
                                                                        sx: { color: detail.color, fontSize: '20px', mr: 1 }
                                                                    }), _jsx(Typography, { variant: "caption", sx: { color: 'rgba(255,255,255,0.8)' }, children: detail.label })] }), _jsxs(Typography, { variant: "h6", sx: { color: 'white', fontWeight: 600, mb: 1 }, children: [detail.value, detail.unit] }), _jsx(LinearProgress, { variant: "determinate", value: detail.progress, sx: {
                                                                    height: 6,
                                                                    borderRadius: 3,
                                                                    backgroundColor: 'rgba(255,255,255,0.2)',
                                                                    '& .MuiLinearProgress-bar': {
                                                                        backgroundColor: detail.color,
                                                                        borderRadius: 3,
                                                                    }
                                                                } })] }) }, index))) })] }) }) }), _jsx(Grid, { item: true, xs: 12, md: 6, lg: 7, children: _jsx(Card, { sx: {
                                        background: 'rgba(255,255,255,0.1)',
                                        backdropFilter: 'blur(20px)',
                                        borderRadius: '24px',
                                        border: '1px solid rgba(255,255,255,0.2)',
                                        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                                        height: '300px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }, children: _jsx(CardContent, { children: _jsxs(Box, { textAlign: "center", children: [_jsx(Navigation, { sx: { fontSize: 48, color: 'rgba(255,255,255,0.6)', mb: 2 } }), _jsx(Typography, { variant: "h6", sx: { color: 'white', mb: 1 }, children: "Interactive Weather Map" }), _jsx(Typography, { variant: "body2", sx: { color: 'rgba(255,255,255,0.8)' }, children: "Radar, precipitation & temperature layers" })] }) }) }) })] }))] })] }));
};
export default WeatherApp;
