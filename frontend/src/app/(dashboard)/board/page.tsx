"use client";

import { useState } from "react";
import { PageHeader, useToast, ui as s } from "@/components/ui/ui";
import x from "@/components/ui/screens.module.css";

type Col = "wishlist" | "ordered" | "owned" | "retire";
interface Card { id: number; title: string; brand: string; price: number; col: Col; }

const COLS: { id: Col; title: string }[] = [
  { id: "wishlist", title: "Wishlist" },
  { id: "ordered", title: "Ordered" },
  { id: "owned", title: "In wardrobe" },
  { id: "retire", title: "Retire / donate" },
];

const SEED: Card[] = [
  { id: 1, title: "Stone cotton chinos", brand: "Rota Napoli", price: 340, col: "wishlist" },
  { id: 2, title: "Black Chelsea boots", brand: "Crockett & Jones", price: 520, col: "wishlist" },
  { id: 3, title: "Grey flannel overcoat", brand: "Loro Piana", price: 2100, col: "ordered" },
  { id: 4, title: "Navy knit polo", brand: "Zanone", price: 260, col: "owned" },
  { id: 5, title: "Linen overshirt", brand: "Boglioli", price: 420, col: "owned" },
  { id: 6, title: "Worn denim jacket", brand: "—", price: 120, col: "retire" },
];

export default function BoardPage() {
  const [cards, setCards] = useState(SEED);
  const [drag, setDrag] = useState<number | null>(null);
  const [over, setOver] = useState<Col | null>(null);
  const [adding, setAdding] = useState("");
  const [toast, show] = useToast();

  const move = (id: number, col: Col) => {
    setCards((l) => l.map((c) => (c.id === id ? { ...c, col } : c)));
    show(`Moved to ${COLS.find((c) => c.id === col)!.title}`);
  };

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adding.trim()) return;
    setCards((l) => [...l, { id: Date.now(), title: adding.trim(), brand: "—", price: 0, col: "wishlist" }]);
    setAdding("");
    show("Added to wishlist");
  };

  const sum = (col: Col) => cards.filter((c) => c.col === col).reduce((a, c) => a + c.price, 0);

  return (
    <div className={s.page} style={{ maxWidth: 1400 }}>
      <PageHeader eyebrow="Board" title="Wardrobe pipeline" sub="Drag pieces between stages, or use the arrows for keyboard access.">
        <form className={s.row} onSubmit={add}>
          <input aria-label="New wishlist item" className={s.input} style={{ width: 240 }} placeholder="Add to wishlist…" value={adding} onChange={(e) => setAdding(e.target.value)} />
          <button className={s.btn} type="submit" disabled={!adding.trim()}>Add</button>
        </form>
      </PageHeader>

      <div className={x.kanban}>
        {COLS.map((col, ci) => {
          const list = cards.filter((c) => c.col === col.id);
          return (
            <section
              key={col.id}
              className={`${x.kCol} ${over === col.id ? x.kColOver : ""}`}
              onDragOver={(e) => { e.preventDefault(); setOver(col.id); }}
              onDragLeave={() => setOver((o) => (o === col.id ? null : o))}
              onDrop={() => { if (drag !== null) move(drag, col.id); setDrag(null); setOver(null); }}
              aria-label={col.title}
            >
              <header className={x.kHead}>
                <span>{col.title}</span>
                <span className={s.badge}>{list.length}</span>
              </header>
              <div className={`${s.muted} ${s.small}`} style={{ marginBottom: 14 }}>€{sum(col.id).toLocaleString()}</div>

              {list.length === 0 && <div className={x.kEmpty}>Drop a piece here</div>}

              {list.map((c) => (
                <article
                  key={c.id}
                  draggable
                  onDragStart={() => setDrag(c.id)}
                  onDragEnd={() => { setDrag(null); setOver(null); }}
                  className={`${x.kCard} ${drag === c.id ? x.kDragging : ""}`}
                >
                  <strong style={{ fontWeight: 500 }}>{c.title}</strong>
                  <div className={`${s.muted} ${s.small}`}>{c.brand}{c.price ? ` · €${c.price}` : ""}</div>
                  <div className={x.kActions}>
                    <button className={s.iconBtn} style={{ width: 28, height: 28 }} aria-label={`Move ${c.title} left`} disabled={ci === 0} onClick={() => move(c.id, COLS[ci - 1].id)}>←</button>
                    <button className={s.iconBtn} style={{ width: 28, height: 28 }} aria-label={`Move ${c.title} right`} disabled={ci === COLS.length - 1} onClick={() => move(c.id, COLS[ci + 1].id)}>→</button>
                  </div>
                </article>
              ))}
            </section>
          );
        })}
      </div>
      {toast}
    </div>
  );
}
