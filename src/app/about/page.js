// src/app/about/page.js
"use client";
import PageLayout from '../../components/PageLayout';
import styles from '../../styles/about.module.css';
import { useEffect, useState,useRef } from 'react';
import { fetchContentFulImageUrls,fetchAboutUsData } from '../../lib/contentful'; // Function to fetch Contentful data
import Link from 'next/link';
import Markdown from 'markdown-to-jsx';
import useScrollHighlight from '../../hooks/useScrollHighlight';

export default function AboutPage() {
  const [imageUrls, setContentImage] = useState([]);
  const [contentData, setContentData] = useState('');
  const textSectionRef = useRef(null);
  const galleryRef = useRef(null);


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
  //  // Scroll zoom effect for text elements
  //  useEffect(() => {
  //   const handleScroll = () => {

  //     console.log('handleScroll');
  //     const sections = textSectionRef.current?.querySelectorAll(`.${styles.scrollZoomText}`);
  //     console.log('sections',sections);
  //     try{ 
  //     sections?.forEach((section) => {
  //       const rect = section.getBoundingClientRect();
  //       console.log('rect',rect);
  //       // Check if the element is in view
  //       if (rect.top < window.innerHeight && rect.bottom >= 0) {
  //         console.log('innerHeight');
  //         const scale = Math.min(1.2, 1 + (window.innerHeight - rect.top) / window.innerHeight * 0.2);
  //         section.style.transform = `scale(${scale})`;
  //         section.style.opacity = `${Math.min(1, 1.2 - scale)}`;
  //         section.style.color = ' #2a4d55;';
  //       } else {
  //         console.log('transform');
  //         section.style.transform = 'scale(1)';
  //         section.style.opacity = '0.5';
  //         section.style.color = ' #eaeaea;';
  //       }
  //     });
  //   }
  //     catch(error){
  //       console.error('error',error);
  //     }
  //   };


  //   window.addEventListener('scroll', handleScroll);
  //   handleScroll();

  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);


  // Use IntersectionObserver to apply zoom effect on scroll
  const sectionRefs = useRef([]); // Array of refs for each scroll-zoom text

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: [0.1, 0.5, 1.0],
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.transform = `scale(1.2)`;
          entry.target.style.opacity = `1`;
        } else {
          entry.target.style.transform = `scale(1)`;
          entry.target.style.opacity = `0.5`;
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    
    // Attach each ref in the array to the observer
    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
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


    {/* About Text Section with Scroll Zoom Effect */}
    <div className={styles.aboutTextSection}>
        <h1>About Greystone Lawn Tennis Club</h1>
        <p ref={(el) => (sectionRefs.current[0] = el)} className={styles.scrollZoomText}>
          Our club was established to provide a space for tennis enthusiasts...
        </p>
        <p ref={(el) => (sectionRefs.current[1] = el)} className={styles.scrollZoomText}>
          We offer state-of-the-art facilities and an amazing community...
        </p>
      </div>

    {/* Gallery Section with Hover Zoom Effect */}
    {/* <div className={styles.gallerySection} ref={galleryRef}>
      {imageUrls[0].slice(1, 7).map((url, index) => (
        <div key={index} className={styles.galleryImageWrapper}>
          <img src={url} alt={`Gallery ${index + 1}`} className={styles.galleryImage} />
        </div>
      ))}
    </div> */}


  {/* Third Section: Image Gallery */}
  <section className={styles.gallerySection}>
          <div className={styles.galleryImageWrapper}>
            <img src={imageUrls[0]} alt="Image 1" className={styles.galleryImage} />
            <img src= {imageUrls[0]} alt="Image 2" className={styles.galleryImage} />
            <img src={imageUrls[0]} alt="Image 3" className={styles.galleryImage} />
            <img src={imageUrls[0]} alt="Image 4" className={styles.galleryImage} />
            <img src={imageUrls[0]}  alt="Image 5" className={styles.galleryImage} />
            <img src={imageUrls[0]} alt="Image 6" className={styles.galleryImage} />
          </div>
        </section>
 {/* Final Text Section with Scroll Zoom Effect */}
     <div className={styles.finalTextSection}>
        <p ref={(el) => (sectionRefs.current[2] = el)} className={styles.scrollZoomText}>
          Experience the best of tennis at our club...
        </p>
        <p ref={(el) => (sectionRefs.current[3] = el)} className={styles.scrollZoomText}>
          We welcome players of all skill levels to join our community...
        </p>
      </div>
  </div>
  );
  
  // return (
  //   <div className={styles.aboutPage}>
  //   {/* Logo */}
  //   <Link href="/" className={styles.logo}>
  //     <img src="/images/logo.png" alt="Greystones Lawn Tennis Club Logo" />
  //   </Link>
  
  //   {/* Full-screen Image with Text Overlay */}
  //   {imageUrls && (
  //     <div className={styles.imageContainer}>
  //       <img src={imageUrls[0]} alt="About Us" className={styles.aboutImage} />
       
  //     </div>
  //   )}
  
  //   {/* Content Section with Scrolling Highlight */}
  //   <div className={styles.aboutContent}>
   
  //         <h1 className={styles.aboutTitle}>Our story</h1>
  //         <p className={styles.aboutDescription}> <span className={styles.highlight}>{contentData.title}</span></p>
    
  //     <p>
  //       <Markdown className={styles.aboutText}>{contentData.titleText}</Markdown>
  //     </p>
  //   </div>
  // </div>
  
  // );
}
