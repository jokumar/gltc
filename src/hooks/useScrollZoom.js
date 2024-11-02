// src/hooks/useScrollZoom.js

import { useEffect } from 'react';

const useScrollZoom = (selector) => {
  useEffect(() => {
    const sections = document.querySelectorAll(selector);

    const handleScroll = (entries) => {
      entries.forEach((entry) => {
        const img = entry.target.querySelector('img');
        if (entry.isIntersecting && img) {
          // Calculate zoom scale based on scroll position
          const rect = entry.boundingClientRect;
          const scale = Math.max(1.4, 1 + rect.top / (window.innerHeight * 1.5));
          img.style.transform = `scale(${scale})`;
        }
      });
    };

    const observer = new IntersectionObserver(handleScroll, {
      root: null,
      threshold: 0.1, // Adjusts when the zoom effect starts
    });

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [selector]);
};

export default useScrollZoom;
