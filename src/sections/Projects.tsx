import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Projects.module.css';
// @ts-ignore
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    year: '2024',
    title: 'AI Campus Assistant',
    description: 'An AI-powered academic management platform integrating Google Classroom APIs, a RAG-based pipeline for course notes, and predictive study analytics.',
    color: '#1a1a1a',
    tags: 'Python, Firebase, Vector DB'
  },
  {
    year: '2023',
    title: 'Image Segmentation Model',
    description: 'A deep learning segmentation model trained in PyTorch on 1,000+ labeled pairs, heavily leveraging CUDA-enabled GPU acceleration to reduce training time.',
    color: '#151515',
    tags: 'Python, PyTorch, CUDA'
  },
  {
    year: '2023',
    title: 'RAG Q&A System',
    description: 'A hybrid retrieval system combining BM25 and dense sentence-transformer embeddings with OpenAI LLM generation, backed by ChromaDB.',
    color: '#111111',
    tags: 'Python, ChromaDB, OpenAI'
  },
  {
    year: '2022',
    title: 'Hospital Management',
    description: 'A complete GUI-based hospital management application featuring patient scheduling, billing, and a secure MySQL backend.',
    color: '#0a0a0a',
    tags: 'Python, Tkinter, MySQL'
  },
  {
    year: '2022',
    title: 'N-Queen Solver',
    description: 'An optimized backtracking algorithm capable of solving the N-Queen problem across variable board sizes, featuring a live chessboard visualization layer.',
    color: '#050505',
    tags: 'C++, Algorithms'
  }
];

export const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll(`.${styles.projectCardWrapper}`);
    
    // Goated Animation: Scroll Velocity Skewing
    cards?.forEach(card => {
      const innerCard = card.querySelector(`.${styles.projectCard}`);
      
      // Entrance animation
      gsap.fromTo(card,
        { opacity: 0, y: 150, scale: 0.95 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 1.8, 
          ease: 'expo.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          }
        }
      );

      // Velocity Skew
      let proxy = { skew: 0 };
      let skewSetter = gsap.quickSetter(innerCard, "skewY", "deg");
      let clamp = gsap.utils.clamp(-5, 5); // Limit the skew so it doesn't break layout

      ScrollTrigger.create({
        trigger: card,
        onUpdate: (self) => {
          let skew = clamp(self.getVelocity() / -300);
          if (Math.abs(skew) > Math.abs(proxy.skew)) {
            proxy.skew = skew;
            gsap.to(proxy, {
              skew: 0,
              duration: 1,
              ease: "power3",
              overwrite: true,
              onUpdate: () => skewSetter(proxy.skew)
            });
          }
        }
      });
    });
  }, []);

  return (
    <section id="work" className={`container ${styles.projectsSection}`} ref={sectionRef}>
      <h2 className="text-subheading" style={{ marginBottom: '4rem', color: 'var(--accent-color)' }}>SELECTED WORKS</h2>
      <div className={styles.verticalContainer}>
        {PROJECTS.map((project, index) => (
          <div key={index} className={styles.projectCardWrapper}>
            <div 
              className={`${styles.projectCard} hover-target`} 
              style={{ backgroundColor: project.color }}
              data-cursor="VIEW"
            >
              <div className={styles.cardInner}>
                <div className={styles.cardHeader}>
                  <span className={styles.year}>{project.year}</span>
                  <span className={styles.tags} style={{ color: '#888', fontFamily: 'var(--font-sans)', letterSpacing: '0.1em' }}>{project.tags}</span>
                </div>
                <div className={styles.cardBody}>
                  <h3 className="text-heading">{project.title}</h3>
                  <p className="text-body">{project.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
