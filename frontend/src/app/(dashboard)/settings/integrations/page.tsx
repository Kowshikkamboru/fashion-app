"use client";

import { useState } from "react";
import Icon, { IconName } from "@/components/Icon";
import { useToast, ui as s } from "@/components/ui/ui";

const INITIAL: { id: string; name: string; desc: string; icon: IconName; connected: boolean }[] = [
  { id: "calendar", name: "Calendar", desc: "Reads events so outfits are planned around your day.", icon: "calendar", connected: true },
  { id: "weather", name: "Weather", desc: "Live forecasts for accurate, climate-aware looks.", icon: "globe", connected: true },
  { id: "photos", name: "Photo library", desc: "Import garments straight from your camera roll.", icon: "camera", connected: false },
  { id: "retail", name: "Retailer receipts", desc: "Auto-add purchases from order confirmation emails.", icon: "mail", connected: false },
  { id: "wallet", name: "Apple / Google Wallet", desc: "Pass for in-store personal shopping appointments.", icon: "card", connected: false },
  { id: "phone", name: "Mobile app", desc: "Sync wardrobe and looks to your phone.", icon: "phone", connected: true },
];

export default function IntegrationsPage() {
  const [items, setItems] = useState(INITIAL);
  const [busy, setBusy] = useState<string | null>(null);
  const [toast, show] = useToast();

  const toggle = (id: string) => {
    setBusy(id);
    setTimeout(() => {
      setItems((list) =>
        list.map((i) => {
          if (i.id !== id) return i;
          show(i.connected ? `${i.name} disconnected` : `${i.name} connected`);
          return { ...i, connected: !i.connected };
        })
      );
      setBusy(null);
    }, 700);
  };

  return (
    <>
      <div className={s.grid3}>
        {items.map((i) => (
          <article key={i.id} className={s.card}>
            <div className={s.between} style={{ marginBottom: 20 }}>
              <div className={s.emptyIcon} style={{ margin: 0 }}><Icon name={i.icon} size={22} /></div>
              <span className={`${s.badge} ${i.connected ? s.badgeOk : ""}`}>{i.connected ? "Connected" : "Available"}</span>
            </div>
            <h2 className={s.cardTitle}>{i.name}</h2>
            <p className={s.cardSub}>{i.desc}</p>
            <button
              className={`${s.btn} ${i.connected ? s.btnGhost : ""} ${s.btnSm}`}
              onClick={() => toggle(i.id)}
              disabled={busy === i.id}
            >
              {busy === i.id ? "Working…" : i.connected ? "Disconnect" : "Connect"}
            </button>
          </article>
        ))}
      </div>
      {toast}
    </>
  );
}
