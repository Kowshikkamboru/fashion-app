"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Icon from "@/components/Icon";
import { EmptyState, PageHeader, ui as s } from "@/components/ui/ui";
import { GARMENTS, CATEGORY_LABEL } from "@/content/wardrobe";
import { CAPABILITIES } from "@/content/capabilities";
import x from "@/components/ui/screens.module.css";

const hl = (text: string, q: string) => {
  if (!q) return text;
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i < 0) return text;
  return (
    <>
      {text.slice(0, i)}
      <mark className={x.mark}>{text.slice(i, i + q.length)}</mark>
      {text.slice(i + q.length)}
    </>
  );
};

function Inner() {
  const params = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");
  const [tab, setTab] = useState<"all" | "pieces" | "pages">("all");

  const term = q.trim().toLowerCase();
  const pieces = useMemo(
    () => (term ? GARMENTS.filter((g) => `${g.name} ${g.brand} ${g.colorName} ${g.fabric} ${g.category}`.toLowerCase().includes(term)) : []),
    [term]
  );
  const pages = useMemo(
    () => (term ? CAPABILITIES.filter((c) => `${c.label} ${c.desc}`.toLowerCase().includes(term)) : []),
    [term]
  );

  const showP = tab !== "pages";
  const showG = tab !== "pieces";
  const total = (showP ? pieces.length : 0) + (showG ? pages.length : 0);

  return (
    <div className={s.pageNarrow} style={{ maxWidth: 900 }}>
      <PageHeader eyebrow="Search" title="Find anything" />

      <div style={{ position: "relative", marginBottom: 20 }}>
        <Icon name="search" size={18} style={{ position: "absolute", left: 16, top: 16, color: "var(--text-secondary)" }} />
        <input
          autoFocus
          aria-label="Search"
          className={s.input}
          style={{ paddingLeft: 46, height: 52, fontSize: "1.05rem" }}
          placeholder="Search pieces, brands, colours, pages…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      <div className={s.row} style={{ marginBottom: 28 }}>
        {([["all", "All"], ["pieces", `Pieces (${pieces.length})`], ["pages", `Pages (${pages.length})`]] as const).map(([k, l]) => (
          <button key={k} className={`${s.chip} ${tab === k ? s.chipActive : ""}`} onClick={() => setTab(k)}>{l}</button>
        ))}
        {term && <span className={`${s.muted} ${s.small}`} style={{ marginLeft: "auto" }} aria-live="polite">{total} result{total === 1 ? "" : "s"} for “{q}”</span>}
      </div>

      {!term ? (
        <EmptyState icon="search" title="Start typing to search" text="Try “navy”, “cashmere”, “Loro Piana” or “billing”.">
          <div className={s.row} style={{ flexWrap: "wrap", justifyContent: "center" }}>
            {["navy", "linen", "suede", "billing", "2FA"].map((t) => (
              <button key={t} className={s.chip} onClick={() => setQ(t)}>{t}</button>
            ))}
          </div>
        </EmptyState>
      ) : total === 0 ? (
        <EmptyState icon="search" title={`No results for “${q}”`} text="Check the spelling or try a broader term.">
          <button className={`${s.btn} ${s.btnGhost}`} onClick={() => setQ("")}>Clear search</button>
        </EmptyState>
      ) : (
        <div className={s.stack}>
          {showP && pieces.length > 0 && (
            <section>
              <div className={s.label} style={{ marginBottom: 12 }}>Pieces</div>
              <ul className={x.resultList}>
                {pieces.map((g) => (
                  <li key={g.id}>
                    <Link href={`/wardrobe/${g.id}`} className={x.result}>
                      <span className={x.thumb} style={{ backgroundImage: `url(${g.image})` }} />
                      <span style={{ flex: 1, minWidth: 0 }}>
                        <strong style={{ display: "block", fontWeight: 500 }}>{hl(g.name, q.trim())}</strong>
                        <span className={`${s.muted} ${s.small}`}>{hl(g.brand, q.trim())} · {g.colorName} · {CATEGORY_LABEL[g.category]}</span>
                      </span>
                      <Icon name="arrow" size={16} />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
          {showG && pages.length > 0 && (
            <section>
              <div className={s.label} style={{ marginBottom: 12 }}>Pages</div>
              <ul className={x.resultList}>
                {pages.map((c) => (
                  <li key={c.label}>
                    <Link href={c.href} className={x.result}>
                      <span className={s.emptyIcon} style={{ margin: 0, width: 44, height: 44 }}><Icon name={c.icon} size={20} /></span>
                      <span style={{ flex: 1, minWidth: 0 }}>
                        <strong style={{ display: "block", fontWeight: 500 }}>{hl(c.label, q.trim())}</strong>
                        <span className={`${s.muted} ${s.small}`}>{c.desc}</span>
                      </span>
                      <Icon name="arrow" size={16} />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={null}>
      <Inner />
    </Suspense>
  );
}
