"use client";

import { useState } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
import { PageHeader, Modal, useToast, ui as s } from "@/components/ui/ui";

const INVOICES = [
  { id: "INV-2026-0412", date: "01 Apr 2026", amount: 29, status: "Paid" },
  { id: "INV-2026-0311", date: "01 Mar 2026", amount: 29, status: "Paid" },
  { id: "INV-2026-0209", date: "01 Feb 2026", amount: 29, status: "Paid" },
  { id: "INV-2026-0108", date: "01 Jan 2026", amount: 29, status: "Refunded" },
];

export default function BillingPage() {
  const [plan, setPlan] = useState<"Signature" | "Essentiel">("Signature");
  const [cancel, setCancel] = useState(false);
  const [reason, setReason] = useState("");
  const [card, setCard] = useState({ brand: "Visa", last4: "4242", exp: "08/28" });
  const [editing, setEditing] = useState(false);
  const [num, setNum] = useState("");
  const [toast, show] = useToast();

  const updateCard = (e: React.FormEvent) => {
    e.preventDefault();
    const digits = num.replace(/\D/g, "");
    if (digits.length < 12) return;
    setCard({ brand: digits.startsWith("4") ? "Visa" : "Mastercard", last4: digits.slice(-4), exp: card.exp });
    setEditing(false);
    setNum("");
    show("Payment method updated");
  };

  return (
    <div className={s.page}>
      <PageHeader eyebrow="Billing" title="Plan & payments" sub="Manage your membership, payment method and receipts." />

      <div className={s.grid2} style={{ alignItems: "start" }}>
        <section className={s.card}>
          <div className={s.between}>
            <div>
              <div className={s.statLabel}>Current plan</div>
              <div className={s.stat}>{plan}</div>
            </div>
            <span className={`${s.badge} ${plan === "Signature" ? s.badgeSolid : ""}`}>{plan === "Signature" ? "Active" : "Free"}</span>
          </div>
          <p className={s.cardSub} style={{ marginTop: 16 }}>
            {plan === "Signature" ? "€29 / month · renews on 1 May 2026" : "Upgrade for unlimited AI looks and the outfit planner."}
          </p>
          <div className={s.actions}>
            {plan === "Signature" ? (
              <>
                <Link href="/pricing" className={`${s.btn} ${s.btnGhost}`}>Change plan</Link>
                <button className={`${s.btn} ${s.btnDanger}`} onClick={() => setCancel(true)}>Cancel subscription</button>
              </>
            ) : (
              <Link href="/checkout?plan=signature&billing=monthly" className={s.btn}>Upgrade to Signature</Link>
            )}
          </div>
        </section>

        <section className={s.card}>
          <div className={s.statLabel}>Payment method</div>
          <div className={s.row} style={{ margin: "8px 0 20px" }}>
            <div className={s.emptyIcon} style={{ margin: 0, width: 52, height: 40 }}><Icon name="card" size={22} /></div>
            <div>
              <div className={s.settingTitle}>{card.brand} ending {card.last4}</div>
              <div className={s.settingDesc}>Expires {card.exp}</div>
            </div>
          </div>
          <button className={`${s.btn} ${s.btnGhost}`} onClick={() => setEditing(true)}>Update card</button>
        </section>
      </div>

      <h2 className={s.cardTitle} style={{ fontSize: "1.5rem", margin: "48px 0 16px" }}>Invoice history</h2>
      <div className={s.tableWrap}>
        <table className={s.table}>
          <thead><tr><th>Invoice</th><th>Date</th><th>Amount</th><th>Status</th><th /></tr></thead>
          <tbody>
            {INVOICES.map((i) => (
              <tr key={i.id}>
                <td className={s.mono}>{i.id}</td>
                <td className={s.muted}>{i.date}</td>
                <td>€{i.amount.toFixed(2)}</td>
                <td><span className={`${s.badge} ${i.status === "Paid" ? s.badgeOk : s.badgeWarn}`}>{i.status}</span></td>
                <td style={{ textAlign: "right" }}>
                  <button className={`${s.btn} ${s.btnGhost} ${s.btnSm}`} onClick={() => show(`Downloading ${i.id}.pdf`)}><Icon name="download" size={14} /> PDF</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={cancel} onClose={() => setCancel(false)}>
        <h2 className={s.cardTitle} style={{ fontSize: "1.6rem" }}>We’re sorry to see you go</h2>
        <p className={s.cardSub}>You will keep Signature until 1 May 2026, then move to the free Essentiel plan. Your wardrobe stays yours.</p>
        <div className={s.field}>
          <label className={s.label} htmlFor="reason">Why are you leaving? (optional)</label>
          <select id="reason" className={s.select} value={reason} onChange={(e) => setReason(e.target.value)}>
            <option value="">Select a reason</option>
            <option>Too expensive</option><option>Not using it enough</option><option>Missing a feature</option><option>Other</option>
          </select>
        </div>
        <div className={s.actions}>
          <button className={s.btn} onClick={() => setCancel(false)}>Keep my plan</button>
          <button className={`${s.btn} ${s.btnDanger}`} onClick={() => { setPlan("Essentiel"); setCancel(false); show("Subscription cancelled"); }}>Confirm cancellation</button>
        </div>
      </Modal>

      <Modal open={editing} onClose={() => setEditing(false)}>
        <h2 className={s.cardTitle} style={{ fontSize: "1.6rem" }}>Update card</h2>
        <form onSubmit={updateCard}>
          <div className={s.field} style={{ marginTop: 20 }}>
            <label className={s.label} htmlFor="cn">Card number</label>
            <input id="cn" autoFocus inputMode="numeric" autoComplete="cc-number" className={s.input} placeholder="4242 4242 4242 4242" value={num} onChange={(e) => setNum(e.target.value.replace(/[^\d ]/g, "").slice(0, 19))} />
          </div>
          <div className={s.actions}>
            <button type="button" className={`${s.btn} ${s.btnGhost}`} onClick={() => setEditing(false)}>Cancel</button>
            <button type="submit" className={s.btn} disabled={num.replace(/\D/g, "").length < 12}>Save card</button>
          </div>
        </form>
      </Modal>
      {toast}
    </div>
  );
}
