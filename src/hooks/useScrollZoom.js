// src/hooks/useScrollZoom.js

import { useEffect } from 'react';

const useScrollZoom = (selector) => {
  useEffect(() => {
    const sections = document.querySelectorAll(selector);

    const handleScroll = (entries) => {
      entries.forEach((entry) => {
        const img = entry.target.querySelector('img');
        
        if (img) {
          if (entry.isIntersecting) {
            // Calculate zoom scale while scrolling down
            const rect = entry.boundingClientRect;
            const scale = Math.min(1.2, 1 + Math.abs(rect.top) / (window.innerHeight * 2));
            img.style.transform = `scale(${scale})`;
          } else {
            // Reset scale when the image goes out of view
            img.style.transform = 'scale(1)';
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleScroll, {
      root: null,
      threshold: 0.1,
    });

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [selector]);
};

export default useScrollZoom;
