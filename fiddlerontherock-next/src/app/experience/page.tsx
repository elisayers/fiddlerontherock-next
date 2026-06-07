import type { Metadata } from "next";
import ExperienceClient from "./ExperienceClient";

export const metadata: Metadata = {
  title: "Private Violin Overlook Concerts | Fiddler on the Rock Sedona",
  description: "Experience a private, sunset violin performance by Tyler Carson in the Red Rocks of Sedona. Perfect for proposals, weddings, and exclusive groups."
};

export default function ExperienceLandingPage() {
  return <ExperienceClient />;
}
