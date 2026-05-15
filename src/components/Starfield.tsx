import React, { useEffect, useRef } from 'react';
import styles from './Starfield.module.css';

export const Starfield: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const stars: { x: number, y: number, z: number, size: number, speed: number }[] = [];
    const numStars = 300;

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width * 1.5,
        y: Math.random() * height,
        z: Math.random() * 1000 + 100, // Z-depth for 3D parallax
        size: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 3 + 1
      });
    }

    let animationFrameId: number;

    const render = () => {
      // Clear canvas fully to avoid streaks, we want pinpoint stars
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < numStars; i++) {
        const star = stars[i];
        
        // Parallax movement
        const parallaxFactor = 1000 / star.z;
        star.y += star.speed * parallaxFactor;
        
        // Very subtle drift
        star.x -= (star.speed * 0.1) * parallaxFactor;

        // Reset if it falls off screen
        if (star.y > height || star.x < 0) {
          star.y = -10;
          star.x = Math.random() * width * 1.2;
          star.z = Math.random() * 1000 + 100;
        }

        const opacity = Math.max(0.1, 1 - (star.z / 1500));
        const currentSize = star.size * parallaxFactor;
        
        ctx.beginPath();
        
        // 10% are accent orange, the rest are pure white/silver pinpoint stars
        if (i % 10 === 0) {
          ctx.fillStyle = `rgba(238, 91, 50, ${opacity})`;
          ctx.shadowColor = 'rgba(238, 91, 50, 0.8)';
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
        }
        
        // Add a beautiful glow effect to the pinpoints
        ctx.shadowBlur = currentSize * 3;
        
        ctx.arc(star.x, star.y, currentSize, 0, Math.PI * 2);
        ctx.fill();
        
        // Reset shadow for next draw to prevent performance issues
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.starfield} />;
};
