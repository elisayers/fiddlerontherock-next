import type { Metadata } from "next";
import { publicShows } from "@/lib/booking/catalog";
import { dollars } from "@/lib/booking/pricing";
import { PageHero, Section } from "@/components/PagePrimitives";

export const metadata: Metadata = {
  title: "Admin Events | Fiddler on the Rock",
  description: "Manage public Fiddler on the Rock show definitions.",
};

export default function AdminEventsPage() {
  return (
    <>
      <PageHero eyebrow="Admin" title="Public show setup" subtitle="These are the MVP defaults. After Supabase is connected, this screen becomes editable inventory." />
      <Section title="Ticketed shows">
        <div className="admin-panel">
          <table className="admin-table">
            <thead>
              <tr><th>Show</th><th>When</th><th>Capacity</th><th>General</th><th>VIP</th><th>Kids</th></tr>
            </thead>
            <tbody>
              {Object.entries(publicShows).map(([slug, show]) => (
                <tr key={slug}>
                  <td>{show.title}</td>
                  <td>{show.weekday === 4 ? "Thursdays" : "Saturdays"} at {show.startHour}:{String(show.startMinute).padStart(2, "0")}</td>
                  <td>{show.capacity}</td>
                  <td>{dollars(show.tiers.general.adult)}</td>
                  <td>{dollars(show.tiers.vip.adult)}</td>
                  <td>{dollars(show.tiers.general.kid)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </>
  );
}
