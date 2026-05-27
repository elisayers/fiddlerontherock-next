import type { Metadata } from "next";
import { ButtonLink, PageHero, Section } from "@/components/PagePrimitives";

export const metadata: Metadata = {
  title: "Booking Canceled | Fiddler on the Rock",
  description: "Return to booking for Fiddler on the Rock.",
};

export default function BookingCanceledPage() {
  return (
    <>
      <PageHero eyebrow="Checkout canceled" title="No payment was completed." subtitle="Your seat hold will expire automatically. You can return to the booking page when ready." />
      <Section title="Continue booking">
        <div className="button-row left">
          <ButtonLink link={{ label: "Return to Booking", href: "/booking" }} />
          <ButtonLink link={{ label: "Contact", href: "/contact" }} variant="ghost" />
        </div>
      </Section>
    </>
  );
}
