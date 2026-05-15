import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import styles from './Cursor.module.css';

export const Cursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState('');

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Vanilla JS for absolute zero lag without GSAP conflicts
    const onMouseMove = (e: MouseEvent) => {
      cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const closestLink = target.closest('a') || target.closest('button');
      const hoverTarget = target.closest('.hover-target');
      
      if (hoverTarget) {
        setIsHovering(true);
        const text = hoverTarget.getAttribute('data-cursor');
        if (text) {
          setCursorText(text);
        } else {
          setCursorText('');
        }
      } else if (closestLink || target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button') {
        setIsHovering(true);
        setCursorText('');
      } else {
        setIsHovering(false);
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div ref={cursorRef} className={styles.cursorContainer}>
      <div className={`${styles.cursorInner} ${isHovering ? styles.hovering : ''} ${cursorText ? styles.hasText : ''}`}>
        <span className={styles.cursorText}>{cursorText}</span>
      </div>
    </div>
  );
};
