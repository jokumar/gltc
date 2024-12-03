// src/app/page.js
"use client";
import {  fetchHomepageVideos } from '../lib/contentful';
import styles from '../styles/Home.module.css';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import useScrollZoom from '../hooks/useScrollZoom';
import AdultSection from './adults/main'
import EventsSection from './events/main'
import Footer from '../components/Footer';
import NewsSection from './news/main';
export default function Home() {


  useScrollZoom(`.${styles.zoomSection}`);

  // Fetch data directly within the component





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
              <li><Link href="/events">Events</Link></li>
              <li><Link href="/membership">Membership</Link></li>
              <li><Link href="#contact">Contact Us</Link></li>
            </ul>
          </nav>
          <button className={styles.joinButton}>Join Now</button>
        </div>
      </section>

      
      <EventsSection/>
      <AdultSection/>   
          
      
        <NewsSection/>

 




    <Footer/>
    </div>

  );

}


