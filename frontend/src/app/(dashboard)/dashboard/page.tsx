"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import styles from './dashboard.module.css';

export default function DashboardPage() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const d = t.dashboard;

  const isGuest = user ? user.isGuest : true;

  return (
    <main className={styles.main}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.badge}>
            <span className={styles.badgeDot}></span>
            {d.badge}
          </div>
          <div className={styles.guestPill}>
            ✦ {isGuest ? d.guestStatus : d.memberStatus}
          </div>
        </div>

        <h1 className={styles.title}>
          {isGuest ? d.welcomeGuest : `${d.welcomeMember}, ${user?.name}`}
        </h1>

        <div className={styles.contextBar}>
          <div className={styles.contextItem}>
            <span>📍</span> Paris / Côte d'Azur
          </div>
          <div className={styles.contextItem}>
            <span>🌤️</span> 72°F / 22°C Clear
          </div>
          <div className={styles.contextItem}>
            <span>📅</span> Friday Evening Gala & Dinner
          </div>
        </div>
      </header>

      {/* Guest Mode Notice */}
      {isGuest && (
        <div className={styles.guestBanner}>
          <span className={styles.bannerText}>
            ℹ️ {d.upgradeNotice}
          </span>
          <Link href="/auth" className={styles.bannerLink}>
            Save to VIP Membership &rarr;
          </Link>
        </div>
      )}

      {/* Key Metrics Strip */}
      <div className={styles.metricsGrid}>
        <div className={styles.metricCard}>
          <span className={styles.metricLabel}>{d.metrics.cohesion}</span>
          <span className={`${styles.metricValue} ${styles.metricGold}`}>94%</span>
          <span className={styles.metricSubtext}>Harmonized Palette & Drape</span>
        </div>

        <div className={styles.metricCard}>
          <span className={styles.metricLabel}>{d.metrics.wardrobeCount}</span>
          <span className={styles.metricValue}>8 Pieces</span>
          <span className={styles.metricSubtext}>High-Fidelity Digitized</span>
        </div>

        <div className={styles.metricCard}>
          <span className={styles.metricLabel}>{d.metrics.todayContext}</span>
          <span className={styles.metricValue} style={{ fontSize: '1.25rem' }}>
            {d.metrics.weatherVal}
          </span>
          <span className={styles.metricSubtext}>Live Climate Calibration</span>
        </div>

        <div className={styles.metricCard}>
          <span className={styles.metricLabel}>{d.metrics.gapCount}</span>
          <span className={styles.metricValue} style={{ fontSize: '1.15rem' }}>
            1 Silk-Cotton Polo
          </span>
          <span className={styles.metricSubtext}>High Priority Acquisition</span>
        </div>
      </div>

      {/* Today's Curated Look */}
      <section className={styles.heroLookSection}>
        <div className={styles.lookImageWrapper}>
          <Image
            src="/images/outfit_recommendation_1791120459094.jpg"
            alt={d.todayLook.outfitName}
            fill
            priority
            sizes="(max-width: 900px) 100vw, 50vw"
            className={styles.lookImage}
          />
        </div>

        <div className={styles.lookContent}>
          <span className={styles.lookTag}>{d.todayLook.title}</span>
          <h2 className={styles.lookTitle}>{d.todayLook.outfitName}</h2>
          <p className={styles.lookSubtitle}>{d.todayLook.subtitle}</p>
          <p className={styles.lookDetails}>{d.todayLook.details}</p>

          <Link href="/outfits" className={styles.lookActionBtn}>
            {d.todayLook.action}
          </Link>
        </div>
      </section>

      {/* Command Center 3 Cards */}
      <div className={styles.commandGrid}>
        {/* Wardrobe */}
        <div className={styles.commandCard}>
          <div>
            <div className={styles.commandCardIcon}>👔</div>
            <h3 className={styles.commandCardTitle}>{d.cards.wardrobeTitle}</h3>
            <p className={styles.commandCardDesc}>{d.cards.wardrobeDesc}</p>
          </div>
          <Link href="/wardrobe" className={styles.commandCardBtn}>
            {d.cards.wardrobeAction} &rarr;
          </Link>
        </div>

        {/* Style Architecture */}
        <div className={styles.commandCard}>
          <div>
            <div className={styles.commandCardIcon}>📐</div>
            <h3 className={styles.commandCardTitle}>{d.cards.profileTitle}</h3>
            <p className={styles.commandCardDesc}>{d.cards.profileDesc}</p>
          </div>
          <Link href="/profile" className={styles.commandCardBtn}>
            {d.cards.profileAction} &rarr;
          </Link>
        </div>

        {/* Brand Discovery */}
        <div className={styles.commandCard}>
          <div>
            <div className={styles.commandCardIcon}>💎</div>
            <h3 className={styles.commandCardTitle}>{d.cards.discoverTitle}</h3>
            <p className={styles.commandCardDesc}>{d.cards.discoverDesc}</p>
          </div>
          <Link href="/discover" className={styles.commandCardBtn}>
            {d.cards.discoverAction} &rarr;
          </Link>
        </div>
      </div>
    </main>
  );
}
