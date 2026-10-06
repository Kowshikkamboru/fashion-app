"use client";

import { useState } from "react";
import { PageHeader, Modal, useToast, ui as s } from "@/components/ui/ui";

interface Rev { id: number; label: string; when: string; author: string; changes: string[]; }

const REVS: Rev[] = [
  { id: 5, label: "v5 · Current", when: "Today, 09:12", author: "You", changes: ["Swapped loafers → Chelsea boots", "Added pocket square"] },
  { id: 4, label: "v4", when: "Yesterday, 18:40", author: "Camille (Stylist)", changes: ["Changed shirt: white oxford → warm sand linen"] },
  { id: 3, label: "v3", when: "12 Apr, 11:05", author: "AI Stylist", changes: ["Regenerated for rain forecast", "Replaced suede loafers"] },
  { id: 2, label: "v2", when: "10 Apr, 08:30", author: "You", changes: ["Removed tie", "Rolled sleeves"] },
  { id: 1, label: "v1 · Original", when: "09 Apr, 21:14", author: "AI Stylist", changes: ["Initial look: Navy blazer, white oxford, charcoal flannels, suede loafers"] },
];

export default function HistoryPage() {
  const [revs, setRevs] = useState(REVS);
  const [sel, setSel] = useState<number[]>([]);
  const [restore, setRestore] = useState<Rev | null>(null);
  const [toast, show] = useToast();

  const toggle = (id: number) =>
    setSel((c) => (c.includes(id) ? c.filter((x) => x !== id) : c.length >= 2 ? [c[1], id] : [...c, id]));

  const doRestore = () => {
    if (!restore) return;
    const top = revs[0].id + 1;
    setRevs([{ id: top, label: `v${top} · Current`, when: "Just now", author: "You", changes: [`Restored from ${restore.label.split(" ·")[0]}`] }, ...revs.map((r, i) => (i === 0 ? { ...r, label: r.label.replace(" · Current", "") } : r))]);
    show(`Restored ${restore.label.split(" ·")[0]} as a new version`);
    setRestore(null);
    setSel([]);
  };

  const a = revs.find((r) => r.id === sel[0]);
  const b = revs.find((r) => r.id === sel[1]);

  return (
    <div className={s.pageNarrow}>
      <PageHeader eyebrow="Version history" title="Thursday client dinner" sub="Every revision of this look. Select two versions to compare, or restore any of them." />

      <ol style={{ listStyle: "none", padding: 0, margin: 0, borderLeft: "1px solid var(--bg-glass-border)", marginLeft: 8 }}>
        {revs.map((r, i) => (
          <li key={r.id} style={{ position: "relative", padding: "0 0 28px 28px" }}>
            <span style={{ position: "absolute", left: -6, top: 6, width: 11, height: 11, borderRadius: "50%", background: i === 0 ? "var(--text-primary)" : "var(--bg-primary)", border: "2px solid var(--text-primary)" }} />
            <div className={s.card} style={{ padding: 20, ...(sel.includes(r.id) ? { borderColor: "var(--text-primary)" } : {}) }}>
              <div className={`${s.between} ${s.wrap}`}>
                <div>
                  <strong>{r.label}</strong>
                  <div className={`${s.muted} ${s.small}`}>{r.when} · {r.author}</div>
                </div>
                <div className={s.row}>
                  <label className={s.row} style={{ gap: 8, cursor: "pointer", fontSize: "0.8rem" }}>
                    <input type="checkbox" checked={sel.includes(r.id)} onChange={() => toggle(r.id)} /> Compare
                  </label>
                  {i !== 0 && <button className={`${s.btn} ${s.btnGhost} ${s.btnSm}`} onClick={() => setRestore(r)}>Restore</button>}
                </div>
              </div>
              <ul style={{ margin: "14px 0 0", paddingLeft: 18, color: "var(--text-secondary)", lineHeight: 1.8, fontSize: "0.9rem" }}>
                {r.changes.map((c) => <li key={c}>{c}</li>)}
              </ul>
            </div>
          </li>
        ))}
      </ol>

      {a && b && (
        <div className={s.card} style={{ marginTop: 8 }}>
          <h2 className={s.cardTitle}>Comparing {a.label.split(" ·")[0]} and {b.label.split(" ·")[0]}</h2>
          <div className={s.grid2} style={{ marginTop: 16 }}>
            {[a, b].map((r) => (
              <div key={r.id}>
                <div className={s.label} style={{ marginBottom: 8 }}>{r.label}</div>
                {r.changes.map((c) => <p key={c} style={{ margin: "0 0 8px", fontSize: "0.9rem" }}>• {c}</p>)}
              </div>
            ))}
          </div>
        </div>
      )}

      <Modal open={!!restore} onClose={() => setRestore(null)}>
        <h2 className={s.cardTitle} style={{ fontSize: "1.6rem" }}>Restore {restore?.label.split(" ·")[0]}?</h2>
        <p className={s.cardSub}>This creates a new version. Nothing is deleted — you can return to the current look at any time.</p>
        <div className={s.actions}>
          <button className={`${s.btn} ${s.btnGhost}`} onClick={() => setRestore(null)}>Cancel</button>
          <button className={s.btn} onClick={doRestore}>Restore version</button>
        </div>
      </Modal>
      {toast}
    </div>
  );
}
