"use client";

import { useState } from "react";
import Icon from "@/components/Icon";
import { EmptyState, Modal, useToast, ui as s } from "@/components/ui/ui";

interface ApiKey { id: number; name: string; prefix: string; scope: string; created: string; last: string; }

const randomSecret = () => {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  const arr = new Uint32Array(32);
  crypto.getRandomValues(arr);
  return "vstr_live_" + Array.from(arr, (n) => chars[n % chars.length]).join("");
};

export default function ApiKeysPage() {
  const [keys, setKeys] = useState<ApiKey[]>([
    { id: 1, name: "Calendar sync", prefix: "vstr_live_k3x9", scope: "Read", created: "12 Mar 2026", last: "2 hours ago" },
    { id: 2, name: "Personal lookbook site", prefix: "vstr_live_p0w7", scope: "Read & write", created: "28 Jan 2026", last: "5 days ago" },
  ]);
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState("");
  const [scope, setScope] = useState("Read");
  const [secret, setSecret] = useState<string | null>(null);
  const [revoke, setRevoke] = useState<ApiKey | null>(null);
  const [toast, show] = useToast();

  const create = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const full = randomSecret();
    setKeys((k) => [{ id: Date.now(), name: name.trim(), prefix: full.slice(0, 14), scope, created: "Today", last: "Never" }, ...k]);
    setSecret(full);
    setCreating(false);
    setName("");
  };

  return (
    <div className={s.stack}>
      <div className={s.between}>
        <p className={s.muted} style={{ maxWidth: 560, lineHeight: 1.7, margin: 0 }}>
          Use keys to connect your own tools to Vastrié. Treat them like passwords — they are shown only once.
        </p>
        <button className={s.btn} onClick={() => setCreating(true)}><Icon name="plus" size={16} /> Create key</button>
      </div>

      {keys.length === 0 ? (
        <EmptyState icon="key" title="No API keys" text="Create a key to connect external tools to your wardrobe data.">
          <button className={s.btn} onClick={() => setCreating(true)}>Create your first key</button>
        </EmptyState>
      ) : (
        <div className={s.tableWrap}>
          <table className={s.table}>
            <thead><tr><th>Name</th><th>Key</th><th>Scope</th><th>Created</th><th>Last used</th><th /></tr></thead>
            <tbody>
              {keys.map((k) => (
                <tr key={k.id}>
                  <td><strong>{k.name}</strong></td>
                  <td className={s.mono}>{k.prefix}••••••••</td>
                  <td><span className={s.badge}>{k.scope}</span></td>
                  <td className={s.muted}>{k.created}</td>
                  <td className={s.muted}>{k.last}</td>
                  <td style={{ textAlign: "right" }}>
                    <button className={`${s.btn} ${s.btnDanger} ${s.btnSm}`} onClick={() => setRevoke(k)}>Revoke</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={creating} onClose={() => setCreating(false)}>
        <h2 className={s.cardTitle} style={{ fontSize: "1.6rem" }}>New API key</h2>
        <form onSubmit={create}>
          <div className={s.field} style={{ marginTop: 20 }}>
            <label className={s.label} htmlFor="kname">Name</label>
            <input id="kname" autoFocus className={s.input} placeholder="e.g. Shortcuts automation" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className={s.field}>
            <label className={s.label} htmlFor="kscope">Permissions</label>
            <select id="kscope" className={s.select} value={scope} onChange={(e) => setScope(e.target.value)}>
              <option>Read</option><option>Read & write</option>
            </select>
            <span className={s.hint}>Grant the minimum access required.</span>
          </div>
          <div className={s.actions}>
            <button type="button" className={`${s.btn} ${s.btnGhost}`} onClick={() => setCreating(false)}>Cancel</button>
            <button className={s.btn} type="submit" disabled={!name.trim()}>Generate key</button>
          </div>
        </form>
      </Modal>

      <Modal open={!!secret} onClose={() => setSecret(null)}>
        <h2 className={s.cardTitle} style={{ fontSize: "1.6rem" }}>Copy your key now</h2>
        <p className={s.cardSub}>For your security, this key will not be shown again.</p>
        <div className={s.input} style={{ wordBreak: "break-all" }}><span className={s.mono}>{secret}</span></div>
        <div className={s.actions} style={{ marginTop: 24 }}>
          <button className={`${s.btn} ${s.btnGhost}`} onClick={() => { navigator.clipboard?.writeText(secret ?? ""); show("Key copied"); }}><Icon name="copy" size={16} /> Copy</button>
          <button className={s.btn} onClick={() => setSecret(null)}>Done</button>
        </div>
      </Modal>

      <Modal open={!!revoke} onClose={() => setRevoke(null)}>
        <h2 className={s.cardTitle} style={{ fontSize: "1.6rem" }}>Revoke “{revoke?.name}”?</h2>
        <p className={s.cardSub}>Anything using this key will stop working immediately.</p>
        <div className={s.actions}>
          <button className={`${s.btn} ${s.btnGhost}`} onClick={() => setRevoke(null)}>Keep key</button>
          <button className={`${s.btn} ${s.btnDanger}`} onClick={() => { setKeys((k) => k.filter((x) => x.id !== revoke?.id)); setRevoke(null); show("Key revoked"); }}>Revoke key</button>
        </div>
      </Modal>
      {toast}
    </div>
  );
}
