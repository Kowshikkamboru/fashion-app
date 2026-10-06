'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import styles from './ThemeSwitcher.module.css';

interface ThemeSwitcherProps {
  className?: string;
}

export default function ThemeSwitcher({ className }: ThemeSwitcherProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`${styles.switcherContainer} ${className || ''}`} role="group" aria-label="Theme Selector">
      <button
        type="button"
        onClick={toggleTheme}
        className={styles.themeBtn}
        aria-pressed={theme === 'dark'}
        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>
    </div>
  );
}
