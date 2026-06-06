"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const errorParam = searchParams.get("error");
  const defaultError = errorParam === "unauthorized" ? "Your account is not registered as an administrator." : null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setMessage(error.message);
        setLoading(false);
        return;
      }

      // Check profile
      const { data: profile, error: profileErr } = await supabase
        .from("admin_profiles")
        .select("role")
        .eq("id", data.user?.id)
        .single();

      if (profileErr || !profile || profile.role !== "admin") {
        await supabase.auth.signOut();
        setMessage("Access denied: You are not authorized as an administrator.");
        setLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch (err) {
      setMessage("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="login-card" style={{ maxWidth: "420px", margin: "0 auto", padding: "32px", background: "rgba(30, 25, 20, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(212, 175, 55, 0.15)", borderRadius: "8px" }}>
      <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", marginBottom: "24px", color: "var(--color-gold)", textAlign: "center" }}>Administrator Sign In</h3>
      
      {message || defaultError ? (
        <div style={{ padding: "12px", background: "rgba(220, 50, 50, 0.1)", border: "1px solid rgba(220, 50, 50, 0.3)", borderRadius: "4px", color: "#f87171", fontSize: "0.875rem", marginBottom: "20px", textAlign: "center" }}>
          {message || defaultError}
        </div>
      ) : null}

      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <label style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.7)", letterSpacing: "0.05em", uppercase: "true" } as any}>EMAIL ADDRESS</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="admin@fiddlerontherock.com"
            style={{
              padding: "12px",
              background: "rgba(0, 0, 0, 0.4)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "4px",
              color: "#fff",
              outline: "none",
              fontSize: "0.95rem",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "var(--color-gold)")}
            onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.15)")}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <label style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.7)", letterSpacing: "0.05em", uppercase: "true" } as any}>PASSWORD</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
            style={{
              padding: "12px",
              background: "rgba(0, 0, 0, 0.4)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "4px",
              color: "#fff",
              outline: "none",
              fontSize: "0.95rem",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "var(--color-gold)")}
            onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.15)")}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="button"
          style={{
            marginTop: "12px",
            padding: "12px",
            background: "var(--color-gold)",
            color: "var(--color-bg)",
            border: "none",
            borderRadius: "4px",
            fontWeight: "600",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
            transition: "opacity 0.2s",
          }}
        >
          {loading ? "Signing in..." : "Access Control Room"}
        </button>
      </form>
    </div>
  );
}
