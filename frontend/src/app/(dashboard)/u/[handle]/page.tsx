"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Icon from "@/components/Icon";
import { EmptyState, useToast, ui as s } from "@/components/ui/ui";
import { GARMENTS, CATEGORY_LABEL } from "@/content/wardrobe";
import x from "@/components/ui/screens.module.css";

const PEOPLE: Record<string, { name: string; bio: string; location: string; looks: number; followers: number }> = {
  koush: { name: "Koush K.", bio: "Quiet tailoring, honest fabrics. Building a wardrobe of twenty pieces I love.", location: "Paris, FR", looks: 42, followers: 1280 },
  camille: { name: "Camille Rousseau", bio: "Personal stylist at Vastrié. Texture over colour, always.", location: "Lyon, FR", looks: 210, followers: 8400 },
  arnav: { name: "Arnav Kapoor", bio: "Consultant. One carry-on, six cities.", location: "Mumbai, IN", looks: 31, followers: 540 },
  theo: { name: "Théo Lambert", bio: "Architect. Linen in summer, wool in winter.", location: "Bordeaux, FR", looks: 27, followers: 410 },
};

export default function PublicProfile() {
  const { handle } = useParams<{ handle: string }>();
  const person = PEOPLE[handle?.toLowerCase()];
  const [following, setFollowing] = useState(false);
  const [filter, setFilter] = useState<"all" | keyof typeof CATEGORY_LABEL>("all");
  const [toast, show] = useToast();

  if (!person) {
    return (
      <div className={s.page}>
        <EmptyState icon="userCircle" title="Profile not found" text={`There is no member called “${handle}”, or their lookbook is private.`}>
          <Link href="/feed" className={s.btn}>Back to the journal</Link>
        </EmptyState>
      </div>
    );
  }

  const pieces = GARMENTS.filter((g) => filter === "all" || g.category === filter);
  const cats = Array.from(new Set(GARMENTS.map((g) => g.category)));

  return (
    <div className={s.page}>
      <header className={x.profileHead}>
        <span className={`${s.avatar} ${s.avatarLg}`}>{person.name[0]}</span>
        <div style={{ flex: 1, minWidth: 240 }}>
          <div className={s.eyebrow}>@{handle}</div>
          <h1 className={s.title} style={{ fontSize: "2.4rem" }}>{person.name}</h1>
          <p className={s.sub}>{person.bio}</p>
          <div className={`${s.row} ${s.muted} ${s.small}`} style={{ marginTop: 14, gap: 24, flexWrap: "wrap" }}>
            <span><strong style={{ color: "var(--text-primary)" }}>{person.looks}</strong> looks</span>
            <span><strong style={{ color: "var(--text-primary)" }}>{(person.followers + (following ? 1 : 0)).toLocaleString()}</strong> followers</span>
            <span>{person.location}</span>
          </div>
        </div>
        <div className={s.actions}>
          <button className={`${s.btn} ${following ? s.btnGhost : ""}`} onClick={() => { setFollowing(!following); show(following ? "Unfollowed" : `Following ${person.name}`); }} aria-pressed={following}>
            {following ? "Following" : "Follow"}
          </button>
          <button className={`${s.btn} ${s.btnGhost}`} onClick={() => { navigator.clipboard?.writeText(window.location.href); show("Profile link copied"); }}>
            <Icon name="copy" size={16} /> Share
          </button>
        </div>
      </header>

      <div className={s.row} style={{ flexWrap: "wrap", margin: "32px 0 24px" }}>
        <button className={`${s.chip} ${filter === "all" ? s.chipActive : ""}`} onClick={() => setFilter("all")}>All</button>
        {cats.map((c) => (
          <button key={c} className={`${s.chip} ${filter === c ? s.chipActive : ""}`} onClick={() => setFilter(c)}>{CATEGORY_LABEL[c]}</button>
        ))}
      </div>

      <div className={x.lookbook}>
        {pieces.map((g) => (
          <Link key={g.id} href={`/wardrobe/${g.id}`} className={x.lookCard}>
            <div className={x.lookImg} style={{ backgroundImage: `url(${g.image})` }} role="img" aria-label={g.name} />
            <div className={x.lookInfo}>
              <strong style={{ fontWeight: 500 }}>{g.name}</strong>
              <span className={`${s.muted} ${s.small}`}>{g.brand}</span>
            </div>
          </Link>
        ))}
      </div>
      {toast}
    </div>
  );
}
