'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './LanguageSwitcher.module.css';

interface LanguageSwitcherProps {
  className?: string;
}

export default function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();

  return (
    <div className={`${styles.switcherContainer} ${className || ''}`} role="group" aria-label="Language Selector">
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`${styles.langBtn} ${language === 'en' ? styles.active : ''}`}
        aria-pressed={language === 'en'}
        title="English"
      >
        EN
      </button>
      <span className={styles.divider} aria-hidden="true" />
      <button
        type="button"
        onClick={() => setLanguage('fr')}
        className={`${styles.langBtn} ${language === 'fr' ? styles.active : ''}`}
        aria-pressed={language === 'fr'}
        title="Français"
      >
        FR
      </button>
    </div>
  );
}
