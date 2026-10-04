import Image from 'next/image';
import styles from './wardrobe.module.css';

export default function WardrobePage() {
  const items = [
    { id: 1, name: 'Premium Linen Shirt', category: 'Tops', image: '/images/wardrobe_item_1_1791120159509.jpg' },
    { id: 2, name: 'Charcoal Trousers', category: 'Bottoms', image: '/images/wardrobe_item_2_1791120173532.jpg' },
    { id: 3, name: 'Suede Penny Loafers', category: 'Footwear', image: '/images/wardrobe_shoes_1791120431069.jpg' },
    { id: 4, name: 'Minimalist Dress Watch', category: 'Accessories', image: '/images/wardrobe_watch_1791120444507.jpg' },
  ];

  return (
    <main className={`container ${styles.main}`}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Digital Wardrobe</h1>
          <p className={styles.subtitle}>4 Items Digitized • 82% Cohesion Score</p>
        </div>
        <button className="btn btn-primary">+ Add Item</button>
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        <button className={`${styles.filterBtn} ${styles.active}`}>All</button>
        <button className={styles.filterBtn}>Tops</button>
        <button className={styles.filterBtn}>Bottoms</button>
        <button className={styles.filterBtn}>Footwear</button>
        <button className={styles.filterBtn}>Accessories</button>
      </div>

      <div className={styles.grid}>
        {items.map(item => (
          <div key={item.id} className={styles.itemCard}>
            <div className={styles.imageWrapper}>
              <Image src={item.image} alt={item.name} fill style={{ objectFit: 'cover' }} />
            </div>
            <div className={styles.itemInfo}>
              <div className={styles.itemCategory}>{item.category}</div>
              <div className={styles.itemName}>{item.name}</div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
