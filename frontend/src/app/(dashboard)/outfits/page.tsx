import Image from 'next/image';
import styles from './outfits.module.css';

export default function OutfitsPage() {
  return (
    <main className={`container ${styles.main}`}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>AI Recommendations</h1>
          <p className={styles.subtitle}>Curated looks based on your profile and weather context.</p>
        </div>
      </div>

      <div className={styles.contextBar}>
        <div className={styles.contextItem}>
          <span className={styles.contextIcon}>📍</span> New York, NY
        </div>
        <div className={styles.contextItem}>
          <span className={styles.contextIcon}>🌤️</span> 72°F / Clear
        </div>
        <div className={styles.contextItem}>
          <span className={styles.contextIcon}>📅</span> Friday Evening
        </div>
        <button className={styles.contextBtn}>Change Context</button>
      </div>

      <div className={styles.recommendationCard}>
        <div className={styles.heroImage}>
          <Image src="/images/outfit_recommendation_1791120459094.jpg" alt="Date Night Outfit" fill style={{ objectFit: 'cover' }} />
          <div className={styles.matchScore}>98% Match</div>
        </div>
        <div className={styles.details}>
          <div className={styles.tag}>Date Night</div>
          <h2 className={styles.outfitTitle}>The Riviera Evening</h2>
          <p className={styles.description}>
            Perfect for a smart casual dinner. The breathable linen shirt keeps you comfortable, while the charcoal trousers and suede loafers elevate the look. The minimalist watch adds a touch of understated luxury.
          </p>
          
          <h3 className={styles.sectionTitle}>Items in this look</h3>
          <div className={styles.itemsList}>
            <div className={styles.itemRow}>
              <div className={styles.itemColor} style={{ background: '#2c3e50' }}></div>
              <span className={styles.itemName}>Navy Linen Shirt</span>
              <span className={styles.itemStatus}>In Wardrobe</span>
            </div>
            <div className={styles.itemRow}>
              <div className={styles.itemColor} style={{ background: '#36454F' }}></div>
              <span className={styles.itemName}>Charcoal Tailored Trousers</span>
              <span className={styles.itemStatus}>In Wardrobe</span>
            </div>
            <div className={styles.itemRow}>
              <div className={styles.itemColor} style={{ background: '#5C4033' }}></div>
              <span className={styles.itemName}>Brown Suede Loafers</span>
              <span className={styles.itemStatus}>In Wardrobe</span>
            </div>
          </div>
          
          <div className={styles.actions}>
            <button className="btn btn-primary">Save Outfit</button>
            <button className="btn" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--bg-glass-border)' }}>Skip</button>
          </div>
        </div>
      </div>
    </main>
  );
}
