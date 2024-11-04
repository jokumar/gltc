// src/components/PageLayout.js

import styles from '../styles/PageLayout.module.css';

export default function PageLayout({ title, text, imageUrl }) {
  return (
    <div className={styles.pageLayout}>
      {imageUrl && <img src={imageUrl} alt={title} className={styles.image} />}
      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.text}>{text}</p>
      </div>
    </div>
  );
}
