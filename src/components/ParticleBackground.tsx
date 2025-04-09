import React from 'react';
import { useParticles } from '../hooks/useParticles';
import { WeatherCondition } from '../types/weather';

interface ParticleBackgroundProps {
  weatherCondition: WeatherCondition;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ weatherCondition }) => {
  const canvasRef = useParticles(weatherCondition);

  return (
    <div className="particles-container" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 0,
      pointerEvents: 'none',
      overflow: 'hidden'
    }}>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default ParticleBackground;