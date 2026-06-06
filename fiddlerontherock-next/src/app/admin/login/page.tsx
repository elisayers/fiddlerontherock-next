import type { Metadata } from "next";
import { PageHero, Section } from "@/components/PagePrimitives";
import { Suspense } from "react";
import LoginForm from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Admin Login | Fiddler on the Rock",
  description: "Secure login for Fiddler on the Rock booking admin panel.",
};

export default function AdminLoginPage() {
  return (
    <>
      <PageHero
        eyebrow="Authentication"
        title="Admin Sign In"
        subtitle="Access show occurrences, ticket configurations, custom availability, and Stripe-synced order status."
      />
      <Section>
        <Suspense fallback={<div style={{ textAlign: "center", color: "var(--color-gold)" }}>Loading...</div>}>
          <LoginForm />
        </Suspense>
      </Section>
    </>
  );
}
