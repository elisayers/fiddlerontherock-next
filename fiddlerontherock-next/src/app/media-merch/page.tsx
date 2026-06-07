import type { Metadata } from "next";
import MediaMerchClient from "./MediaMerchClient";

export const metadata: Metadata = {
  title: "Watch, Listen & Shop Merch | Fiddler on the Rock Sedona",
  description: "Immerse yourself in Tyler Carson's Living Music story: watch the CBS segment and documentary, listen to original tracks, and shop official apparel."
};

export default function MediaMerchPage() {
  return <MediaMerchClient />;
}
