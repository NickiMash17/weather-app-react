import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm, WiFog, 
    WiNightClear, WiDayCloudy, WiNightCloudy, WiDayShowers, WiNightShowers } from 'react-icons/wi'
  
  export const getWeatherIcon = (iconCode: string, size = 64) => {
    const iconMap: Record<string, JSX.Element> = {
      '01d': <WiDaySunny size={size} />,
      '01n': <WiNightClear size={size} />,
      '02d': <WiDayCloudy size={size} />,
      '02n': <WiNightCloudy size={size} />,
      '03d': <WiCloudy size={size} />,
      '03n': <WiCloudy size={size} />,
      '04d': <WiCloudy size={size} />,
      '04n': <WiCloudy size={size} />,
      '09d': <WiRain size={size} />,
      '09n': <WiRain size={size} />,
      '10d': <WiDayShowers size={size} />,
      '10n': <WiNightShowers size={size} />,
      '11d': <WiThunderstorm size={size} />,
      '11n': <WiThunderstorm size={size} />,
      '13d': <WiSnow size={size} />,
      '13n': <WiSnow size={size} />,
      '50d': <WiFog size={size} />,
      '50n': <WiFog size={size} />
    }
    
    return iconMap[iconCode] || <WiDaySunny size={size} />
  }