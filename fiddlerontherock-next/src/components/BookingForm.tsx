/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useCart, type CartItem } from "@/context/CartContext";
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

const showLocationLabels: Record<string, string> = {
  "one-man-symphony": "Historic Apple Barn (Sedona Heritage Museum)",
  "legends-of-the-fiddle": "Sedona HUB",
  "sedona-serenades": "The Secret Spot / Open-Air Spot",
};

function formatSlot(slot: AvailabilitySlot) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(slot.startsAt));
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
      customer: { name: "", email: "", phone: "" },
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
    customer: { name: "", email: "", phone: "" },
  };
}

export default function BookingForm({ showId, compact = false }: BookingFormProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { addToCart, clearCart } = useCart();
  const isEnclosed = pathname === "/booking";

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [slots, setSlots] = useState<AvailabilitySlot[]>([]);
  const [selection, setSelection] = useState<BookingSelection>(() => initialSelection(showId));
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [demoMode, setDemoMode] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [timerSeconds, setTimerSeconds] = useState(900);
  const [timerExpired, setTimerExpired] = useState(false);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setSelection(initialSelection(showId));
    setStep(1);
    setErrors({});
    setMessage("");
    setTimerExpired(false);
  }, [showId]);

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
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [showId]);

  const selectedSlot = slots.find((slot) => slot.id === selection.slotId);
  const priced = useMemo(() => priceBooking(selection), [selection]);
  const isPublicShow = showId !== "sedona-serenades";
  const soldOut = selectedSlot ? remainingSeats(selectedSlot) < priced.capacityUnits : false;
  const remaining = selectedSlot ? remainingSeats(selectedSlot) : 0;

  const locationLabel = useMemo(() => {
    if (showId === "sedona-serenades" && selectedSlot?.location) {
      return serenadesLocationLabels[selectedSlot.location] || "Selected private location";
    }
    return showLocationLabels[showId] || "Sedona, Arizona";
  }, [showId, selectedSlot]);

  useEffect(() => {
    if (selectedSlot && priced.subtotal > 0) {
      const showTitle = isPublicShow ? publicShows[showId]?.title || "Live Concert" : "Sedona Serenades Private Experience";
      const detailsLabel = isPublicShow && selection.tier ? ` (${selection.tier.toUpperCase()})` : "";

      const ticketItem: CartItem = {
        priceId: `ticket-${showId}-${selection.slotId}-${selection.tier || "package"}`,
        name: `${showTitle}${detailsLabel} - ${formatSlot(selectedSlot)}`,
        type: "ticket",
        quantity: 1,
        price: priced.subtotal,
      };

      clearCart();
      addToCart(ticketItem);
    }
  }, [selection, priced.subtotal, selectedSlot, showId, isPublicShow, addToCart, clearCart]);

  useEffect(() => {
    if (step === 3 && !timerExpired) {
      setTimerSeconds(900);
      timerIntervalRef.current = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev <= 1) {
            setTimerExpired(true);
            if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [step, timerExpired]);

  const formattedTimeLeft = useMemo(() => {
    const minutes = Math.floor(timerSeconds / 60);
    const seconds = timerSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }, [timerSeconds]);

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

  function handleContinueToDetails() {
    if (!selection.slotId) {
      setMessage("Choose an available date before continuing.");
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
    if (!isEnclosed) {
      router.push(`/booking?show=${showId}&slot=${selection.slotId}&tier=${selection.tier || ""}`);
      return;
    }
    setMessage("");
    setStep(2);
  }

  function handleContinueToCheckout() {
    const nextErrors: Record<string, string> = {};
    if (!name.trim()) nextErrors.name = "Full name is required.";
    if (!email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!phone.trim()) {
      nextErrors.phone = "Phone number is required.";
    } else if (phone.replace(/\D/g, "").length < 7) {
      nextErrors.phone = "Please enter a valid phone number.";
    }

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    update("customer", { name, email, phone });
    setStep(3);
  }

  async function submit() {
    if (timerExpired) {
      setMessage("Your hold expired. Please return to Step 1 and choose your date again.");
      return;
    }
    setMessage("");
    setSubmitting(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...selection, customer: { name, email, phone } }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Checkout could not start.");
      if (data.requestOnly && data.redirectUrl) {
        window.location.href = data.redirectUrl;
        return;
      }
      localStorage.removeItem("fotr_cart");
      window.location.href = data.url;
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Checkout could not start.");
      setSubmitting(false);
    }
  }

  function handleShowTabChange(newShowId: ShowId) {
    router.push(`/booking?show=${newShowId}`);
  }

  return (
    <div style={{ width: "100%" }}>
      {isEnclosed && (
        <header className="checkout-header">
          <Link href="/live-concerts" className="checkout-logo" aria-label="Exit checkout">
            <Image src="/images/logo-white.png" alt="Fiddler on the Rock" width={38} height={38} priority />
            <span>Fiddler on the Rock</span>
          </Link>

          <nav className="checkout-steps" aria-label="Checkout progress">
            <div className={`checkout-step ${step >= 1 ? "active" : ""} ${step > 1 ? "completed" : ""}`}>
              <span className="checkout-step-number">1</span>
              <span>Tickets</span>
            </div>
            <span className="checkout-step-arrow">&gt;</span>
            <div className={`checkout-step ${step >= 2 ? "active" : ""} ${step > 2 ? "completed" : ""}`}>
              <span className="checkout-step-number">2</span>
              <span>Details</span>
            </div>
            <span className="checkout-step-arrow">&gt;</span>
            <div className={`checkout-step ${step >= 3 ? "active" : ""}`}>
              <span className="checkout-step-number">3</span>
              <span>Confirm</span>
            </div>
          </nav>

          <Link href="/live-concerts" className="exit-checkout" title="Exit checkout">
            <span>Exit</span>
          </Link>
        </header>
      )}

      <div className={isEnclosed ? "checkout-main-content" : ""}>
        <div className={compact ? "booking-shell compact" : "booking-shell"}>
          <div className="booking-main">
            {step === 1 && (
              <>
                {isEnclosed && (
                  <div className="booking-field full">
                    <label>Select Experience</label>
                    <div className="show-tabs">
                      <button type="button" className={`show-tab-btn ${showId === "one-man-symphony" ? "active" : ""}`} onClick={() => handleShowTabChange("one-man-symphony")}>One Man Symphony</button>
                      <button type="button" className={`show-tab-btn ${showId === "legends-of-the-fiddle" ? "active" : ""}`} onClick={() => handleShowTabChange("legends-of-the-fiddle")}>Legends of the Fiddle</button>
                      <button type="button" className={`show-tab-btn ${showId === "sedona-serenades" ? "active" : ""}`} onClick={() => handleShowTabChange("sedona-serenades")}>Sedona Serenades</button>
                    </div>
                  </div>
                )}

                <div className="booking-field full">
                  <label htmlFor={`${showId}-date`}>Date and time</label>
                  <select id={`${showId}-date`} value={selection.slotId} onChange={(event) => update("slotId", event.target.value)}>
                    {loading ? <option>Loading dates...</option> : null}
                    {!loading && !slots.length ? <option>No dates currently posted</option> : null}
                    {slots.map((slot) => {
                      const label = `${formatSlot(slot)}${slot.location ? ` - ${serenadesLocationLabels[slot.location]}` : ""} (${remainingSeats(slot)} left)`;
                      return <option key={slot.id} value={slot.id} disabled={remainingSeats(slot) <= 0 || slot.soldOutOverride}>{label}</option>;
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
                    <NumberField label="Children under 8" value={selection.underFiveCount ?? 0} min={0} max={6} onChange={(value) => update("underFiveCount", value)} />
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
                    <p className="booking-note full">Spring water is included. Photography, custom venue setups, and larger private events are confirmed directly.</p>
                  </>
                )}

                {message ? <p className="booking-error full">{message}</p> : null}

                <div className="booking-field full" style={{ marginTop: "8px" }}>
                  <button className="btn btn-primary" type="button" disabled={loading || soldOut || priced.errors.length > 0} onClick={handleContinueToDetails} style={{ width: "100%" }}>
                    {isEnclosed ? "Continue to Details" : demoMode ? "Start Request" : "Continue to Booking"}
                  </button>
                </div>
              </>
            )}

            {step === 2 && (
              <div className="booking-field full" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.8rem", color: "var(--color-gold)", margin: "0 0 8px" }}>Contact details</h3>
                <p style={{ color: "var(--color-cream-soft)", fontSize: "0.9rem", margin: 0 }}>
                  Use the best contact for your confirmation. If online checkout is unavailable, Tyler will follow up directly using these details.
                </p>

                <div className="checkout-form-group">
                  <div className="checkout-input-field">
                    <label htmlFor="checkout-name">Full Name</label>
                    <input id="checkout-name" type="text" placeholder="Jane Doe" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
                    {errors.name ? <span className="checkout-input-error">{errors.name}</span> : null}
                  </div>

                  <div className="checkout-input-field">
                    <label htmlFor="checkout-email">Email Address</label>
                    <input id="checkout-email" type="email" placeholder="name@email.com" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
                    {errors.email ? <span className="checkout-input-error">{errors.email}</span> : null}
                  </div>
                </div>

                <div className="checkout-form-group">
                  <div className="checkout-input-field">
                    <label htmlFor="checkout-phone">Phone Number</label>
                    <input id="checkout-phone" type="tel" placeholder="(928) 555-0199" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" />
                    {errors.phone ? <span className="checkout-input-error">{errors.phone}</span> : null}
                  </div>

                  <div className="checkout-input-field">
                    <label htmlFor={`${showId}-source`}>How did you hear about Tyler?</label>
                    <select id={`${showId}-source`} value={selection.source} onChange={(event) => update("source", event.target.value as SourceAttribution)}>
                      {sourceOptions.map((source) => <option key={source.value} value={source.value}>{source.label}</option>)}
                    </select>
                  </div>
                </div>

                <div className="checkout-button-row">
                  <button type="button" className="btn-secondary" onClick={() => setStep(1)}>Back</button>
                  <button type="button" className="btn btn-primary" onClick={handleContinueToCheckout}>Continue</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="payment-section">
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.8rem", color: "var(--color-gold)", margin: 0 }}>Confirm booking</h3>
                  <p style={{ color: "var(--color-cream-soft)", fontSize: "0.9rem", margin: 0 }}>
                    Submit this step to continue to secure checkout when available. If checkout is still being finalized, your request will route to Tyler for direct confirmation.
                  </p>
                </div>

                <div className="timer-banner">
                  <span className="pulse-dot" />
                  <span>Your selected date is held temporarily. Hold expires in <strong>{formattedTimeLeft}</strong>.</span>
                </div>

                {timerExpired ? (
                  <div className="booking-error full">
                    Your 15-minute hold has expired. Please return to Step 1 and choose your date again.
                    <button type="button" className="btn btn-primary" onClick={() => { setTimerExpired(false); setStep(1); }} style={{ marginTop: "16px", width: "100%" }}>
                      Choose a New Time
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="checkout-status-card">
                      <h4>{demoMode ? "Request mode" : "Secure checkout or direct confirmation"}</h4>
                      <p>
                        Online checkout is being finalized for some inventory and payment configurations. This step keeps the booking flow complete without pretending every payment path is already live.
                      </p>
                      <ul className="checkout-status-list">
                        <li>Your event details and contact information stay attached to the request.</li>
                        <li>If Stripe is ready, you continue to hosted checkout.</li>
                        <li>If checkout is unavailable, Tyler confirms availability directly.</li>
                      </ul>
                    </div>

                    {message ? <p className="booking-error full">{message}</p> : null}

                    <div className="checkout-button-row">
                      <button type="button" className="btn-secondary" onClick={() => setStep(2)} disabled={submitting}>Back</button>
                      <button className="btn btn-primary" type="button" disabled={submitting} onClick={submit}>
                        {submitting ? "Processing..." : demoMode ? "Submit Booking Request" : "Continue to Checkout"}
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          <aside className="booking-summary">
            <p className="card-eyebrow">Order summary</p>

            {selectedSlot ? (
              <>
                <h3 style={{ margin: "0 0 4px", fontSize: "1.45rem", fontFamily: "var(--font-serif)", color: "var(--color-cream)" }}>
                  {isPublicShow ? publicShows[showId]?.title || "Live Concert" : "Sedona Serenades"}
                </h3>
                <div style={{ fontSize: "1.05rem", fontWeight: 400, color: "var(--color-gold)", marginBottom: "4px" }}>{formatSlot(selectedSlot)}</div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.82rem", color: "var(--color-cream-soft)", marginBottom: "18px", lineHeight: "1.4" }}>
                  <span>{locationLabel}</span>
                </div>
              </>
            ) : (
              <>
                <h3>Select details</h3>
                <p>Choose a date to see availability and location information.</p>
              </>
            )}

            <p style={{ fontSize: "0.8rem", color: "var(--color-muted)", marginTop: 0 }}>
              {selectedSlot ? `${remaining} seats currently available.` : ""}
            </p>

            <div className="summary-lines">
              {priced.lines.map((line) => (
                <div key={`${line.label}-${line.quantity}`}>
                  <span>{line.quantity} x {line.label}</span>
                  <strong>{dollars(line.total)}</strong>
                </div>
              ))}
            </div>

            <div className="summary-total">
              <span>Total</span>
              <strong>{dollars(priced.subtotal)}</strong>
            </div>

            {step === 3 && !timerExpired ? (
              <p style={{ fontSize: "0.78rem", color: "var(--color-gold)", margin: "16px 0 0", textAlign: "center" }}>
                Hold timer: <strong>{formattedTimeLeft}</strong>
              </p>
            ) : null}

            {priced.errors.length ? <p className="booking-error">{priced.errors[0]}</p> : null}
            <p className="booking-summary-note">
              If online checkout is unavailable for your selected date, your request is routed directly to Tyler for confirmation.
            </p>
          </aside>
        </div>
      </div>

      {isEnclosed && (
        <footer className="checkout-footer">
          <div className="checkout-footer-links">
            <Link href="/privacy" target="_blank">Privacy Policy</Link>
            <span>•</span>
            <Link href="/terms" target="_blank">Terms of Service</Link>
            <span>•</span>
            <Link href="/contact" target="_blank">Contact Support</Link>
          </div>
          <p>© {new Date().getFullYear()} Tyler Carson. Sedona, Arizona.</p>
        </footer>
      )}
    </div>
  );
}

function NumberField({
  label,
  value,
  min,
  max,
  help,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  help?: string;
  onChange: (value: number) => void;
}) {
  return (
    <div className="booking-field">
      <label>
        {label}
        {help ? <small>{help}</small> : null}
      </label>
      <div className="stepper">
        <button type="button" aria-label={`Decrease ${label}`} onClick={() => onChange(Math.max(min, value - 1))}>-</button>
        <input type="number" min={min} max={max} value={value} onChange={(event) => onChange(Math.max(min, Math.min(max, Number(event.target.value) || min)))} />
        <button type="button" aria-label={`Increase ${label}`} onClick={() => onChange(Math.min(max, value + 1))}>+</button>
      </div>
    </div>
  );
}
