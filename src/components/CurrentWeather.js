import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, Typography, Box, Divider } from '@mui/material';
import Grid from '@mui/material/Grid';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import CloudIcon from '@mui/icons-material/Cloud';
import OpacityIcon from '@mui/icons-material/Opacity';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
function getWeatherIcon(main) {
    switch (main.toLowerCase()) {
        case 'clear': return _jsx(WbSunnyIcon, { sx: { fontSize: 80, color: '#fbc02d' } });
        case 'clouds': return _jsx(CloudIcon, { sx: { fontSize: 80, color: '#90a4ae' } });
        case 'snow': return _jsx(AcUnitIcon, { sx: { fontSize: 80, color: '#90caf9' } });
        case 'rain':
        case 'drizzle': return _jsx(OpacityIcon, { sx: { fontSize: 80, color: '#4fc3f7' } });
        case 'thunderstorm': return _jsx(CloudIcon, { sx: { fontSize: 80, color: '#616161' } });
        default: return _jsx(WbSunnyIcon, { sx: { fontSize: 80, color: '#fbc02d' } });
    }
}
function formatTime(ts, tz) {
    const date = new Date((ts + tz) * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
const CurrentWeather = ({ weather, unit }) => {
    const main = weather.weather[0].main;
    const icon = getWeatherIcon(main);
    const tempUnit = unit === 'metric' ? '°C' : '°F';
    return (_jsx(Card, { elevation: 6, sx: { borderRadius: 4, minWidth: 320, maxWidth: 400, width: '100%', bgcolor: 'background.paper', boxShadow: 6 }, children: _jsxs(CardContent, { children: [_jsxs(Box, { sx: { display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }, children: [icon, _jsxs(Typography, { variant: "h3", fontWeight: 700, gutterBottom: true, children: [Math.round(weather.main.temp), tempUnit] }), _jsxs(Typography, { variant: "h6", color: "text.secondary", children: [weather.name, ", ", weather.sys.country] }), _jsx(Typography, { variant: "subtitle1", color: "text.secondary", sx: { textTransform: 'capitalize' }, children: weather.weather[0].description })] }), _jsx(Divider, { sx: { mb: 2 } }), _jsxs(Grid, { container: true, spacing: 2, justifyContent: "center", children: [_jsxs(Grid, { item: true, xs: 6, children: [_jsx(Typography, { variant: "body2", color: "text.secondary", children: "Feels like" }), _jsxs(Typography, { variant: "h6", children: [Math.round(weather.main.feels_like), tempUnit] })] }), _jsxs(Grid, { item: true, xs: 6, children: [_jsx(Typography, { variant: "body2", color: "text.secondary", children: "Humidity" }), _jsxs(Typography, { variant: "h6", children: [weather.main.humidity, "%"] })] }), _jsxs(Grid, { item: true, xs: 6, children: [_jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 1 }, children: [_jsx(ArrowUpwardIcon, { fontSize: "small", color: "primary" }), _jsx(Typography, { variant: "body2", color: "text.secondary", children: "Max" })] }), _jsxs(Typography, { variant: "h6", children: [Math.round(weather.main.temp_max), tempUnit] })] }), _jsxs(Grid, { item: true, xs: 6, children: [_jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 1 }, children: [_jsx(ArrowDownwardIcon, { fontSize: "small", color: "secondary" }), _jsx(Typography, { variant: "body2", color: "text.secondary", children: "Min" })] }), _jsxs(Typography, { variant: "h6", children: [Math.round(weather.main.temp_min), tempUnit] })] }), _jsxs(Grid, { item: true, xs: 6, children: [_jsx(Typography, { variant: "body2", color: "text.secondary", children: "Wind" }), _jsxs(Typography, { variant: "h6", children: [weather.wind.speed, " ", unit === 'metric' ? 'm/s' : 'mph'] })] }), _jsxs(Grid, { item: true, xs: 6, children: [_jsx(Typography, { variant: "body2", color: "text.secondary", children: "Visibility" }), _jsxs(Typography, { variant: "h6", children: [weather.visibility / 1000, " km"] })] }), _jsxs(Grid, { item: true, xs: 6, children: [_jsx(Typography, { variant: "body2", color: "text.secondary", children: "Sunrise" }), _jsx(Typography, { variant: "h6", children: formatTime(weather.sys.sunrise, weather.timezone) })] }), _jsxs(Grid, { item: true, xs: 6, children: [_jsx(Typography, { variant: "body2", color: "text.secondary", children: "Sunset" }), _jsx(Typography, { variant: "h6", children: formatTime(weather.sys.sunset, weather.timezone) })] })] })] }) }));
};
export default CurrentWeather;
