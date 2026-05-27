import { experiences, site } from "@/lib/data";

export function localBusinessSchema() {
  return { "@context": "https://schema.org", "@type": ["LocalBusiness", "PerformingGroup"], name: site.name, url: site.url, description: site.description, image: site.url + "/images/tyler-hero.jpg", address: { "@type": "PostalAddress", addressLocality: "Sedona", addressRegion: "AZ", addressCountry: "US" }, performer: { "@type": "Person", name: site.owner } };
}

export function eventSchema() {
  return experiences.filter((experience) => experience.id !== "sedona-serenades").map((experience) => ({ "@context": "https://schema.org", "@type": "Event", name: experience.schemaName, description: experience.summary, eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode", eventStatus: "https://schema.org/EventScheduled", location: { "@type": "Place", name: experience.where ?? "Sedona, Arizona", address: { "@type": "PostalAddress", addressLocality: "Sedona", addressRegion: "AZ", addressCountry: "US" } }, performer: { "@type": "Person", name: site.owner }, image: site.url + experience.image, offers: { "@type": "Offer", url: site.url + experience.href, availability: "https://schema.org/InStock", priceCurrency: "USD" } }));
}

export function videoSchema(name: string, description: string, thumbnail: string, url: string) {
  return { "@context": "https://schema.org", "@type": "VideoObject", name, description, thumbnailUrl: [site.url + thumbnail], uploadDate: "2025-01-01", publisher: { "@type": "Organization", name: site.name }, contentUrl: url };
}
