'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, Language } from '@/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations['en'];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // 1. Check if user already manually selected a language
    const saved = localStorage.getItem('vastrie_lang') as Language | null;
    if (saved === 'en' || saved === 'fr') {
      setLanguageState(saved);
      return;
    }

    // 2. Region / Browser based detection (France -> 'fr', Others -> 'en')
    let detectedFr = false;

    try {
      // Check browser locale (e.g. fr-FR, fr)
      const browserLanguages = navigator.languages || [navigator.language || ''];
      const hasFrenchLocale = browserLanguages.some(
        (l) => l.toLowerCase().startsWith('fr')
      );

      // Check timezone for France (Europe/Paris)
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      const isFranceTimezone = tz.toLowerCase().includes('paris') || tz.toLowerCase().includes('monaco');

      if (hasFrenchLocale || isFranceTimezone) {
        detectedFr = true;
      }
    } catch {
      // Ignore detection errors, default remains 'en'
    }

    if (detectedFr) {
      setLanguageState('fr');
    } else {
      // Default to English for all regions other than France
      setLanguageState('en');
    }

    // 3. Optional non-blocking IP region check for accuracy
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    fetch('https://ipapi.co/json/', { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        clearTimeout(timeoutId);
        // Only override if user hasn't made a manual choice during load
        if (!localStorage.getItem('vastrie_lang')) {
          if (data && (data.country === 'FR' || data.country_code === 'FR')) {
            setLanguageState('fr');
          } else {
            // Confirm English default for all other regions
            setLanguageState('en');
          }
        }
      })
      .catch(() => {
        // Fallback gracefully to browser/timezone result
      });
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('vastrie_lang', lang);
  };

  const t = translations[language] || translations.en;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
