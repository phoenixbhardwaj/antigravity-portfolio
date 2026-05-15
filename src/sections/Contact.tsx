import React from 'react';
import styles from './Contact.module.css';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className={styles.contactSection}>
      <div className={`container ${styles.container}`}>
        <div className={styles.content}>
          <h2 className={`text-massive ${styles.title}`}>
            LET'S<br />COLLABORATE.
          </h2>
          
          <div className={styles.info}>
            <div className={styles.block}>
              <h3 className={styles.label}>EMAIL</h3>
              <a href="mailto:gp.adityabhardwaj@gmail.com" className={`hover-target ${styles.link}`}>
                gp.adityabhardwaj@gmail.com
              </a>
            </div>
            
            <div className={styles.block}>
              <h3 className={styles.label}>SOCIALS</h3>
              <ul className={styles.socialList}>
                <li><a href="https://linkedin.com/in/aditya-bhardwaj-248a43326" target="_blank" rel="noopener noreferrer" className={`hover-target ${styles.link}`}>LinkedIn</a></li>
                <li><a href="https://github.com/phoenixbhardwaj" target="_blank" rel="noopener noreferrer" className={`hover-target ${styles.link}`}>GitHub</a></li>
                <li><a href="tel:8287216995" className={`hover-target ${styles.link}`}>+91 8287 216 995</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className={styles.footer}>
          <p>© {new Date().getFullYear()} ADITYA BHARDWAJ.</p>
          <p>CRAFTED WITH PRECISION.</p>
        </div>
      </div>
    </section>
  );
};
