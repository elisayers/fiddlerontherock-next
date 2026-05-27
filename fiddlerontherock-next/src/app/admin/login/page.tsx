import type { Metadata } from "next";
import { PageHero, Section } from "@/components/PagePrimitives";

export const metadata: Metadata = {
  title: "Admin Login Setup | Fiddler on the Rock",
  description: "Supabase Auth setup for Fiddler on the Rock booking admin.",
};

export default function AdminLoginPage() {
  return (
    <>
      <PageHero eyebrow="Supabase Auth" title="Admin login connects here." subtitle="The MVP uses Supabase email authentication. This page is the setup placeholder until Supabase project keys are added." />
      <Section title="Setup checklist">
        <div className="admin-panel">
          <p>1. Create a Supabase project and run <code>supabase/migrations/202605260001_booking_mvp.sql</code>.</p>
          <p>2. Add the admin user's Supabase auth ID to <code>admin_profiles</code>.</p>
          <p>3. Add Supabase and Stripe environment variables to Vercel.</p>
          <p>4. Replace this setup placeholder with the Supabase email OTP/password login component once the project URL and anon key are available.</p>
        </div>
      </Section>
    </>
  );
}
