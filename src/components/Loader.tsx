import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './Loader.module.css';

interface LoaderProps {
  onComplete: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const leftPupilRef = useRef<SVGCircleElement>(null);
  const rightPupilRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    // Make the owl look around randomly
    let ctx = gsap.context(() => {
      const dartEyes = () => {
        gsap.to([leftPupilRef.current, rightPupilRef.current], {
          x: `random(-4, 4)`,
          y: `random(-4, 4)`,
          duration: 0.15, // quick darting motion
          delay: `random(0.5, 2.5)`,
          onComplete: dartEyes
        });
      };
      dartEyes();

      // Random blinking
      const blink = () => {
        gsap.to('.owl-eye', {
          scaleY: 0.1,
          duration: 0.1,
          transformOrigin: 'center',
          yoyo: true,
          repeat: 1,
          delay: `random(2, 6)`,
          onComplete: blink
        });
      };
      blink();
    });

    // Auto start after 2.5 seconds
    const timeout = setTimeout(() => {
      const tl = gsap.timeline({
        onComplete: onComplete
      });

      tl.to(contentRef.current, {
        y: -30,
        opacity: 0,
        duration: 0.4,
        ease: 'power3.in'
      })
      .to(containerRef.current, {
        scale: 1.1,
        opacity: 0,
        duration: 0.8,
        ease: 'power4.inOut'
      });
    }, 2500);

    return () => {
      ctx.revert();
      clearTimeout(timeout);
    };
  }, [onComplete]);

  return (
    <div ref={containerRef} className={styles.loaderContainer}>
      <div ref={contentRef} className={styles.contentWrapper}>
        <div className={styles.iconWrapper}>
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.owlSvg}>
            {/* Body */}
            <path d="M16 28C16 16 24 12 32 12C40 12 48 16 48 28V48C48 52.4183 44.4183 56 40 56H24C19.5817 56 16 52.4183 16 48V28Z" fill="transparent"/>
            {/* Ears */}
            <path d="M16 28L12 12L28 16Z" fill="#1a1a1a"/>
            <path d="M48 28L52 12L36 16Z" fill="#1a1a1a"/>
            {/* Main Head/Body */}
            <path d="M16 28C16 16 24 12 32 12C40 12 48 16 48 28V48C48 52.4183 44.4183 56 40 56H24C19.5817 56 16 52.4183 16 48V28Z" fill="#1a1a1a"/>
            
            {/* Eyes */}
            <circle className="owl-eye" cx="24" cy="28" r="7" fill="#ffffff"/>
            <circle className="owl-eye" cx="40" cy="28" r="7" fill="#ffffff"/>
            
            {/* Pupils */}
            <circle ref={leftPupilRef} cx="24" cy="28" r="3.5" fill="#FF3B30"/>
            <circle ref={rightPupilRef} cx="40" cy="28" r="3.5" fill="#FF3B30"/>
            
            {/* Beak */}
            <path d="M32 34L29 39H35L32 34Z" fill="#ffffff"/>
          </svg>
        </div>
      </div>
    </div>
  );
};
