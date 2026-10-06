"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
import { PageHeader, ui as s } from "@/components/ui/ui";

const STEPS = ["Fit", "Palette", "Lifestyle", "Budget", "Review"] as const;
const PALETTES = ["Navy & grey", "Earth tones", "Monochrome", "Soft neutrals", "Rich jewel tones"];
const LIFE = ["Corporate", "Creative", "Travel-heavy", "Social & evenings", "Relaxed / remote"];
const KEY = "vastrie_style_profile";

interface Data { fit: string; height: string; palette: string[]; life: string[]; budget: number; notes: string; }
const EMPTY: Data = { fit: "", height: "", palette: [], life: [], budget: 500, notes: "" };

export default function StyleProfilePage() {
  const [step, setStep] = useState(0);
  const [d, setD] = useState<Data>(EMPTY);
  const [err, setErr] = useState("");
  const [done, setDone] = useState(false);

  // Progress is saved so the form can be resumed.
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) ?? "null");
      if (saved) { setD(saved.d); setStep(saved.step ?? 0); }
    } catch { /* ignore */ }
  }, []);
  useEffect(() => { localStorage.setItem(KEY, JSON.stringify({ d, step })); }, [d, step]);

  const toggleIn = (k: "palette" | "life", v: string) =>
    setD((p) => ({ ...p, [k]: p[k].includes(v) ? p[k].filter((x) => x !== v) : [...p[k], v] }));

  const validate = () => {
    if (step === 0 && (!d.fit || !/^\d{3}$/.test(d.height))) return "Choose your fit and enter your height in cm.";
    if (step === 1 && d.palette.length === 0) return "Pick at least one palette.";
    if (step === 2 && d.life.length === 0) return "Pick at least one lifestyle.";
    return "";
  };

  const next = () => {
    const e = validate();
    setErr(e);
    if (!e) setStep((n) => n + 1);
  };

  if (done) {
    return (
      <div className={s.pageNarrow}>
        <div className={s.empty}>
          <div className={s.emptyIcon}><Icon name="check" size={28} /></div>
          <h1 className={s.emptyTitle}>Style profile saved</h1>
          <p className={s.emptyText}>Your recommendations are already being tuned to your {d.palette[0]?.toLowerCase()} palette.</p>
          <div className={s.actions}>
            <Link href="/outfits" className={s.btn}>See my looks</Link>
            <Link href="/onboarding" className={`${s.btn} ${s.btnGhost}`}>Back to onboarding</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={s.pageNarrow}>
      <PageHeader eyebrow={`Step ${step + 1} of ${STEPS.length}`} title="Your style profile" sub="Progress is saved automatically — you can leave and return any time." />

      <ol style={{ display: "flex", gap: 8, listStyle: "none", padding: 0, margin: "0 0 28px" }} aria-label="Progress">
        {STEPS.map((l, i) => (
          <li key={l} style={{ flex: 1 }}>
            <div className={s.progress}><div className={s.progressBar} style={{ width: i <= step ? "100%" : "0" }} /></div>
            <div className={s.label} style={{ marginTop: 8, color: i === step ? "var(--text-primary)" : undefined }}>{l}</div>
          </li>
        ))}
      </ol>

      <div className={s.card}>
        {step === 0 && (
          <>
            <h2 className={s.cardTitle}>How do you like clothes to fit?</h2>
            <div className={s.row} style={{ flexWrap: "wrap", margin: "20px 0" }}>
              {["Slim", "Tailored", "Relaxed", "Oversized"].map((f) => (
                <button key={f} className={`${s.chip} ${d.fit === f ? s.chipActive : ""}`} onClick={() => setD({ ...d, fit: f })} aria-pressed={d.fit === f}>{f}</button>
              ))}
            </div>
            <div className={s.field} style={{ maxWidth: 220 }}>
              <label className={s.label} htmlFor="h">Height (cm)</label>
              <input id="h" inputMode="numeric" className={s.input} value={d.height} onChange={(e) => setD({ ...d, height: e.target.value.replace(/\D/g, "").slice(0, 3) })} placeholder="182" />
            </div>
          </>
        )}
        {step === 1 && (
          <>
            <h2 className={s.cardTitle}>Which palettes feel like you?</h2>
            <p className={s.cardSub}>Choose all that apply.</p>
            <div className={s.row} style={{ flexWrap: "wrap" }}>
              {PALETTES.map((p) => (
                <button key={p} className={`${s.chip} ${d.palette.includes(p) ? s.chipActive : ""}`} onClick={() => toggleIn("palette", p)} aria-pressed={d.palette.includes(p)}>{p}</button>
              ))}
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <h2 className={s.cardTitle}>What does your week look like?</h2>
            <p className={s.cardSub}>We’ll balance your wardrobe for these settings.</p>
            <div className={s.row} style={{ flexWrap: "wrap" }}>
              {LIFE.map((p) => (
                <button key={p} className={`${s.chip} ${d.life.includes(p) ? s.chipActive : ""}`} onClick={() => toggleIn("life", p)} aria-pressed={d.life.includes(p)}>{p}</button>
              ))}
            </div>
          </>
        )}
        {step === 3 && (
          <>
            <h2 className={s.cardTitle}>Typical spend per piece</h2>
            <p className={s.cardSub}>So suggestions stay realistic.</p>
            <div className={s.stat} style={{ marginBottom: 16 }}>€{d.budget}</div>
            <input type="range" min={100} max={3000} step={50} value={d.budget} onChange={(e) => setD({ ...d, budget: Number(e.target.value) })} style={{ width: "100%", accentColor: "var(--text-primary)" }} aria-label="Budget per piece" />
            <div className={s.between}><span className={s.hint}>€100</span><span className={s.hint}>€3,000</span></div>
            <div className={s.field} style={{ marginTop: 28 }}>
              <label className={s.label} htmlFor="notes">Anything else? (optional)</label>
              <textarea id="notes" className={s.textarea} value={d.notes} onChange={(e) => setD({ ...d, notes: e.target.value })} placeholder="Allergies, brands you avoid, upcoming events…" />
            </div>
          </>
        )}
        {step === 4 && (
          <>
            <h2 className={s.cardTitle}>Review</h2>
            <dl className={s.kv} style={{ marginTop: 20 }}>
              <dt>Fit</dt><dd>{d.fit} · {d.height} cm</dd>
              <dt>Palette</dt><dd>{d.palette.join(", ")}</dd>
              <dt>Lifestyle</dt><dd>{d.life.join(", ")}</dd>
              <dt>Budget</dt><dd>€{d.budget} per piece</dd>
              {d.notes && (<><dt>Notes</dt><dd>{d.notes}</dd></>)}
            </dl>
          </>
        )}

        {err && <p className={s.errorText} role="alert" style={{ marginTop: 16 }}>{err}</p>}

        <div className={s.actions} style={{ marginTop: 28 }}>
          {step > 0 && <button className={`${s.btn} ${s.btnGhost}`} onClick={() => { setErr(""); setStep(step - 1); }}>Back</button>}
          {step < STEPS.length - 1 ? (
            <button className={s.btn} onClick={next}>Continue</button>
          ) : (
            <button className={s.btn} onClick={() => { setDone(true); localStorage.removeItem(KEY); }}>Save profile</button>
          )}
        </div>
      </div>
    </div>
  );
}
