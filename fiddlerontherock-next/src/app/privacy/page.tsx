import type { Metadata } from "next";
import { PageHero, Section } from "@/components/PagePrimitives";

export const metadata: Metadata = {
  title: "Privacy Policy | Fiddler on the Rock",
  description: "Privacy Policy for Fiddler on the Rock. Learn how we handle your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="site-main">
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle="Last Updated: June 2026"
        image="/images/tyler-performance.jpg"
      />

      <Section>
        <div style={{ maxWidth: "800px", margin: "0 auto", color: "var(--color-cream-soft)", lineHeight: "1.8" }}>
          <p className="lede" style={{ color: "var(--color-cream)" }}>
            Fiddler on the Rock is committed to protecting your privacy. This Privacy Policy describes how we collect, use, and share your personal information.
          </p>

          <h3 style={{ color: "var(--color-gold)", margin: "40px 0 20px", fontFamily: "var(--font-serif)", fontSize: "1.8rem" }}>1. Information We Collect</h3>
          <p>
            When you purchase tickets, book a private event, or sign up for our newsletter, we may collect personal information such as:
          </p>
          <ul style={{ paddingLeft: "20px", margin: "16px 0" }}>
            <li>Name and contact information (email address, phone number).</li>
            <li>Payment details (processed securely via Stripe).</li>
            <li>Event details (dates, preferences, attendance numbers).</li>
          </ul>

          <h3 style={{ color: "var(--color-gold)", margin: "40px 0 20px", fontFamily: "var(--font-serif)", fontSize: "1.8rem" }}>2. How We Use Your Information</h3>
          <p>
            We use your information to:
          </p>
          <ul style={{ paddingLeft: "20px", margin: "16px 0" }}>
            <li>Process and confirm ticket bookings.</li>
            <li>Coordinate private concerts and special requests.</li>
            <li>Send you dispatches, schedule releases, and updates (only if you opt in to "Stay Connected").</li>
            <li>Comply with financial regulations and secure payments.</li>
          </ul>

          <h3 style={{ color: "var(--color-gold)", margin: "40px 0 20px", fontFamily: "var(--font-serif)", fontSize: "1.8rem" }}>3. Sharing Your Information</h3>
          <p>
            We do not sell your personal data. We only share information with trusted services that help run our booking platform:
          </p>
          <ul style={{ paddingLeft: "20px", margin: "16px 0" }}>
            <li><strong>Stripe:</strong> To process secure checkout payments.</li>
            <li><strong>Supabase:</strong> To store booking database records securely.</li>
            <li><strong>GoHighLevel (GHL):</strong> To manage contacts and coordinate CRM bookings.</li>
          </ul>

          <h3 style={{ color: "var(--color-gold)", margin: "40px 0 20px", fontFamily: "var(--font-serif)", fontSize: "1.8rem" }}>4. Your Rights</h3>
          <p>
            You have the right to request access to the personal data we hold about you, to request corrections, or to ask that we delete your contact records. If you are subscribed to our email newsletter, you can click "unsubscribe" at any time.
          </p>

          <h3 style={{ color: "var(--color-gold)", margin: "40px 0 20px", fontFamily: "var(--font-serif)", fontSize: "1.8rem" }}>5. Contact Us</h3>
          <p>
            For questions about this policy or to request data removal, please contact us through our utility form or email.
          </p>
        </div>
      </Section>
    </div>
  );
}
