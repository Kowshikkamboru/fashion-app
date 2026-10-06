"use client";

import { useEffect, useRef, useState } from "react";
import { PageHeader, ui as s } from "@/components/ui/ui";
import Icon from "@/components/Icon";
import x from "@/components/ui/screens.module.css";

interface Msg { id: number; from: "me" | "stylist"; text: string; time: string; }

const now = () => new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

const REPLIES = [
  "Lovely choice. I’d anchor it with the navy blazer and keep the shoes in suede.",
  "Rain is forecast — let’s swap the loafers for the Chelsea boots. I’ll update your Thursday look.",
  "Noted. I’ve added a stone chino to your wishlist; it would complete four looks you already own.",
  "Happy to help. Send me a photo and I’ll tag fabric and care for you.",
];

const SUGGESTIONS = ["What should I wear Thursday?", "Pack for a 3-day Milan trip", "Is my navy blazer worth tailoring?"];

export default function ConciergePage() {
  const [msgs, setMsgs] = useState<Msg[]>([
    { id: 1, from: "stylist", text: "Bonjour — Camille here, your personal stylist. How can I help today?", time: "09:00" },
  ]);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const end = useRef<HTMLDivElement>(null);
  const n = useRef(0);

  useEffect(() => { end.current?.scrollIntoView({ behavior: "smooth", block: "end" }); }, [msgs, typing]);

  const send = (text: string) => {
    const t = text.trim();
    if (!t || typing) return;
    setMsgs((m) => [...m, { id: Date.now(), from: "me", text: t, time: now() }]);
    setDraft("");
    setTyping(true);
    setTimeout(() => {
      setMsgs((m) => [...m, { id: Date.now() + 1, from: "stylist", text: REPLIES[n.current++ % REPLIES.length], time: now() }]);
      setTyping(false);
    }, 1200);
  };

  return (
    <div className={s.pageNarrow} style={{ maxWidth: 820 }}>
      <PageHeader eyebrow="Concierge" title="Chat with Camille" sub="Your dedicated stylist. Typically replies within minutes." />

      <div className={x.chat}>
        <div className={x.chatHead}>
          <span className={s.avatar}>C</span>
          <div>
            <strong>Camille Rousseau</strong>
            <div className={`${s.small} ${x.online}`}>● Online</div>
          </div>
        </div>

        <div className={x.chatBody} role="log" aria-live="polite">
          {msgs.map((m) => (
            <div key={m.id} className={`${x.bubbleRow} ${m.from === "me" ? x.me : ""}`}>
              <div className={`${x.bubble} ${m.from === "me" ? x.bubbleMe : ""}`}>
                {m.text}
                <span className={x.bubbleTime}>{m.time}</span>
              </div>
            </div>
          ))}
          {typing && (
            <div className={x.bubbleRow}>
              <div className={x.bubble} aria-label="Camille is typing"><span className={x.dots}><i /><i /><i /></span></div>
            </div>
          )}
          <div ref={end} />
        </div>

        {msgs.length < 3 && (
          <div className={s.row} style={{ flexWrap: "wrap", padding: "0 20px 12px" }}>
            {SUGGESTIONS.map((q) => <button key={q} className={s.chip} onClick={() => send(q)}>{q}</button>)}
          </div>
        )}

        <form className={x.chatForm} onSubmit={(e) => { e.preventDefault(); send(draft); }}>
          <input aria-label="Message" className={s.input} placeholder="Write a message…" value={draft} onChange={(e) => setDraft(e.target.value)} />
          <button className={s.btn} type="submit" disabled={!draft.trim() || typing} aria-label="Send"><Icon name="send" size={16} /></button>
        </form>
      </div>
    </div>
  );
}
