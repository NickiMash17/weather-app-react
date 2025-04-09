import React from 'react';
import { Line } from 'react-chartjs-2';
import { ForecastData, Unit } from '../types/weather';
import { formatDay } from '../utils/weatherUtils';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface WeatherChartProps {
  forecast: ForecastData;
  unit: Unit;
  darkMode: boolean;
}

const WeatherChart: React.FC<WeatherChartProps> = ({ forecast, unit, darkMode }) => {
  // Get one forecast per day (around noon)
  const dailyForecast = forecast.list.filter((_, index) => index % 8 === 4).slice(0, 5);

  const data = {
    labels: dailyForecast.map(day => formatDay(new Date(day.dt * 1000))),
    datasets: [
      {
        label: 'Max Temperature',
        data: dailyForecast.map(day => Math.round(day.main.temp_max)),
        borderColor: 'rgba(255, 159, 67, 1)',
        backgroundColor: 'rgba(255, 159, 67, 0.2)',
        tension: 0.4,
        borderWidth: 2,
      },
      {
        label: 'Min Temperature',
        data: dailyForecast.map(day => Math.round(day.main.temp_min)),
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.4,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: darkMode ? '#f8f9fa' : '#212529',
        },
      },
      title: {
        display: true,
        text: 'Temperature Forecast',
        color: darkMode ? '#f8f9fa' : '#212529',
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label}: ${context.raw}${unit === 'metric' ? '°C' : '°F'}`;
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: darkMode ? '#f8f9fa' : '#212529',
        },
        grid: {
          color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
      },
      y: {
        ticks: {
          color: darkMode ? '#f8f9fa' : '#212529',
          callback: function(value: any) {
            return `${value}${unit === 'metric' ? '°C' : '°F'}`;
          }
        },
        grid: {
          color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
  };

  return (
    <div className="weather-chart mb-5" style={{ height: '300px' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default WeatherChart;