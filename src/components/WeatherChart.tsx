import { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'
import './WeatherChart.css'

interface WeatherChartProps {
  forecast: {
    day: string
    temp_max: number
    temp_min: number
  }[]
  units: 'metric' | 'imperial'
}

const WeatherChart = ({ forecast, units }: WeatherChartProps) => {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)
  
  useEffect(() => {
    if (chartRef.current && forecast.length > 0) {
      const ctx = chartRef.current.getContext('2d')
      if (!ctx) return
      
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
      
      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: forecast.map(day => day.day),
          datasets: [
            {
              label: `Max Temperature (°${units === 'metric' ? 'C' : 'F'})`,
              data: forecast.map(day => Math.round(day.temp_max)),
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              tension: 0.4,
              fill: true
            },
            {
              label: `Min Temperature (°${units === 'metric' ? 'C' : 'F'})`,
              data: forecast.map(day => Math.round(day.temp_min)),
              borderColor: 'rgba(54, 162, 235, 1)',
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              tension: 0.4,
              fill: true
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top'
            },
            tooltip: {
              mode: 'index',
              intersect: false
            }
          },
          scales: {
            y: {
              beginAtZero: false
            }
          }
        }
      })
    }
    
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [forecast, units])
  
  return (
    <div className="weather-chart-container">
      <canvas ref={chartRef} />
    </div>
  )
}

export default WeatherChart