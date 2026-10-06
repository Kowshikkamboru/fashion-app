"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import Icon from "@/components/Icon";
import { ui as s } from "@/components/ui/ui";

export default function MaintenancePage() {
  // Demo countdown: 47 minutes from page load
  const [left, setLeft] = useState(47 * 60);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setLeft((l) => Math.max(0, l - 1)), 1000);
    return () => clearInterval(id);
  }, []);

  const mm = String(Math.floor(left / 60)).padStart(2, "0");
  const ss = String(left % 60).padStart(2, "0");

  return (
    <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--bg-primary)", color: "var(--text-primary)" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px 5%" }}>
        <Link href="/" style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", letterSpacing: "0.1em" }}>
          VASTR<span style={{ color: "var(--accent-primary)" }}>IÉ</span>
        </Link>
        <ThemeSwitcher />
      </header>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 5% 80px" }}>
        <div style={{ maxWidth: 560, textAlign: "center" }}>
          <div className={s.emptyIcon} style={{ margin: "0 auto 32px", width: 84, height: 84 }}><Icon name="wrench" size={34} /></div>
          <div className={s.eyebrow}>Scheduled maintenance</div>
          <h1 className={s.title} style={{ marginBottom: 20 }}>The atelier is being refined.</h1>
          <p className={s.sub} style={{ margin: "0 auto 36px" }}>
            We’re upgrading our infrastructure to serve you better. Your wardrobe and looks are safe — we’ll be back shortly.
          </p>

          <div className={s.row} style={{ justifyContent: "center", gap: 12, marginBottom: 36 }} aria-live="off" aria-label={`Estimated time remaining ${mm} minutes ${ss} seconds`}>
            {[[mm, "Minutes"], [ss, "Seconds"]].map(([v, l]) => (
              <div key={l} className={s.card} style={{ padding: "20px 28px", minWidth: 120 }}>
                <div className={s.stat}>{v}</div>
                <div className={s.statLabel} style={{ margin: "10px 0 0" }}>{l}</div>
              </div>
            ))}
          </div>

          {sent ? (
            <p className={s.up} role="status">We’ll email {email} the moment we’re back.</p>
          ) : (
            <form className={s.row} style={{ justifyContent: "center" }} onSubmit={(e) => { e.preventDefault(); if (/^\S+@\S+\.\S+$/.test(email)) setSent(true); }}>
              <input aria-label="Email for updates" type="email" className={s.input} style={{ maxWidth: 280 }} placeholder="Notify me by email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <button className={s.btn} type="submit" disabled={!/^\S+@\S+\.\S+$/.test(email)}>Notify me</button>
            </form>
          )}

          <p className={s.hint} style={{ marginTop: 40 }}>
            Questions? <Link href="/help" style={{ textDecoration: "underline" }}>Help Center</Link> · <Link href="/" style={{ textDecoration: "underline" }}>Home</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
