"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import styles from './auth.module.css';

export default function AuthPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const { loginAsGuest, login } = useAuth();
  const a = t.auth;

  const [tab, setTab] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleGuest = () => {
    loginAsGuest();
    router.push('/dashboard');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email || 'member@vastrie.com', name || 'Atelier Client');
    router.push('/dashboard');
  };

  return (
    <main className={styles.main}>
      <div style={{ position: 'absolute', top: '24px', right: '32px' }}>
        <LanguageSwitcher />
      </div>

      <div className={styles.authCard}>
        <Link href="/" className={styles.logo}>
          VASTR<span className={styles.logoAccent}>IÉ</span>
        </Link>
        <div className={styles.tagline}>Maison de Style & Intelligence</div>

        <h1 className={styles.title}>{a.title}</h1>
        <p className={styles.subtitle}>{a.subtitle}</p>

        {/* Guest Mode Hero Feature */}
        <div className={styles.guestBox}>
          <div className={styles.guestBadge}>✦ {a.guestBadge}</div>
          <button type="button" onClick={handleGuest} className={styles.guestBtn}>
            {a.guestBtn}
          </button>
          <p className={styles.guestDesc}>{a.guestDesc}</p>
        </div>

        {/* Divider */}
        <div className={styles.divider}>
          <div className={styles.dividerLine} />
          <span className={styles.dividerText}>{a.orDivider}</span>
          <div className={styles.dividerLine} />
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          <button
            type="button"
            onClick={() => setTab('signin')}
            className={`${styles.tab} ${tab === 'signin' ? styles.activeTab : ''}`}
          >
            {a.tabSignIn}
          </button>
          <button
            type="button"
            onClick={() => setTab('signup')}
            className={`${styles.tab} ${tab === 'signup' ? styles.activeTab : ''}`}
          >
            {a.tabSignUp}
          </button>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className={styles.form}>
          {tab === 'signup' && (
            <div className={styles.formGroup}>
              <label>{a.nameLabel}</label>
              <input
                type="text"
                required
                placeholder="e.g. Lord Sterling"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={styles.input}
              />
            </div>
          )}

          <div className={styles.formGroup}>
            <label>{a.emailLabel}</label>
            <input
              type="email"
              required
              placeholder="client@vastrie.atelier"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label>{a.passwordLabel}</label>
            <input
              type="password"
              required
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
            {tab === 'signin' ? a.signInSubmit : a.signUpSubmit}
          </button>
        </form>

        <p className={styles.tip}>{a.demoCredentialsNotice}</p>
      </div>
    </main>
  );
}
