export interface GarmentItem {
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
  price: number;
  wears: number;
  care: string;
  origin: string;
}

/** Catalogue used by the single-item detail, search, planner, reports and public profile. */
export const GARMENTS: GarmentItem[] = [
  { id: 1, name: 'Double-Breasted Wool Blazer', brand: 'Canali Bespoke', category: 'blazers', fabric: '100% High-Twist Wool', colorName: 'Midnight Navy', colorHex: '#1b2a47', season: 'All-Season', matchScore: 98, image: '/images/wardrobe_blazer_navy.jpg', price: 1890, wears: 34, care: 'Dry clean only. Rest 48h between wears.', origin: 'Made in Italy' },
  { id: 2, name: 'French Linen Overshirt', brand: 'Boglioli', category: 'tops', fabric: '100% Normandy Linen', colorName: 'Warm Sand', colorHex: '#c2b280', season: 'Summer', matchScore: 96, image: '/images/wardrobe_item_1_1791120159509.jpg', price: 420, wears: 21, care: 'Gentle machine wash at 30°C. Line dry.', origin: 'Made in Italy' },
  { id: 3, name: 'Ribbed Cashmere Crewneck', brand: 'Brunello Cucinelli', category: 'tops', fabric: '100% Heavy-Gauge Cashmere', colorName: 'Charcoal Heather', colorHex: '#36454f', season: 'Autumn/Winter', matchScore: 99, image: '/images/wardrobe_knit_cashmere.jpg', price: 1150, wears: 27, care: 'Hand wash cold. Dry flat. Store folded.', origin: 'Made in Italy' },
  { id: 4, name: 'Pleated Gurkha Trousers', brand: 'Rota Napoli', category: 'bottoms', fabric: 'Worsted Wool Flannel', colorName: 'Slate Charcoal', colorHex: '#2f3542', season: 'All-Season', matchScore: 94, image: '/images/wardrobe_item_2_1791120173532.jpg', price: 540, wears: 18, care: 'Dry clean. Steam to refresh pleats.', origin: 'Made in Italy' },
  { id: 5, name: '14oz Redline Selvedge Denim', brand: 'Okayama Denim', category: 'bottoms', fabric: 'Raw Japanese Shuttle Loom Cotton', colorName: 'Deep Indigo', colorHex: '#1a2938', season: 'All-Season', matchScore: 95, image: '/images/wardrobe_selvedge_denim.jpg', price: 320, wears: 52, care: 'Wash rarely, inside out, cold.', origin: 'Made in Japan' },
  { id: 6, name: 'Hand-Burnished Suede Loafers', brand: 'Loro Piana', category: 'footwear', fabric: 'Moroccan Calf Suede', colorName: 'Espresso Brown', colorHex: '#4b382a', season: 'Spring/Summer', matchScore: 97, image: '/images/wardrobe_shoes_1791120431069.jpg', price: 790, wears: 29, care: 'Brush with suede brush. Use cedar trees.', origin: 'Made in Italy' },
  { id: 7, name: 'Minimalist Automatic Timepiece', brand: 'Nomos Glashütte', category: 'accessories', fabric: 'Stainless Steel & Sapphire', colorName: 'Silver Champagne', colorHex: '#e5e4e2', season: 'Universal', matchScore: 99, image: '/images/wardrobe_watch_1791120444507.jpg', price: 2400, wears: 88, care: 'Service every 5 years. Avoid magnets.', origin: 'Made in Germany' },
  { id: 8, name: 'Braided Calfskin Belt & Shades', brand: 'Bottega Veneta', category: 'accessories', fabric: 'Handwoven Calfskin & Acetate', colorName: 'Dark Walnut', colorHex: '#5c4033', season: 'All-Season', matchScore: 93, image: '/images/wardrobe_leather_accessories.jpg', price: 680, wears: 40, care: 'Wipe with a dry cloth. Condition twice a year.', origin: 'Made in Italy' },
];

export const CATEGORY_LABEL: Record<GarmentItem['category'], string> = {
  blazers: 'Outerwear & Tailoring',
  tops: 'Tops & Knitwear',
  bottoms: 'Trousers & Denim',
  footwear: 'Footwear',
  accessories: 'Accessories',
};

export const costPerWear = (g: GarmentItem) => g.price / Math.max(1, g.wears);
