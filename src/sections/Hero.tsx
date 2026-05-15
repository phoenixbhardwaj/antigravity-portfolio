import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Starfield } from '../components/Starfield';
import styles from './Hero.module.css';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Shatter Text Reveal
    const letters = containerRef.current?.querySelectorAll('.letter');
    const subtitle = containerRef.current?.querySelector(`.${styles.subtitle}`);
    const avatar = containerRef.current?.querySelector(`.${styles.avatarWrapper}`);
    const navItems = document.querySelectorAll('nav, .logo');

    if (letters && subtitle && avatar) {
      const tl = gsap.timeline({ delay: 0.2 });
      
      // Reveal letters from random 3D space
      tl.fromTo(letters, 
        { 
          opacity: 0, 
          z: () => gsap.utils.random(-400, 400),
          y: () => gsap.utils.random(-200, 200),
          x: () => gsap.utils.random(-200, 200),
          rotateX: () => gsap.utils.random(-90, 90),
          rotateY: () => gsap.utils.random(-90, 90),
          rotateZ: () => gsap.utils.random(-90, 90)
        },
        { 
          opacity: 1, 
          z: 0, y: 0, x: 0, 
          rotateX: 0, rotateY: 0, rotateZ: 0, 
          duration: 2, 
          stagger: 0.04, 
          ease: 'expo.out' 
        }
      )
      // Fade and slide the subtitle
      .fromTo(subtitle,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 1.5, ease: 'expo.out' },
        "-=1.5"
      )
      // Pop in the avatar
      .fromTo(avatar,
        { scale: 0, opacity: 0, rotate: -45 },
        { scale: 1, opacity: 1, rotate: 0, duration: 1.5, ease: 'elastic.out(1, 0.7)' },
        "-=1.6"
      )
      // Subtle nav fade
      .fromTo(navItems,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power3.out' },
        "-=1.8"
      );
    }

    // 2. Parallax Mouse Effect
    const onMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 40; // max 20px shift
      const y = (e.clientY / window.innerHeight - 0.5) * 40;
      
      const titleWrapper = containerRef.current.querySelector(`.${styles.titleWrapper}`);
      if (titleWrapper) {
        gsap.to(titleWrapper, {
          x: x,
          y: y,
          duration: 1,
          ease: 'power2.out'
        });
      }
      
      if (avatar) {
        gsap.to(avatar, {
          x: -x * 1.5, // Move avatar in opposite direction for depth
          y: -y * 1.5,
          duration: 1,
          ease: 'power2.out'
        });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  // Helper to split text into spans
  const splitText = (text: string) => {
    return text.split('').map((char, i) => (
      <span key={i} className="letter hover-target" data-cursor="VIEW" style={{ display: 'inline-block' }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <section id="home" className={styles.hero}>
      <Starfield />
      <div className={styles.backgroundOverlay}></div>
      
      {/* 1. Glowing Orbs */}
      <div className={styles.orb1}></div>
      <div className={styles.orb2}></div>

      {/* 2. Infinite Marquee */}
      <div className={styles.marqueeContainer}>
        <div className={styles.marqueeText}>
          CREATIVE DEVELOPER • AI ENGINEER • SYSTEM ARCHITECT • CREATIVE DEVELOPER • AI ENGINEER • SYSTEM ARCHITECT • 
        </div>
      </div>

      <div className={`container ${styles.content}`} ref={containerRef}>
        <div className={styles.heroLayout}>
          <div className={styles.titleWrapper}>
            <h1 className="text-massive">
              <div className={styles.textLine}>
                {splitText('ADITYA')}
              </div>
              <div className={styles.textLine}>
                {splitText('BHARDWAJ')}
                <span className={`letter ${styles.accentDot}`}>.</span>
              </div>
            </h1>
          </div>
          <p className={styles.subtitle}>
            Multidisciplinary Developer crafting <br />
            intelligent systems & premium products.
          </p>
        </div>
        
        <div className={styles.avatarWrapper}>
          {/* 3. Spinning Badge */}
          <div className={styles.spinningBadge}>
            <svg viewBox="0 0 100 100" width="150" height="150">
              <defs>
                <path id="circle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
              </defs>
              <text fontSize="12" fill="var(--accent-color)" letterSpacing="2">
                <textPath href="#circle">
                  SCROLL TO EXPLORE • WORK •
                </textPath>
              </text>
            </svg>
          </div>
        </div>
        
        <div className={styles.scrollIndicator}>
          <div className={styles.mouse}>
            <div className={styles.wheel}></div>
          </div>
        </div>
      </div>
    </section>
  );
};
