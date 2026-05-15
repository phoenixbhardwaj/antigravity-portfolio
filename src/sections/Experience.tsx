import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Experience.module.css';

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCES = [
  {
    duration: '2024 - 2028',
    role: 'B.Tech in Computer Science (AI & ML)',
    company: 'SRM University, Delhi-NCR'
  },
  {
    duration: '2026',
    role: 'Machine Learning Specialization',
    company: 'DeepLearning.AI & Stanford'
  },
  {
    duration: '2026',
    role: 'Introduction to Image Processing',
    company: 'MathWorks'
  },
  {
    duration: 'In-Progress',
    role: 'Foundations of Project Management',
    company: 'Google'
  },
  {
    duration: 'In-Progress',
    role: 'Generative AI: Prompt Engineering',
    company: 'IBM'
  }
];

export const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const items = sectionRef.current.querySelectorAll(`.${styles.historyItem}`);
    items.forEach((item, index) => {
      gsap.fromTo(item,
        { opacity: 0, y: 80 },
        {
          opacity: 1, y: 0, duration: 1.5, ease: 'expo.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
          }
        }
      );
    });
  }, []);

  return (
    <section id="about" className={`container ${styles.historySection}`} ref={sectionRef}>
      <h2 className="text-subheading" style={{ marginBottom: '4rem', color: 'var(--accent-color)' }}>HISTORY</h2>
      
      <div className={styles.historyList}>
        // @ts-ignore
        {EXPERIENCES.map((exp, index) => (
          <div key={index} className={`${styles.historyItem} hover-target`}>
            <div className={styles.yearCol}>
              <span className={styles.duration}>{exp.duration}</span>
            </div>
            <div className={styles.contentCol}>
              <h3 className={styles.role}>{exp.role}</h3>
              <h4 className={styles.company}>{exp.company}</h4>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
