// src/app/page.js
"use client";
import { fetchContentFulImageUrls, fetchHomepageVideos, fetchContentFulImageUrlsAndDesc } from '../lib/contentful';
import styles from '../styles/Home.module.css';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import useScrollZoom from '../hooks/useScrollZoom';

export default function Home() {


  useScrollZoom(`.${styles.zoomSection}`);

  // Fetch data directly within the component



  const [imageData, setImageData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchContentFulImageUrlsAndDesc('welcomeImage', 'eventsImage');
        console.log('data.urls', data.urls);
        setImageData(data.urls);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchData();
  }, []);


  const [videos, setVideoUrl] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchHomepageVideos();
        setVideoUrl(data.urls);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchData();
  }, []);


  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const handleVideoEnd = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };


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
  console.log('visibleImages', visibleImages);
  if (visibleImages.length < 3) {
    visibleImages.push(...imageData.slice(0, 3 - visibleImages.length)); // Loop around if fewer than 3 remain
  }

  return (
    <div className="container">
      <Link href="/" className={styles.logo} >
        <img src="/images/logo.png" alt="Greystones Lawn Tennis Club Logo" />
      </Link>
      <section className={`${styles.heroSection} ${styles.zoomSection}`}>
        <div className="backgroundVideoWrapper">
          {videos.length > 0 && (
            <video
              key={currentVideoIndex}
              autoPlay
              muted
              loop={false}
              playsInline
              className={styles.backgroundVideo}
              onEnded={handleVideoEnd}
            >
              <source src={videos[currentVideoIndex]} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
        <div className={styles.heroContent}>
          <h1 className={styles.heading}>Greystones Lawn Tennis Club</h1>
          <nav className={styles.navbar}>
            <ul>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/events">Events</Link></li>
              <li><Link href="/membership">Membership</Link></li>
              <li><Link href="#contact">Contact Us</Link></li>
            </ul>
          </nav>
          <button className={styles.joinButton}>Join Now</button>
        </div>
      </section>

      <section className={`${styles.eventsSection} `}>
        <button className={styles.scrollButton} onClick={handleScrollLeft}>
          &larr;
        </button>

        <div className={styles.imageScrollContainer}>
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





      <section id="membership" className={`${styles.membershipSection} ${styles.zoomSection}`}>

        <div>
          <h2 className={styles.heading}>Adults</h2>
          {/* {imageUrl && <img src={imageUrl[1]} alt="Membership Benefits" />} */}
        </div>
      </section>

      <section id="contact" className={`${styles.contactSection} ${styles.zoomSection}`}>
        <div>
          <h2 className={styles.heading}>Juniors</h2>
          {/* {imageUrl && <img src={imageUrl[2]} alt="Contact Us" />} */}
        </div>
      </section>

    </div>

  );

}


