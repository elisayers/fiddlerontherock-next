"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error inside checkout:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="checkout-error-panel" style={{
          padding: "40px",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "8px",
          textAlign: "center",
          maxWidth: "600px",
          margin: "40px auto",
          fontFamily: "var(--font-sans), sans-serif",
          color: "var(--color-cream)"
        }}>
          <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", marginBottom: "16px", color: "var(--color-gold)" }}>Something went wrong</h3>
          <p style={{ color: "rgba(245,240,232,0.7)", marginBottom: "24px", lineHeight: "1.6" }}>
            We encountered an unexpected error loading the booking page. Please try reloading the page or contacting us directly to confirm availability.
          </p>
          {this.state.error?.message ? (
            <pre style={{
              background: "rgba(0,0,0,0.2)",
              padding: "16px",
              borderRadius: "4px",
              fontSize: "0.8rem",
              textAlign: "left",
              overflowX: "auto",
              marginBottom: "24px",
              fontFamily: "var(--font-mono), monospace",
              color: "rgba(245,240,232,0.5)"
            }}>{this.state.error.message}</pre>
          ) : null}
          <button
            className="btn btn-primary"
            onClick={() => window.location.reload()}
            style={{
              padding: "12px 24px",
              background: "var(--color-gold)",
              color: "var(--color-ink)",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: "0.8rem",
              textTransform: "uppercase",
              letterSpacing: "0.1em"
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
