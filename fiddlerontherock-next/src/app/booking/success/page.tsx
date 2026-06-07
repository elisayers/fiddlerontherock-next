import type { Metadata } from "next";
import { ButtonLink, PageHero, Section } from "@/components/PagePrimitives";
import SuccessClearCart from "./SuccessClearCart";

export const metadata: Metadata = {
  title: "Booking Confirmed | Fiddler on the Rock",
  description: "Your Fiddler on the Rock booking has been received.",
};

export default function BookingSuccessPage() {
  return (
    <>
      <SuccessClearCart />
      <PageHero
        eyebrow="Booking received"
        title="Your Sedona music moment is on its way."
        subtitle="Your confirmation details will be sent to the email used during checkout."
      />
      <Section title="What happens next">
        <p className="lede">Save your confirmation for the show date. If you have questions about arrival, seating, or a private experience detail, contact us and we will help.</p>
        <div className="button-row left">
          <ButtonLink link={{ label: "Back to Experiences", href: "/experiences" }} />
          <ButtonLink link={{ label: "Contact", href: "/contact" }} variant="ghost" />
        </div>
      </Section>
    </>
  );
}

