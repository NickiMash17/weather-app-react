import { useEffect, useRef } from 'react';
import { WeatherCondition } from '../types/weather';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
}

export const useParticles = (weatherCondition: WeatherCondition) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);

  const getParticleColor = (condition: WeatherCondition): string => {
    switch (condition) {
      case 'rainy':
        return 'rgba(74, 144, 226, 0.8)';
      case 'snow':
        return 'rgba(255, 255, 255, 0.8)';
      case 'clear':
        return 'rgba(255, 236, 179, 0.8)';
      case 'night':
        return 'rgba(226, 232, 240, 0.8)';
      case 'thunderstorm':
        return 'rgba(100, 100, 255, 0.8)';
      case 'drizzle':
        return 'rgba(150, 200, 255, 0.8)';
      case 'mist':
        return 'rgba(200, 200, 200, 0.8)';
      default:
        return 'rgba(204, 204, 204, 0.8)';
    }
  };

  const getParticleCount = (condition: WeatherCondition): number => {
    switch (condition) {
      case 'rainy':
        return 200;
      case 'snow':
        return 150;
      case 'thunderstorm':
        return 250;
      case 'drizzle':
        return 180;
      case 'mist':
        return 120;
      case 'clear':
      case 'night':
      default:
        return 80;
    }
  };

  const initParticles = (canvas: HTMLCanvasElement, condition: WeatherCondition) => {
    const count = getParticleCount(condition);
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 5 + 1,
      speedX: Math.random() * 3 - 1.5,
      speedY: Math.random() * 3 - 1.5,
      color: getParticleColor(condition),
    }));
  };

  const animateParticles = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particlesRef.current.forEach(particle => {
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      // Wrap particles around the screen
      if (particle.x > canvas.width) particle.x = 0;
      if (particle.x < 0) particle.x = canvas.width;
      if (particle.y > canvas.height) particle.y = 0;
      if (particle.y < 0) particle.y = canvas.height;

      // Draw particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();
    });

    animationRef.current = requestAnimationFrame(animateParticles);
  };

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const container = canvas.parentElement;
    if (!container) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    resizeCanvas();
    initParticles(canvas, weatherCondition);
    animateParticles();

    const handleResize = () => {
      resizeCanvas();
      initParticles(canvas, weatherCondition);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [weatherCondition]);

  return canvasRef;
};