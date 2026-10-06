"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Icon, { IconName } from "@/components/Icon";
import { EmptyState, PageHeader, useToast, ui as s } from "@/components/ui/ui";

const TOPICS: { id: string; title: string; icon: IconName; blurb: string }[] = [
  { id: "start", title: "Getting started", icon: "rocket", blurb: "Set up your profile and first wardrobe." },
  { id: "wardrobe", title: "Wardrobe", icon: "shirt", blurb: "Adding, tagging and organising pieces." },
  { id: "ai", title: "AI stylist", icon: "sparkle", blurb: "How recommendations are made." },
  { id: "billing", title: "Billing & plans", icon: "card", blurb: "Invoices, upgrades and cancellations." },
  { id: "security", title: "Privacy & security", icon: "shield", blurb: "2FA, data export and deletion." },
];

const ARTICLES: { q: string; a: string; topic: string }[] = [
  { topic: "start", q: "How do I build my first wardrobe?", a: "Open Wardrobe and choose “Digitize piece”. Start with ten items you wear most — the stylist becomes useful immediately." },
  { topic: "start", q: "Can I continue as a guest?", a: "Yes. Guest mode lets you explore everything on this device. Create an account to sync across devices." },
  { topic: "wardrobe", q: "How are fabrics and care detected?", a: "You enter fabric and colour when adding a piece. We attach care guidance and track cost-per-wear automatically." },
  { topic: "wardrobe", q: "Can I remove or edit a piece?", a: "Open the piece from your wardrobe and use its detail page. Edits are versioned so you can always revert." },
  { topic: "ai", q: "Why did the stylist suggest this outfit?", a: "Each look shows its reasoning: occasion, weather, colour harmony and how often you’ve worn each item recently." },
  { topic: "ai", q: "How do I stop certain pieces appearing?", a: "Rate a look with a thumbs-down or mark a piece as “retired” in its detail page." },
  { topic: "billing", q: "How do I cancel my subscription?", a: "Go to Billing → Cancel subscription. You keep access until the end of the paid period." },
  { topic: "billing", q: "Where can I download invoices?", a: "Billing → Invoice history. Each invoice has a PDF download." },
  { topic: "security", q: "How do I enable two-factor authentication?", a: "Settings → Security & 2FA → Set up 2FA. Scan the code with any authenticator app and store your backup codes." },
  { topic: "security", q: "How do I delete my data?", a: "Account → Delete account. You can export everything first from the same page." },
];

export default function HelpPage() {
  const [q, setQ] = useState("");
  const [topic, setTopic] = useState<string>("all");
  const [open, setOpen] = useState<string | null>(null);
  const [vote, setVote] = useState<Record<string, "up" | "down">>({});
  const [toast, show] = useToast();

  const results = useMemo(() => {
    const t = q.trim().toLowerCase();
    return ARTICLES.filter((a) => (topic === "all" || a.topic === topic) && (!t || (a.q + a.a).toLowerCase().includes(t)));
  }, [q, topic]);

  return (
    <div className={s.page}>
      <PageHeader eyebrow="Help Center" title="How can we help?" sub="Search guides or talk to your personal concierge." />

      <div className={s.field} style={{ maxWidth: 640 }}>
        <label className={s.label} htmlFor="hq">Search articles</label>
        <input id="hq" className={s.input} placeholder="e.g. cancel subscription, 2FA, add piece…" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>

      <div className={s.grid4} style={{ gridTemplateColumns: "repeat(5, 1fr)", marginBottom: 40 }}>
        {TOPICS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTopic(topic === t.id ? "all" : t.id)}
            className={`${s.card} ${s.cardClickable}`}
            style={{ textAlign: "left", fontFamily: "inherit", padding: 20, ...(topic === t.id ? { borderColor: "var(--text-primary)" } : {}) }}
            aria-pressed={topic === t.id}
          >
            <Icon name={t.icon} size={22} />
            <div className={s.settingTitle} style={{ marginTop: 14 }}>{t.title}</div>
            <div className={s.settingDesc}>{t.blurb}</div>
          </button>
        ))}
      </div>

      {results.length === 0 ? (
        <EmptyState icon="search" title="No articles found" text="Try different keywords — or ask your concierge directly.">
          <Link href="/concierge" className={s.btn}>Chat with concierge</Link>
        </EmptyState>
      ) : (
        <div className={s.stack} style={{ gap: 0 }}>
          {results.map((a) => {
            const isOpen = open === a.q;
            return (
              <div key={a.q} style={{ borderBottom: "1px solid var(--bg-glass-border)" }}>
                <button
                  onClick={() => setOpen(isOpen ? null : a.q)}
                  aria-expanded={isOpen}
                  style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 20, padding: "22px 0", background: "transparent", border: "none", color: "var(--text-primary)", fontFamily: "var(--font-heading)", fontSize: "1.15rem", textAlign: "left", cursor: "pointer" }}
                >
                  {a.q}
                  <Icon name="chevron" size={18} style={{ transform: isOpen ? "rotate(180deg)" : "none", transition: "transform .3s", flexShrink: 0 }} />
                </button>
                {isOpen && (
                  <div style={{ paddingBottom: 24 }}>
                    <p className={s.muted} style={{ lineHeight: 1.75, marginTop: 0 }}>{a.a}</p>
                    <div className={s.row}>
                      <span className={`${s.small} ${s.muted}`}>Was this helpful?</span>
                      {(["up", "down"] as const).map((v) => (
                        <button key={v} className={`${s.chip} ${vote[a.q] === v ? s.chipActive : ""}`} onClick={() => { setVote({ ...vote, [a.q]: v }); show("Thanks for your feedback"); }}>
                          {v === "up" ? "Yes" : "No"}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className={s.card} style={{ marginTop: 48 }}>
        <div className={s.between}>
          <div>
            <h2 className={s.cardTitle}>Still need help?</h2>
            <p className={s.cardSub} style={{ marginBottom: 0 }}>Your concierge replies within a few minutes, 8am–10pm CET.</p>
          </div>
          <Link href="/concierge" className={s.btn}>Contact concierge</Link>
        </div>
      </div>
      {toast}
    </div>
  );
}
