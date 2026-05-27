import type { Metadata } from "next";
import { demoAvailability } from "@/lib/booking/catalog";
import { PageHero, Section } from "@/components/PagePrimitives";

export const metadata: Metadata = {
  title: "Admin Availability | Fiddler on the Rock",
  description: "Manage Tyler Carson availability for public shows and Sedona Serenades.",
};

export default function AdminAvailabilityPage() {
  const serenades = demoAvailability("sedona-serenades").slice(0, 8);
  return (
    <>
      <PageHero eyebrow="Admin" title="Tyler's shared calendar" subtitle="Public shows and Serenades must block one global Tyler calendar so he cannot be double-booked." />
      <Section title="Demo Serenades slots">
        <div className="admin-panel">
          <table className="admin-table">
            <thead>
              <tr><th>Slot</th><th>Location</th><th>Capacity</th><th>Paid</th><th>Held</th></tr>
            </thead>
            <tbody>
              {serenades.map((slot) => (
                <tr key={slot.id}>
                  <td>{new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(new Date(slot.startsAt))}</td>
                  <td>{slot.label}</td>
                  <td>{slot.capacity}</td>
                  <td>{slot.paidCount}</td>
                  <td>{slot.heldCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </>
  );
}
