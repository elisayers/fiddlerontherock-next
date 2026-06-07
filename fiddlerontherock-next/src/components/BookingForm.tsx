"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useCart, CartItem } from "@/context/CartContext";
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
      customer: { name: "", email: "", phone: "" }
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
    customer: { name: "", email: "", phone: "" }
  };
}

export default function BookingForm({ showId, compact = false }: BookingFormProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { addToCart, clearCart } = useCart();
  const isEnclosed = pathname === "/booking";

  // Checkout Step State
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [slots, setSlots] = useState<AvailabilitySlot[]>([]);
  const [selection, setSelection] = useState<BookingSelection>(() => initialSelection(showId));
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [demoMode, setDemoMode] = useState(false);

  // Details fields state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Countdown Hold state (starts at 15:00)
  const [timerSeconds, setTimerSeconds] = useState(900);
  const [timerExpired, setTimerExpired] = useState(false);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Sync initial selection when showId prop changes
  useEffect(() => {
    setSelection(initialSelection(showId));
    setStep(1);
    setErrors({});
  }, [showId]);

  // Load slots for show
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

  // Location display logic
  const locationLabel = useMemo(() => {
    if (showId === "sedona-serenades" && selectedSlot?.location) {
      return serenadesLocationLabels[selectedSlot.location] || "Selected private location";
    }
    return showLocationLabels[showId] || "Sedona, Arizona";
  }, [showId, selectedSlot]);

  // Synchronize selection changes to the global cart (Phase 3A)
  useEffect(() => {
    if (selectedSlot && priced.subtotal > 0) {
      const showTitle = isPublicShow 
        ? publicShows[showId as keyof typeof publicShows]?.title || "Live Concert"
        : "Sedona Serenades Private Experience";
        
      const detailsLabel = isPublicShow && selection.tier 
        ? ` (${selection.tier.toUpperCase()})` 
        : "";

      const ticketItem: CartItem = {
        priceId: `ticket-${showId}-${selection.slotId}-${selection.tier || "package"}`,
        name: `${showTitle}${detailsLabel} - ${formatSlot(selectedSlot)}`,
        type: "ticket",
        quantity: 1, // Store aggregate ticket hold as 1 cart item with dynamic subtotal
        price: priced.subtotal
      };
      
      clearCart();
      addToCart(ticketItem);
    }
  }, [selection, priced.subtotal, selectedSlot, showId, isPublicShow, addToCart, clearCart]);

  // Countdown timer for Step 3
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
    } else {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
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

  // Details Validation
  function handleContinueToDetails() {
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

    // If inline/compact marketing mode, directly redirect to enclosed checkout page
    if (!isEnclosed) {
      router.push(`/booking?show=${showId}&slot=${selection.slotId}&tier=${selection.tier || ""}`);
      return;
    }

    setMessage("");
    setStep(2);
  }

  function handleContinueToPayment() {
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

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    update("customer", { name, email, phone });
    setStep(3);
  }

  async function submit() {
    if (timerExpired) {
      setMessage("Your seat hold has expired. Please return to Step 1.");
      return;
    }
    setMessage("");

    if (demoMode) {
      const params = new URLSearchParams({ 
        booking: "request", 
        show: showId,
        name: name,
        email: email,
        phone: phone,
        source: selection.source ?? ""
      });
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
        body: JSON.stringify({
          ...selection,
          customer: { name, email, phone }
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Checkout could not start.");
      if (data.requestOnly && data.redirectUrl) {
        window.location.href = data.redirectUrl;
        return;
      }
      
      // Clear localStorage cart right before redirect
      localStorage.removeItem("fotr_cart");
      
      window.location.href = data.url;
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Checkout could not start.");
      setSubmitting(false);
    }
  }

  // Switch show selector tabs (Step 1)
  function handleShowTabChange(newShowId: ShowId) {
    router.push(`/booking?show=${newShowId}`);
  }

  return (
    <div style={{ width: "100%" }}>
      {/* Enclosed Checkout Header */}
      {isEnclosed && (
        <header className="checkout-header">
          <Link href="/live-concerts" className="checkout-logo" aria-label="Exit Checkout">
            <Image src="/images/logo-white.png" alt="Fiddler on the Rock" width={38} height={38} priority />
            <span>Fiddler on the Rock</span>
          </Link>
          
          <nav className="checkout-steps" aria-label="Checkout Progress">
            <div className={`checkout-step ${step >= 1 ? "active" : ""} ${step > 1 ? "completed" : ""}`}>
              <span className="checkout-step-number">1</span>
              <span>Tickets</span>
            </div>
            <span className="checkout-step-arrow">→</span>
            <div className={`checkout-step ${step >= 2 ? "active" : ""} ${step > 2 ? "completed" : ""}`}>
              <span className="checkout-step-number">2</span>
              <span>Details</span>
            </div>
            <span className="checkout-step-arrow">→</span>
            <div className={`checkout-step ${step >= 3 ? "active" : ""}`}>
              <span className="checkout-step-number">3</span>
              <span>Payment</span>
            </div>
          </nav>

          <Link href="/live-concerts" className="exit-checkout" title="Exit Checkout">
            <span>✕ Exit</span>
          </Link>
        </header>
      )}

      {/* Main Form Content */}
      <div className={isEnclosed ? "checkout-main-content" : ""}>
        <div className={compact ? "booking-shell compact" : "booking-shell"}>
          
          <div className="booking-main">
            {/* STEP 1: SELECT TICKETS */}
            {step === 1 && (
              <>
                {/* Show selector tabs (Enclosed layout only) */}
                {isEnclosed && (
                  <div className="booking-field full">
                    <label>Select Experience</label>
                    <div className="show-tabs">
                      <button 
                        type="button" 
                        className={`show-tab-btn ${showId === "one-man-symphony" ? "active" : ""}`}
                        onClick={() => handleShowTabChange("one-man-symphony")}
                      >
                        One Man Symphony
                      </button>
                      <button 
                        type="button" 
                        className={`show-tab-btn ${showId === "legends-of-the-fiddle" ? "active" : ""}`}
                        onClick={() => handleShowTabChange("legends-of-the-fiddle")}
                      >
                        Legends of the Fiddle
                      </button>
                      <button 
                        type="button" 
                        className={`show-tab-btn ${showId === "sedona-serenades" ? "active" : ""}`}
                        onClick={() => handleShowTabChange("sedona-serenades")}
                      >
                        Sedona Serenades
                      </button>
                    </div>
                  </div>
                )}

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

                {message ? <p className="booking-error full">{message}</p> : null}
                
                <div className="booking-field full" style={{ marginTop: "12px" }}>
                  <button 
                    className="btn btn-primary" 
                    type="button" 
                    disabled={loading || soldOut || priced.errors.length > 0} 
                    onClick={handleContinueToDetails}
                    style={{ width: "100%" }}
                  >
                    {isEnclosed ? "Continue to Details" : demoMode ? "Request Tickets" : "Book Now"}
                  </button>
                </div>
              </>
            )}

            {/* STEP 2: ATTENDEE DETAILS */}
            {step === 2 && (
              <div className="booking-field full" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.8rem", color: "var(--color-gold)", margin: "0 0 8px" }}>Attendee Details</h3>
                <p style={{ color: "var(--color-cream-soft)", fontSize: "0.9rem", margin: 0 }}>We will send confirmation details and updates to this contact. Mandatory account creation is never required.</p>
                
                <div className="checkout-form-group">
                  <div className="checkout-input-field">
                    <label htmlFor="checkout-name">Full Name</label>
                    <input 
                      id="checkout-name"
                      type="text" 
                      placeholder="Jane Doe" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="name"
                      autoCapitalize="words"
                      autoCorrect="off"
                    />
                    {errors.name && <span className="checkout-input-error">{errors.name}</span>}
                  </div>

                  <div className="checkout-input-field">
                    <label htmlFor="checkout-email">Email Address</label>
                    <input 
                      id="checkout-email"
                      type="email" 
                      placeholder="jane.doe@example.com" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      autoCapitalize="none"
                      autoCorrect="off"
                    />
                    {errors.email && <span className="checkout-input-error">{errors.email}</span>}
                  </div>
                </div>

                <div className="checkout-form-group">
                  <div className="checkout-input-field">
                    <label htmlFor="checkout-phone">Phone Number</label>
                    <input 
                      id="checkout-phone"
                      type="tel" 
                      placeholder="(928) 555-0199" 
                      value={phone} 
                      onChange={(e) => setPhone(e.target.value)}
                      autoComplete="tel"
                    />
                    {errors.phone && <span className="checkout-input-error">{errors.phone}</span>}
                  </div>

                  <div className="checkout-input-field">
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

                <div className="checkout-button-row">
                  <button type="button" className="btn-secondary" onClick={() => setStep(1)}>
                    ← Back
                  </button>
                  <button type="button" className="btn btn-primary" onClick={handleContinueToPayment}>
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: SECURE PAYMENT */}
            {step === 3 && (
              <div className="payment-section">
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.8rem", color: "var(--color-gold)", margin: 0 }}>Secure Checkout</h3>
                  <p style={{ color: "var(--color-cream-soft)", fontSize: "0.9rem", margin: 0 }}>Tickets will be confirmed immediately. Please finalize payment details below.</p>
                </div>

                {/* Hold Timer */}
                <div className="timer-banner">
                  <span className="pulse-dot" />
                  <span>
                    Your seats are temporarily held. Hold expires in <strong>{formattedTimeLeft}</strong> minutes.
                  </span>
                </div>

                {timerExpired ? (
                  <div className="booking-error full">
                    Your 15-minute seat hold has expired. To secure your reservation, please return to Step 1 and re-select your seats.
                    <button type="button" className="btn btn-primary" onClick={() => { setTimerExpired(false); setStep(1); }} style={{ marginTop: "16px", width: "100%" }}>
                      Re-select Seats
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Visual Stripe Express Checkout elements */}
                    <div className="express-checkout-container">
                      <button type="button" className="express-btn express-btn-apple" onClick={submit} disabled={submitting}>
                         Pay with Apple Pay
                      </button>
                      <button type="button" className="express-btn express-btn-google" onClick={submit} disabled={submitting}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: "4px" }}>
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.21-.63-.35-1.3-.35-1.99c0-.23.02-.46.06-.69z" fill="#FBBC05"/>
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                        </svg>
                        Pay with Google Pay
                      </button>
                      <button type="button" className="express-btn express-btn-link" onClick={submit} disabled={submitting}>
                        Pay instantly with Link
                      </button>
                    </div>

                    <div className="payment-separator">Or pay with credit card</div>

                    {/* Styled Mock Credit Card Fields */}
                    <div className="mock-card-container">
                      <div className="mock-card-input-wrapper">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                          <line x1="1" y1="10" x2="23" y2="10" />
                        </svg>
                        <input type="text" placeholder="Card number" defaultValue="4242 4242 4242 4242" readOnly />
                      </div>
                      <div className="mock-card-divider" />
                      <div className="mock-card-row">
                        <input className="mock-card-sub-input" type="text" placeholder="MM / YY" defaultValue="12 / 29" readOnly />
                        <input className="mock-card-sub-input" type="text" placeholder="CVC" defaultValue="424" readOnly />
                        <input className="mock-card-sub-input" type="text" placeholder="ZIP" defaultValue="86336" readOnly />
                      </div>
                    </div>

                    {message ? <p className="booking-error full">{message}</p> : null}

                    <div className="checkout-button-row">
                      <button type="button" className="btn-secondary" onClick={() => setStep(2)} disabled={submitting}>
                        ← Back
                      </button>
                      <button 
                        className="btn btn-primary" 
                        type="button" 
                        disabled={submitting} 
                        onClick={submit}
                      >
                        {demoMode ? "Submit Booking Request" : submitting ? "Processing Payment..." : "Book and Pay Now"}
                      </button>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", color: "var(--color-muted)", fontSize: "0.75rem", marginTop: "12px" }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                      <span>Payments secured and processed via Stripe.</span>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* PERSISTENT ORDER SUMMARY SIDEBAR */}
          <aside className="booking-summary">
            <p className="card-eyebrow">Order summary</p>
            
            {/* Show selection details */}
            {selectedSlot ? (
              <>
                <h3 style={{ margin: "0 0 4px", fontSize: "1.45rem", fontFamily: "var(--font-serif)", color: "var(--color-cream)" }}>
                  {isPublicShow 
                    ? publicShows[showId as keyof typeof publicShows]?.title || "Live Concert" 
                    : "Sedona Serenades"}
                </h3>
                <div style={{ fontSize: "1.05rem", fontWeight: 400, color: "var(--color-gold)", marginBottom: "4px" }}>
                  {formatSlot(selectedSlot)}
                </div>
                
                {/* Dynamic location info inside summary */}
                <div style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "6px", 
                  fontSize: "0.82rem", 
                  color: "var(--color-cream-soft)",
                  marginBottom: "18px",
                  lineHeight: "1.4"
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
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
              {selectedSlot ? `${remaining} seats currently available. Hold reservation active for 15 minutes.` : ""}
            </p>

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

            {/* Hold expiration warning */}
            {step === 3 && !timerExpired && (
              <p style={{ fontSize: "0.78rem", color: "var(--color-gold)", margin: "16px 0 0", textAlign: "center" }}>
                Seat reservation hold timer: <strong>{formattedTimeLeft}</strong>
              </p>
            )}

            {priced.errors.length ? <p className="booking-error">{priced.errors[0]}</p> : null}
            {demoMode && step === 1 ? <p className="booking-error">Online ticketing opens shortly. For now, send a request and we will confirm seats directly.</p> : null}
          </aside>

        </div>
      </div>

      {/* Minimal Checkout Footer */}
      {isEnclosed && (
        <footer className="checkout-footer">
          <div className="checkout-footer-links">
            <Link href="/privacy" target="_blank">Privacy Policy</Link>
            <span>•</span>
            <Link href="/terms" target="_blank">Terms of Service</Link>
            <span>•</span>
            <Link href="/contact" target="_blank">Contact Support</Link>
          </div>
          <p>© {new Date().getFullYear()} Tyler Carson. All rights reserved. Sedona, Arizona.</p>
        </footer>
      )}
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
