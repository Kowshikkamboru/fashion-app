"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import Icon from "@/components/Icon";
import { PageHeader, EmptyState, useToast, ui as s } from "@/components/ui/ui";
import { GARMENTS, CATEGORY_LABEL, costPerWear } from "@/content/wardrobe";
import x from "@/components/ui/screens.module.css";

interface Comment { id: number; name: string; when: string; text: string; }

const SEED: Comment[] = [
  { id: 1, name: "Camille (Stylist)", when: "2 days ago", text: "Excellent anchor piece. Pair with the grey flannels for client meetings." },
  { id: 2, name: "You", when: "Yesterday", text: "Worn to the gallery opening — got three compliments." },
];

export default function ItemDetail() {
  const params = useParams<{ id: string }>();
  const item = GARMENTS.find((g) => String(g.id) === params.id);
  const [comments, setComments] = useState<Comment[]>(SEED);
  const [draft, setDraft] = useState("");
  const [fav, setFav] = useState(false);
  const [toast, show] = useToast();

  if (!item) {
    return (
      <div className={s.page}>
        <EmptyState icon="shirt" title="Piece not found" text="This garment is not in your wardrobe. It may have been removed.">
          <Link href="/wardrobe" className={s.btn}>Back to wardrobe</Link>
        </EmptyState>
      </div>
    );
  }

  const post = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;
    setComments((c) => [...c, { id: Date.now(), name: "You", when: "Just now", text: draft.trim() }]);
    setDraft("");
    show("Comment posted");
  };

  const remove = (id: number) => {
    setComments((c) => c.filter((k) => k.id !== id));
    show("Comment deleted");
  };

  return (
    <div className={s.page}>
      <PageHeader eyebrow={CATEGORY_LABEL[item.category]} title={item.name} sub={`${item.brand} · ${item.origin}`}>
        <button className={`${s.btn} ${s.btnGhost}`} onClick={() => { setFav(!fav); show(fav ? "Removed from favourites" : "Added to favourites"); }}>
          <Icon name="heart" size={16} style={fav ? { fill: "currentColor" } : undefined} /> {fav ? "Favourited" : "Favourite"}
        </button>
        <Link href="/outfits" className={s.btn}>Style this piece</Link>
      </PageHeader>

      <div className={x.detailGrid}>
        <div className={x.detailImg} style={{ backgroundImage: `url(${item.image})` }} role="img" aria-label={item.name} />

        <div className={s.stack}>
          <div className={s.card}>
            <h2 className={s.cardTitle}>Specification</h2>
            <dl className={s.kv} style={{ marginTop: 20 }}>
              <dt>Fabric</dt><dd>{item.fabric}</dd>
              <dt>Colour</dt><dd><span className={x.swatch} style={{ background: item.colorHex }} /> {item.colorName}</dd>
              <dt>Season</dt><dd>{item.season}</dd>
              <dt>Care</dt><dd>{item.care}</dd>
              <dt>Purchased</dt><dd>€{item.price.toLocaleString()}</dd>
            </dl>
          </div>

          <div className={s.grid3}>
            <div className={s.card}>
              <div className={s.statLabel}>Wears</div>
              <div className={s.stat}>{item.wears}</div>
            </div>
            <div className={s.card}>
              <div className={s.statLabel}>Cost / wear</div>
              <div className={s.stat}>€{costPerWear(item).toFixed(0)}</div>
            </div>
            <div className={s.card}>
              <div className={s.statLabel}>Style match</div>
              <div className={s.stat}>{item.matchScore}%</div>
            </div>
          </div>

          <div className={s.card}>
            <div className={s.between}>
              <h2 className={s.cardTitle}>Version history</h2>
              <Link href="/history" className={`${s.btn} ${s.btnGhost} ${s.btnSm}`}>View all</Link>
            </div>
            <p className={s.cardSub}>Looks that include this piece have been revised 4 times.</p>
          </div>
        </div>
      </div>

      <section id="comments" className={x.commentsSection}>
        <h2 className={s.cardTitle} style={{ fontSize: "1.6rem" }}>Comments ({comments.length})</h2>
        <form onSubmit={post} className={x.commentForm}>
          <label htmlFor="comment" className={s.label}>Add a note</label>
          <textarea id="comment" className={s.textarea} placeholder="Share a thought on how you wear this piece…" value={draft} onChange={(e) => setDraft(e.target.value)} />
          <div><button className={s.btn} type="submit" disabled={!draft.trim()}>Post comment</button></div>
        </form>

        {comments.length === 0 ? (
          <EmptyState icon="comments" title="No comments yet" text="Be the first to leave a note on this piece." />
        ) : (
          <ul className={x.commentList}>
            {comments.map((c) => (
              <li key={c.id} className={x.comment}>
                <span className={s.avatar}>{c.name[0]}</span>
                <div className={x.commentBody}>
                  <div className={x.commentMeta}><strong>{c.name}</strong><span>{c.when}</span></div>
                  <p>{c.text}</p>
                </div>
                {c.name === "You" && (
                  <button className={s.iconBtn} aria-label="Delete comment" onClick={() => remove(c.id)}><Icon name="trash" size={16} /></button>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
      {toast}
    </div>
  );
}
