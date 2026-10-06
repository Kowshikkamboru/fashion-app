"use client";

import { Fragment, useMemo, useState } from "react";
import { EmptyState, ui as s } from "@/components/ui/ui";

const ACTIONS = ["Sign-in", "Role change", "Export", "Billing", "API key", "Delete"] as const;
type Action = (typeof ACTIONS)[number];

const LOG: { id: number; when: string; actor: string; action: Action; target: string; ip: string; detail: string }[] = [
  { id: 1, when: "2026-04-18 09:12", actor: "julien@marchetti.co", action: "Sign-in", target: "Web session", ip: "88.121.4.19", detail: "Signed in from Paris, FR with 2FA." },
  { id: 2, when: "2026-04-18 08:47", actor: "camille@vastrie.com", action: "Role change", target: "luca@bianchi.it", ip: "92.184.10.3", detail: "Member → Suspended." },
  { id: 3, when: "2026-04-17 17:30", actor: "arnav@kapoor.in", action: "API key", target: "vstr_live_k3x9", ip: "103.21.58.2", detail: "Created key “Calendar sync” (Read)." },
  { id: 4, when: "2026-04-17 14:05", actor: "theo@lambert.fr", action: "Billing", target: "INV-2026-0412", detail: "Payment of €29.00 succeeded.", ip: "78.192.0.55" },
  { id: 5, when: "2026-04-16 11:22", actor: "julien@marchetti.co", action: "Export", target: "Full account", ip: "88.121.4.19", detail: "Requested full data export." },
  { id: 6, when: "2026-04-15 19:41", actor: "elise@fontaine.fr", action: "Sign-in", target: "Mobile app", ip: "90.4.12.88", detail: "Signed in from Lyon, FR." },
  { id: 7, when: "2026-04-14 10:08", actor: "camille@vastrie.com", action: "Delete", target: "Outfit #4821", ip: "92.184.10.3", detail: "Deleted outfit on behalf of member." },
  { id: 8, when: "2026-04-13 16:55", actor: "rohan@mehta.in", action: "Billing", target: "Plan", ip: "49.36.12.7", detail: "Upgraded Essentiel → Signature." },
];

export default function AuditLogPage() {
  const [q, setQ] = useState("");
  const [action, setAction] = useState<"All" | Action>("All");
  const [open, setOpen] = useState<number | null>(null);

  const rows = useMemo(() => {
    const t = q.trim().toLowerCase();
    return LOG.filter((r) => (action === "All" || r.action === action) && (!t || (r.actor + r.target + r.detail).toLowerCase().includes(t)));
  }, [q, action]);

  const csv = () => {
    const head = "when,actor,action,target,ip\n";
    const body = rows.map((r) => [r.when, r.actor, r.action, r.target, r.ip].join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([head + body], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "audit-log.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={s.stack}>
      <div className={`${s.between} ${s.wrap}`}>
        <div className={s.row} style={{ flexWrap: "wrap" }}>
          <input aria-label="Search audit log" className={s.input} style={{ width: 260 }} placeholder="Search actor, target…" value={q} onChange={(e) => setQ(e.target.value)} />
          {(["All", ...ACTIONS] as const).map((a) => (
            <button key={a} className={`${s.chip} ${action === a ? s.chipActive : ""}`} onClick={() => setAction(a)}>{a}</button>
          ))}
        </div>
        <button className={`${s.btn} ${s.btnGhost}`} onClick={csv}>Export CSV</button>
      </div>

      {rows.length === 0 ? (
        <EmptyState icon="clipboard" title="No matching events" text="No audit events match your filters." />
      ) : (
        <div className={s.tableWrap}>
          <table className={s.table}>
            <thead><tr><th>Time</th><th>Actor</th><th>Action</th><th>Target</th><th>IP</th></tr></thead>
            <tbody>
              {rows.map((r) => (
                <Fragment key={r.id}>
                  <tr onClick={() => setOpen(open === r.id ? null : r.id)} style={{ cursor: "pointer" }} aria-expanded={open === r.id}>
                    <td className={`${s.mono} ${s.muted}`}>{r.when}</td>
                    <td>{r.actor}</td>
                    <td><span className={s.badge}>{r.action}</span></td>
                    <td>{r.target}</td>
                    <td className={`${s.mono} ${s.muted}`}>{r.ip}</td>
                  </tr>
                  {open === r.id && (
                    <tr key={`${r.id}-d`}>
                      <td colSpan={5} style={{ background: "var(--bg-primary)" }}>
                        <span className={s.muted}>Details — </span>{r.detail}
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p className={`${s.hint}`}>Click a row for details. Entries are immutable and retained for 400 days.</p>
    </div>
  );
}
