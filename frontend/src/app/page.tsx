"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import styles from "./page.module.css";

export default function Home() {
  const { t, language } = useLanguage();
  const [occasion, setOccasion] = useState('cocktail');
  const [climate, setClimate] = useState('summer');

  return (
    <main className={styles.main}>
      {/* Navigation */}
      <nav className={styles.nav}>
        <div className={styles.navContainer}>
          <div className={styles.logo}>
            VASTR<span className={styles.logoAccent}>IÉ</span>
          </div>
          <div className={styles.navLinks}>
            <a href="#story" className={styles.navLink}>{t.nav.story}</a>
            <a href="#what-we-do" className={styles.navLink}>{t.nav.expertise}</a>
            <a href="#who-we-help" className={styles.navLink}>{t.nav.clients}</a>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <LanguageSwitcher />
            <Link href="/profile" className={styles.navBtn}>
              {t.nav.enterAtelier}
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        className={styles.hero}
        style={{
          backgroundImage: 'url(/images/editorial_hero_1791120796342.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 20%'
        }}
      >
        <div className={styles.heroOverlay}></div>
        
        <div className={`container ${styles.heroContainer}`}>
          <div className={styles.heroContent}>
            <div className={`${styles.tagline} animate-fade-in`}>{t.hero.badge}</div>
            <h1 className={`${styles.title} animate-fade-in animate-delay-1`}>
              {t.hero.title}
            </h1>
            <p className={`${styles.description} animate-fade-in animate-delay-2`}>
              {t.hero.subtitle}
            </p>
          </div>

          {/* Interactive Widget */}
          <div className={`${styles.heroWidget} animate-fade-in animate-delay-3 glass-panel`}>
            <div className={styles.widgetHeader}>
              <span className={styles.widgetDot}></span> {t.widget.badge}
            </div>
            <h3 className={styles.widgetTitle}>{t.widget.title}</h3>
            
            <div className={styles.inputGroup}>
              <label>{t.widget.occasionLabel}</label>
              <select 
                value={occasion} 
                onChange={(e) => setOccasion(e.target.value)}
                className={styles.select}
              >
                <option value="cocktail">{t.widget.occasions.cocktail}</option>
                <option value="business">{t.widget.occasions.business}</option>
                <option value="casual">{t.widget.occasions.casual}</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label>{t.widget.climateLabel}</label>
              <select 
                value={climate} 
                onChange={(e) => setClimate(e.target.value)}
                className={styles.select}
              >
                <option value="summer">{t.widget.climates.summer}</option>
                <option value="spring">{t.widget.climates.spring}</option>
                <option value="autumn">{t.widget.climates.autumn}</option>
              </select>
            </div>

            <Link href="/outfits" className={styles.widgetBtn}>
              {language === 'fr' ? 'Générer la Recommandation IA →' : 'Generate AI Recommendation →'}
            </Link>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section id="story" className={styles.sectionSplit}>
        <div className={styles.splitImage} style={{ backgroundImage: 'url(/images/story_image_1791120813277.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        </div>
        <div className={styles.splitContent}>
          <h4 className={styles.sectionLabel}>{t.story.label}</h4>
          <h2 className={styles.sectionTitle}>{t.story.title}</h2>
          <p className={styles.sectionText}>
            {t.story.p1}
          </p>
          <p className={styles.sectionText}>
            {t.story.p2}
          </p>
        </div>
      </section>

      {/* What We Do Section */}
      <section id="what-we-do" className={`section ${styles.featuresSection}`}>
        <div className="container">
          <div className={styles.sectionHeaderCentered}>
            <h4 className={styles.sectionLabel}>{t.services.label}</h4>
            <h2 className={styles.sectionTitleCentered}>{t.services.title}</h2>
          </div>
          
          <div className={styles.grid}>
            <div className={styles.featureCard}>
              <div className={styles.featureNumber}>{t.services.c1.num}</div>
              <h3 className={styles.featureTitle}>{t.services.c1.title}</h3>
              <p className={styles.featureDesc}>
                {t.services.c1.desc}
              </p>
            </div>
            
            <div className={styles.featureCard}>
              <div className={styles.featureNumber}>{t.services.c2.num}</div>
              <h3 className={styles.featureTitle}>{t.services.c2.title}</h3>
              <p className={styles.featureDesc}>
                {t.services.c2.desc}
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureNumber}>{t.services.c3.num}</div>
              <h3 className={styles.featureTitle}>{t.services.c3.title}</h3>
              <p className={styles.featureDesc}>
                {t.services.c3.desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Help Section */}
      <section id="who-we-help" className={styles.sectionSplitReverse}>
        <div className={styles.splitImage} style={{ backgroundImage: 'url(/images/who_we_help_1791120827211.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        </div>
        <div className={styles.splitContent}>
          <h4 className={styles.sectionLabel}>{t.clients.label}</h4>
          <h2 className={styles.sectionTitle}>{t.clients.title}</h2>
          <p className={styles.sectionText}>
            {t.clients.p1}
          </p>
          <p className={styles.sectionText}>
            {t.clients.p2}
          </p>
          <Link href="/profile" className={styles.linkBtn}>{t.clients.cta} &rarr;</Link>
        </div>
      </section>
      
      {/* Footer */}
      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerLogo}>VASTRIÉ</div>
          <p className={styles.footerText}>{t.footer.copyright}</p>
        </div>
      </footer>
    </main>
  );
}
