"use client";
import styles from '../../styles/Home.module.css';

import {  fetchContentFulImageUrlsAndDesc } from '../../lib/contentful';

import { useState, useEffect } from 'react';
import Link from 'next/link';


// src/components/Footer.js
export default function AdultSection() {

    const [imageData, setImageData] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await fetchContentFulImageUrlsAndDesc('adults', 'adultEvent');
          console.log('AdultSection', data.urls);
          setImageData(data.urls);
        } catch (error) {
          console.error("Error fetching images:", error);
        }
      };
  
      fetchData();
    }, []);
  
    const [currentIndex, setCurrentIndex] = useState(0);
  const handleScrollRight = () => {
    if (imageData.length > 3) {
      // Add flip-out class to current images
      const currentImages = document.querySelectorAll(`.${styles.imageScrollContainer} .image-slide img`);
      currentImages.forEach((img) => img.classList.add(styles.flipOut));

      // Wait for flip-out animation to complete, then update images
      setTimeout(() => {
        setCurrentIndex((prevIndex) => {
          const newIndex = (prevIndex + 3) % imageData.length;

          // Remove flip-out class and add flip-in class to new images
          const newImages = document.querySelectorAll(`.${styles.imageScrollContainer} .image-slide img`);
          newImages.forEach((img) => {
            img.classList.remove(styles.flipOut);
            img.classList.add(styles.flipIn);
          });

          // Remove flip-in class after animation completes
          setTimeout(() => {
            newImages.forEach((img) => img.classList.remove(styles.flipIn));
          }, 500);

          return newIndex;
        });
      }, 500); // Duration of the flip-out animation
    }
  };

  const handleScrollLeft = () => {
    if (imageData.length > 3) {
      const currentImages = document.querySelectorAll(`.${styles.imageScrollContainer} .image-slide img`);
      currentImages.forEach((img) => img.classList.add(styles.flipOut));

      setTimeout(() => {
        setCurrentIndex((prevIndex) => {
          const newIndex = (prevIndex - 3 + imageData.length) % imageData.length;

          const newImages = document.querySelectorAll(`.${styles.imageScrollContainer} .image-slide img`);
          newImages.forEach((img) => {
            img.classList.remove(styles.flipOut);
            img.classList.add(styles.flipIn);
          });

          setTimeout(() => {
            newImages.forEach((img) => img.classList.remove(styles.flipIn));
          }, 500);

          return newIndex;
        });
      }, 500); // Duration of the flip-out animation
    }
  };
  // Calculate the group of three images to display
  const visibleImages = imageData.slice(currentIndex, currentIndex + 3);
  
  if (visibleImages.length < 3) {
    visibleImages.push(...imageData.slice(0, 3 - visibleImages.length)); // Loop around if fewer than 3 remain
  }
    return (
        <section className={`${styles.eventsSection} `}>
          <h2 className={styles.subheading}>Adults</h2>
       
        <div className={styles.imageScrollContainer}>
        <button className={styles.scrollButton} onClick={handleScrollLeft}>
          &larr;
        </button>
          {visibleImages.map((image, index) => (
            <div key={index} className="image-slide">
              <Link href={image.ref ? `/events/${image.ref}` : "/events"} >
                <img
                  src={image.url}
                  alt={`Event ${currentIndex + index + 1}`}
                  className={`${styles.eventImage} ${styles.flip} ${styles.zoomSection}`}
                />
              </Link>
              <p class={styles.mediumTitle}> {image.description}</p>
              <p class={styles.pTag}>
                <Link href={image.ref ? `/events/${image.ref}` : "/events"}>
                  More information
                </Link>
              </p>

            </div>
          ))}
          <button className={styles.scrollButton} onClick={handleScrollRight}>
            &rarr;
          </button>

        </div>
</section>

    );
  }
  