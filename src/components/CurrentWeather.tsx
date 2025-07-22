import React from 'react';
import { Card, CardContent, Typography, Box, Divider } from '@mui/material';
import Grid from '@mui/material/Grid';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import CloudIcon from '@mui/icons-material/Cloud';
import OpacityIcon from '@mui/icons-material/Opacity';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { WeatherData, Unit } from '../types/weather';

function getWeatherIcon(main: string) {
  switch (main.toLowerCase()) {
    case 'clear': return <WbSunnyIcon sx={{ fontSize: 80, color: '#fbc02d' }} />;
    case 'clouds': return <CloudIcon sx={{ fontSize: 80, color: '#90a4ae' }} />;
    case 'snow': return <AcUnitIcon sx={{ fontSize: 80, color: '#90caf9' }} />;
    case 'rain':
    case 'drizzle': return <OpacityIcon sx={{ fontSize: 80, color: '#4fc3f7' }} />;
    case 'thunderstorm': return <CloudIcon sx={{ fontSize: 80, color: '#616161' }} />;
    default: return <WbSunnyIcon sx={{ fontSize: 80, color: '#fbc02d' }} />;
  }
}

function formatTime(ts: number, tz: number) {
  const date = new Date((ts + tz) * 1000);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

interface Props {
  weather: WeatherData;
  unit: Unit;
}

const CurrentWeather: React.FC<Props> = ({ weather, unit }) => {
  const main = weather.weather[0].main;
  const icon = getWeatherIcon(main);
  const tempUnit = unit === 'metric' ? '°C' : '°F';
  return (
    <Card elevation={6} sx={{ borderRadius: 4, minWidth: 320, maxWidth: 400, width: '100%', bgcolor: 'background.paper', boxShadow: 6 }}>
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
          {icon}
          <Typography variant="h3" fontWeight={700} gutterBottom>
            {Math.round(weather.main.temp)}{tempUnit}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {weather.name}, {weather.sys.country}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
            {weather.weather[0].description}
          </Typography>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">Feels like</Typography>
            <Typography variant="h6">{Math.round(weather.main.feels_like)}{tempUnit}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">Humidity</Typography>
            <Typography variant="h6">{weather.main.humidity}%</Typography>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ArrowUpwardIcon fontSize="small" color="primary" />
              <Typography variant="body2" color="text.secondary">Max</Typography>
            </Box>
            <Typography variant="h6">{Math.round(weather.main.temp_max)}{tempUnit}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ArrowDownwardIcon fontSize="small" color="secondary" />
              <Typography variant="body2" color="text.secondary">Min</Typography>
            </Box>
            <Typography variant="h6">{Math.round(weather.main.temp_min)}{tempUnit}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">Wind</Typography>
            <Typography variant="h6">{weather.wind.speed} {unit === 'metric' ? 'm/s' : 'mph'}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">Visibility</Typography>
            <Typography variant="h6">{weather.visibility / 1000} km</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">Sunrise</Typography>
            <Typography variant="h6">{formatTime(weather.sys.sunrise, weather.timezone)}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">Sunset</Typography>
            <Typography variant="h6">{formatTime(weather.sys.sunset, weather.timezone)}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CurrentWeather; 