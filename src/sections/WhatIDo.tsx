import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './WhatIDo.module.css';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  { title: 'AI & MACHINE LEARNING' },
  { title: 'PRODUCT MANAGEMENT' },
  { title: 'SYSTEM ARCHITECTURE' }
];

export const WhatIDo: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    
    const items = sectionRef.current.querySelectorAll(`.${styles.item}`);
    items.forEach((item, index) => {
      gsap.fromTo(item,
        { opacity: 0, y: 100, rotateX: 10 },
        {
          opacity: 1, 
          y: 0, 
          rotateX: 0,
          duration: 1.5, 
          ease: 'expo.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
          }
        }
      );
    });
  }, []);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <section className={`container ${styles.whatIDoSection}`} ref={sectionRef}>
      <h2 className="text-subheading" style={{ marginBottom: '4rem', color: 'var(--accent-color)' }}>WHAT I DO</h2>
      <div className={styles.list}>
        {SERVICES.map((service, index) => (
          <div 
            key={index} 
            className={`${styles.item} hover-target`}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            data-cursor="VIEW"
          >
            <h3 className={`text-heading ${styles.title} ${hoveredIndex === index ? styles.active : ''}`}>
              {service.title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};
