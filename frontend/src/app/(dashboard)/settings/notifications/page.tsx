"use client";

import { useState } from "react";
import { Toggle, useToast, ui as s } from "@/components/ui/ui";

type Channel = "email" | "push" | "inapp";
const GROUPS: { id: string; title: string; desc: string }[] = [
  { id: "looks", title: "Daily look", desc: "Your outfit suggestion each morning." },
  { id: "stylist", title: "Stylist messages", desc: "Replies from your concierge." },
  { id: "drops", title: "New arrivals", desc: "Pieces that complete a look you already own." },
  { id: "care", title: "Care reminders", desc: "Cleaning, repairs and seasonal storage." },
  { id: "billing", title: "Billing & security", desc: "Receipts, renewals and sign-in alerts." },
];

export default function NotificationSettings() {
  const [prefs, setPrefs] = useState<Record<string, Record<Channel, boolean>>>(() =>
    Object.fromEntries(GROUPS.map((g) => [g.id, { email: g.id !== "drops", push: true, inapp: true }]))
  );
  const [quiet, setQuiet] = useState(true);
  const [from, setFrom] = useState("22:00");
  const [to, setTo] = useState("07:00");
  const [toast, show] = useToast();

  const set = (id: string, ch: Channel, v: boolean) =>
    setPrefs((p) => ({ ...p, [id]: { ...p[id], [ch]: v } }));

  const all = (v: boolean) =>
    setPrefs(Object.fromEntries(GROUPS.map((g) => [g.id, { email: v, push: v, inapp: v }])));

  return (
    <div className={s.stack}>
      <section className={s.card}>
        <div className={s.between} style={{ marginBottom: 20 }}>
          <div>
            <h2 className={s.cardTitle}>What should we tell you?</h2>
            <p className={s.cardSub} style={{ marginBottom: 0 }}>Billing & security alerts can never be fully disabled.</p>
          </div>
          <div className={s.row}>
            <button className={`${s.btn} ${s.btnGhost} ${s.btnSm}`} onClick={() => all(true)}>Enable all</button>
            <button className={`${s.btn} ${s.btnGhost} ${s.btnSm}`} onClick={() => all(false)}>Mute all</button>
          </div>
        </div>

        <div className={s.tableWrap}>
          <table className={s.table}>
            <thead>
              <tr><th>Notification</th><th>Email</th><th>Push</th><th>In-app</th></tr>
            </thead>
            <tbody>
              {GROUPS.map((g) => (
                <tr key={g.id}>
                  <td>
                    <div className={s.settingTitle}>{g.title}</div>
                    <div className={s.settingDesc}>{g.desc}</div>
                  </td>
                  {(["email", "push", "inapp"] as Channel[]).map((ch) => (
                    <td key={ch}>
                      <Toggle
                        checked={prefs[g.id][ch]}
                        onChange={(v) => set(g.id, ch, v)}
                        label={`${g.title} via ${ch}`}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={s.card}>
        <div className={s.settingRow} style={{ paddingTop: 0 }}>
          <div>
            <div className={s.settingTitle}>Quiet hours</div>
            <div className={s.settingDesc}>Hold push notifications during these hours.</div>
          </div>
          <Toggle checked={quiet} onChange={setQuiet} label="Quiet hours" />
        </div>
        {quiet && (
          <div className={s.row} style={{ paddingTop: 8 }}>
            <div className={s.field} style={{ marginBottom: 0 }}>
              <label className={s.label} htmlFor="from">From</label>
              <input id="from" type="time" className={s.input} value={from} onChange={(e) => setFrom(e.target.value)} />
            </div>
            <div className={s.field} style={{ marginBottom: 0 }}>
              <label className={s.label} htmlFor="to">To</label>
              <input id="to" type="time" className={s.input} value={to} onChange={(e) => setTo(e.target.value)} />
            </div>
          </div>
        )}
        <div style={{ marginTop: 28 }}>
          <button className={s.btn} onClick={() => show("Notification preferences saved")}>Save preferences</button>
        </div>
      </section>
      {toast}
    </div>
  );
}
