"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import styles from './Navigation.module.css';

export default function Navigation() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const { user } = useAuth();

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
          <Link
            href="/auth"
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: user?.isGuest ? 'var(--accent-primary)' : '#fff',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              padding: '6px 14px',
              borderRadius: '16px',
              whiteSpace: 'nowrap',
            }}
            title="Switch User / Guest Mode"
          >
            {user?.isGuest ? '✦ Guest' : '✦ VIP'}
          </Link>
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
}
