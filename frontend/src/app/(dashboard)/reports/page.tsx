"use client";

import { useState } from "react";
import Link from "next/link";
import { PageHeader, ui as s } from "@/components/ui/ui";
import { GARMENTS, costPerWear } from "@/content/wardrobe";

const REPORTS: Record<string, { wears: number; newPieces: number; score: number; headline: string; notes: string[] }> = {
  "April 2026": { wears: 68, newPieces: 2, score: 86, headline: "Your most polished month yet.", notes: ["Navy tailoring carried 6 of your 9 client meetings.", "Linen overshirt was worn 5× — summer is coming.", "Two pieces haven’t been worn in 90 days."] },
  "March 2026": { wears: 61, newPieces: 1, score: 81, headline: "Strong foundations, narrow range.", notes: ["You wore the same three trousers 74% of the time.", "Cashmere crewneck hit a new cost-per-wear low.", "Consider one more neutral knit for layering."] },
  "February 2026": { wears: 52, newPieces: 3, score: 74, headline: "Experimenting with texture.", notes: ["Suede loafers entered rotation.", "Three new pieces — two are already earning their place.", "Colour palette widened by 12%."] },
};

export default function ReportsPage() {
  const months = Object.keys(REPORTS);
  const [month, setMonth] = useState(months[0]);
  const r = REPORTS[month];

  const top = [...GARMENTS].sort((a, b) => b.wears - a.wears).slice(0, 3);
  const quiet = [...GARMENTS].sort((a, b) => a.wears - b.wears).slice(0, 2);

  return (
    <div className={s.pageNarrow} id="report">
      <PageHeader eyebrow="Monthly report" title={month} sub={r.headline}>
        <select aria-label="Select month" className={s.select} style={{ width: 190 }} value={month} onChange={(e) => setMonth(e.target.value)}>
          {months.map((m) => <option key={m}>{m}</option>)}
        </select>
        <button className={s.btn} onClick={() => window.print()}>Print / Save PDF</button>
      </PageHeader>

      <div className={s.grid3} style={{ marginBottom: 32 }}>
        <div className={s.card}><div className={s.statLabel}>Wears</div><div className={s.stat}>{r.wears}</div></div>
        <div className={s.card}><div className={s.statLabel}>New pieces</div><div className={s.stat}>{r.newPieces}</div></div>
        <div className={s.card}><div className={s.statLabel}>Style score</div><div className={s.stat}>{r.score}</div><div className={s.progress} style={{ marginTop: 14 }}><div className={s.progressBar} style={{ width: `${r.score}%` }} /></div></div>
      </div>

      <section className={s.card} style={{ marginBottom: 24 }}>
        <h2 className={s.cardTitle}>Highlights</h2>
        <ul style={{ margin: "16px 0 0", paddingLeft: 20, lineHeight: 2, color: "var(--text-secondary)" }}>
          {r.notes.map((n) => <li key={n}>{n}</li>)}
        </ul>
      </section>

      <div className={s.grid2}>
        <section className={s.card}>
          <h2 className={s.cardTitle}>Workhorses</h2>
          <p className={s.cardSub}>Your most-worn pieces.</p>
          {top.map((g) => (
            <div key={g.id} className={s.settingRow}>
              <Link href={`/wardrobe/${g.id}`} style={{ textDecoration: "underline", textUnderlineOffset: 4 }}>{g.name}</Link>
              <span className={s.muted}>{g.wears}× · €{costPerWear(g).toFixed(0)}/wear</span>
            </div>
          ))}
        </section>
        <section className={s.card}>
          <h2 className={s.cardTitle}>Needs attention</h2>
          <p className={s.cardSub}>Least worn — style them or let them go.</p>
          {quiet.map((g) => (
            <div key={g.id} className={s.settingRow}>
              <Link href={`/wardrobe/${g.id}`} style={{ textDecoration: "underline", textUnderlineOffset: 4 }}>{g.name}</Link>
              <span className={s.muted}>{g.wears}×</span>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
