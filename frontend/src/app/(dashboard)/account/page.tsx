"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Icon from "@/components/Icon";
import { PageHeader, Modal, useToast, ui as s } from "@/components/ui/ui";

export default function AccountPage() {
  const { user, login, logout } = useAuth();
  const router = useRouter();
  const [toast, show] = useToast();

  const [name, setName] = useState(user?.isGuest ? "" : user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [measure, setMeasure] = useState({ height: "182", chest: "100", waist: "84", inseam: "81", shoe: "43" });
  const [deleting, setDeleting] = useState(false);
  const [confirm, setConfirm] = useState("");

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (name.trim().length < 2) next.name = "Please enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Enter a valid email address.";
    setErrors(next);
    if (Object.keys(next).length) return;
    login(email, name.trim());
    show("Profile saved");
  };

  const exportData = () => {
    const blob = new Blob([JSON.stringify({ profile: { name, email }, measurements: measure }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "vastrie-data.json";
    a.click();
    URL.revokeObjectURL(url);
    show("Your data export is ready");
  };

  const destroy = () => {
    logout();
    router.push("/");
  };

  const initial = (name || user?.name || "G")[0].toUpperCase();

  return (
    <div className={s.page}>
      <PageHeader eyebrow="Account" title="Your account" sub="Profile, measurements and control over your data." />

      {user?.isGuest && (
        <div className={s.card} style={{ marginBottom: 24 }}>
          <div className={s.between}>
            <div>
              <div className={s.cardTitle}>You are browsing as a guest</div>
              <p className={s.cardSub} style={{ marginBottom: 0 }}>Create an account to save your wardrobe across devices.</p>
            </div>
            <Link href="/auth" className={s.btn}>Create account</Link>
          </div>
        </div>
      )}

      <div className={s.grid2} style={{ alignItems: "start" }}>
        <form className={s.card} onSubmit={save} noValidate>
          <div className={s.row} style={{ marginBottom: 28 }}>
            <span className={`${s.avatar} ${s.avatarLg}`}>{initial}</span>
            <div>
              <h2 className={s.cardTitle}>Profile</h2>
              <p className={s.hint}>Shown on your public lookbook.</p>
            </div>
          </div>
          <div className={s.field}>
            <label className={s.label} htmlFor="name">Full name</label>
            <input id="name" className={`${s.input} ${errors.name ? s.inputError : ""}`} value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
            {errors.name && <span className={s.errorText} role="alert">{errors.name}</span>}
          </div>
          <div className={s.field}>
            <label className={s.label} htmlFor="email">Email</label>
            <input id="email" type="email" className={`${s.input} ${errors.email ? s.inputError : ""}`} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
            {errors.email && <span className={s.errorText} role="alert">{errors.email}</span>}
          </div>
          <button className={s.btn} type="submit">Save changes</button>
        </form>

        <div className={s.card}>
          <h2 className={s.cardTitle}>Measurements</h2>
          <p className={s.cardSub}>Used privately to improve fit recommendations.</p>
          <div className={s.grid2} style={{ gap: 16 }}>
            {([
              ["height", "Height (cm)"], ["chest", "Chest (cm)"], ["waist", "Waist (cm)"], ["inseam", "Inseam (cm)"], ["shoe", "Shoe (EU)"],
            ] as const).map(([k, label]) => (
              <div className={s.field} key={k} style={{ marginBottom: 0 }}>
                <label className={s.label} htmlFor={k}>{label}</label>
                <input id={k} inputMode="numeric" className={s.input} value={measure[k]} onChange={(e) => setMeasure({ ...measure, [k]: e.target.value.replace(/[^0-9.]/g, "") })} />
              </div>
            ))}
          </div>
          <div style={{ marginTop: 24 }}>
            <button className={`${s.btn} ${s.btnGhost}`} onClick={() => show("Measurements updated")}>Update measurements</button>
          </div>
        </div>
      </div>

      <div className={s.card} style={{ marginTop: 24 }}>
        <h2 className={s.cardTitle}>Your data</h2>
        <p className={s.cardSub}>Download everything we hold about you, or permanently delete your account.</p>
        <div className={s.actions}>
          <button className={`${s.btn} ${s.btnGhost}`} onClick={exportData}><Icon name="download" size={16} /> Export my data</button>
          <button className={`${s.btn} ${s.btnDanger}`} onClick={() => setDeleting(true)}><Icon name="trash" size={16} /> Delete account</button>
        </div>
      </div>

      <Modal open={deleting} onClose={() => { setDeleting(false); setConfirm(""); }}>
        <h2 className={s.cardTitle} style={{ fontSize: "1.6rem" }}>Delete your account?</h2>
        <p className={s.cardSub}>This permanently removes your wardrobe, outfits and preferences. This cannot be undone. Type <strong>DELETE</strong> to confirm.</p>
        <input className={s.input} value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="DELETE" aria-label="Type DELETE to confirm" />
        <div className={s.actions} style={{ marginTop: 24 }}>
          <button className={`${s.btn} ${s.btnGhost}`} onClick={() => { setDeleting(false); setConfirm(""); }}>Cancel</button>
          <button className={`${s.btn} ${s.btnDanger}`} disabled={confirm !== "DELETE"} onClick={destroy}>Permanently delete</button>
        </div>
      </Modal>
      {toast}
    </div>
  );
}
