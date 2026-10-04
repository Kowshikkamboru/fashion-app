import styles from './profile.module.css';

export default function ProfilePage() {
  return (
    <main className={`container ${styles.main}`}>
      <div className={styles.header}>
        <h1 className={styles.title}>Personal Style Profile</h1>
        <p className={styles.subtitle}>Your AI stylist uses this to curate your recommendations.</p>
      </div>

      <div className={styles.grid}>
        {/* Physical Profile */}
        <section className={`glass-panel ${styles.card}`}>
          <h2 className={styles.cardTitle}>Physical Profile</h2>
          <div className={styles.formGroup}>
            <label>Body Type</label>
            <div className={styles.tagGroup}>
              <span className={`${styles.tag} ${styles.activeTag}`}>Athletic</span>
              <span className={styles.tag}>Slim</span>
              <span className={styles.tag}>Broad</span>
            </div>
          </div>
          <div className={styles.formGroup}>
            <label>Skin Tone (AI Detected)</label>
            <div className={styles.colorSwatch} style={{ background: '#e0ac69' }}>Warm Olive</div>
          </div>
        </section>

        {/* Style Preferences */}
        <section className={`glass-panel ${styles.card}`}>
          <h2 className={styles.cardTitle}>Style Preferences</h2>
          <div className={styles.formGroup}>
            <label>Primary Vibe</label>
            <div className={styles.tagGroup}>
              <span className={styles.tag}>Streetwear</span>
              <span className={`${styles.tag} ${styles.activeTag}`}>Smart Casual</span>
              <span className={styles.tag}>Minimalist</span>
              <span className={styles.tag}>Classic</span>
            </div>
          </div>
          <div className={styles.formGroup}>
            <label>Color Palette</label>
            <div className={styles.tagGroup}>
              <span className={`${styles.tag} ${styles.activeTag}`}>Neutrals</span>
              <span className={styles.tag}>Earthy Tones</span>
              <span className={`${styles.tag} ${styles.activeTag}`}>Monochrome</span>
            </div>
          </div>
        </section>

        {/* Climate & Lifestyle */}
        <section className={`glass-panel ${styles.card}`}>
          <h2 className={styles.cardTitle}>Context & Lifestyle</h2>
          <div className={styles.formGroup}>
            <label>Primary Climate</label>
            <div className={styles.tagGroup}>
              <span className={styles.tag}>Tropical</span>
              <span className={`${styles.tag} ${styles.activeTag}`}>Moderate / Seasonal</span>
              <span className={styles.tag}>Cold</span>
            </div>
          </div>
          <div className={styles.formGroup}>
            <label>Work Environment</label>
            <div className={styles.tagGroup}>
              <span className={`${styles.tag} ${styles.activeTag}`}>Remote / Casual</span>
              <span className={styles.tag}>Business Casual</span>
              <span className={styles.tag}>Formal</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
