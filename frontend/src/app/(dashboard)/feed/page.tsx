"use client";

import { useState } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
import { PageHeader, useToast, ui as s } from "@/components/ui/ui";
import x from "@/components/ui/screens.module.css";

interface Post { id: number; handle: string; name: string; when: string; image: string; caption: string; tag: string; likes: number; liked: boolean; comments: number; }

const SEED: Post[] = [
  { id: 1, handle: "koush", name: "Koush K.", when: "2h", image: "/images/wardrobe_blazer_navy.jpg", caption: "Navy double-breasted for the Thursday dinner. Quiet confidence.", tag: "Tailoring", likes: 128, liked: false, comments: 14 },
  { id: 2, handle: "camille", name: "Camille R. · Stylist", when: "5h", image: "/images/wardrobe_knit_cashmere.jpg", caption: "Texture over colour: charcoal cashmere with a flannel trouser.", tag: "Knitwear", likes: 342, liked: true, comments: 31 },
  { id: 3, handle: "arnav", name: "Arnav K.", when: "1d", image: "/images/wardrobe_shoes_1791120431069.jpg", caption: "Suede loafers, finally broken in. Worth the wait.", tag: "Footwear", likes: 96, liked: false, comments: 8 },
  { id: 4, handle: "theo", name: "Théo L.", when: "2d", image: "/images/wardrobe_item_1_1791120159509.jpg", caption: "Linen season has begun.", tag: "Summer", likes: 211, liked: false, comments: 19 },
];

const TAGS = ["All", "Tailoring", "Knitwear", "Footwear", "Summer"];

export default function FeedPage() {
  const [posts, setPosts] = useState(SEED);
  const [tag, setTag] = useState("All");
  const [visible, setVisible] = useState(3);
  const [toast, show] = useToast();

  const list = posts.filter((p) => tag === "All" || p.tag === tag);

  const like = (id: number) =>
    setPosts((l) => l.map((p) => (p.id === id ? { ...p, liked: !p.liked, likes: p.likes + (p.liked ? -1 : 1) } : p)));

  return (
    <div className={s.pageNarrow} style={{ maxWidth: 680 }}>
      <PageHeader eyebrow="Feed" title="The Journal" sub="Looks from members and stylists you follow." />

      <div className={s.row} style={{ flexWrap: "wrap", marginBottom: 28 }}>
        {TAGS.map((t) => (
          <button key={t} className={`${s.chip} ${tag === t ? s.chipActive : ""}`} onClick={() => { setTag(t); setVisible(3); }}>{t}</button>
        ))}
      </div>

      <div className={s.stack} style={{ gap: 32 }}>
        {list.slice(0, visible).map((p) => (
          <article key={p.id} className={x.post}>
            <header className={s.row} style={{ padding: 16 }}>
              <span className={s.avatar}>{p.name[0]}</span>
              <div style={{ flex: 1 }}>
                <Link href={`/u/${p.handle}`} style={{ fontWeight: 600 }}>{p.name}</Link>
                <div className={`${s.muted} ${s.small}`}>{p.when} ago · {p.tag}</div>
              </div>
            </header>
            <div className={x.postImg} style={{ backgroundImage: `url(${p.image})` }} role="img" aria-label={p.caption} />
            <div style={{ padding: 16 }}>
              <div className={s.row} style={{ marginBottom: 10 }}>
                <button className={s.iconBtn} aria-label={p.liked ? "Unlike" : "Like"} aria-pressed={p.liked} onClick={() => like(p.id)} style={p.liked ? { background: "var(--text-primary)", color: "var(--bg-primary)" } : undefined}>
                  <Icon name="heart" size={16} style={p.liked ? { fill: "currentColor" } : undefined} />
                </button>
                <Link href="/wardrobe/1#comments" className={s.iconBtn} aria-label="Comments"><Icon name="comments" size={16} /></Link>
                <button className={s.iconBtn} aria-label="Copy link" onClick={() => { navigator.clipboard?.writeText(`${location.origin}/u/${p.handle}`); show("Link copied"); }}><Icon name="copy" size={16} /></button>
              </div>
              <strong>{p.likes} likes</strong>
              <p style={{ margin: "6px 0 8px", lineHeight: 1.6 }}>{p.caption}</p>
              <Link href="/wardrobe/1#comments" className={`${s.muted} ${s.small}`}>View all {p.comments} comments</Link>
            </div>
          </article>
        ))}
      </div>

      {visible < list.length && (
        <div style={{ textAlign: "center", marginTop: 32 }}>
          <button className={`${s.btn} ${s.btnGhost}`} onClick={() => setVisible((v) => v + 3)}>Load more</button>
        </div>
      )}
      {list.length === 0 && <p className={s.muted} style={{ textAlign: "center" }}>No posts in this category yet.</p>}
      {toast}
    </div>
  );
}
