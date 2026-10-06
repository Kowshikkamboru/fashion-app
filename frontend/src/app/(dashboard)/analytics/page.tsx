"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { PageHeader, ui as s } from "@/components/ui/ui";
import { GARMENTS, CATEGORY_LABEL, costPerWear } from "@/content/wardrobe";
import x from "@/components/ui/screens.module.css";

const RANGES = { "30d": 0.35, "90d": 1, "12m": 3.2 } as const;
type Range = keyof typeof RANGES;

const MONTHS = ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr"];
const WEARS = [38, 44, 41, 52, 61, 68];

export default function AnalyticsPage() {
  const [range, setRange] = useState<Range>("90d");
  const [sortBy, setSortBy] = useState<"cpw" | "wears">("cpw");

  const m = RANGES[range];
  const totalWears = Math.round(GARMENTS.reduce((a, g) => a + g.wears, 0) * m * 0.3);
  const value = GARMENTS.reduce((a, g) => a + g.price, 0);
  const avgCpw = value / GARMENTS.reduce((a, g) => a + g.wears, 0);

  const byCat = useMemo(() => {
    const o: Record<string, number> = {};
    GARMENTS.forEach((g) => (o[g.category] = (o[g.category] ?? 0) + g.wears));
    const total = Object.values(o).reduce((a, b) => a + b, 0);
    return Object.entries(o).map(([k, v]) => ({ k, label: CATEGORY_LABEL[k as keyof typeof CATEGORY_LABEL], pct: Math.round((v / total) * 100) }));
  }, []);

  const ranked = useMemo(
    () => [...GARMENTS].sort((a, b) => (sortBy === "cpw" ? costPerWear(a) - costPerWear(b) : b.wears - a.wears)),
    [sortBy]
  );
  const max = Math.max(...WEARS);

  return (
    <div className={s.page}>
      <PageHeader eyebrow="Analytics" title="Wardrobe intelligence" sub="How hard your clothes are working — and where to invest next.">
        <div className={s.row}>
          {(Object.keys(RANGES) as Range[]).map((r) => (
            <button key={r} className={`${s.chip} ${range === r ? s.chipActive : ""}`} onClick={() => setRange(r)} aria-pressed={range === r}>{r}</button>
          ))}
        </div>
        <Link href="/reports" className={s.btn}>Full report</Link>
      </PageHeader>

      <div className={s.grid4} style={{ marginBottom: 24 }}>
        <div className={s.card}><div className={s.statLabel}>Total wears</div><div className={s.stat}>{totalWears}</div><div className={`${s.delta} ${s.up}`}>+12% vs prior period</div></div>
        <div className={s.card}><div className={s.statLabel}>Wardrobe value</div><div className={s.stat}>€{(value / 1000).toFixed(1)}k</div><div className={s.delta}>{GARMENTS.length} pieces</div></div>
        <div className={s.card}><div className={s.statLabel}>Avg cost / wear</div><div className={s.stat}>€{avgCpw.toFixed(0)}</div><div className={`${s.delta} ${s.up}`}>-€4 this quarter</div></div>
        <div className={s.card}><div className={s.statLabel}>Utilisation</div><div className={s.stat}>78%</div><div className={`${s.delta} ${s.up}`}>+9 pts</div></div>
      </div>

      <div className={s.grid2} style={{ marginBottom: 24, alignItems: "stretch" }}>
        <div className={s.card}>
          <h2 className={s.cardTitle}>Wears per month</h2>
          <p className={s.cardSub}>Hover a bar for the exact count.</p>
          <div className={x.bars} role="img" aria-label="Wears per month">
            {WEARS.map((v, i) => (
              <div key={MONTHS[i]} className={x.barCol}>
                <div className={x.barVal}>{v}</div>
                <div className={x.bar} style={{ height: `${(v / max) * 100}%` }} title={`${MONTHS[i]}: ${v} wears`} />
                <span>{MONTHS[i]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={s.card}>
          <h2 className={s.cardTitle}>Where you spend your wear</h2>
          <p className={s.cardSub}>Share of total wears by category.</p>
          <div className={s.stack} style={{ gap: 16 }}>
            {byCat.map((c) => (
              <div key={c.k}>
                <div className={s.between} style={{ marginBottom: 6 }}><span>{c.label}</span><span className={s.muted}>{c.pct}%</span></div>
                <div className={s.progress}><div className={s.progressBar} style={{ width: `${c.pct}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={s.between} style={{ marginBottom: 16 }}>
        <h2 className={s.cardTitle} style={{ fontSize: "1.5rem", margin: 0 }}>Piece performance</h2>
        <div className={s.row}>
          <button className={`${s.chip} ${sortBy === "cpw" ? s.chipActive : ""}`} onClick={() => setSortBy("cpw")}>Best cost / wear</button>
          <button className={`${s.chip} ${sortBy === "wears" ? s.chipActive : ""}`} onClick={() => setSortBy("wears")}>Most worn</button>
        </div>
      </div>
      <div className={s.tableWrap}>
        <table className={s.table}>
          <thead><tr><th>Piece</th><th>Wears</th><th>Cost / wear</th><th>Verdict</th></tr></thead>
          <tbody>
            {ranked.map((g) => {
              const c = costPerWear(g);
              return (
                <tr key={g.id}>
                  <td><Link href={`/wardrobe/${g.id}`} style={{ fontWeight: 500, textDecoration: "underline", textUnderlineOffset: 4 }}>{g.name}</Link><div className={`${s.muted} ${s.small}`}>{g.brand}</div></td>
                  <td>{g.wears}</td>
                  <td>€{c.toFixed(0)}</td>
                  <td><span className={`${s.badge} ${c < 25 ? s.badgeOk : c < 60 ? s.badgeWarn : s.badgeBad}`}>{c < 25 ? "Workhorse" : c < 60 ? "Earning its place" : "Wear more"}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
