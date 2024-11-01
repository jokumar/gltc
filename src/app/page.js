// src/app/page.js
"use client";
//import { fetchHomepageData } from '../lib/contentful';
import EventCard from '../components/EventCard';
import styles from '../styles/Home.module.css';
import { useState } from 'react';
import Link from 'next/link';
export default function Home() {
  // Fetch data directly within the component
 // const data =  fetchHomepageData();
 // const { welcomeMessage, featuredEvents } = data;

  const videos = [
    "/videos/Welcome1.mp4",
    "/videos/Welcome2.mp4"
  ];
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const handleVideoEnd = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  return (
    <div className="container">
      <section className={styles.heroSection}>

       <Link href="/" className={styles.logo}>
              <img src="/images/logo.png" alt="Greystones Lawn Tennis Club Logo" />
            </Link>
        {/* Background Video */}
        <video
          key={currentVideoIndex} // Forces re-render when video changes
          autoPlay
          muted
          loop={false} // Set loop to false to go to the next video after each ends
          playsInline
          className={styles.backgroundVideo}
          onEnded={handleVideoEnd}
        >
          <source src={videos[currentVideoIndex]} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div>
          <h1>Greystones Lawn Tennis Club</h1>
           {/* Navigation Section */}
           <nav className={styles.navbar}>
        
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#events">Events</a></li>
              <li><a href="#membership">Membership</a></li>
              <li><a href="#contact">Contact Us</a></li>
            </ul>
          </nav>
        
          <button>Join Now</button>
        </div>
      </section>
      
      <section className={styles.eventsSection}>
        <div>
          <h2>Upcoming Events</h2>
          <p>Explore our exciting tournaments and coaching sessions.</p>
        </div>
      </section>

      <section className={styles.membershipSection}>
        <div>
          <h2>Membership</h2>
          <p>Become a part of our community and enjoy exclusive benefits.</p>
        </div>
      </section>
      
      <section className={styles.contactSection}>
        <div>
          <h2>Contact Us</h2>
          <p>Reach out and be a part of something great!</p>
        </div>
      </section>
    </div>
  );

}
