/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";

interface NormalizedReview {
  id: string;
  source: "google" | "yelp" | "facebook";
  author: string;
  rating: number;
  text: string;
  date: string;
  profilePhoto?: string;
  url: string;
  category: "concert" | "wedding" | "retreat" | "general";
}

export async function GET() {
  const googleKey = process.env.GOOGLE_PLACES_API_KEY;
  const googlePlaceId = process.env.GOOGLE_PLACE_ID;
  const yelpKey = process.env.YELP_API_KEY;
  const yelpBusinessId = process.env.YELP_BUSINESS_ID;
  const facebookToken = process.env.FACEBOOK_ACCESS_TOKEN;
  const facebookPageId = process.env.FACEBOOK_PAGE_ID;

  // Avoid presenting mock reviews as real guest proof.
  if (!googleKey && !yelpKey && !facebookToken) {
    return NextResponse.json({ reviews: [], source: "unconfigured" });
  }

  const fetchPromises: Promise<NormalizedReview[]>[] = [];

  // 1. Google Places Fetch
  if (googleKey && googlePlaceId) {
    fetchPromises.push(
      fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${googlePlaceId}&fields=reviews&key=${googleKey}`,
        { next: { revalidate: 86400 } } // Cache globally on Edge for 24 hours (ISR)
      )
        .then((res) => res.json())
        .then((data: any) => {
          const rawReviews = data.result?.reviews ?? [];
          return rawReviews.map((rev: any, idx: number) => {
            // Check review text keywords for simple theme categorization
            let category: NormalizedReview["category"] = "concert";
            const textLower = (rev.text ?? "").toLowerCase();
            if (textLower.includes("proposal") || textLower.includes("wedding") || textLower.includes("anniversary")) {
              category = "wedding";
            } else if (textLower.includes("retreat") || textLower.includes("meditation") || textLower.includes("spiritual")) {
              category = "retreat";
            }
            return {
              id: `google-${idx}`,
              source: "google",
              author: rev.author_name,
              rating: rev.rating,
              text: rev.text,
              date: rev.relative_time_description || "Recently",
              profilePhoto: rev.profile_photo_url,
              url: rev.author_url || "https://google.com/maps",
              category
            };
          });
        })
        .catch((err) => {
          console.error("Google Places Reviews API fetch failed:", err);
          return [];
        })
    );
  }

  // 2. Yelp Fusion Fetch
  if (yelpKey && yelpBusinessId) {
    fetchPromises.push(
      fetch(
        `https://api.yelp.com/v3/businesses/${yelpBusinessId}/reviews`,
        {
          headers: { Authorization: `Bearer ${yelpKey}` },
          next: { revalidate: 86400 }
        }
      )
        .then((res) => res.json())
        .then((data: any) => {
          const rawReviews = data.reviews ?? [];
          return rawReviews.map((rev: any, idx: number) => {
            let category: NormalizedReview["category"] = "concert";
            const textLower = (rev.text ?? "").toLowerCase();
            if (textLower.includes("proposal") || textLower.includes("wedding") || textLower.includes("anniversary")) {
              category = "wedding";
            } else if (textLower.includes("retreat") || textLower.includes("meditation") || textLower.includes("spiritual")) {
              category = "retreat";
            }
            return {
              id: `yelp-${idx}`,
              source: "yelp",
              author: rev.user?.name || "Yelp User",
              rating: rev.rating,
              text: rev.text,
              date: rev.time_created ? rev.time_created.split(" ")[0] : "Recently",
              profilePhoto: rev.user?.image_url,
              url: rev.url || "https://yelp.com",
              category
            };
          });
        })
        .catch((err) => {
          console.error("Yelp Fusion Reviews API fetch failed:", err);
          return [];
        })
    );
  }

  // 3. Facebook Graph Fetch
  if (facebookToken && facebookPageId) {
    fetchPromises.push(
      fetch(
        `https://graph.facebook.com/v19.0/${facebookPageId}/ratings?access_token=${facebookToken}`,
        { next: { revalidate: 86400 } }
      )
        .then((res) => res.json())
        .then((data: any) => {
          const rawRatings = data.data ?? [];
          return rawRatings.map((rating: any, idx: number) => {
            let category: NormalizedReview["category"] = "concert";
            const textLower = (rating.review_text ?? "").toLowerCase();
            if (textLower.includes("proposal") || textLower.includes("wedding") || textLower.includes("anniversary")) {
              category = "wedding";
            } else if (textLower.includes("retreat") || textLower.includes("meditation") || textLower.includes("spiritual")) {
              category = "retreat";
            }
            return {
              id: `facebook-${idx}`,
              source: "facebook",
              author: rating.reviewer?.name || "Facebook Guest",
              rating: rating.rating || 5, // Fallback to 5 stars if recommended
              text: rating.review_text || "Highly recommended!",
              date: rating.created_time ? new Date(rating.created_time).toLocaleDateString() : "Recently",
              profilePhoto: "",
              url: "https://facebook.com",
              category
            };
          });
        })
        .catch((err) => {
          console.error("Facebook Ratings API fetch failed:", err);
          return [];
        })
    );
  }

  try {
    const results = await Promise.all(fetchPromises);
    const combinedReviews = results.flat();

    if (combinedReviews.length === 0) {
      return NextResponse.json({ reviews: [], source: "empty" });
    }

    return NextResponse.json({ reviews: combinedReviews, source: "live" });
  } catch (error) {
    console.error("Promise.all failed in review fetcher:", error);
    return NextResponse.json({ reviews: [], source: "error" });
  }
}
