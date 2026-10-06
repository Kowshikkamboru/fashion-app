"use client";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import styles from './Navigation.module.css';

export default function Navigation() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const links = [
    { name: t.nav.dashboard, href: '/dashboard' },
    { name: t.nav.wardrobe, href: '/wardrobe' },
    { name: t.nav.outfits, href: '/outfits' },
    { name: t.nav.discover, href: '/discover' },
    { name: t.nav.profile, href: '/profile' },
  ];

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <Link href="/dashboard" className={styles.logo}>
          VASTR<span className={styles.logoAccent}>IÉ</span>
        </Link>
        <div className={styles.links}>
          {links.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className={`${styles.link} ${pathname === link.href ? styles.active : ''}`}
            >
              {link.name}
            </Link>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {user ? (
            <>
              <Link
                href="/auth"
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: user.isGuest ? 'var(--text-primary)' : 'var(--accent-primary)',
                  background: user.isGuest ? 'rgba(255, 255, 255, 0.05)' : 'rgba(212, 175, 55, 0.05)',
                  border: `1px solid ${user.isGuest ? 'var(--bg-glass-border)' : 'var(--accent-primary)'}`,
                  padding: '6px 12px',
                  borderRadius: '2px',
                  whiteSpace: 'nowrap',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease'
                }}
                title="Switch User / Guest Mode"
              >
                {user.isGuest ? 'Guest Access' : 'VIP Member'}
              </Link>
              <button className={styles.notificationBtn} title="Notifications">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
                <span className={styles.badge}>3</span>
              </button>
              
              <div style={{ width: '1px', height: '16px', background: 'var(--bg-glass-border)' }} />
              
              <button
                onClick={handleLogout}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '4px',
                  transition: 'color 0.3s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                title="Logout"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
              </button>
            </>
          ) : (
            <Link
              href="/auth"
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--text-primary)',
                background: 'transparent',
                border: '1px solid var(--text-primary)',
                padding: '6px 14px',
                borderRadius: '2px',
                whiteSpace: 'nowrap',
              }}
            >
              Sign In
            </Link>
          )}
          
          <div style={{ width: '1px', height: '16px', background: 'var(--bg-glass-border)', marginLeft: '4px', marginRight: '4px' }} />
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <ThemeSwitcher />
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
}
