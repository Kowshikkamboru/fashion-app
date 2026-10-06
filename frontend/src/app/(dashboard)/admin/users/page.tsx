"use client";

import { useMemo, useState } from "react";
import Icon from "@/components/Icon";
import { EmptyState, Modal, useToast, ui as s } from "@/components/ui/ui";

type Role = "Owner" | "Stylist" | "Member" | "Guest";
type Status = "Active" | "Invited" | "Suspended";
interface U { id: number; name: string; email: string; role: Role; status: Status; plan: string; joined: string; }

const SEED: U[] = [
  { id: 1, name: "Julien Marchetti", email: "julien@marchetti.co", role: "Owner", status: "Active", plan: "Maison", joined: "2025-01-14" },
  { id: 2, name: "Camille Rousseau", email: "camille@vastrie.com", role: "Stylist", status: "Active", plan: "Maison", joined: "2025-02-02" },
  { id: 3, name: "Arnav Kapoor", email: "arnav@kapoor.in", role: "Member", status: "Active", plan: "Signature", joined: "2025-03-19" },
  { id: 4, name: "Théo Lambert", email: "theo@lambert.fr", role: "Member", status: "Active", plan: "Signature", joined: "2025-05-07" },
  { id: 5, name: "Sofia Moretti", email: "sofia@moretti.it", role: "Member", status: "Invited", plan: "Essentiel", joined: "2025-08-21" },
  { id: 6, name: "Luca Bianchi", email: "luca@bianchi.it", role: "Member", status: "Suspended", plan: "Essentiel", joined: "2025-09-30" },
  { id: 7, name: "Élise Fontaine", email: "elise@fontaine.fr", role: "Stylist", status: "Active", plan: "Maison", joined: "2025-10-11" },
  { id: 8, name: "Rohan Mehta", email: "rohan@mehta.in", role: "Member", status: "Active", plan: "Signature", joined: "2025-11-03" },
  { id: 9, name: "Hugo Laurent", email: "hugo@laurent.fr", role: "Guest", status: "Invited", plan: "—", joined: "2026-01-09" },
  { id: 10, name: "Nina Petrova", email: "nina@petrova.eu", role: "Member", status: "Active", plan: "Signature", joined: "2026-02-18" },
  { id: 11, name: "Marc Dubois", email: "marc@dubois.fr", role: "Member", status: "Active", plan: "Essentiel", joined: "2026-03-05" },
  { id: 12, name: "Isabelle Roy", email: "isabelle@roy.ca", role: "Member", status: "Active", plan: "Signature", joined: "2026-03-27" },
];

const PAGE = 6;
type SortKey = "name" | "role" | "status" | "joined";

export default function UsersPage() {
  const [users, setUsers] = useState(SEED);
  const [q, setQ] = useState("");
  const [role, setRole] = useState<"All" | Role>("All");
  const [sort, setSort] = useState<{ key: SortKey; dir: 1 | -1 }>({ key: "name", dir: 1 });
  const [page, setPage] = useState(1);
  const [sel, setSel] = useState<Set<number>>(new Set());
  const [invite, setInvite] = useState(false);
  const [inv, setInv] = useState({ email: "", role: "Member" as Role });
  const [toast, show] = useToast();

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    return users
      .filter((u) => (role === "All" || u.role === role) && (!t || u.name.toLowerCase().includes(t) || u.email.toLowerCase().includes(t)))
      .sort((a, b) => (a[sort.key] > b[sort.key] ? 1 : a[sort.key] < b[sort.key] ? -1 : 0) * sort.dir);
  }, [users, q, role, sort]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE));
  const cur = Math.min(page, pages);
  const rows = filtered.slice((cur - 1) * PAGE, cur * PAGE);
  const allOnPage = rows.length > 0 && rows.every((r) => sel.has(r.id));

  const toggleSort = (key: SortKey) => setSort((p) => ({ key, dir: p.key === key ? (p.dir === 1 ? -1 : 1) : 1 }));
  const arrow = (k: SortKey) => (sort.key === k ? (sort.dir === 1 ? " ↑" : " ↓") : "");

  const bulk = (status: Status) => {
    setUsers((u) => u.map((r) => (sel.has(r.id) && r.role !== "Owner" ? { ...r, status } : r)));
    show(`${sel.size} user${sel.size > 1 ? "s" : ""} ${status === "Suspended" ? "suspended" : "reactivated"}`);
    setSel(new Set());
  };

  const sendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(inv.email)) return;
    setUsers((u) => [{ id: Date.now(), name: inv.email.split("@")[0], email: inv.email, role: inv.role, status: "Invited", plan: "—", joined: new Date().toISOString().slice(0, 10) }, ...u]);
    setInvite(false);
    setInv({ email: "", role: "Member" });
    show("Invitation sent");
  };

  const statusBadge = (st: Status) => (st === "Active" ? s.badgeOk : st === "Invited" ? s.badgeWarn : s.badgeBad);

  return (
    <div className={s.stack}>
      <div className={`${s.between} ${s.wrap}`}>
        <div className={s.row} style={{ flexWrap: "wrap" }}>
          <input aria-label="Search users" className={s.input} style={{ width: 260 }} placeholder="Search name or email…" value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} />
          {(["All", "Owner", "Stylist", "Member", "Guest"] as const).map((r) => (
            <button key={r} className={`${s.chip} ${role === r ? s.chipActive : ""}`} onClick={() => { setRole(r); setPage(1); }}>{r}</button>
          ))}
        </div>
        <button className={s.btn} onClick={() => setInvite(true)}><Icon name="plus" size={16} /> Invite user</button>
      </div>

      {sel.size > 0 && (
        <div className={s.card} style={{ padding: "14px 20px" }}>
          <div className={s.between}>
            <strong>{sel.size} selected</strong>
            <div className={s.row}>
              <button className={`${s.btn} ${s.btnGhost} ${s.btnSm}`} onClick={() => bulk("Active")}>Reactivate</button>
              <button className={`${s.btn} ${s.btnDanger} ${s.btnSm}`} onClick={() => bulk("Suspended")}>Suspend</button>
              <button className={`${s.btn} ${s.btnGhost} ${s.btnSm}`} onClick={() => setSel(new Set())}>Clear</button>
            </div>
          </div>
        </div>
      )}

      {filtered.length === 0 ? (
        <EmptyState icon="search" title="No users match" text="Try a different search term or clear the role filter.">
          <button className={`${s.btn} ${s.btnGhost}`} onClick={() => { setQ(""); setRole("All"); }}>Clear filters</button>
        </EmptyState>
      ) : (
        <div className={s.tableWrap}>
          <table className={s.table}>
            <thead>
              <tr>
                <th style={{ width: 44 }}>
                  <input type="checkbox" aria-label="Select all on page" checked={allOnPage} onChange={() => {
                    const n = new Set(sel);
                    rows.forEach((r) => (allOnPage ? n.delete(r.id) : n.add(r.id)));
                    setSel(n);
                  }} />
                </th>
                <th className={s.thSort} onClick={() => toggleSort("name")}>User{arrow("name")}</th>
                <th className={s.thSort} onClick={() => toggleSort("role")}>Role{arrow("role")}</th>
                <th className={s.thSort} onClick={() => toggleSort("status")}>Status{arrow("status")}</th>
                <th>Plan</th>
                <th className={s.thSort} onClick={() => toggleSort("joined")}>Joined{arrow("joined")}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((u) => (
                <tr key={u.id}>
                  <td><input type="checkbox" aria-label={`Select ${u.name}`} checked={sel.has(u.id)} onChange={() => { const n = new Set(sel); n.has(u.id) ? n.delete(u.id) : n.add(u.id); setSel(n); }} /></td>
                  <td>
                    <div className={s.row}>
                      <span className={s.avatar}>{u.name[0]}</span>
                      <div><div style={{ fontWeight: 500 }}>{u.name}</div><div className={`${s.muted} ${s.small}`}>{u.email}</div></div>
                    </div>
                  </td>
                  <td>
                    <select className={s.select} style={{ width: 120, padding: "6px 8px" }} aria-label={`Role for ${u.name}`} value={u.role} disabled={u.role === "Owner"}
                      onChange={(e) => { setUsers((l) => l.map((r) => (r.id === u.id ? { ...r, role: e.target.value as Role } : r))); show("Role updated"); }}>
                      {["Owner", "Stylist", "Member", "Guest"].map((r) => <option key={r}>{r}</option>)}
                    </select>
                  </td>
                  <td><span className={`${s.badge} ${statusBadge(u.status)}`}>{u.status}</span></td>
                  <td className={s.muted}>{u.plan}</td>
                  <td className={s.muted}>{new Date(u.joined).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className={s.between}>
        <span className={`${s.muted} ${s.small}`}>Showing {rows.length ? (cur - 1) * PAGE + 1 : 0}–{(cur - 1) * PAGE + rows.length} of {filtered.length}</span>
        <div className={s.row}>
          <button className={`${s.btn} ${s.btnGhost} ${s.btnSm}`} disabled={cur === 1} onClick={() => setPage(cur - 1)}>Previous</button>
          <span className={s.small}>{cur} / {pages}</span>
          <button className={`${s.btn} ${s.btnGhost} ${s.btnSm}`} disabled={cur === pages} onClick={() => setPage(cur + 1)}>Next</button>
        </div>
      </div>

      <Modal open={invite} onClose={() => setInvite(false)}>
        <h2 className={s.cardTitle} style={{ fontSize: "1.6rem" }}>Invite a user</h2>
        <form onSubmit={sendInvite}>
          <div className={s.field} style={{ marginTop: 20 }}>
            <label className={s.label} htmlFor="ie">Email</label>
            <input id="ie" type="email" autoFocus className={s.input} value={inv.email} onChange={(e) => setInv({ ...inv, email: e.target.value })} placeholder="name@company.com" />
          </div>
          <div className={s.field}>
            <label className={s.label} htmlFor="ir">Role</label>
            <select id="ir" className={s.select} value={inv.role} onChange={(e) => setInv({ ...inv, role: e.target.value as Role })}>
              {["Stylist", "Member", "Guest"].map((r) => <option key={r}>{r}</option>)}
            </select>
          </div>
          <div className={s.actions}>
            <button type="button" className={`${s.btn} ${s.btnGhost}`} onClick={() => setInvite(false)}>Cancel</button>
            <button className={s.btn} type="submit" disabled={!/^\S+@\S+\.\S+$/.test(inv.email)}>Send invite</button>
          </div>
        </form>
      </Modal>
      {toast}
    </div>
  );
}
