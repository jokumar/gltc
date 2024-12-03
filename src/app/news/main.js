"use client";
import styles from '../../styles/Home.module.css';
import { useEffect, useRef, useState } from "react";
import {  fetchJsonData } from '../../lib/contentful';


export default function NewsSection() {

    const [jsonData, setJsonData] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await fetchJsonData('news', 'news');
          setJsonData(data.jsonArray);
        } catch (error) {
          console.error("Error fetching images:", error);
        }
      };
  
      fetchData();
    }, []);
  


    const carouselRef = useRef(null);

    useEffect(() => {
        const carousel = carouselRef.current;
    
        if (!carousel) return; // Ensure carouselRef is attached before accessing properties
    
        let scrollAmount = 0;
        const scrollStep = 1; // Adjust for faster/slower scroll
        const maxScroll = carousel.scrollWidth - carousel.clientWidth;
    
        const autoScroll = setInterval(() => {
          scrollAmount += scrollStep;
          if (scrollAmount >= maxScroll) scrollAmount = 0;
          carousel.scrollTo({ left: scrollAmount, behavior: "smooth" });
        }, 30); // Adjust interval for speed
    
        return () => clearInterval(autoScroll); // Cleanup interval on unmount
      }, []);
    return (

        <section id="news" className={`${styles.newsSection}`}>
        <h2 className={styles.subheading}>Recent Club News</h2>
        <div className={styles.newsCarousel} ref={carouselRef}>
          <div className={styles.carouselContent}>
            {/* Map through news data */}
            {jsonData.map((news, index) => (
              <div key={index} className={styles.newsCard}>
                <h3>{news.title}</h3>
                <p className={styles.mediumTitle}>
                  <span role="img" aria-label="calendar">
                    📅
                  </span>{" "}
                  {news.date}
                </p>
                <p className={styles.pTag}>{news.content}</p>
                <button className={styles.readMoreButton}>Read More</button>
              </div>
            ))}
      
            {/* Duplicate Cards for Seamless Scrolling */}
            {jsonData.map((news, index) => (
              <div key={`duplicate-${index}`} className={styles.newsCard}>
                <h3>{news.title}</h3>
                <p className={styles.mediumTitle}>
                  <span role="img" aria-label="calendar">
                    📅
                  </span>{" "}
                  {news.date}
                </p>
                <p className={styles.pTag}>{news.content}</p>
                <button className={styles.readMoreButton}>Read More</button>
              </div>
            ))}
          </div>
        </div>
      </section>
      
    );
}