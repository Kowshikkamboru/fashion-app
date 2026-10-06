"use client";

import { useState } from "react";
import { PageHeader, Modal, useToast, ui as s } from "@/components/ui/ui";
import x from "@/components/ui/screens.module.css";

interface Ev { id: number; title: string; start: number; len: number; outfit: string; kind: "work" | "social" | "travel"; }

const DAYS = ["Mon 20", "Tue 21", "Wed 22", "Thu 23", "Fri 24", "Sat 25", "Sun 26", "Mon 27", "Tue 28", "Wed 29", "Thu 30", "Fri 1", "Sat 2", "Sun 3"];

const SEED: Ev[] = [
  { id: 1, title: "Board meeting", start: 0, len: 1, outfit: "Navy blazer · grey flannels · oxford", kind: "work" },
  { id: 2, title: "Client dinner", start: 3, len: 1, outfit: "Double-breasted blazer · cashmere · loafers", kind: "social" },
  { id: 3, title: "Milan trip", start: 5, len: 4, outfit: "Travel capsule: 6 pieces, 1 carry-on", kind: "travel" },
  { id: 4, title: "Gallery opening", start: 10, len: 1, outfit: "Linen overshirt · selvedge denim · suede loafers", kind: "social" },
  { id: 5, title: "Quarterly review", start: 11, len: 2, outfit: "Charcoal flannels · cashmere crewneck", kind: "work" },
];

export default function PlannerPage() {
  const [evs, setEvs] = useState(SEED);
  const [active, setActive] = useState<Ev | null>(null);
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState({ title: "", start: 0, len: 1, kind: "work" as Ev["kind"] });
  const [toast, show] = useToast();

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.title.trim()) return;
    setEvs((l) => [...l, { id: Date.now(), title: draft.title.trim(), start: draft.start, len: Math.min(draft.len, DAYS.length - draft.start), kind: draft.kind, outfit: "AI will propose a look once you confirm" }]);
    setAdding(false);
    setDraft({ title: "", start: 0, len: 1, kind: "work" });
    show("Event added to planner");
  };

  return (
    <div className={s.page}>
      <PageHeader eyebrow="Planner" title="Two-week timeline" sub="Events across the weeks ahead — each with an outfit or travel capsule.">
        <button className={s.btn} onClick={() => setAdding(true)}>Add event</button>
      </PageHeader>

      <div className={s.card} style={{ padding: 0 }}>
        <div className={x.gantt} style={{ ["--cols" as string]: DAYS.length }}>
          <div className={x.ganttHead}>
            <div className={x.ganttLabel} />
            {DAYS.map((d, i) => (
              <div key={d} className={`${x.ganttDay} ${i === 3 ? x.ganttToday : ""}`}>{d}</div>
            ))}
          </div>
          {evs.map((ev) => (
            <div key={ev.id} className={x.ganttRow}>
              <div className={x.ganttLabel}>{ev.title}</div>
              <div className={x.ganttTrack}>
                <button
                  className={`${x.ganttBar} ${x[`kind_${ev.kind}`]}`}
                  style={{ gridColumn: `${ev.start + 1} / span ${ev.len}` }}
                  onClick={() => setActive(ev)}
                  aria-label={`${ev.title}, ${DAYS[ev.start]}, ${ev.len} day${ev.len > 1 ? "s" : ""}`}
                >
                  {ev.len > 1 ? ev.title : ""}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={s.row} style={{ marginTop: 20, gap: 20 }}>
        {(["work", "social", "travel"] as const).map((k) => (
          <span key={k} className={`${s.row} ${s.small} ${s.muted}`} style={{ gap: 8 }}><span className={`${x.legend} ${x[`kind_${k}`]}`} />{k[0].toUpperCase() + k.slice(1)}</span>
        ))}
      </div>

      <Modal open={!!active} onClose={() => setActive(null)}>
        {active && (
          <>
            <div className={s.eyebrow}>{active.kind}</div>
            <h2 className={s.cardTitle} style={{ fontSize: "1.6rem" }}>{active.title}</h2>
            <p className={s.muted}>{DAYS[active.start]}{active.len > 1 ? ` → ${DAYS[Math.min(active.start + active.len - 1, DAYS.length - 1)]}` : ""}</p>
            <hr className={s.divider} />
            <div className={s.label}>Planned outfit</div>
            <p style={{ lineHeight: 1.7 }}>{active.outfit}</p>
            <div className={s.actions} style={{ marginTop: 24 }}>
              <button className={`${s.btn} ${s.btnDanger}`} onClick={() => { setEvs((l) => l.filter((e) => e.id !== active.id)); setActive(null); show("Event removed"); }}>Remove</button>
              <button className={s.btn} onClick={() => { setActive(null); show("Looks regenerated"); }}>Regenerate look</button>
            </div>
          </>
        )}
      </Modal>

      <Modal open={adding} onClose={() => setAdding(false)}>
        <h2 className={s.cardTitle} style={{ fontSize: "1.6rem" }}>Add event</h2>
        <form onSubmit={add}>
          <div className={s.field} style={{ marginTop: 20 }}>
            <label className={s.label} htmlFor="et">Title</label>
            <input id="et" autoFocus className={s.input} value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} placeholder="e.g. Wedding in Provence" />
          </div>
          <div className={s.grid2} style={{ gap: 16 }}>
            <div className={s.field}>
              <label className={s.label} htmlFor="es">Starts</label>
              <select id="es" className={s.select} value={draft.start} onChange={(e) => setDraft({ ...draft, start: Number(e.target.value) })}>
                {DAYS.map((d, i) => <option key={d} value={i}>{d}</option>)}
              </select>
            </div>
            <div className={s.field}>
              <label className={s.label} htmlFor="el">Days</label>
              <select id="el" className={s.select} value={draft.len} onChange={(e) => setDraft({ ...draft, len: Number(e.target.value) })}>
                {[1, 2, 3, 4, 5, 7].map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
          </div>
          <div className={s.field}>
            <label className={s.label} htmlFor="ek">Type</label>
            <select id="ek" className={s.select} value={draft.kind} onChange={(e) => setDraft({ ...draft, kind: e.target.value as Ev["kind"] })}>
              <option value="work">Work</option><option value="social">Social</option><option value="travel">Travel</option>
            </select>
          </div>
          <div className={s.actions}>
            <button type="button" className={`${s.btn} ${s.btnGhost}`} onClick={() => setAdding(false)}>Cancel</button>
            <button className={s.btn} type="submit" disabled={!draft.title.trim()}>Add event</button>
          </div>
        </form>
      </Modal>
      {toast}
    </div>
  );
}
