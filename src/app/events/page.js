// src/app/events/page.js
// import { fetchAllEvents } from '../../lib/contentful';
import EventCard from '../../components/EventCard';

export default async function Events() {
  //const events = await fetchAllEvents();

  return (
    <section>
      <h1>Events</h1>
      {/* {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))} */}
    </section>
  );
}
