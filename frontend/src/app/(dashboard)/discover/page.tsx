import Image from 'next/image';
import styles from './discover.module.css';

export default function DiscoverPage() {
  const products = [
    { id: 1, brand: 'Loro Piana', name: 'Summer Walk Loafers', price: '$950', match: '99%', image: '/images/wardrobe_shoes_1791120431069.jpg' },
    { id: 2, name: 'Minimalist Automatic', brand: 'Nomos', price: '$2,200', match: '94%', image: '/images/wardrobe_watch_1791120444507.jpg' },
  ];

  return (
    <main className={`container ${styles.main}`}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Brand Discovery</h1>
          <p className={styles.subtitle}>Curated pieces to fill your wardrobe gaps.</p>
        </div>
      </div>

      <div className={styles.gapAnalysis}>
        <div className={styles.gapHeader}>
          <h2 className={styles.gapTitle}>Wardrobe Gap Analysis</h2>
          <span className={styles.aiBadge}>AI Generated</span>
        </div>
        <p className={styles.gapText}>
          You have an excellent collection of smart casual shirts and trousers, but you lack premium versatile footwear and accessories for evening events.
        </p>
      </div>

      <h3 className={styles.sectionTitle}>Recommended for You</h3>
      
      <div className={styles.grid}>
        {products.map(product => (
          <div key={product.id} className={styles.productCard}>
            <div className={styles.imageWrapper}>
              <Image src={product.image} alt={product.name} fill style={{ objectFit: 'cover' }} />
              <div className={styles.matchScore}>{product.match} Match</div>
            </div>
            <div className={styles.productInfo}>
              <div className={styles.productBrand}>{product.brand}</div>
              <div className={styles.productName}>{product.name}</div>
              <div className={styles.productFooter}>
                <span className={styles.price}>{product.price}</span>
                <button className={styles.buyBtn}>View via Affiliate</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
