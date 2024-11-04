// src/app/page.js
"use client";
import { fetchContentFulImageUrls,fetchHomepageVideos } from '../lib/contentful';
import styles from '../styles/Home.module.css';
import { useState,useEffect } from 'react';
import Link from 'next/link';
import useScrollZoom from '../hooks/useScrollZoom';

export default function Home() {


   useScrollZoom(`.${styles.zoomSection}`);

  // Fetch data directly within the component

  const [imageUrl, setImageUrl] = useState('');
  useEffect(() => {
    const fetchData = async () => {
        try {
            const data = await fetchContentFulImageUrls('welcomeImage','eventsImage');
            setImageUrl(data.urls); 
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
            <li><Link href="#events">Events</Link></li>
            <li><Link href="/membership">Membership</Link></li>
            <li><Link href="#contact">Contact Us</Link></li>
          </ul>
        </nav>
        <button className={styles.joinButton}>Join Now</button>
      </div>
    </section>
  
    <section id="events" className={`${styles.eventsSection} ${styles.zoomSection}`}>
      <div>
        <h2>Upcoming Events</h2>
        <p>Explore our exciting tournaments and coaching sessions.</p>
        {imageUrl && <img src={imageUrl[0]} alt="Upcoming Events" />}
      </div>
    </section>
  
    <section id="membership"  className={`${styles.membershipSection} ${styles.zoomSection}`}>

      <div>
        <h2>Membership</h2>
        <p>Become a part of our community and enjoy exclusive benefits.</p>
        {imageUrl && <img src={imageUrl[1]} alt="Membership Benefits" />}
      </div>
    </section>
  
    <section id="contact" className={`${styles.contactSection} ${styles.zoomSection}`}>
      <div>
        <h2>Contact Us</h2>
        <p>Reach out and be a part of something great!</p>
        {imageUrl && <img src={imageUrl[2]} alt="Contact Us" />}
      </div>
    </section>
  </div>
  
  );

}


