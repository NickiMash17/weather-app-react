import { useEffect, useRef } from 'react'
import './ParticleBackground.css'

interface ParticleBackgroundProps {
  weatherCondition?: string
}

const ParticleBackground = ({ weatherCondition }: ParticleBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    if (!canvasRef.current) return
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    
    // Particle system
    const particles: Particle[] = []
    const particleCount = getParticleCount(weatherCondition)
    
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * getMaxSize(weatherCondition) + 1
        this.speedX = Math.random() * 3 - 1.5
        this.speedY = Math.random() * 3 - 1.5
        this.color = getParticleColor(weatherCondition)
      }
      
      update() {
        this.x += this.speedX
        this.y += this.speedY
        
        // Bounce off edges
        if (this.x > canvas.width || this.x < 0) {
          this.speedX *= -1
        }
        if (this.y > canvas.height || this.y < 0) {
          this.speedY *= -1
        }
      }
      
      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
      }
    }
    
    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }
    
    // Animation loop
    let animationId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].draw()
      }
      
      animationId = requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [weatherCondition])
  
  return <canvas ref={canvasRef} className="particle-background" />
}

// Helper functions for particle effects
function getParticleCount(weatherCondition?: string): number {
  if (!weatherCondition) return 30
  
  if (weatherCondition.includes('01') || weatherCondition.includes('02')) {
    return 20 // Clear sky - fewer particles
  } else if (weatherCondition.includes('09') || weatherCondition.includes('10')) {
    return 100 // Rain - more particles
  } else if (weatherCondition.includes('13')) {
    return 80 // Snow - many particles
  } else if (weatherCondition.includes('11')) {
    return 120 // Thunderstorm - most particles
  }
  return 50 // Default
}

function getMaxSize(weatherCondition?: string): number {
  if (!weatherCondition) return 3
  
  if (weatherCondition.includes('13')) return 5 // Snowflakes are bigger
  if (weatherCondition.includes('11')) return 2 // Raindrops are smaller
  return 3 // Default
}

function getParticleColor(weatherCondition?: string): string {
  if (!weatherCondition) return 'rgba(255, 255, 255, 0.7)'
  
  if (weatherCondition.includes('01d') || weatherCondition.includes('02d')) {
    return 'rgba(255, 236, 179, 0.7)' // Sunny - yellow
  } else if (weatherCondition.includes('01n') || weatherCondition.includes('02n')) {
    return 'rgba(226, 232, 240, 0.7)' // Night - light blue
  } else if (weatherCondition.includes('09') || weatherCondition.includes('10')) {
    return 'rgba(74, 144, 226, 0.7)' // Rain - blue
  } else if (weatherCondition.includes('13')) {
    return 'rgba(255, 255, 255, 0.9)' // Snow - white
  } else if (weatherCondition.includes('11')) {
    return 'rgba(245, 158, 66, 0.7)' // Thunder - orange
  }
  return 'rgba(204, 204, 204, 0.7)' // Default - gray
}

export default ParticleBackground