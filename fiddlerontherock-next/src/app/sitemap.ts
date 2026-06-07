import type { MetadataRoute } from "next";
import { site } from "@/lib/data";

const routes = ["", "/live-concerts", "/private-events", "/experiences", "/one-man-symphony", "/legends-of-the-fiddle", "/booking", "/media-merch", "/cbs", "/press", "/what-people-say", "/support", "/about", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({ url: site.url + route, lastModified: new Date(), changeFrequency: route === "" ? "weekly" : "monthly", priority: route === "" ? 1 : 0.8 }));
}
