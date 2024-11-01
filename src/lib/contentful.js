// src/lib/contentful.js
import { createClient } from 'contentful';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

export async function fetchHomepageData() {
  const res = await client.getEntries({ content_type: 'homepage' });
  const homepageData = res.items[0].fields;

  return {
    welcomeMessage: homepageData.title,
    // featuredEvents: homepageData.featuredEvents.map((event) => ({
    //     title: event.fields.title,
    // })),
  };
}
export async function fetchWelcomeImageData() {
    const res = await client.getEntries({ content_type: 'welcomeImage' });
    const welcomeData = res.items[0].fields;
  
    return {
      eventsImage: welcomeData.eventsImage,
      // featuredEvents: homepageData.featuredEvents.map((event) => ({
      //     title: event.fields.title,
      // })),
    };
  }
// export async function fetchAllEvents() {
//   const res = await client.getEntries({ content_type: 'event' });
//   return res.items.map((event) => ({
//     title: event.fields.title,
//   }));
// }
