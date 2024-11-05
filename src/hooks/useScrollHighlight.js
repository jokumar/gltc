import { useEffect } from 'react';
import styles from '../styles/about.module.css';
function useScrollHighlight() {
  useEffect(() => {
    const elements = document.querySelectorAll(`.${styles.aboutText} p`);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          } else {
            entry.target.classList.remove('is-visible');
          }
        });
      },
      { threshold: 0.5 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

export default useScrollHighlight;
