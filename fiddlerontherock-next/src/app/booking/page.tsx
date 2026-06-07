import type { Metadata } from "next";
import BookingForm from "@/components/BookingForm";
import ErrorBoundary from "@/components/ErrorBoundary";
import type { ShowId } from "@/lib/booking/types";

export const metadata: Metadata = {
  title: "Checkout | Fiddler on the Rock",
  description: "Secure ticket reservation for Fiddler on the Rock sunset concerts and private events in Sedona.",
};

const validShows: ShowId[] = ["one-man-symphony", "legends-of-the-fiddle", "sedona-serenades"];

export default function BookingPage({ searchParams }: { searchParams?: { show?: string } }) {
  const requestedShow = validShows.includes(searchParams?.show as ShowId) ? (searchParams?.show as ShowId) : undefined;
  const activeShow = requestedShow ?? "one-man-symphony";

  return (
    <div className="checkout-page-container" style={{
      background: "var(--color-ink)",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "stretch"
    }}>
      <ErrorBoundary>
        <BookingForm showId={activeShow} />
      </ErrorBoundary>
    </div>
  );
}
