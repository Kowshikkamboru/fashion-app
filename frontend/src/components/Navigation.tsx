"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import styles from './Navigation.module.css';

export default function Navigation() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const links = [
    { name: t.nav.home, href: '/' },
    { name: t.nav.profile, href: '/profile' },
    { name: t.nav.wardrobe, href: '/wardrobe' },
    { name: t.nav.outfits, href: '/outfits' },
    { name: t.nav.discover, href: '/discover' },
  ];

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
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
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
}
