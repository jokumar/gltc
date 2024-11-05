// src/app/about/page.js
"use client";
import PageLayout from '../../components/PageLayout';
import styles from '../../styles/about.module.css';
import { useEffect, useState } from 'react';
import { fetchContentFulImageUrls,fetchAboutUsData } from '../../lib/contentful'; // Function to fetch Contentful data
import Link from 'next/link';
import Markdown from 'markdown-to-jsx';
import useScrollHighlight from '../../hooks/useScrollHighlight';

export default function AboutPage() {
  const [imageUrls, setContentImage] = useState([]);
  const [contentData, setContentData] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchContentFulImageUrls('aboutUs','image'); // Fetch data from Contentful
      const aboutUsData = await fetchAboutUsData();
      console.log(aboutUsData)
      setContentData(aboutUsData[0]);
      setContentImage(data.urls);
    };
    fetchData();
  }, []);
  useScrollHighlight();

  return (
   <div className={styles.aboutPage}>
    {/* Logo */}
    <Link href="/" className={styles.logo}>
        <img src="/images/logo.png" alt="Greystones Lawn Tennis Club Logo" />
    </Link>

    {/* Full-Screen Image */}
    {imageUrls && (
        <img src={imageUrls[0]} alt="About Us" className={styles.aboutImage} />
    )}

    {/* Content */}
    <div className={styles.aboutContent}>
        <h1 className={styles.aboutTitle}>Our story</h1>
        <p className={styles.aboutText}>
            <span className={styles.highlight}>{contentData.title}</span>
        </p>

        <p>
            <Markdown className={styles.aboutText}>{contentData.titleText}</Markdown>
        </p>
    </div>
</div>

  
  );
}
