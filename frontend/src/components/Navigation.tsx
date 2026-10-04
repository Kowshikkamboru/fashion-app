"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navigation.module.css';

export default function Navigation() {
  const pathname = usePathname();

  const links = [
    { name: 'Home', href: '/' },
    { name: 'Profile', href: '/profile' },
    { name: 'Wardrobe', href: '/wardrobe' },
    { name: 'Outfits', href: '/outfits' },
    { name: 'Discover', href: '/discover' },
  ];

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          INNOV<span className={styles.logoAccent}>YASA</span>
        </Link>
        <div className={styles.links}>
          {links.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className={`${styles.link} ${pathname === link.href ? styles.active : ''}`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
