"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import styles from './profile.module.css';

type BodyType = 'athletic' | 'slim' | 'broad';
type TailoringCut = 'neapolitan' | 'savile' | 'milanese';
type Tone = 'olive' | 'alabaster' | 'bronze' | 'honey';
type Archetype = 'sprezzatura' | 'savile' | 'quietLuxury' | 'vanguard';
type Climate = 'temperate' | 'mediterranean' | 'crisp';
type Setting = 'executive' | 'creative' | 'traveler';

const TONE_SWATCHES: Record<Tone, { hex: string; palette: string[] }> = {
  olive: { hex: '#c89658', palette: ['#1b2a47', '#dfd5c6', '#2d4a3e', '#a0522d'] },
  alabaster: { hex: '#f8dcd0', palette: ['#505b68', '#a0c4d8', '#23272a', '#6b1d2f'] },
  bronze: { hex: '#8c5836', palette: ['#c19a6b', '#f5f5f7', '#097969', '#00205b'] },
  honey: { hex: '#dca873', palette: ['#f5ebd7', '#3d2314', '#708238', '#9e472a'] },
};

export default function ProfilePage() {
  const { t } = useLanguage();
  const p = t.profile;

  const [bodyType, setBodyType] = useState<BodyType>('athletic');
  const [tailoringCut, setTailoringCut] = useState<TailoringCut>('neapolitan');
  const [tone, setTone] = useState<Tone>('olive');
  const [archetype, setArchetype] = useState<Archetype>('sprezzatura');
  const [climate, setClimate] = useState<Climate>('mediterranean');
  const [setting, setSetting] = useState<Setting>('creative');

  // Cohesion Score Logic
  const getCohesionScore = () => {
    let score = 92;
    if (bodyType === 'athletic' && tailoringCut === 'neapolitan') score += 3;
    if (archetype === 'sprezzatura' && climate === 'mediterranean') score += 3;
    if (archetype === 'savile' && setting === 'executive') score += 3;
    if (archetype === 'quietLuxury' && setting === 'creative') score += 3;
    return Math.min(score, 99);
  };

  const currentSwatch = TONE_SWATCHES[tone];

  return (
    <main className={styles.main}>
      {/* Atelier Consultation Header */}
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.badge}>
            <span className={styles.badgeDot}></span>
            {p.badge}
          </div>
          <div className={styles.statusPill}>
            ✦ {p.statusBadge}
          </div>
        </div>
        <h1 className={styles.title}>{p.title}</h1>
        <p className={styles.subtitle}>{p.subtitle}</p>
      </header>

      {/* Main 2-Column Atelier Architecture */}
      <div className={styles.layout}>
        {/* Left Column: Interactive Configuration Room */}
        <div className={styles.sectionsColumn}>
          {/* 1. Silhouette & Physique */}
          <section className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>{p.sections.physique.title}</h2>
              <p className={styles.cardDesc}>{p.sections.physique.desc}</p>
            </div>

            <div className={styles.typeGrid}>
              {(['athletic', 'slim', 'broad'] as BodyType[]).map((type) => {
                const info = p.sections.physique.bodyTypes[type];
                const isActive = bodyType === type;
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setBodyType(type)}
                    className={`${styles.typeCard} ${isActive ? styles.activeTypeCard : ''}`}
                  >
                    <div className={styles.typeName}>
                      <span>{info.name}</span>
                      {isActive && <span style={{ color: 'var(--accent-primary)' }}>●</span>}
                    </div>
                    <div className={styles.typeDesc}>{info.desc}</div>
                  </button>
                );
              })}
            </div>

            <div className={styles.subGroup}>
              <label className={styles.subLabel}>{p.sections.physique.tailoringCuts.label}</label>
              <div className={styles.pillRow}>
                {(['neapolitan', 'savile', 'milanese'] as TailoringCut[]).map((cut) => {
                  const cutName = p.sections.physique.tailoringCuts[cut];
                  const isActive = tailoringCut === cut;
                  return (
                    <button
                      key={cut}
                      type="button"
                      onClick={() => setTailoringCut(cut)}
                      className={`${styles.pill} ${isActive ? styles.activePill : ''}`}
                    >
                      {cutName}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* 2. Chromatic Analysis */}
          <section className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>{p.sections.chromatic.title}</h2>
              <p className={styles.cardDesc}>{p.sections.chromatic.desc}</p>
            </div>

            <div className={styles.toneGrid}>
              {(['olive', 'alabaster', 'bronze', 'honey'] as Tone[]).map((tKey) => {
                const toneInfo = p.sections.chromatic.tones[tKey];
                const swatch = TONE_SWATCHES[tKey];
                const isActive = tone === tKey;
                return (
                  <div
                    key={tKey}
                    onClick={() => setTone(tKey)}
                    className={`${styles.toneCard} ${isActive ? styles.activeToneCard : ''}`}
                  >
                    <div
                      className={styles.toneSwatch}
                      style={{ backgroundColor: swatch.hex }}
                    />
                    <div className={styles.toneDetails}>
                      <div className={styles.toneName}>{toneInfo.name}</div>
                      <div className={styles.toneHarmony}>{toneInfo.harmony}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* 3. Aesthetic Archetype */}
          <section className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>{p.sections.archetype.title}</h2>
              <p className={styles.cardDesc}>{p.sections.archetype.desc}</p>
            </div>

            <div className={styles.archetypeGrid}>
              {(['sprezzatura', 'savile', 'quietLuxury', 'vanguard'] as Archetype[]).map((arch) => {
                const info = p.sections.archetype.types[arch];
                const isActive = archetype === arch;
                return (
                  <button
                    key={arch}
                    type="button"
                    onClick={() => setArchetype(arch)}
                    className={`${styles.archetypeCard} ${isActive ? styles.activeArchetypeCard : ''}`}
                  >
                    <div>
                      <div className={styles.archetypeHeader}>
                        <span className={styles.archetypeName}>{info.name}</span>
                        <span className={styles.archetypeBadge}>
                          {arch === 'sprezzatura' ? 'Italy' : arch === 'savile' ? 'London' : arch === 'quietLuxury' ? 'Paris' : 'Milano'}
                        </span>
                      </div>
                      <p className={styles.archetypeDesc}>{info.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* 4. Context & Environment */}
          <section className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>{p.sections.environment.title}</h2>
              <p className={styles.cardDesc}>{p.sections.environment.desc}</p>
            </div>

            <div className={styles.subGroup}>
              <label className={styles.subLabel}>{p.sections.environment.climates.label}</label>
              <div className={styles.pillRow}>
                {(['temperate', 'mediterranean', 'crisp'] as Climate[]).map((cKey) => {
                  const label = p.sections.environment.climates[cKey];
                  const isActive = climate === cKey;
                  return (
                    <button
                      key={cKey}
                      type="button"
                      onClick={() => setClimate(cKey)}
                      className={`${styles.pill} ${isActive ? styles.activePill : ''}`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className={styles.subGroup} style={{ marginTop: '20px' }}>
              <label className={styles.subLabel}>{p.sections.environment.settings.label}</label>
              <div className={styles.pillRow}>
                {(['executive', 'creative', 'traveler'] as Setting[]).map((sKey) => {
                  const label = p.sections.environment.settings[sKey];
                  const isActive = setting === sKey;
                  return (
                    <button
                      key={sKey}
                      type="button"
                      onClick={() => setSetting(sKey)}
                      className={`${styles.pill} ${isActive ? styles.activePill : ''}`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Sticky Live Atelier Synthesis Dossier */}
        <aside className={styles.sidebarWrapper}>
          <div className={styles.blueprintCard}>
            <div className={styles.blueprintHeader}>
              <div className={styles.blueprintTag}>
                <span className={styles.livePulse}></span>
                {p.blueprint.subtitle}
              </div>
              <h3 className={styles.blueprintTitle}>{p.blueprint.title}</h3>
            </div>

            <div className={styles.cohesionBox}>
              <span className={styles.cohesionLabel}>{p.blueprint.cohesion}</span>
              <span className={styles.cohesionScore}>{getCohesionScore()}%</span>
            </div>

            <div className={styles.blueprintList}>
              <div className={styles.blueprintItem}>
                <span className={styles.blueprintItemLabel}>{p.blueprint.selectedSilhouette}</span>
                <span className={styles.blueprintItemValue}>
                  {p.sections.physique.bodyTypes[bodyType].name}
                </span>
              </div>

              <div className={styles.blueprintItem}>
                <span className={styles.blueprintItemLabel}>Tailoring Cut</span>
                <span className={styles.blueprintItemValue}>
                  {p.sections.physique.tailoringCuts[tailoringCut]}
                </span>
              </div>

              <div className={styles.blueprintItem}>
                <span className={styles.blueprintItemLabel}>{p.blueprint.activeArchetype}</span>
                <span className={styles.blueprintItemValue} style={{ color: 'var(--accent-primary)' }}>
                  {p.sections.archetype.types[archetype].name}
                </span>
              </div>

              <div className={styles.blueprintItem}>
                <span className={styles.blueprintItemLabel}>{p.blueprint.harmonicPalette}</span>
                <div className={styles.paletteCircles}>
                  {currentSwatch.palette.map((color, idx) => (
                    <div
                      key={idx}
                      className={styles.colorCircle}
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.synthesisBox}>
              <div className={styles.synthesisTitle}>Atelier Diagnostic</div>
              <div className={styles.synthesisText}>
                {archetype === 'sprezzatura' && "Unstructured tailoring with rich linen and open silk-cotton layers accentuates your athletic frame with relaxed Mediterranean elegance."}
                {archetype === 'savile' && "High-twist wool with clean canvassing and roped shoulders delivers commanding executive authority with razor-sharp drape."}
                {archetype === 'quietLuxury' && "Tactile cashmere knitwear paired with selvedge denim and suede penny loafers provides understated prestige with ultimate comfort."}
                {archetype === 'vanguard' && "Monochrome architectural layers with modern sculpted lines produce a cutting-edge aesthetic for the creative visionary."}
              </div>
            </div>

            <Link href="/wardrobe" className={styles.actionBtn}>
              {p.blueprint.cta} &rarr;
            </Link>

            <Link
              href="/dashboard"
              style={{
                marginTop: '14px',
                textAlign: 'center',
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                display: 'block',
                transition: 'color 0.2s ease',
              }}
            >
              ← Return to Atelier Dashboard
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
}
