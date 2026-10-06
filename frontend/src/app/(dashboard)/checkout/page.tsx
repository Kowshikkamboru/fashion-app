"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Icon from "@/components/Icon";
import { PageHeader, ui as s } from "@/components/ui/ui";
import { PLANS } from "@/content/home";

const STEPS = ["Details", "Payment", "Confirm"];
const luhn = (n: string) => {
  let sum = 0;
  let alt = false;
  for (let i = n.length - 1; i >= 0; i--) {
    let d = parseInt(n[i], 10);
    if (alt) { d *= 2; if (d > 9) d -= 9; }
    sum += d;
    alt = !alt;
  }
  return n.length >= 13 && sum % 10 === 0;
};

function CheckoutInner() {
  const params = useSearchParams();
  const planId = params.get("plan") ?? "signature";
  const billing = params.get("billing") === "yearly" ? "yearly" : "monthly";
  const plan = PLANS.find((p) => p.id === planId) ?? PLANS[1];
  const price = billing === "yearly" ? plan.yearly : plan.monthly;

  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [paying, setPaying] = useState(false);
  const [promo, setPromo] = useState("");
  const [promoState, setPromoState] = useState<"idle" | "ok" | "bad">("idle");
  const [f, setF] = useState({ name: "", email: "", country: "France", card: "", exp: "", cvc: "" });
  const [errs, setErrs] = useState<Record<string, string>>({});

  const discount = promoState === "ok" ? Math.round(price * 0.1) : 0;
  const vat = Math.round((price - discount) * 0.2 * 100) / 100;
  const total = price - discount + vat;

  const set = (k: keyof typeof f, v: string) => setF((p) => ({ ...p, [k]: v }));

  const applyPromo = () => setPromoState(promo.trim().toUpperCase() === "ATELIER10" ? "ok" : "bad");

  const validate = useMemo(
    () => ({
      0: () => {
        const e: Record<string, string> = {};
        if (f.name.trim().length < 2) e.name = "Enter your full name.";
        if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = "Enter a valid email address.";
        return e;
      },
      1: () => {
        const e: Record<string, string> = {};
        if (!luhn(f.card.replace(/\s/g, ""))) e.card = "That card number doesn’t look right.";
        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(f.exp)) e.exp = "Use MM/YY.";
        if (!/^\d{3,4}$/.test(f.cvc)) e.cvc = "3 or 4 digits.";
        return e;
      },
    }),
    [f]
  );

  const next = () => {
    if (step < 2) {
      const e = validate[step as 0 | 1]();
      setErrs(e);
      if (Object.keys(e).length) return;
      setStep(step + 1);
    }
  };

  const pay = () => {
    setPaying(true);
    setTimeout(() => { setPaying(false); setDone(true); }, 1400);
  };

  if (done) {
    return (
      <div className={s.pageNarrow}>
        <div className={s.empty}>
          <div className={s.emptyIcon}><Icon name="check" size={28} /></div>
          <h1 className={s.emptyTitle}>Welcome to {plan.name}</h1>
          <p className={s.emptyText}>A receipt has been sent to {f.email}. Your atelier is ready.</p>
          <div className={s.actions}>
            <Link href="/dashboard" className={s.btn}>Go to dashboard</Link>
            <Link href="/onboarding" className={`${s.btn} ${s.btnGhost}`}>Start onboarding</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={s.page}>
      <PageHeader eyebrow="Secure checkout" title={`Join ${plan.name}`} sub={`${billing === "yearly" ? "Billed yearly" : "Billed monthly"}. Cancel any time.`} />

      <ol style={{ display: "flex", gap: 8, listStyle: "none", padding: 0, margin: "0 0 32px" }} aria-label="Checkout progress">
        {STEPS.map((l, i) => (
          <li key={l} style={{ flex: 1 }}>
            <div className={s.progress}><div className={s.progressBar} style={{ width: i <= step ? "100%" : "0%" }} /></div>
            <div className={s.label} style={{ marginTop: 10, color: i <= step ? "var(--text-primary)" : undefined }}>{i + 1}. {l}</div>
          </li>
        ))}
      </ol>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.5fr) minmax(0,1fr)", gap: 32, alignItems: "start" }} className="checkoutGrid">
        <div className={s.card}>
          {step === 0 && (
            <>
              <h2 className={s.cardTitle}>Your details</h2>
              <p className={s.cardSub}>We’ll send your receipt here.</p>
              <div className={s.field}>
                <label className={s.label} htmlFor="n">Full name</label>
                <input id="n" autoComplete="name" className={`${s.input} ${errs.name ? s.inputError : ""}`} value={f.name} onChange={(e) => set("name", e.target.value)} />
                {errs.name && <span className={s.errorText} role="alert">{errs.name}</span>}
              </div>
              <div className={s.field}>
                <label className={s.label} htmlFor="e">Email</label>
                <input id="e" type="email" autoComplete="email" className={`${s.input} ${errs.email ? s.inputError : ""}`} value={f.email} onChange={(e) => set("email", e.target.value)} />
                {errs.email && <span className={s.errorText} role="alert">{errs.email}</span>}
              </div>
              <div className={s.field}>
                <label className={s.label} htmlFor="c">Country</label>
                <select id="c" className={s.select} value={f.country} onChange={(e) => set("country", e.target.value)}>
                  {["France", "Italy", "United Kingdom", "United States", "India", "Germany"].map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <h2 className={s.cardTitle}>Payment</h2>
              <p className={s.cardSub}><Icon name="lock" size={14} style={{ verticalAlign: "-2px" }} /> Encrypted and processed securely. Try 4242 4242 4242 4242.</p>
              <div className={s.field}>
                <label className={s.label} htmlFor="cc">Card number</label>
                <input id="cc" inputMode="numeric" autoComplete="cc-number" placeholder="4242 4242 4242 4242" className={`${s.input} ${errs.card ? s.inputError : ""}`} value={f.card}
                  onChange={(e) => set("card", e.target.value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim())} />
                {errs.card && <span className={s.errorText} role="alert">{errs.card}</span>}
              </div>
              <div className={s.grid2} style={{ gap: 16 }}>
                <div className={s.field}>
                  <label className={s.label} htmlFor="ex">Expiry</label>
                  <input id="ex" placeholder="MM/YY" autoComplete="cc-exp" className={`${s.input} ${errs.exp ? s.inputError : ""}`} value={f.exp}
                    onChange={(e) => { let v = e.target.value.replace(/[^\d]/g, "").slice(0, 4); if (v.length > 2) v = v.slice(0, 2) + "/" + v.slice(2); set("exp", v); }} />
                  {errs.exp && <span className={s.errorText} role="alert">{errs.exp}</span>}
                </div>
                <div className={s.field}>
                  <label className={s.label} htmlFor="cv">CVC</label>
                  <input id="cv" inputMode="numeric" autoComplete="cc-csc" className={`${s.input} ${errs.cvc ? s.inputError : ""}`} value={f.cvc} onChange={(e) => set("cvc", e.target.value.replace(/\D/g, "").slice(0, 4))} />
                  {errs.cvc && <span className={s.errorText} role="alert">{errs.cvc}</span>}
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className={s.cardTitle}>Review & confirm</h2>
              <dl className={s.kv} style={{ margin: "20px 0 28px" }}>
                <dt>Plan</dt><dd>{plan.name} ({billing})</dd>
                <dt>Name</dt><dd>{f.name}</dd>
                <dt>Email</dt><dd>{f.email}</dd>
                <dt>Card</dt><dd>•••• {f.card.replace(/\s/g, "").slice(-4)}</dd>
              </dl>
              <p className={s.hint}>By confirming, you agree to the membership terms. You can cancel from Billing at any time.</p>
            </>
          )}

          <div className={s.actions} style={{ marginTop: 28 }}>
            {step > 0 && <button className={`${s.btn} ${s.btnGhost}`} onClick={() => setStep(step - 1)} disabled={paying}>Back</button>}
            {step < 2 ? (
              <button className={s.btn} onClick={next}>Continue</button>
            ) : (
              <button className={s.btn} onClick={pay} disabled={paying}>{paying ? "Processing…" : `Pay €${total.toFixed(2)}`}</button>
            )}
          </div>
        </div>

        <aside className={s.card} aria-label="Order summary">
          <h2 className={s.cardTitle}>Order summary</h2>
          <div className={s.settingRow}><span>{plan.name} · {billing}</span><span>€{price.toFixed(2)}</span></div>
          {discount > 0 && <div className={s.settingRow}><span className={s.up}>Promo ATELIER10</span><span className={s.up}>−€{discount.toFixed(2)}</span></div>}
          <div className={s.settingRow}><span className={s.muted}>VAT (20%)</span><span>€{vat.toFixed(2)}</span></div>
          <div className={s.settingRow}><strong>Total today</strong><strong>€{total.toFixed(2)}</strong></div>

          <div className={s.field} style={{ marginTop: 20, marginBottom: 0 }}>
            <label className={s.label} htmlFor="promo">Promo code</label>
            <div className={s.row}>
              <input id="promo" className={`${s.input} ${promoState === "bad" ? s.inputError : ""}`} value={promo} onChange={(e) => { setPromo(e.target.value); setPromoState("idle"); }} placeholder="ATELIER10" />
              <button className={`${s.btn} ${s.btnGhost}`} onClick={applyPromo} disabled={!promo.trim()}>Apply</button>
            </div>
            {promoState === "ok" && <span className={s.up} style={{ fontSize: "0.8rem" }}>10% discount applied.</span>}
            {promoState === "bad" && <span className={s.errorText} role="alert">That code isn’t valid.</span>}
          </div>
        </aside>
      </div>
      <style>{`@media (max-width: 900px){ .checkoutGrid{ grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={null}>
      <CheckoutInner />
    </Suspense>
  );
}
