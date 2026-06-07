import { experiences, site } from "@/lib/data";

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "PerformingGroup"],
    "name": site.name,
    "url": site.url,
    "description": site.description,
    "image": site.url + "/images/tyler-hero.jpg",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Sedona",
      "addressRegion": "AZ",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 34.869739,
      "longitude": -111.760989
    },
    "performer": {
      "@type": "Person",
      "name": site.owner,
      "sameAs": site.url
    }
  };
}

export function musicEventSchema(events: any[]) {
  return events.map((event) => {
    let locationName = "Sedona, Arizona";
    let streetAddress = "";
    
    if (event.slug === "one-man-symphony") {
      locationName = "Historic Apple Barn at the Sedona Heritage Museum";
      streetAddress = "735 Jordan Rd";
    } else if (event.slug === "legends-of-the-fiddle") {
      locationName = "Sedona HUB";
      streetAddress = "525 Posse Ground Rd";
    }

    return {
      "@context": "https://schema.org",
      "@type": "MusicEvent",
      "name": `${event.title} - Fiddler on the Rock`,
      "description": event.slug === "one-man-symphony"
        ? "Tyler's signature one-man-orchestra sunset concert utilizing loop pedals and a rare horn violin."
        : "Tyler's theatrical, mythic loop violin show featuring Celtic fire and cinematic stories.",
      "startDate": event.startAt,
      "endDate": event.endAt,
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "eventStatus": "https://schema.org/EventScheduled",
      "location": {
        "@type": "Place",
        "name": locationName,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": streetAddress,
          "addressLocality": "Sedona",
          "addressRegion": "AZ",
          "postalCode": "86336",
          "addressCountry": "US"
        }
      },
      "image": [
        site.url + (event.slug === "one-man-symphony" ? "/images/red-rock-concert.jpg" : "/images/tyler-leaping.jpg")
      ],
      "performer": {
        "@type": "Person",
        "name": site.owner,
        "sameAs": site.url
      },
      "offers": {
        "@type": "Offer",
        "url": `${site.url}/booking?show=${event.slug}`,
        "price": event.generalPrice.replace("$", ""),
        "priceCurrency": "USD",
        "availability": event.soldOut ? "https://schema.org/SoldOut" : "https://schema.org/InStock",
        "validFrom": new Date().toISOString()
      }
    };
  });
}

export function aggregateRatingSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": site.name,
    "image": site.url + "/images/tyler-hero.jpg",
    "url": site.url,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Sedona",
      "addressRegion": "AZ",
      "addressCountry": "US"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "230",
      "bestRating": "5",
      "worstRating": "1"
    }
  };
}

export function videoSchema(name: string, description: string, thumbnail: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": name,
    "description": description,
    "thumbnailUrl": [site.url + thumbnail],
    "uploadDate": "2025-01-01",
    "publisher": {
      "@type": "Organization",
      "name": site.name
    },
    "contentUrl": url
  };
}
