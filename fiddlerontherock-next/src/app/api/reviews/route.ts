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

// Fallback high-fidelity reviews when API keys are not present
const mockReviews: NormalizedReview[] = [
  {
    id: "g1",
    source: "google",
    author: "Karen M.",
    rating: 5,
    text: "We flew in from Austin and this was, without question, the highlight of our entire trip. We've been to Sedona three times. Nothing comes close to this performance in the Red Rocks.",
    date: "2 days ago",
    profilePhoto: "",
    url: "https://google.com/maps",
    category: "concert"
  },
  {
    id: "g2",
    source: "google",
    author: "Sarah & John D.",
    rating: 5,
    text: "We booked Tyler for our wedding proposal at the Secret Spot. He played our custom songs as the sun set over the cliffs. It was absolutely magical and worth every penny. A memory we will hold forever.",
    date: "2 weeks ago",
    profilePhoto: "",
    url: "https://google.com/maps",
    category: "wedding"
  },
  {
    id: "y1",
    source: "yelp",
    author: "Emily S.",
    rating: 5,
    text: "An incredible sunset concert experience. Tyler is a master of his craft. The looping technique is fascinating, and the backdrop of Wilson Mountain at the Apple Barn is absolutely stunning.",
    date: "3 days ago",
    profilePhoto: "",
    url: "https://yelp.com",
    category: "concert"
  },
  {
    id: "f1",
    source: "facebook",
    author: "Laura B.",
    rating: 5,
    text: "Tyler played for our wellness and meditation retreat in the Sedona canyon. The sound of the violin vibrating through the red rocks created a deeply spiritual, resonant, and healing space. Simply amazing.",
    date: "1 month ago",
    profilePhoto: "",
    url: "https://facebook.com",
    category: "retreat"
  },
  {
    id: "g3",
    source: "google",
    author: "David L.",
    rating: 5,
    text: "Tyler's One Man Symphony is mind-blowing! The way he loops the violin and builds an entire orchestra live at sunset is unforgettable. Highly recommend to anyone visiting Sedona.",
    date: "1 week ago",
    profilePhoto: "",
    url: "https://google.com/maps",
    category: "concert"
  },
  {
    id: "y2",
    source: "yelp",
    author: "Thomas R.",
    rating: 5,
    text: "Fiddler on the Rock is an absolute must-do. Tyler's performance is deeply emotional, cinematic, and technically flawless. We sat spellbound the entire evening. Easily 5 stars.",
    date: "1 month ago",
    profilePhoto: "",
    url: "https://yelp.com",
    category: "concert"
  },
  {
    id: "f2",
    source: "facebook",
    author: "Marcus G.",
    rating: 5,
    text: "Highly recommend Tyler Carson! An unforgettable night of music, stories, and connection. His energy is infectious and the setting is pure Sedona magic. Will definitely return.",
    date: "3 weeks ago",
    profilePhoto: "",
    url: "https://facebook.com",
    category: "concert"
  },
  {
    id: "g4",
    source: "google",
    author: "Michelle K.",
    rating: 5,
    text: "Hearing Tyler's loop violin in the Apple Barn at the Sedona Heritage Museum was the highlight of our visit. Outstanding acoustics, intimate seating, and beautiful stories.",
    date: "2 weeks ago",
    profilePhoto: "",
    url: "https://google.com/maps",
    category: "concert"
  },
  {
    id: "y3",
    source: "yelp",
    author: "Jessica P.",
    rating: 5,
    text: "We hired Tyler Carson for our outdoor wedding ceremony in Sedona. He was incredibly professional, flexible, and played beautifully. Our guests are still talking about the violin music!",
    date: "Last month",
    profilePhoto: "",
    url: "https://yelp.com",
    category: "wedding"
  },
  {
    id: "f3",
    source: "facebook",
    author: "Chris D.",
    rating: 5,
    text: "A beautiful soul and incredibly talented violinist. His CBS Mornings feature brought us here, and the live show in person exceeded all expectations. A truly unique performance.",
    date: "2 weeks ago",
    profilePhoto: "",
    url: "https://facebook.com",
    category: "general"
  },
  {
    id: "g5",
    source: "google",
    author: "Amanda W.",
    rating: 5,
    text: "The most romantic proposal music we could have dreamed of. Tyler played our favorite songs on a private cliff, and the acoustics in the red rocks were unbelievable. 10/10!",
    date: "Last month",
    profilePhoto: "",
    url: "https://google.com/maps",
    category: "wedding"
  },
  {
    id: "f4",
    source: "facebook",
    author: "Robert T.",
    rating: 5,
    text: "We booked a private Sedona Serenade concert for our spiritual wellness circle. Tyler's sound healing and violin presence elevated the entire retreat. Highly recommend his work.",
    date: "2 months ago",
    profilePhoto: "",
    url: "https://facebook.com",
    category: "retreat"
  }
];

export async function GET() {
  const googleKey = process.env.GOOGLE_PLACES_API_KEY;
  const googlePlaceId = process.env.GOOGLE_PLACE_ID;
  const yelpKey = process.env.YELP_API_KEY;
  const yelpBusinessId = process.env.YELP_BUSINESS_ID;
  const facebookToken = process.env.FACEBOOK_ACCESS_TOKEN;
  const facebookPageId = process.env.FACEBOOK_PAGE_ID;

  // If no API keys are present, return normalized mock reviews immediately
  if (!googleKey && !yelpKey && !facebookToken) {
    return NextResponse.json({ reviews: mockReviews, source: "mocked" });
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

    // If combined reviews are empty (API failures), return the mock data
    if (combinedReviews.length === 0) {
      return NextResponse.json({ reviews: mockReviews, source: "mocked_fallback" });
    }

    return NextResponse.json({ reviews: combinedReviews, source: "live" });
  } catch (error) {
    console.error("Promise.all failed in review fetcher:", error);
    return NextResponse.json({ reviews: mockReviews, source: "mocked_error_fallback" });
  }
}
