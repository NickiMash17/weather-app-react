import { IconType } from 'react-icons';
import {
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiFog,
  WiDayCloudy,
  WiNightClear,
  // Add more icons as needed
} from 'react-icons/wi';

interface WeatherIconProps {
  icon: string;
  size?: number;
}

const WeatherIcon = ({ icon, size = 24 }: WeatherIconProps) => {
  const iconMap: Record<string, IconType> = {
    '01d': WiDaySunny,
    '01n': WiNightClear,
    '02d': WiDayCloudy,
    '02n': WiDayCloudy, // You might want a different night icon
    '03d': WiCloudy,
    '03n': WiCloudy,
    '04d': WiCloudy,
    '04n': WiCloudy,
    '09d': WiRain,
    '09n': WiRain,
    '10d': WiRain,
    '10n': WiRain,
    '11d': WiThunderstorm,
    '11n': WiThunderstorm,
    '13d': WiSnow,
    '13n': WiSnow,
    '50d': WiFog,
    '50n': WiFog,
  };

  const IconComponent = iconMap[icon] || WiDaySunny;

  return <IconComponent size={size} />;
};

export default WeatherIcon;