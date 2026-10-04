# VASTRIÉ — Frontend Application

> **The Master of Personal Style** — An AI-powered personal fashion platform for men.

---

## 🏛️ Brand Heritage & Name Reference

* **Name:** **VASTRIÉ**
* **Pronunciation:** `/vɑːs.tʁi.e/` (**"vas-tree-ay"**)
* **Etymology & Origin:**
  * **Vastra (वस्त्र):** Classical Sanskrit (*Bharat*) root meaning *garment*, *fabric*, and the timeless science of weaving, fine dyeing, and textile artistry that historically anchored global luxury trade.
  * **-IÉ / -IER:** Prestigious French couture suffix designating the **Master Artisan** (e.g., *Couturier*, *Joaillier*, *Bottier*, *Atelier*).
  * **Unified Meaning:** **"The Master Artisan of Clothing"** — Honoring ancestral textile origins through a sleek Parisian/Milanese luxury identity.
* **Natural Pronunciation Cadence:** The French acute accent `É` guides global and luxury audiences to instinctively pronounce it as **"vas-tree-ay"** (matching the natural rhythm of *Cartier*, *Atelier*, *Hermès*, and *Céline*).

---

## 💻 Development Setup

```bash
# Install dependencies
npm install

# Start local development server
npm run dev
```

Server will run on [http://localhost:3000](http://localhost:3000).

---

## 📂 Project Structure

* `src/app/` — Next.js App Router (Landing Page, Layout, Global Styles)
* `src/app/(dashboard)/` — Core platform routes:
  * `/profile` — Client taste & silhouette configuration
  * `/wardrobe` — The Digital Atelier closet manager
  * `/outfits` — Contextual AI styling and generation
  * `/discover` — Lookbooks and capsule collections
* `src/components/` — Modular UI components (Navigation, cards, widgets, LanguageSwitcher)
* `src/context/` — React Contexts (LanguageContext with auto-detection & persistence)
* `src/translations/` — Bilingual dictionaries (English & French)
* `public/images/` — Editorial photography assets

---

## 🌐 Localization & Regional Detection

* **Default Language Strategy:** 
  * If the user accesses the platform from **France** (detected via browser locale `fr`, Paris timezone `Europe/Paris`, or geo-IP `FR`), the platform defaults to **Français (`FR`)**.
  * For all other international regions, the platform defaults to **English (`EN`)**.
* **Manual Switcher:** A sleek glassmorphic pill switcher `[ EN | FR ]` is embedded in the navigation bar. User preferences are persisted in `localStorage`.

---

© 2026 VASTRIÉ. All rights reserved.
