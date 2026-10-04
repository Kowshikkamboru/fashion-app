"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [occasion, setOccasion] = useState('Date Night');
  const [climate, setClimate] = useState('Summer (75°F+)');

  return (
    <main className={styles.main}>
      {/* Navigation */}
      <nav className={styles.nav}>
        <div className={styles.navContainer}>
          <div className={styles.logo}>
            VASTR<span className={styles.logoAccent}>IÉ</span>
          </div>
          <div className={styles.navLinks}>
            <a href="#story" className={styles.navLink}>Our Story</a>
            <a href="#what-we-do" className={styles.navLink}>Expertise</a>
            <a href="#who-we-help" className={styles.navLink}>Clients</a>
          </div>
          <Link href="/profile" className={styles.navBtn}>
            Enter the Atelier
          </Link>
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
            <div className={`${styles.tagline} animate-fade-in`}>Maison de l'Intelligence</div>
            <h1 className={`${styles.title} animate-fade-in animate-delay-1`}>
              Mastering the Art of <br />Personal Style.
            </h1>
            <p className={`${styles.description} animate-fade-in animate-delay-2`}>
              We blend traditional European sartorial elegance with advanced artificial intelligence to curate your perfect digital wardrobe.
            </p>
          </div>

          {/* Interactive Widget to draw users in */}
          <div className={`${styles.heroWidget} animate-fade-in animate-delay-3 glass-panel`}>
            <div className={styles.widgetHeader}>
              <span className={styles.widgetDot}></span> Live AI Styling
            </div>
            <h3 className={styles.widgetTitle}>Curate Your Look</h3>
            
            <div className={styles.inputGroup}>
              <label>The Occasion</label>
              <select 
                value={occasion} 
                onChange={(e) => setOccasion(e.target.value)}
                className={styles.select}
              >
                <option>Date Night</option>
                <option>Business Meeting</option>
                <option>Weekend Getaway</option>
                <option>Summer Gala</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label>The Environment</label>
              <select 
                value={climate} 
                onChange={(e) => setClimate(e.target.value)}
                className={styles.select}
              >
                <option>Summer (75°F+)</option>
                <option>Crisp Autumn (50°F+)</option>
                <option>Winter Formal</option>
                <option>Tropical Resort</option>
              </select>
            </div>

            <Link href="/outfits" className={styles.widgetBtn}>
              Generate AI Recommendation &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section id="story" className={styles.sectionSplit}>
        <div className={styles.splitImage} style={{ backgroundImage: 'url(/images/story_image_1791120813277.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        </div>
        <div className={styles.splitContent}>
          <h4 className={styles.sectionLabel}>Our Heritage</h4>
          <h2 className={styles.sectionTitle}>Craftsmanship meets computation.</h2>
          <p className={styles.sectionText}>
            At Vastrié, we believe that true style is a combination of timeless rules and personal expression. We studied the grand tailors of Savile Row and Milan to understand the geometry of fit, the harmony of color, and the language of fabric.
          </p>
          <p className={styles.sectionText}>
            We then encoded this knowledge into a proprietary Fashion Knowledge Graph. We aren't just an app; we are your dedicated digital stylist, preserving the intimacy of bespoke tailoring while leveraging the scale of AI.
          </p>
        </div>
      </section>

      {/* What We Do Section */}
      <section id="what-we-do" className={`section ${styles.featuresSection}`}>
        <div className="container">
          <div className={styles.sectionHeaderCentered}>
            <h4 className={styles.sectionLabel}>Our Services</h4>
            <h2 className={styles.sectionTitleCentered}>A complete operating system for your wardrobe.</h2>
          </div>
          
          <div className={styles.grid}>
            <div className={styles.featureCard}>
              <div className={styles.featureNumber}>01</div>
              <h3 className={styles.featureTitle}>The Digital Atelier</h3>
              <p className={styles.featureDesc}>
                Digitize your closet. We create a meticulous inventory of your garments, allowing our AI to understand what you own and identify critical wardrobe gaps.
              </p>
            </div>
            
            <div className={styles.featureCard}>
              <div className={styles.featureNumber}>02</div>
              <h3 className={styles.featureTitle}>Contextual Styling</h3>
              <p className={styles.featureDesc}>
                Whether you are attending a summer gala in the Riviera or a board meeting in London, our engine curates the perfect outfit for the exact climate, occasion, and your specific body type.
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureNumber}>03</div>
              <h3 className={styles.featureTitle}>Curated Acquisition</h3>
              <p className={styles.featureDesc}>
                We do not recommend generic fashion. Our engine suggests premium, complementary pieces from heritage brands that perfectly align with your aesthetic.
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
          <h4 className={styles.sectionLabel}>Our Clients</h4>
          <h2 className={styles.sectionTitle}>For the modern professional.</h2>
          <p className={styles.sectionText}>
            Our clients are men who understand that dressing well is a form of good manners. They are leaders, creatives, and professionals who demand excellence in their appearance but lack the time to endlessly curate their wardrobes.
          </p>
          <p className={styles.sectionText}>
            We remove the decision fatigue from getting dressed, ensuring you step out with confidence every single day.
          </p>
          <Link href="/profile" className={styles.linkBtn}>Begin Your Journey &rarr;</Link>
        </div>
      </section>
      
      {/* Footer */}
      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerLogo}>VASTRIÉ</div>
          <p className={styles.footerText}>© 2026 Vastrié. The Future of Personal Styling.</p>
        </div>
      </footer>
    </main>
  );
}
