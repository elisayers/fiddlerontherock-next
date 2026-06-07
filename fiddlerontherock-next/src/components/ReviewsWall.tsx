"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

type FilterCategory = "all" | "concert" | "wedding" | "retreat";

export default function ReviewsWall() {
  const [reviews, setReviews] = useState<NormalizedReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetch("/api/reviews")
      .then((res) => {
        if (!res.ok) throw new Error("Could not load reviews.");
        return res.json();
      })
      .then((data: { reviews: NormalizedReview[] }) => {
        if (!active) return;
        setReviews(data.reviews ?? []);
      })
      .catch((err) => {
        if (!active) return;
        setError(err instanceof Error ? err.message : "Reviews failed to load.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const filteredReviews = useMemo(() => {
    if (activeFilter === "all") return reviews;
    return reviews.filter((rev) => rev.category === activeFilter);
  }, [reviews, activeFilter]);

  if (loading) {
    return (
      <div className="reviews-wall-container" style={{ marginTop: "40px" }}>
        <div className="review-filters">
          {["All", "Concerts", "Weddings", "Retreats"].map((label) => (
            <button key={label} type="button" className="review-filter-btn" disabled>
              {label}
            </button>
          ))}
        </div>
        <div className="reviews-skeleton-grid">
          {[1, 2, 3, 4, 5, 6].map((idx) => (
            <div key={idx} className="review-skeleton-card">
              <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <div className="skeleton-circle" />
                <div style={{ display: "grid", gap: "6px", flex: 1 }}>
                  <div className="skeleton-line" style={{ width: "40%" }} />
                  <div className="skeleton-line" style={{ width: "25%" }} />
                </div>
              </div>
              <div className="skeleton-line" style={{ width: "90%", height: "20px" }} />
              <div className="skeleton-line" style={{ width: "75%", height: "20px" }} />
              <div className="skeleton-line" style={{ width: "50%", height: "20px" }} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error && reviews.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "48px 24px", color: "var(--color-gold)" }}>
        <p>{error}</p>
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => window.location.reload()}
          style={{ marginTop: "16px" }}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="reviews-wall-container" style={{ marginTop: "24px" }}>
      {/* Category Tabs */}
      <div className="review-filters">
        {(["all", "concert", "wedding", "retreat"] as FilterCategory[]).map((cat) => (
          <button
            key={cat}
            type="button"
            className={`review-filter-btn ${activeFilter === cat ? "active" : ""}`}
            onClick={() => setActiveFilter(cat)}
          >
            {cat === "all" ? "All Reviews" : cat === "concert" ? "Concerts" : cat === "wedding" ? "Weddings" : "Retreats"}
          </button>
        ))}
      </div>

      {/* Masonry Columns Layout */}
      <div className="reviews-masonry">
        <AnimatePresence mode="popLayout">
          {filteredReviews.map((rev) => (
            <motion.div
              layout
              key={rev.id}
              className="reviews-masonry-item"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
            >
              <div className={`review-card-premium ${rev.source}`}>
                {/* Header: Author + Star rating & platform badge */}
                <div className="review-card-header">
                  <div className="reviewer-info">
                    {rev.profilePhoto ? (
                      <img
                        src={rev.profilePhoto}
                        alt={rev.author}
                        style={{ width: 38, height: 38, borderRadius: "50%", objectFit: "cover" }}
                      />
                    ) : (
                      <div className="reviewer-avatar">{rev.author.substring(0, 2)}</div>
                    )}
                    <div className="reviewer-meta">
                      <h4>{rev.author}</h4>
                      <span>{rev.date}</span>
                    </div>
                  </div>

                  <div className="platform-badge" title={`Verified review from ${rev.source}`}>
                    {rev.source === "google" && <GoogleIcon />}
                    {rev.source === "yelp" && <YelpIcon />}
                    {rev.source === "facebook" && <FacebookIcon />}
                  </div>
                </div>

                {/* Star Rating list */}
                <div className="review-rating-stars" aria-label={`${rev.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <span key={idx} style={{ color: idx < rev.rating ? "#FFB400" : "rgba(255,255,255,0.15)" }}>
                      ★
                    </span>
                  ))}
                </div>

                {/* Text Description */}
                <p className="review-card-text">"{rev.text}"</p>

                {/* Card Footer: Category badge + read more */}
                <div className="review-card-footer">
                  <span className="review-category-tag">
                    {rev.category === "concert" ? "Concert" : rev.category === "wedding" ? "Wedding" : rev.category === "retreat" ? "Retreat" : "Review"}
                  </span>
                  <a
                    href={rev.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="review-read-more"
                  >
                    Read on {rev.source} →
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Brand SVGs
function GoogleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.51 0-6.357-2.89-6.357-6.457 0-3.567 2.847-6.458 6.357-6.458 1.614 0 3.08.6 4.22 1.633l3.13-3.13C19.1 1.91 15.92 1 12.24 1 5.92 1 1 5.92 1 12.24s4.92 11.24 11.24 11.24c6.28 0 11.24-4.47 11.24-11.24 0-.79-.08-1.56-.24-2.296h-11z" />
    </svg>
  );
}

function YelpIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.954 13.905c-.098-.073-.133-.186-.113-.303.111-.645.247-1.464.316-1.895.034-.207.243-.324.428-.24l1.834.82c.571.256.76.945.385 1.442l-1.22 1.613c-.126.166-.347.199-.512.072l-1.118-.509zm1.096-3.79c-.04-.117.005-.246.108-.316.568-.38 1.291-.854 1.673-1.103.18-.119.412-.036.48.169l.66 2.007c.205.626-.145 1.28-.733 1.378l-2.003.332c-.208.033-.377-.123-.339-.333l.448-2.134zM10.15 12.44c.036-.118.156-.192.278-.175.65.093 1.482.22 1.914.288.207.033.328.239.248.424l-.794 1.84c-.247.575-.933.774-1.434.407l-1.63-1.192c-.167-.123-.207-.344-.085-.51l1.503-1.082zm-2.078-4.22c.112-.05.25.006.303.119.294.619.664 1.403.856 1.808.092.195-.01.424-.212.477l-1.996.52c-.622.162-1.23-.223-1.278-.865l-.16-2.016c-.017-.208.156-.37.362-.338l2.125.175zm2.842-1.986c.075-.098.196-.13.312-.08.625.267 1.419.624 1.83.82.196.095.272.332.162.51l-1.077 1.705c-.336.53-.996.657-1.493.284l-1.616-1.214c-.167-.125-.213-.35-.094-.522l1.976-2.503z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}
