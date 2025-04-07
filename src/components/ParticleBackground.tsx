import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

type ParticleBackgroundProps = {
  weatherCondition?: string;
};

const ParticleBackground = ({ weatherCondition }: ParticleBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  type Particle = {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    color: string;
    shape: string;
  };
  
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle settings based on weather
    const getParticleSettings = () => {
      switch (true) {
        case weatherCondition?.includes('01d'): // Clear day
          return {
            count: 30,
            colors: ['rgba(255, 236, 179, 0.8)', 'rgba(255, 215, 0, 0.8)', 'rgba(255, 255, 255, 0.8)'],
            sizeRange: [1, 5],
            speedRange: [0.5, 2],
            shape: 'circle'
          };
        case weatherCondition?.includes('01n'): // Clear night
          return {
            count: 100,
            colors: ['rgba(226, 232, 240, 0.8)', 'rgba(148, 163, 184, 0.8)', 'rgba(255, 255, 255, 0.8)'],
            sizeRange: [0.5, 2],
            speedRange: [0.2, 1],
            shape: 'star'
          };
        case weatherCondition?.includes('09') || weatherCondition?.includes('10') || weatherCondition?.includes('11'): // Rain
          return {
            count: 200,
            colors: ['rgba(74, 144, 226, 0.8)', 'rgba(100, 181, 246, 0.8)'],
            sizeRange: [1, 3],
            speedRange: [3, 8],
            shape: 'line'
          };
        case weatherCondition?.includes('13'): // Snow
          return {
            count: 150,
            colors: ['rgba(255, 255, 255, 0.9)', 'rgba(240, 240, 240, 0.9)'],
            sizeRange: [2, 6],
            speedRange: [1, 3],
            shape: 'snowflake'
          };
        default: // Clouds
          return {
            count: 50,
            colors: ['rgba(189, 195, 199, 0.8)', 'rgba(236, 240, 241, 0.8)'],
            sizeRange: [2, 8],
            speedRange: [0.3, 1.5],
            shape: 'cloud'
          };
      }
    };

    const settings = getParticleSettings();

    // Create particles
    particlesRef.current = Array.from({ length: settings.count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * (settings.sizeRange[1] - settings.sizeRange[0]) + settings.sizeRange[0],
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: Math.random() * (settings.speedRange[1] - settings.speedRange[0]) + settings.speedRange[0],
      color: settings.colors[Math.floor(Math.random() * settings.colors.length)],
      shape: settings.shape
    }));

    // Animation loop
    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach(particle => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Reset particles that go off screen
        if (particle.y > canvas.height) {
          particle.y = 0;
          particle.x = Math.random() * canvas.width;
        }
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.width;

        // Draw particle
        ctx.fillStyle = particle.color;
        ctx.beginPath();

        switch (particle.shape) {
          case 'circle':
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            break;
          case 'star':
            drawStar(ctx, particle.x, particle.y, 5, particle.size, particle.size / 2);
            break;
          case 'line':
            ctx.fillRect(particle.x, particle.y, 1, particle.size * 3);
            break;
          case 'snowflake':
            drawSnowflake(ctx, particle.x, particle.y, particle.size);
            break;
          case 'cloud':
            drawCloud(ctx, particle.x, particle.y, particle.size);
            break;
          default:
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        }

        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [weatherCondition]);

  // Helper functions for drawing shapes
  const drawStar = (ctx: CanvasRenderingContext2D, cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number) => {
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    const step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
  };

  const drawSnowflake = (ctx: CanvasRenderingContext2D, x: number, y: number, radius: number) => {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI * 2) / 6;
      ctx.moveTo(x, y);
      ctx.lineTo(x + Math.cos(angle) * radius, y + Math.sin(angle) * radius);
    }
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.lineWidth = 1;
    ctx.stroke();
  };

  const drawCloud = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.arc(x + size * 0.7, y - size * 0.3, size * 0.8, 0, Math.PI * 2);
    ctx.arc(x + size * 1.5, y, size * 0.7, 0, Math.PI * 2);
    ctx.arc(x + size * 1.3, y + size * 0.3, size * 0.6, 0, Math.PI * 2);
    ctx.arc(x + size * 0.5, y + size * 0.2, size * 0.7, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.fill();
  };

  return (
    <motion.canvas
      ref={canvasRef}
      className="particle-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.6 }}
      transition={{ duration: 1 }}
    />
  );
};

export default ParticleBackground;