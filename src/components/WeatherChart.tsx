import { Line } from 'react-chartjs-2';
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
import { ForecastData } from '../types/weather';

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
  data: ForecastData[];
  units: 'metric' | 'imperial';
}

const WeatherChart = ({ data, units }: WeatherChartProps) => {
  const chartData = {
    labels: data.map(day => 
      new Date(day.dt).toLocaleDateString([], { weekday: 'short' })
    ),
    datasets: [
      {
        label: 'Max Temperature',
        data: data.map(day => day.temp_max),
        borderColor: 'rgb(255, 159, 67)',
        backgroundColor: 'rgba(255, 159, 67, 0.5)',
        tension: 0.4,
      },
      {
        label: 'Min Temperature',
        data: data.map(day => day.temp_min),
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Temperature Forecast',
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: `Temperature (°${units === 'metric' ? 'C' : 'F'})`,
        },
      },
    },
  };

  return (
    <div className="weather-chart">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default WeatherChart;