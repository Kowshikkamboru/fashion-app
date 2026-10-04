"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import styles from './wardrobe.module.css';

interface GarmentItem {
  id: number;
  name: string;
  brand: string;
  category: 'blazers' | 'tops' | 'bottoms' | 'footwear' | 'accessories';
  fabric: string;
  colorName: string;
  colorHex: string;
  season: string;
  matchScore: number;
  image: string;
}

const INITIAL_ITEMS: GarmentItem[] = [
  {
    id: 1,
    name: 'Double-Breasted Wool Blazer',
    brand: 'Canali Bespoke',
    category: 'blazers',
    fabric: '100% High-Twist Wool',
    colorName: 'Midnight Navy',
    colorHex: '#1b2a47',
    season: 'All-Season',
    matchScore: 98,
    image: '/images/wardrobe_blazer_navy.jpg',
  },
  {
    id: 2,
    name: 'French Linen Overshirt',
    brand: 'Boglioli',
    category: 'tops',
    fabric: '100% Normandy Linen',
    colorName: 'Warm Sand',
    colorHex: '#c2b280',
    season: 'Summer',
    matchScore: 96,
    image: '/images/wardrobe_item_1_1791120159509.jpg',
  },
  {
    id: 3,
    name: 'Ribbed Cashmere Crewneck',
    brand: 'Brunello Cucinelli',
    category: 'tops',
    fabric: '100% Heavy-Gauge Cashmere',
    colorName: 'Charcoal Heather',
    colorHex: '#36454f',
    season: 'Autumn/Winter',
    matchScore: 99,
    image: '/images/wardrobe_knit_cashmere.jpg',
  },
  {
    id: 4,
    name: 'Pleated Gurkha Trousers',
    brand: 'Rota Napoli',
    category: 'bottoms',
    fabric: 'Worsted Wool Flannel',
    colorName: 'Slate Charcoal',
    colorHex: '#2f3542',
    season: 'All-Season',
    matchScore: 94,
    image: '/images/wardrobe_item_2_1791120173532.jpg',
  },
  {
    id: 5,
    name: '14oz Redline Selvedge Denim',
    brand: 'Okayama Denim',
    category: 'bottoms',
    fabric: 'Raw Japanese Shuttle Loom Cotton',
    colorName: 'Deep Indigo',
    colorHex: '#1a2938',
    season: 'All-Season',
    matchScore: 95,
    image: '/images/wardrobe_selvedge_denim.jpg',
  },
  {
    id: 6,
    name: 'Hand-Burnished Suede Loafers',
    brand: 'Loro Piana',
    category: 'footwear',
    fabric: 'Moroccan Calf Suede',
    colorName: 'Espresso Brown',
    colorHex: '#4b382a',
    season: 'Spring/Summer',
    matchScore: 97,
    image: '/images/wardrobe_shoes_1791120431069.jpg',
  },
  {
    id: 7,
    name: 'Minimalist Automatic Timepiece',
    brand: 'Nomos Glashütte',
    category: 'accessories',
    fabric: 'Stainless Steel & Sapphire',
    colorName: 'Silver Champagne',
    colorHex: '#e5e4e2',
    season: 'Universal',
    matchScore: 99,
    image: '/images/wardrobe_watch_1791120444507.jpg',
  },
  {
    id: 8,
    name: 'Braided Calfskin Belt & Shades',
    brand: 'Bottega Veneta',
    category: 'accessories',
    fabric: 'Handwoven Calfskin & Acetate',
    colorName: 'Dark Walnut',
    colorHex: '#5c4033',
    season: 'All-Season',
    matchScore: 93,
    image: '/images/wardrobe_leather_accessories.jpg',
  },
];

export default function WardrobePage() {
  const { t } = useLanguage();
  const w = t.wardrobe;

  const [items, setItems] = useState<GarmentItem[]>(INITIAL_ITEMS);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Modal Form State
  const [newGarment, setNewGarment] = useState({
    name: '',
    brand: '',
    category: 'tops' as GarmentItem['category'],
    fabric: '',
    colorName: '',
    colorHex: '#d4af37',
    season: 'All-Season',
  });

  const filteredItems = items.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      item.name.toLowerCase().includes(q) ||
      item.brand.toLowerCase().includes(q) ||
      item.fabric.toLowerCase().includes(q) ||
      item.colorName.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGarment.name) return;

    const newItem: GarmentItem = {
      id: Date.now(),
      name: newGarment.name,
      brand: newGarment.brand || 'Bespoke Atelier',
      category: newGarment.category,
      fabric: newGarment.fabric || 'Pure Italian Cotton',
      colorName: newGarment.colorName || 'Sand Gold',
      colorHex: newGarment.colorHex,
      season: newGarment.season,
      matchScore: 96,
      image: '/images/wardrobe_item_1_1791120159509.jpg',
    };

    setItems([newItem, ...items]);
    setIsModalOpen(false);
    setNewGarment({
      name: '',
      brand: '',
      category: 'tops',
      fabric: '',
      colorName: '',
      colorHex: '#d4af37',
      season: 'All-Season',
    });
  };

  return (
    <main className={styles.main}>
      {/* Wardrobe Header */}
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.badge}>
            <span className={styles.badgeDot}></span>
            {w.badge}
          </div>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className={styles.addBtn}
          >
            {w.addBtn}
          </button>
        </div>
        <h1 className={styles.title}>{w.title}</h1>
        <p className={styles.subtitle}>{w.subtitle}</p>
      </header>

      {/* Wardrobe Intelligence Stats Strip */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>{w.stats.digitized}</span>
          <span className={styles.statValue}>{items.length} Pieces</span>
          <span className={styles.statSubtext}>100% High-Fidelity Cataloged</span>
        </div>

        <div className={styles.statCard}>
          <span className={styles.statLabel}>{w.stats.cohesion}</span>
          <span className={`${styles.statValue} ${styles.statValueGold}`}>94%</span>
          <span className={styles.statSubtext}>Optimal Palette & Drape Alignment</span>
        </div>

        <div className={styles.statCard}>
          <span className={styles.statLabel}>{w.stats.variations}</span>
          <span className={styles.statValue}>42 Looks</span>
          <span className={styles.statSubtext}>Curated for 14 Occasions</span>
        </div>

        <div className={styles.statCard}>
          <span className={styles.statLabel}>{w.stats.gap}</span>
          <span className={styles.statValue} style={{ fontSize: '1.1rem', fontWeight: 600 }}>
            {w.stats.gapDesc}
          </span>
          <span className={styles.statSubtext}>AI Acquisition Priority</span>
        </div>
      </div>

      {/* Toolbar & Filters */}
      <div className={styles.toolbar}>
        <div className={styles.searchBox}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            type="text"
            placeholder={w.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className={styles.filters}>
        <button
          type="button"
          onClick={() => setActiveCategory('all')}
          className={`${styles.filterBtn} ${activeCategory === 'all' ? styles.activeFilter : ''}`}
        >
          {w.filters.all} ({items.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveCategory('blazers')}
          className={`${styles.filterBtn} ${activeCategory === 'blazers' ? styles.activeFilter : ''}`}
        >
          {w.filters.blazers} ({items.filter((i) => i.category === 'blazers').length})
        </button>
        <button
          type="button"
          onClick={() => setActiveCategory('tops')}
          className={`${styles.filterBtn} ${activeCategory === 'tops' ? styles.activeFilter : ''}`}
        >
          {w.filters.tops} ({items.filter((i) => i.category === 'tops').length})
        </button>
        <button
          type="button"
          onClick={() => setActiveCategory('bottoms')}
          className={`${styles.filterBtn} ${activeCategory === 'bottoms' ? styles.activeFilter : ''}`}
        >
          {w.filters.bottoms} ({items.filter((i) => i.category === 'bottoms').length})
        </button>
        <button
          type="button"
          onClick={() => setActiveCategory('footwear')}
          className={`${styles.filterBtn} ${activeCategory === 'footwear' ? styles.activeFilter : ''}`}
        >
          {w.filters.footwear} ({items.filter((i) => i.category === 'footwear').length})
        </button>
        <button
          type="button"
          onClick={() => setActiveCategory('accessories')}
          className={`${styles.filterBtn} ${activeCategory === 'accessories' ? styles.activeFilter : ''}`}
        >
          {w.filters.accessories} ({items.filter((i) => i.category === 'accessories').length})
        </button>
      </div>

      {/* Garments Grid */}
      <div className={styles.grid}>
        {filteredItems.map((item) => (
          <div key={item.id} className={styles.card}>
            <div className={styles.imageWrapper}>
              <Image
                src={item.image}
                alt={item.name}
                fill
                priority={item.id <= 2}
                className={styles.cardImage}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
              <span className={styles.brandTag}>{item.brand}</span>
              <span className={styles.matchTag}>{item.matchScore}% Match</span>
            </div>

            <div className={styles.cardBody}>
              <span className={styles.categoryLabel}>
                {item.category === 'blazers'
                  ? 'Tailoring'
                  : item.category === 'tops'
                  ? 'Top / Knit'
                  : item.category === 'bottoms'
                  ? 'Trouser'
                  : item.category === 'footwear'
                  ? 'Footwear'
                  : 'Accessory'}
              </span>
              <h3 className={styles.cardTitle}>{item.name}</h3>
              <p className={styles.fabricDesc}>{item.fabric}</p>

              <div className={styles.metaRow}>
                <div className={styles.colorIndicator}>
                  <span
                    className={styles.colorDot}
                    style={{ backgroundColor: item.colorHex }}
                  />
                  <span>{item.colorName}</span>
                </div>
                <span className={styles.seasonPill}>{item.season}</span>
              </div>

              <Link href="/outfits" className={styles.cardActionBtn}>
                {w.card.styleLook}
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Digitize Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>{w.modal.title}</h3>
              <p className={styles.modalSubtitle}>{w.modal.subtitle}</p>
            </div>

            <form onSubmit={handleAddItem}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>{w.modal.nameLabel}</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sea Island Cotton Popover"
                  value={newGarment.name}
                  onChange={(e) => setNewGarment({ ...newGarment, name: e.target.value })}
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>{w.modal.brandLabel}</label>
                  <input
                    type="text"
                    placeholder="e.g. Charvet / Loro Piana"
                    value={newGarment.brand}
                    onChange={(e) => setNewGarment({ ...newGarment, brand: e.target.value })}
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>{w.modal.categoryLabel}</label>
                  <select
                    value={newGarment.category}
                    onChange={(e) =>
                      setNewGarment({
                        ...newGarment,
                        category: e.target.value as GarmentItem['category'],
                      })
                    }
                    className={styles.formSelect}
                  >
                    <option value="blazers">Outerwear & Tailoring</option>
                    <option value="tops">Tops & Knitwear</option>
                    <option value="bottoms">Trousers & Denim</option>
                    <option value="footwear">Footwear</option>
                    <option value="accessories">Accessories</option>
                  </select>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>{w.modal.fabricLabel}</label>
                <input
                  type="text"
                  placeholder="e.g. 100% Giza Egyptian Cotton"
                  value={newGarment.fabric}
                  onChange={(e) => setNewGarment({ ...newGarment, fabric: e.target.value })}
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>{w.modal.colorLabel}</label>
                  <input
                    type="text"
                    placeholder="e.g. Crisp Ecru / White"
                    value={newGarment.colorName}
                    onChange={(e) => setNewGarment({ ...newGarment, colorName: e.target.value })}
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>{w.modal.seasonLabel}</label>
                  <select
                    value={newGarment.season}
                    onChange={(e) => setNewGarment({ ...newGarment, season: e.target.value })}
                    className={styles.formSelect}
                  >
                    <option value="All-Season">All-Season</option>
                    <option value="Summer">Summer</option>
                    <option value="Autumn/Winter">Autumn/Winter</option>
                    <option value="Spring">Spring</option>
                  </select>
                </div>
              </div>

              <div className={styles.modalActions}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className={styles.cancelBtn}
                >
                  {w.modal.cancelBtn}
                </button>
                <button type="submit" className={styles.submitBtn}>
                  {w.modal.submitBtn}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
