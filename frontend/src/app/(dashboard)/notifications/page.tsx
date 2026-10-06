"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Icon, { IconName } from "@/components/Icon";
import { EmptyState, PageHeader, ui as s } from "@/components/ui/ui";

interface N { id: number; icon: IconName; title: string; text: string; when: string; read: boolean; href: string; kind: "look" | "stylist" | "care" | "billing"; }

const SEED: N[] = [
  { id: 1, icon: "sparkle", title: "Your look for Thursday is ready", text: "Navy double-breasted blazer with charcoal flannels for the client dinner.", when: "12 min ago", read: false, href: "/outfits", kind: "look" },
  { id: 2, icon: "chat", title: "Camille replied", text: "“Swap the loafers for the Chelsea boots — rain is forecast.”", when: "1 hour ago", read: false, href: "/concierge", kind: "stylist" },
  { id: 3, icon: "wrench", title: "Care reminder", text: "Your cashmere crewneck has been worn 6 times. Time to hand-wash.", when: "Yesterday", read: false, href: "/wardrobe/3", kind: "care" },
  { id: 4, icon: "card", title: "Payment received", text: "€29.00 for Signature · INV-2026-0412.", when: "3 days ago", read: true, href: "/billing", kind: "billing" },
  { id: 5, icon: "shirt", title: "New piece suggested", text: "A stone chino would complete 4 looks you already own.", when: "5 days ago", read: true, href: "/discover", kind: "look" },
];

function Inner() {
  const params = useSearchParams();
  const [items, setItems] = useState<N[]>(params.get("empty") === "1" ? [] : SEED);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const shown = items.filter((n) => filter === "all" || !n.read);
  const unread = items.filter((n) => !n.read).length;

  return (
    <div className={s.pageNarrow}>
      <PageHeader eyebrow="Notifications" title="Inbox" sub={unread ? `${unread} unread` : "You’re all caught up."}>
        <button className={`${s.btn} ${s.btnGhost}`} onClick={() => setItems((l) => l.map((n) => ({ ...n, read: true })))} disabled={!unread}>Mark all read</button>
        <button className={`${s.btn} ${s.btnGhost}`} onClick={() => setItems([])} disabled={!items.length}>Clear all</button>
      </PageHeader>

      <div className={s.row} style={{ marginBottom: 24 }}>
        <button className={`${s.chip} ${filter === "all" ? s.chipActive : ""}`} onClick={() => setFilter("all")}>All</button>
        <button className={`${s.chip} ${filter === "unread" ? s.chipActive : ""}`} onClick={() => setFilter("unread")}>Unread ({unread})</button>
        <Link href="/settings/notifications" className={s.chip} style={{ marginLeft: "auto" }}><Icon name="gear" size={14} /> Preferences</Link>
      </div>

      {shown.length === 0 ? (
        <EmptyState
          icon="bell"
          title={items.length === 0 ? "Nothing here yet" : "No unread notifications"}
          text={items.length === 0 ? "When your stylist sends a look or a care reminder is due, it will appear here." : "Switch back to All to review earlier notifications."}
        >
          {items.length === 0 ? (
            <Link href="/outfits" className={s.btn}>Generate your first look</Link>
          ) : (
            <button className={`${s.btn} ${s.btnGhost}`} onClick={() => setFilter("all")}>Show all</button>
          )}
        </EmptyState>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
          {shown.map((n) => (
            <li key={n.id} className={s.card} style={{ padding: 20, display: "flex", gap: 16, alignItems: "flex-start", borderLeft: n.read ? undefined : "3px solid var(--text-primary)" }}>
              <div className={s.emptyIcon} style={{ margin: 0, width: 44, height: 44, flexShrink: 0 }}><Icon name={n.icon} size={20} /></div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className={s.between}>
                  <strong style={{ fontWeight: n.read ? 500 : 700 }}>{n.title}</strong>
                  <span className={`${s.muted} ${s.small}`} style={{ whiteSpace: "nowrap" }}>{n.when}</span>
                </div>
                <p className={s.muted} style={{ margin: "6px 0 12px", lineHeight: 1.6, fontSize: "0.9rem" }}>{n.text}</p>
                <div className={s.row}>
                  <Link href={n.href} className={`${s.btn} ${s.btnSm}`} onClick={() => setItems((l) => l.map((k) => (k.id === n.id ? { ...k, read: true } : k)))}>Open</Link>
                  {!n.read && <button className={`${s.btn} ${s.btnGhost} ${s.btnSm}`} onClick={() => setItems((l) => l.map((k) => (k.id === n.id ? { ...k, read: true } : k)))}>Mark read</button>}
                  <button className={s.iconBtn} aria-label="Dismiss" onClick={() => setItems((l) => l.filter((k) => k.id !== n.id))}><Icon name="close" size={14} /></button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function NotificationsPage() {
  return (
    <Suspense fallback={null}>
      <Inner />
    </Suspense>
  );
}
