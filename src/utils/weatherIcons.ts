import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm, WiFog, 
    WiNightClear, WiDayCloudy, WiNightCloudy, WiDayShowers, WiNightShowers } from 'react-icons/wi'

interface IconMap {
  [key: string]: JSX.Element
}

const iconMap: IconMap = {
  '01d': <WiDaySunny />,
  '01n': <WiNightClear />,
  '02d': <WiDayCloudy />,
  '02n': <WiNightCloudy />,
  '03d': <WiCloudy />,
  '03n': <WiCloudy />,
  '04d': <WiCloudy />,
  '04n': <WiCloudy />,
  '09d': <WiRain />,
  '09n': <WiRain />,
  '10d': <WiDayShowers />,
  '10n': <WiNightShowers />,
  '11d': <WiThunderstorm />,
  '11n': <WiThunderstorm />,
  '13d': <WiSnow />,
  '13n': <WiSnow />,
  '50d': <WiFog />,
  '50n': <WiFog />
}

export const getWeatherIcon = (iconCode: string, size = 64): JSX.Element => {
  const icon = iconMap[iconCode]
  if (!icon) {
    throw new Error(`Icon code not found: ${iconCode}`)
  }
  return React.cloneElement(icon, { size })
}