"use client";

import { useState } from "react";
import Icon from "@/components/Icon";
import { Toggle, Modal, useToast, ui as s } from "@/components/ui/ui";
import x from "@/components/ui/screens.module.css";

const BACKUP = ["8K2F-91QD", "R7XM-30LA", "PZ4C-88WE", "T1HN-62VB", "J5UG-04KS", "M9DY-77RQ"];

export default function SecuritySettings() {
  const [enabled, setEnabled] = useState(false);
  const [setup, setSetup] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [showCodes, setShowCodes] = useState(false);
  const [toast, show] = useToast();

  const [pw, setPw] = useState({ current: "", next: "", confirm: "" });
  const [pwErr, setPwErr] = useState("");

  const verify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(code)) {
      setError("Enter the 6-digit code from your authenticator app.");
      return;
    }
    setEnabled(true);
    setSetup(false);
    setCode("");
    setError("");
    setShowCodes(true);
    show("Two-factor authentication enabled");
  };

  const changePw = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw.next.length < 8) return setPwErr("New password must be at least 8 characters.");
    if (pw.next !== pw.confirm) return setPwErr("Passwords do not match.");
    setPwErr("");
    setPw({ current: "", next: "", confirm: "" });
    show("Password updated");
  };

  return (
    <div className={s.stack}>
      <section className={s.card}>
        <div className={s.between}>
          <div className={s.row} style={{ alignItems: "flex-start" }}>
            <div className={s.emptyIcon} style={{ margin: 0 }}><Icon name="shield" size={24} /></div>
            <div>
              <h2 className={s.cardTitle}>Two-factor authentication</h2>
              <p className={s.cardSub} style={{ marginBottom: 0 }}>
                Add a second step at sign-in using an authenticator app such as 1Password or Google Authenticator.
              </p>
            </div>
          </div>
          <span className={`${s.badge} ${enabled ? s.badgeOk : s.badgeWarn}`}>{enabled ? "Enabled" : "Not enabled"}</span>
        </div>

        <hr className={s.divider} />

        {!enabled ? (
          <button className={s.btn} onClick={() => setSetup(true)}>Set up 2FA</button>
        ) : (
          <div className={s.actions}>
            <button className={`${s.btn} ${s.btnGhost}`} onClick={() => setShowCodes(true)}>View backup codes</button>
            <button className={`${s.btn} ${s.btnDanger}`} onClick={() => { setEnabled(false); show("Two-factor authentication disabled"); }}>Disable</button>
          </div>
        )}
      </section>

      <form className={s.card} onSubmit={changePw} noValidate>
        <h2 className={s.cardTitle}>Change password</h2>
        <p className={s.cardSub}>Use at least 8 characters. A passphrase works best.</p>
        <div className={s.grid3} style={{ gap: 16 }}>
          <div className={s.field}>
            <label className={s.label} htmlFor="cur">Current</label>
            <input id="cur" type="password" autoComplete="current-password" className={s.input} value={pw.current} onChange={(e) => setPw({ ...pw, current: e.target.value })} />
          </div>
          <div className={s.field}>
            <label className={s.label} htmlFor="new">New</label>
            <input id="new" type="password" autoComplete="new-password" className={s.input} value={pw.next} onChange={(e) => setPw({ ...pw, next: e.target.value })} />
          </div>
          <div className={s.field}>
            <label className={s.label} htmlFor="conf">Confirm</label>
            <input id="conf" type="password" autoComplete="new-password" className={`${s.input} ${pwErr ? s.inputError : ""}`} value={pw.confirm} onChange={(e) => setPw({ ...pw, confirm: e.target.value })} />
          </div>
        </div>
        {pwErr && <p className={s.errorText} role="alert">{pwErr}</p>}
        <button className={s.btn} type="submit" disabled={!pw.current || !pw.next}>Update password</button>
      </form>

      <section className={s.card}>
        <h2 className={s.cardTitle}>Active sessions</h2>
        <p className={s.cardSub}>Devices currently signed in to your atelier.</p>
        {[
          { d: "MacBook Pro · Paris, FR", t: "Active now", cur: true },
          { d: "iPhone 15 · Paris, FR", t: "2 hours ago" },
          { d: "Chrome on Windows · Lyon, FR", t: "9 days ago" },
        ].map((r) => (
          <div className={s.settingRow} key={r.d}>
            <div>
              <div className={s.settingTitle}>{r.d} {r.cur && <span className={`${s.badge} ${s.badgeOk}`} style={{ marginLeft: 8 }}>This device</span>}</div>
              <div className={s.settingDesc}>{r.t}</div>
            </div>
            {!r.cur && <button className={`${s.btn} ${s.btnGhost} ${s.btnSm}`} onClick={() => show("Session revoked")}>Revoke</button>}
          </div>
        ))}
        <div className={s.settingRow}>
          <div>
            <div className={s.settingTitle}>Login alerts</div>
            <div className={s.settingDesc}>Email me when a new device signs in.</div>
          </div>
          <Toggle checked onChange={() => show("Preference saved")} label="Login alerts" />
        </div>
      </section>

      <Modal open={setup} onClose={() => setSetup(false)}>
        <h2 className={s.cardTitle} style={{ fontSize: "1.6rem" }}>Scan & verify</h2>
        <p className={s.cardSub}>Scan this code with your authenticator app, then enter the 6-digit code it shows.</p>
        <div className={x.qr} aria-label="QR code placeholder" role="img">
          {Array.from({ length: 121 }).map((_, i) => (
            <span key={i} style={{ opacity: ((i * 7 + 3) % 5) < 2 || i < 3 || i % 11 === 0 ? 1 : 0.1 }} />
          ))}
        </div>
        <p className={s.hint} style={{ textAlign: "center", margin: "12px 0 20px" }}>Or enter key <span className={s.mono}>VSTR-4F9K-2LQ7-XM30</span></p>
        <form onSubmit={verify} noValidate>
          <div className={s.field}>
            <label className={s.label} htmlFor="otp">6-digit code</label>
            <input id="otp" inputMode="numeric" maxLength={6} autoFocus className={`${s.input} ${error ? s.inputError : ""}`} value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))} placeholder="000000" />
            {error && <span className={s.errorText} role="alert">{error}</span>}
          </div>
          <div className={s.actions}>
            <button type="button" className={`${s.btn} ${s.btnGhost}`} onClick={() => setSetup(false)}>Cancel</button>
            <button type="submit" className={s.btn}>Verify & enable</button>
          </div>
        </form>
      </Modal>

      <Modal open={showCodes} onClose={() => setShowCodes(false)}>
        <h2 className={s.cardTitle} style={{ fontSize: "1.6rem" }}>Backup codes</h2>
        <p className={s.cardSub}>Store these somewhere safe. Each code can be used once if you lose your device.</p>
        <div className={x.codes}>{BACKUP.map((b) => <span key={b} className={s.mono}>{b}</span>)}</div>
        <div className={s.actions} style={{ marginTop: 24 }}>
          <button className={`${s.btn} ${s.btnGhost}`} onClick={() => { navigator.clipboard?.writeText(BACKUP.join("\n")); show("Copied to clipboard"); }}><Icon name="copy" size={16} /> Copy</button>
          <button className={s.btn} onClick={() => setShowCodes(false)}>I have saved them</button>
        </div>
      </Modal>
      {toast}
    </div>
  );
}
