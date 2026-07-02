import { Suspense } from "react";
import type { Metadata } from "next";
import { PageHero, Section } from "@/components/PagePrimitives";
import JsonLd from "@/components/JsonLd";
import { localBusinessSchema } from "@/lib/schema";
import ContactInquiryForm from "./ContactInquiryForm";

export const metadata: Metadata = {
  title: "Contact Fiddler on the Rock",
  description: "Contact Fiddler on the Rock for private events, Sedona Serenades, press, merch, and booking questions.",
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={localBusinessSchema()} />
      <PageHero
        eyebrow="Contact"
        title="Tell us what you are planning."
        subtitle="Use this page for private events, Sedona Serenades, press, merch, and booking questions. If a backend workflow is not connected yet, the form still gives you a clear direct-contact path."
        image="/images/serenades-1.jpg"
        align="left"
        imagePosition="center center"
        mobileImagePosition="58% center"
      />
      <Section title="Inquiry form" eyebrow="Direct Contact">
        <Suspense fallback={<div className="checkout-status-card" style={{ maxWidth: "860px" }}><h4>Loading contact form.</h4><p>If this takes a moment, you can still email hello@fiddlerontherock.com directly.</p></div>}>
          <ContactInquiryForm />
        </Suspense>
      </Section>
    </>
  );
}
