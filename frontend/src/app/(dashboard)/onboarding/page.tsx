"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Icon, { IconName } from "@/components/Icon";
import { PageHeader, ui as s } from "@/components/ui/ui";

const TASKS: { id: string; title: string; text: string; href: string; cta: string; icon: IconName }[] = [
  { id: "profile", title: "Complete your style profile", text: "Five questions that shape every recommendation.", href: "/style-profile", cta: "Start", icon: "steps" },
  { id: "wardrobe", title: "Add your first 10 pieces", text: "Photograph what you wear most.", href: "/wardrobe", cta: "Open wardrobe", icon: "shirt" },
  { id: "look", title: "Generate your first outfit", text: "See the AI stylist at work.", href: "/outfits", cta: "Generate", icon: "sparkle" },
  { id: "notify", title: "Choose your notifications", text: "Decide how and when we reach you.", href: "/settings/notifications", cta: "Set preferences", icon: "bell" },
  { id: "security", title: "Secure your account with 2FA", text: "Protect your wardrobe data.", href: "/settings/security", cta: "Enable", icon: "shield" },
];

const KEY = "vastrie_onboarding";

export default function OnboardingPage() {
  const [done, setDone] = useState<string[]>([]);

  useEffect(() => {
    try { setDone(JSON.parse(localStorage.getItem(KEY) ?? "[]")); } catch { /* ignore */ }
  }, []);

  const toggle = (id: string) =>
    setDone((d) => {
      const next = d.includes(id) ? d.filter((x) => x !== id) : [...d, id];
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });

  const pct = Math.round((done.length / TASKS.length) * 100);
  const complete = pct === 100;

  return (
    <div className={s.pageNarrow}>
      <PageHeader eyebrow="Onboarding" title={complete ? "You’re all set" : "Welcome to your atelier"} sub="Five small steps to get the most from Vastrié." />

      <div className={s.card} style={{ marginBottom: 24 }}>
        <div className={s.between} style={{ marginBottom: 14 }}>
          <strong>{done.length} of {TASKS.length} complete</strong>
          <span className={s.muted}>{pct}%</span>
        </div>
        <div className={s.progress}><div className={s.progressBar} style={{ width: `${pct}%` }} /></div>
        {complete && (
          <div className={s.actions} style={{ marginTop: 20 }}>
            <Link href="/dashboard" className={s.btn}>Go to dashboard</Link>
          </div>
        )}
      </div>

      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
        {TASKS.map((t) => {
          const ok = done.includes(t.id);
          return (
            <li key={t.id} className={s.card} style={{ padding: 20, display: "flex", alignItems: "center", gap: 18, opacity: ok ? 0.65 : 1 }}>
              <button
                role="checkbox"
                aria-checked={ok}
                aria-label={`Mark “${t.title}” ${ok ? "incomplete" : "complete"}`}
                onClick={() => toggle(t.id)}
                style={{ width: 28, height: 28, flexShrink: 0, borderRadius: "50%", border: "1px solid var(--text-primary)", background: ok ? "var(--text-primary)" : "transparent", color: "var(--bg-primary)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
              >
                {ok && <Icon name="check" size={16} />}
              </button>
              <div style={{ flex: 1 }}>
                <div className={s.settingTitle} style={{ textDecoration: ok ? "line-through" : "none" }}>{t.title}</div>
                <div className={s.settingDesc}>{t.text}</div>
              </div>
              <Link href={t.href} className={`${s.btn} ${s.btnGhost} ${s.btnSm}`}>{t.cta}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
