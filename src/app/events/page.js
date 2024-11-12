"use client";
// src/app/events/page.js
// import { fetchAllEvents } from '../../lib/contentful';
import EventCard from '../../components/EventCard';
import { useState,useEffect } from 'react';
import { fetchContentFulImageUrls,fetchHomepageVideos } from '../../lib/contentful';
import styles from '../../styles/events.module.css';
import Link from 'next/link';

export default function Events() {
  //const events = await fetchAllEvents();
  const [imageUrls, setContentImage] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
        try {
            const data = await fetchContentFulImageUrls('welcomeImage','eventsImage');
            setContentImage(data.urls);
        } catch (error) {
            console.error("Error fetching images:", error);
        }
    };

    fetchData();
}, []);
  return (
    <div className="container">
    <Link href="/" className={styles.logo} >
      <img src="/images/logo.png" alt="Greystones Lawn Tennis Club Logo" />
    </Link>
    <section className={`${styles.heroSection} `}>
    <div className={styles.fullscreenImageContainer}>
    {imageUrls[0] && <img src={imageUrls[0]} alt="Club Image"   className={styles.fullscreenImage} />}
        </div>
      </section>
      </div>
  );
}
