"use client";

import Link from "next/link";
import Icon from "@/components/Icon";
import { ui as s } from "@/components/ui/ui";
import x from "@/components/ui/screens.module.css";

const KPIS = [
  { label: "Active members", value: "4,182", delta: "+6.2%", up: true },
  { label: "MRR", value: "€71.4k", delta: "+3.9%", up: true },
  { label: "Churn (30d)", value: "1.8%", delta: "-0.4%", up: true },
  { label: "Open tickets", value: "17", delta: "+5", up: false },
];

const WEEK = [62, 78, 71, 90, 84, 55, 48];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const SERVICES = [
  { name: "AI stylist engine", status: "Operational" },
  { name: "Image processing", status: "Operational" },
  { name: "Payments", status: "Operational" },
  { name: "Notifications", status: "Degraded" },
];

export default function AdminOverview() {
  return (
    <div className={s.stack}>
      <div className={s.grid4}>
        {KPIS.map((k) => (
          <div key={k.label} className={s.card}>
            <div className={s.statLabel}>{k.label}</div>
            <div className={s.stat}>{k.value}</div>
            <div className={`${s.delta} ${k.up ? s.up : s.down}`}>{k.delta} vs last month</div>
          </div>
        ))}
      </div>

      <div className={s.grid2} style={{ alignItems: "stretch" }}>
        <div className={s.card}>
          <h2 className={s.cardTitle}>Sign-ins this week</h2>
          <p className={s.cardSub}>Daily active members.</p>
          <div className={x.bars} role="img" aria-label="Bar chart of daily active members">
            {WEEK.map((v, i) => (
              <div key={DAYS[i]} className={x.barCol}>
                <div className={x.bar} style={{ height: `${v}%` }} title={`${DAYS[i]}: ${v * 40}`} />
                <span>{DAYS[i]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={s.card}>
          <h2 className={s.cardTitle}>System health</h2>
          <p className={s.cardSub}>Live status of core services.</p>
          {SERVICES.map((sv) => (
            <div key={sv.name} className={s.settingRow}>
              <span>{sv.name}</span>
              <span className={`${s.badge} ${sv.status === "Operational" ? s.badgeOk : s.badgeWarn}`}>{sv.status}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={s.grid3}>
        {[
          { href: "/admin/users", icon: "users" as const, t: "Manage users", d: "Invite, change roles, suspend." },
          { href: "/admin/audit-log", icon: "clipboard" as const, t: "Review audit log", d: "Every privileged action, recorded." },
          { href: "/maintenance", icon: "wrench" as const, t: "Maintenance mode", d: "Preview the downtime screen." },
        ].map((l) => (
          <Link key={l.href} href={l.href} className={`${s.card} ${s.cardClickable}`}>
            <Icon name={l.icon} size={22} />
            <h3 className={s.cardTitle} style={{ marginTop: 16 }}>{l.t}</h3>
            <p className={s.cardSub} style={{ marginBottom: 0 }}>{l.d}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
