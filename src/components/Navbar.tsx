import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './Navbar.module.css';

export const Navbar: React.FC = () => {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Simple fade-in down animation on mount
    if (navRef.current) {
      gsap.fromTo(navRef.current, 
        { y: -50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
      );
    }
  }, []);

  return (
    <nav ref={navRef} className={styles.navbar}>
      <div className={styles.logo}>
        <a href="#home">AB</a>
      </div>
      <ul className={styles.navLinks}>
        <li><a href="#work" className="hover-target">Work</a></li>
        <li><a href="#about" className="hover-target">About</a></li>
        <li><a href="#contact" className="hover-target">Contact</a></li>
      </ul>
    </nav>
  );
};
