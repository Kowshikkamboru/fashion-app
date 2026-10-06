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
      <div className={styles.imageSection} />
      
      <div className={styles.formSection}>
        <Link href="/" className={styles.closeBtn} title="Return to Homepage">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back
        </Link>
        
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

          {/* Subtle Guest Option */}
          <div className={styles.divider} style={{ marginTop: '24px' }}>
            <div className={styles.dividerLine} />
            <span className={styles.dividerText}>or</span>
            <div className={styles.dividerLine} />
          </div>
          
          <button type="button" onClick={handleGuest} className={styles.ghostBtn}>
            {a.guestBtn}
          </button>

          <p className={styles.tip} style={{ marginTop: '12px' }}>{a.demoCredentialsNotice}</p>
        </div>
      </div>
    </main>
  );
}
