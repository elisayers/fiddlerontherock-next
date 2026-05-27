import type { MetadataRoute } from "next";
import { site } from "@/lib/data";

const routes = ["", "/experiences", "/one-man-symphony", "/legends-of-the-fiddle", "/sedona-serenades", "/booking", "/media", "/cbs", "/documentary", "/videos", "/music", "/press", "/what-people-say", "/merch", "/support", "/about", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({ url: site.url + route, lastModified: new Date(), changeFrequency: route === "" ? "weekly" : "monthly", priority: route === "" ? 1 : 0.8 }));
}
