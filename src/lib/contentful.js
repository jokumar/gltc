// src/lib/contentful.js
import { createClient } from 'contentful';

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

export async function fetchHomepageVideos() {
    const res = await client.getEntries({ content_type: 'welcomevideo' });
    const urls = [];
    for (const field in res.items[0].fields) {
      if (field.startsWith('video') && res.items[0].fields[field].fields?.file?.url) {
        urls.push('https:' + res.items[0].fields[field].fields.file.url);
      }
    }

    return {
      urls,
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

export async function fetchContentFulImageUrls(contentType, startsWithField) {
    const res = await client.getEntries({ content_type: contentType });
    const urls = [];
    for (const field in res.items[0].fields) {
      if (field.startsWith(startsWithField) && res.items[0].fields[field].fields?.file?.url) {
        urls.push('https:' + res.items[0].fields[field].fields.file.url);
      }
    }
    
    return {
      urls,
    };
  }
  export async function fetchContentFulImageUrlsAndDesc(contentType, startsWithField) {
    const res = await client.getEntries({ content_type: contentType });
    const urls = [];

    for (const field in res.items[0].fields) {
      
      if (field.startsWith(startsWithField) && res.items[0].fields[field].fields?.file?.url) {
        urls.push({url:'https:' + res.items[0].fields[field].fields.file.url,
        description:res.items[0].fields[field].fields.description,
        ref:res.items[0].fields[field].fields.title
        });
      }
    }
    
    return {
      urls,
    };
  }


  export async function fetchAboutUsData() {
    const res = await client.getEntries({ content_type: 'aboutUs' });
     return res.items.map((event) => ({
         title: event.fields.title,
         titleText: event.fields.titleText,
         
     }));
  }