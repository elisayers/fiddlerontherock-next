"use client";

import { useEffect, useMemo, useState } from "react";
import { publicShows, remainingSeats, serenadesAddOns, serenadesPackages, sourceOptions } from "@/lib/booking/catalog";
import { dollars, priceBooking } from "@/lib/booking/pricing";
import type { AvailabilitySlot, BookingSelection, SerenadesPackageId, ShowId, SourceAttribution, TicketTier } from "@/lib/booking/types";

interface BookingFormProps {
  showId: ShowId;
  compact?: boolean;
}

const serenadesLocationLabels: Record<string, string> = {
  secret_spot: "The Secret Spot",
  open_air_spot: "The Open-Air Spot",
};

function formatSlot(slot: AvailabilitySlot) {
  const date = new Date(slot.startsAt);
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function initialSelection(showId: ShowId): BookingSelection {
  if (showId === "sedona-serenades") {
    return {
      showId,
      slotId: "",
      packageId: "romantic_escape",
      guestCount: 2,
      kidCount: 0,
      underFiveCount: 0,
      customSongCount: 0,
      chocolateCount: 0,
      source: "internet_search",
    };
  }

  return {
    showId,
    slotId: "",
    tier: "general",
    adultCount: 2,
    kidCount: 0,
    underFiveCount: 0,
    source: "internet_search",
  };
}

export default function BookingForm({ showId, compact = false }: BookingFormProps) {
  const [slots, setSlots] = useState<AvailabilitySlot[]>([]);
  const [selection, setSelection] = useState<BookingSelection>(() => initialSelection(showId));
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [demoMode, setDemoMode] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetch(`/api/booking/availability?show=${showId}`)
      .then((response) => response.json())
      .then((data: { slots?: AvailabilitySlot[]; demo?: boolean }) => {
        if (!active) return;
        const nextSlots = data.slots ?? [];
        setDemoMode(Boolean(data.demo));
        setSlots(nextSlots);
        setSelection((current) => ({ ...current, slotId: current.slotId || nextSlots[0]?.id || "" }));
      })
      .catch(() => setMessage("Availability could not load. Please try again."))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [showId]);

  const selectedSlot = slots.find((slot) => slot.id === selection.slotId);
  const priced = useMemo(() => priceBooking(selection), [selection]);
  const isPublicShow = showId !== "sedona-serenades";
  const soldOut = selectedSlot ? remainingSeats(selectedSlot) < priced.capacityUnits : false;
  const remaining = selectedSlot ? remainingSeats(selectedSlot) : 0;

  function update<K extends keyof BookingSelection>(key: K, value: BookingSelection[K]) {
    setSelection((current) => ({ ...current, [key]: value }));
  }

  function choosePackage(packageId: SerenadesPackageId) {
    const pkg = serenadesPackages[packageId];
    setSelection((current) => ({
      ...current,
      packageId,
      guestCount: Math.max(pkg.minGuests, Math.min(current.guestCount || pkg.minGuests, pkg.maxGuests)),
      kidCount: packageId === "romantic_escape" ? current.kidCount || 0 : 0,
      underFiveCount: packageId === "romantic_escape" ? current.underFiveCount || 0 : 0,
    }));
  }

  async function submit() {
    setMessage("");
    if (demoMode) {
      const params = new URLSearchParams({ booking: "request", show: showId });
      if (selection.slotId) params.set("slot", selection.slotId);
      window.location.href = `/contact?${params.toString()}`;
      return;
    }
    if (!selection.slotId) {
      setMessage("Choose an available date before checkout.");
      return;
    }
    if (priced.errors.length) {
      setMessage(priced.errors[0]);
      return;
    }
    if (soldOut) {
      setMessage("That date does not have enough seats left. Please choose another date.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selection),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Checkout could not start.");
      if (data.requestOnly && data.redirectUrl) {
        window.location.href = data.redirectUrl;
        return;
      }
      window.location.href = data.url;
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Checkout could not start.");
      setSubmitting(false);
    }
  }

  return (
    <div className={compact ? "booking-shell compact" : "booking-shell"}>
      <div className="booking-main">
        <div className="booking-field full">
          <label htmlFor={`${showId}-date`}>Date and time</label>
          <select id={`${showId}-date`} value={selection.slotId} onChange={(event) => update("slotId", event.target.value)}>
            {loading ? <option>Loading dates...</option> : null}
            {!loading && !slots.length ? <option>No dates available</option> : null}
            {slots.map((slot) => {
              const label = `${formatSlot(slot)}${slot.location ? ` - ${serenadesLocationLabels[slot.location]}` : ""} (${remainingSeats(slot)} left)`;
              return (
                <option key={slot.id} value={slot.id} disabled={remainingSeats(slot) <= 0 || slot.soldOutOverride}>
                  {label}
                </option>
              );
            })}
          </select>
        </div>

        {isPublicShow ? (
          <>
            <div className="booking-field full">
              <span>Ticket tier</span>
              <div className="segmented-control">
                {(["general", "vip"] as TicketTier[]).map((tier) => (
                  <button key={tier} type="button" className={selection.tier === tier ? "active" : ""} onClick={() => update("tier", tier)}>
                    <strong>{publicShows[showId].tiers[tier].label}</strong>
                    <small>{dollars(publicShows[showId].tiers[tier].adult)} adult</small>
                  </button>
                ))}
              </div>
            </div>
            <NumberField label="Adults" value={selection.adultCount ?? 0} min={0} max={12} onChange={(value) => update("adultCount", value)} />
            <NumberField label="Kids 18 and under" value={selection.kidCount ?? 0} min={0} max={12} onChange={(value) => update("kidCount", value)} />
            <NumberField label="Under 8 free seats" value={selection.underFiveCount ?? 0} min={0} max={6} onChange={(value) => update("underFiveCount", value)} />
          </>
        ) : (
          <>
            <div className="booking-field full">
              <span>Package</span>
              <div className="package-grid">
                {(["romantic_escape", "gathering", "celebration"] as SerenadesPackageId[]).map((packageId) => {
                  const pkg = serenadesPackages[packageId];
                  return (
                    <button key={packageId} type="button" className={selection.packageId === packageId ? "active" : ""} onClick={() => choosePackage(packageId)}>
                      <strong>{pkg.title}</strong>
                      <small>{pkg.priceMode === "fixed" ? dollars(pkg.amount) : `${dollars(pkg.amount)} / person`}</small>
                      <span>{pkg.description}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            <NumberField label="Guests" value={selection.guestCount ?? 2} min={serenadesPackages[selection.packageId ?? "romantic_escape"].minGuests} max={serenadesPackages[selection.packageId ?? "romantic_escape"].maxGuests} onChange={(value) => update("guestCount", value)} />
            {selection.packageId === "romantic_escape" ? (
              <>
                <NumberField label="Kids ages 6-18" value={selection.kidCount ?? 0} min={0} max={6} onChange={(value) => update("kidCount", value)} />
                <NumberField label="Children under 5" value={selection.underFiveCount ?? 0} min={0} max={4} onChange={(value) => update("underFiveCount", value)} />
              </>
            ) : null}
            <NumberField label="Custom songs" value={selection.customSongCount ?? 0} min={0} max={4} help={`+${dollars(serenadesAddOns.customSong.amount)} each`} onChange={(value) => update("customSongCount", value)} />
            <NumberField label="Organic chocolates" value={selection.chocolateCount ?? 0} min={0} max={10} help={`+${dollars(serenadesAddOns.chocolate.amount)} each`} onChange={(value) => update("chocolateCount", value)} />
            <p className="booking-note full">Artesian spring water is included. Photography, Your Location, the Sedona Memory Package, and 11+ guest private events are request-assisted paths.</p>
          </>
        )}

        <div className="booking-field full">
          <label htmlFor={`${showId}-source`}>Where did you hear about us?</label>
          <select id={`${showId}-source`} value={selection.source} onChange={(event) => update("source", event.target.value as SourceAttribution)}>
            {sourceOptions.map((source) => (
              <option key={source.value} value={source.value}>
                {source.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <aside className="booking-summary">
        <p className="card-eyebrow">Order summary</p>
        {selectedSlot ? <h3>{formatSlot(selectedSlot)}</h3> : <h3>Select a date</h3>}
        <p>{selectedSlot ? `${remaining} seats currently available. A checkout hold lasts 15 minutes.` : "Choose a date to see availability."}</p>
        <div className="summary-lines">
          {priced.lines.map((line) => (
            <div key={`${line.label}-${line.quantity}`}>
              <span>
                {line.quantity} x {line.label}
              </span>
              <strong>{dollars(line.total)}</strong>
            </div>
          ))}
        </div>
        <div className="summary-total">
          <span>Total</span>
          <strong>{dollars(priced.subtotal)}</strong>
        </div>
        {priced.errors.length ? <p className="booking-error">{priced.errors[0]}</p> : null}
        {demoMode ? <p className="booking-error">Online ticketing opens shortly. For now, send a request and we will confirm seats directly.</p> : null}
        {message ? <p className="booking-error">{message}</p> : null}
        <button className="btn btn-primary booking-submit" type="button" disabled={submitting || loading || soldOut || priced.errors.length > 0} onClick={submit}>
          {demoMode ? "Request Tickets" : submitting ? "Starting Checkout..." : soldOut ? "Sold Out" : "Book Now"}
        </button>
        {demoMode ? <a className="text-link" href={`/contact?booking=request&show=${showId}`}>Prefer to message first?</a> : null}
      </aside>
    </div>
  );
}

function NumberField({ label, value, min, max, help, onChange }: { label: string; value: number; min: number; max: number; help?: string; onChange: (value: number) => void }) {
  return (
    <div className="booking-field">
      <label>
        {label}
        {help ? <small>{help}</small> : null}
      </label>
      <div className="stepper">
        <button type="button" aria-label={`Decrease ${label}`} onClick={() => onChange(Math.max(min, value - 1))}>
          -
        </button>
        <input type="number" min={min} max={max} value={value} onChange={(event) => onChange(Math.max(min, Math.min(max, Number(event.target.value) || min)))} />
        <button type="button" aria-label={`Increase ${label}`} onClick={() => onChange(Math.min(max, value + 1))}>
          +
        </button>
      </div>
    </div>
  );
}
