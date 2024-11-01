// src/components/EventCard.js
import styles from '../styles/EventCard.module.css';

export default function EventCard({ event }) {
  return (
    <div className={styles.card}>
      <img src={event.image} alt={event.title} className={styles.image} />
      <h3>{event.title}</h3>
      <p>{event.date}</p>
      <p>{event.location}</p>
      <p>{event.description}</p>
    </div>
  );
}
