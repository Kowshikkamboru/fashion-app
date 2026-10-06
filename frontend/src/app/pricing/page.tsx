"use client";

import { useState } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
import { PageHeader, ui as s } from "@/components/ui/ui";
import { PLANS } from "@/content/home";

const COMPARE: [string, string, (boolean | string)[]][] = [
  ["Wardrobe pieces", "The total number of physical items you can digitize and store.", ["40", "Unlimited", "Unlimited"]],
  ["AI outfit recommendations", "Automated daily looks tailored to your weather, calendar, and preferences.", ["3 / week", "Unlimited", "Unlimited"]],
  ["Outfit planner & travel capsules", "Visually plan looks for the week or pack luggage for upcoming trips.", [false, true, true]],
  ["Cost-per-wear analytics", "Track the ROI of your investments with detailed wear-frequency metrics.", [false, true, true]],
  ["Monthly style report", "A beautiful retrospective on your most worn pieces and style evolution.", [false, true, true]],
  ["Concierge chat", "Direct messaging with style experts for quick fashion advice.", ["Community", "Priority", "Dedicated stylist"]],
  ["Seasonal wardrobe audit", "Automated notifications every season to refresh your wardrobe, plus deep-dive audits.", [false, "3x / Year (Automated)", "Seasonal + On-Demand (Stylist)"]],
  ["Calendar & EA integrations", "Sync your schedule so your outfits are pre-planned for every event.", [false, "Basic", "Full"]],
];

export default function PricingPage() {
  const [yearly, setYearly] = useState(false);

  return (
    <>
      <header style={{
        position: 'fixed',
        top: 0, left: 0, width: '100%',
        padding: '0 5%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'var(--bg-primary)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
        borderBottom: '1px solid var(--bg-glass-border)',
        zIndex: 1000,
        height: '80px'
      }}>
        <Link href="/" style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '1.5rem',
          fontWeight: 500,
          letterSpacing: '0.1em',
          color: 'var(--text-primary)',
          textDecoration: 'none'
        }}>
          VASTR<span style={{ color: 'var(--accent-primary)' }}>IÉ</span>
        </Link>
        
        <div style={{ display: 'flex', gap: '36px', alignItems: 'center' }}>
          <Link href="/" style={{ color: 'var(--text-primary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600, textDecoration: 'none' }}>
            Back to Home
          </Link>
        </div>
      </header>
      <div className={s.page} style={{ paddingTop: '100px' }}>
        <PageHeader eyebrow="Memberships" title="Choose your tailoring" sub="Transparent pricing. Change or cancel at any time from Billing." />

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '64px' }}>
        <div style={{
          display: 'inline-flex',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--bg-glass-border)',
          borderRadius: '40px',
          padding: '4px',
          position: 'relative',
          boxShadow: 'var(--shadow-subtle)'
        }}>
          <div style={{
            position: 'absolute',
            top: '4px', bottom: '4px',
            left: yearly ? '50%' : '4px',
            width: 'calc(50% - 4px)',
            background: 'var(--text-primary)',
            borderRadius: '32px',
            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
          }} />
          <button 
            onClick={() => setYearly(false)}
            style={{
              position: 'relative', zIndex: 1, padding: '12px 32px', background: 'none', border: 'none',
              color: !yearly ? 'var(--bg-primary)' : 'var(--text-primary)',
              fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer', transition: 'color 0.4s ease'
            }}
          >
            Monthly
          </button>
          <button 
            onClick={() => setYearly(true)}
            style={{
              position: 'relative', zIndex: 1, padding: '12px 32px', background: 'none', border: 'none',
              color: yearly ? 'var(--bg-primary)' : 'var(--text-primary)',
              fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer', transition: 'color 0.4s ease'
            }}
          >
            Yearly <span style={{ opacity: 0.8, fontWeight: 500 }}>(-15%)</span>
          </button>
        </div>
      </div>

      <div className={s.grid3} style={{ alignItems: "stretch" }}>
        {PLANS.map((p) => {
          const featured = "featured" in p;
          return (
            <article key={p.id} className={s.card} style={{
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              ...(featured ? {
                borderColor: 'var(--accent-primary)',
                boxShadow: '0 8px 30px var(--accent-glow)',
                transform: 'translateY(-8px)',
                zIndex: 2
              } : {})
            }}>
              {featured && (
                <span 
                  className={`${s.badge} ${s.badgeSolid}`} 
                  style={{ 
                    position: 'absolute',
                    top: '-14px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: "var(--accent-primary)", 
                    color: "var(--bg-primary)",
                    padding: '6px 16px',
                    borderRadius: '20px',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                    letterSpacing: '0.15em',
                    fontSize: '0.7rem'
                  }}
                >
                  Most chosen
                </span>
              )}
              <h2 className={s.cardTitle} style={{ fontSize: "1.6rem" }}>{p.name}</h2>
              <p style={{ opacity: 0.7, margin: "0 0 24px", fontSize: "0.9rem" }}>{p.tagline}</p>
              <div className={s.stat} style={{ marginBottom: 24 }}>€{yearly ? p.yearly : p.monthly}<span style={{ fontSize: "0.85rem", fontFamily: "var(--font-body)", opacity: 0.65, marginLeft: 6 }}>/ {yearly ? "year" : "month"}</span></div>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", display: "flex", flexDirection: "column", gap: 12, flexGrow: 1 }}>
                {p.features.map((f) => (
                  <li key={f} style={{ display: "flex", gap: 10, fontSize: "0.9rem" }}><Icon name="check" size={16} /> {f}</li>
                ))}
              </ul>
              <Link
                href={`/checkout?plan=${p.id}&billing=${yearly ? "yearly" : "monthly"}`}
                className={s.btn}
                style={{ width: "100%", ...(featured ? { background: "var(--accent-primary)", color: "var(--bg-primary)", borderColor: "var(--accent-primary)" } : {}) }}
              >
                {p.cta}
              </Link>
            </article>
          );
        })}
      </div>

      <h2 className={s.cardTitle} style={{ fontSize: "1.8rem", margin: "80px 0 32px", textAlign: "center", fontWeight: 400 }}>Compare the details</h2>
      <div style={{ overflowX: 'auto', paddingBottom: '64px' }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.95rem", textAlign: "left" }}>
          <thead>
            <tr>
              <th style={{ padding: "20px 24px", borderBottom: "1px solid var(--text-primary)", fontWeight: 500, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.15em", fontSize: "0.7rem", width: "40%" }}>
                Feature
              </th>
              {PLANS.map((p) => {
                const featured = "featured" in p;
                return (
                  <th key={p.id} style={{ 
                    padding: "20px 24px", 
                    borderBottom: featured ? "2px solid var(--accent-primary)" : "1px solid var(--text-primary)", 
                    fontWeight: 600, 
                    color: featured ? "var(--accent-primary)" : "var(--text-primary)", 
                    textTransform: "uppercase", 
                    letterSpacing: "0.15em", 
                    fontSize: "0.75rem", 
                    textAlign: "center",
                    width: "20%" 
                  }}>
                    {p.name}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {COMPARE.map(([label, desc, vals], rowIdx) => (
              <tr key={label} style={{ 
                borderBottom: "1px solid var(--bg-glass-border)",
                transition: "background 0.3s ease",
              }}>
                <td style={{ padding: "24px", color: "var(--text-primary)" }}>
                  <div style={{ fontWeight: 500, marginBottom: "6px" }}>{label}</div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: 1.5, paddingRight: "20px" }}>{desc}</div>
                </td>
                {vals.map((v, i) => {
                  const isSignature = i === 1; // Signature is the second column (index 1)
                  return (
                    <td key={i} style={{ 
                      padding: "24px", 
                      textAlign: "center", 
                      color: isSignature ? "var(--accent-primary)" : "var(--text-secondary)",
                      background: isSignature ? "rgba(212, 175, 55, 0.02)" : "transparent"
                    }}>
                      {v === true ? <Icon name="check" size={20} /> : v === false ? <span style={{ opacity: 0.3 }}>—</span> : <span style={{ fontWeight: 400 }}>{v}</span>}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
}
