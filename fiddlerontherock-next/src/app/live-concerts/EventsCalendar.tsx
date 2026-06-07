"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type EventItem = {
  id: string;
  slug: string;
  title: string;
  startAt: string;
  endAt: string;
  capacity: number;
  paidCount: number;
  heldCount: number;
  location: string;
  image: string;
  generalPrice: string;
  vipPrice: string;
  soldOut: boolean;
  isWeekly: boolean;
};

export default function EventsCalendar({ initialEvents }: { initialEvents: EventItem[] }) {
  // 1. Filter events to only include the next 3 months
  const now = new Date();
  const threeMonthsLater = new Date();
  threeMonthsLater.setMonth(now.getMonth() + 3);

  const events = initialEvents.filter((e) => {
    const d = new Date(e.startAt);
    return d >= now && d <= threeMonthsLater;
  });

  // Group events by date string: YYYY-MM-DD
  const eventsByDate: { [dateStr: string]: EventItem[] } = {};
  events.forEach((e) => {
    const dateStr = new Date(e.startAt).toISOString().split("T")[0];
    if (!eventsByDate[dateStr]) {
      eventsByDate[dateStr] = [];
    }
    eventsByDate[dateStr].push(e);
  });

  // 2. Generate details for the next 3 months starting from now
  const months: { label: string; year: number; monthIndex: number }[] = [];
  for (let i = 0; i < 3; i++) {
    const targetDate = new Date(now.getFullYear(), now.getMonth() + i, 1);
    months.push({
      label: targetDate.toLocaleDateString("en-US", { month: "long", year: "numeric" }),
      year: targetDate.getFullYear(),
      monthIndex: targetDate.getMonth(),
    });
  }

  const [activeTab, setActiveTab] = useState(0);

  // Find the first date with events to select by default, or fallback to today
  const getFirstEventDateInMonth = (monthIndex: number, year: number) => {
    const sortedEventDates = Object.keys(eventsByDate).sort();
    const match = sortedEventDates.find((dateStr) => {
      const d = new Date(dateStr + "T00:00:00");
      return d.getMonth() === monthIndex && d.getFullYear() === year;
    });
    return match || null;
  };

  const currentMonthObj = months[activeTab];
  const defaultSelectedDate = getFirstEventDateInMonth(currentMonthObj.monthIndex, currentMonthObj.year);
  const [selectedDate, setSelectedDate] = useState<string | null>(defaultSelectedDate);

  // Update selected date automatically when changing month tabs
  const handleTabChange = (index: number) => {
    setActiveTab(index);
    const m = months[index];
    const targetDate = getFirstEventDateInMonth(m.monthIndex, m.year);
    setSelectedDate(targetDate);
  };

  // Generate calendar grid array
  const generateGridDays = (year: number, monthIndex: number) => {
    const firstDay = new Date(year, monthIndex, 1);
    const lastDay = new Date(year, monthIndex + 1, 0);

    const startWeekday = firstDay.getDay(); // 0 is Sunday, 6 is Saturday
    const totalDays = lastDay.getDate();

    const daysList: { dateStr: string | null; dayNum: number | null }[] = [];

    // Padding cells
    for (let i = 0; i < startWeekday; i++) {
      daysList.push({ dateStr: null, dayNum: null });
    }

    // Days of the month
    for (let i = 1; i <= totalDays; i++) {
      const padM = String(monthIndex + 1).padStart(2, "0");
      const padD = String(i).padStart(2, "0");
      const dateStr = `${year}-${padM}-${padD}`;
      daysList.push({ dateStr, dayNum: i });
    }

    return daysList;
  };

  const gridDays = generateGridDays(currentMonthObj.year, currentMonthObj.monthIndex);
  const selectedDateEvents = selectedDate ? eventsByDate[selectedDate] || [] : [];

  const formatDt = (isoStr: string) => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZone: "America/Phoenix",
    }).format(new Date(isoStr));
  };

  const formatSelectedTitle = (dateStr: string) => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(new Date(dateStr + "T00:00:00"));
  };

  return (
    <div className="calendar-section">
      {/* Month selectors */}
      <div className="calendar-tabs">
        {months.map((m, idx) => (
          <button
            key={idx}
            className={`calendar-tab-btn ${activeTab === idx ? "active" : ""}`}
            onClick={() => handleTabChange(idx)}
          >
            {m.label.split(" ")[0]}
          </button>
        ))}
      </div>

      {/* Grid Container */}
      <div className="calendar-grid-wrapper">
        <div className="calendar-weekdays">
          <span>Su</span>
          <span>Mo</span>
          <span>Tu</span>
          <span>We</span>
          <span>Th</span>
          <span>Fr</span>
          <span>Sa</span>
        </div>

        <div className="calendar-grid">
          {gridDays.map((cell, idx) => {
            if (cell.dayNum === null || cell.dateStr === null) {
              return <div key={idx} className="calendar-day padding" />;
            }

            const hasEvents = Boolean(eventsByDate[cell.dateStr]);
            const isSelected = selectedDate === cell.dateStr;

            return (
              <button
                key={idx}
                className={`calendar-day current-month ${hasEvents ? "has-events" : ""} ${isSelected ? "selected" : ""}`}
                disabled={!hasEvents}
                onClick={() => setSelectedDate(cell.dateStr)}
              >
                {cell.dayNum}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Date Show Listing Details */}
      <div className="selected-events-area">
        {selectedDate ? (
          <>
            <h3 className="selected-date-title">{formatSelectedTitle(selectedDate)}</h3>

            {selectedDateEvents.length > 0 ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                {selectedDateEvents.map((event) => {
                  const remaining = Math.max(0, event.capacity - event.paidCount - event.heldCount);
                  return (
                    <div key={event.id} className="event-card">
                      <div className="event-card-image">
                        <Image
                          src={event.image}
                          alt={event.title}
                          fill
                          sizes="(max-width: 800px) 100vw, 280px"
                          className="image-cover"
                        />
                      </div>

                      <div className="event-card-content">
                        <div className="event-card-header">
                          <div>
                            <h3 className="event-title">{event.title}</h3>
                            <div className="event-datetime">
                              <span style={{ fontSize: "1.1rem" }}>📅</span>
                              <span>{formatDt(event.startAt)}</span>
                            </div>
                            <div className="event-location">
                              <span>📍</span>
                              <span>{event.location}</span>
                            </div>
                          </div>

                          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", height: "fit-content" }}>
                            {event.isWeekly && <span className="badge badge-weekly">Weekly Show</span>}
                            {event.soldOut ? (
                              <span className="badge badge-soldout">Sold Out</span>
                            ) : remaining <= 5 ? (
                              <span className="badge badge-limited">Only {remaining} Seats Left!</span>
                            ) : (
                              <span className="badge badge-available">Seats Available</span>
                            )}
                          </div>
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px", marginTop: "16px" }}>
                          <div className="event-pricing">
                            Tickets: <strong>General {event.generalPrice}</strong> | <strong>VIP {event.vipPrice}</strong>
                          </div>

                          {event.soldOut ? (
                            <button
                              disabled
                              className="btn"
                              style={{
                                background: "rgba(255, 255, 255, 0.05)",
                                border: "1px solid rgba(255, 255, 255, 0.15)",
                                color: "rgba(255, 255, 255, 0.4)",
                                cursor: "not-allowed",
                                padding: "8px 24px",
                              }}
                            >
                              Sold Out
                            </button>
                          ) : (
                            <Link
                              href={`/booking?show=${event.slug}`}
                              className="btn btn-primary"
                              style={{ padding: "8px 24px" }}
                            >
                              Book Tickets
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="no-events-selected">
                <p>No performances scheduled for this date.</p>
              </div>
            )}
          </>
        ) : (
          <div className="no-events-selected">
            <p>Select a date highlighted in gold on the calendar to view available performances.</p>
          </div>
        )}
      </div>
    </div>
  );
}
