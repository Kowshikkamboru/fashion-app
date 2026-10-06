'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ui as s } from '@/components/ui/ui';

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <header style={{
        position: 'fixed',
        top: 0, left: 0, width: '100%',
        padding: '0 5%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'var(--bg-primary)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
        borderBottom: '1px solid var(--bg-glass-border)',
        zIndex: 1000,
        height: '80px'
      }}>
        <Link href="/" style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '1.5rem',
          fontWeight: 500,
          letterSpacing: '0.1em',
          color: 'var(--text-primary)',
          textDecoration: 'none'
        }}>
          VASTR<span style={{ color: 'var(--accent-primary)' }}>IÉ</span>
        </Link>
        
        <div style={{ display: 'flex', gap: '36px', alignItems: 'center' }}>
          <Link href="/" style={{ color: 'var(--text-primary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600, textDecoration: 'none' }}>
            Back to Home
          </Link>
        </div>
      </header>

      <div style={{ paddingTop: '140px', paddingBottom: '120px', maxWidth: '1200px', margin: '0 auto', paddingLeft: '5%', paddingRight: '5%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '64px', alignItems: 'start' }}>
          <style>{`
            @media (min-width: 768px) {
              .legal-grid { grid-template-columns: 240px 1fr !important; }
            }
            .legal-nav-link {
              display: block;
              padding: 12px 16px;
              color: var(--text-secondary);
              text-decoration: none;
              font-size: 0.85rem;
              font-weight: 600;
              text-transform: uppercase;
              letterSpacing: 0.1em;
              border-left: 2px solid transparent;
              transition: all 0.3s ease;
            }
            .legal-nav-link:hover {
              color: var(--text-primary);
              border-left-color: var(--bg-glass-border);
              background: var(--bg-secondary);
            }
          `}</style>
          
          <div className="legal-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '64px', alignItems: 'start' }}>
            <aside style={{ position: 'sticky', top: '120px' }}>
              <h4 style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '24px', paddingLeft: '16px' }}>
                Legal Directory
              </h4>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <Link href="/legal/privacy" className="legal-nav-link">Privacy Policy</Link>
                <Link href="/legal/terms" className="legal-nav-link">Terms of Service</Link>
                <Link href="/legal/cookies" className="legal-nav-link">Cookie Policy</Link>
              </nav>
            </aside>
            
            <main style={{ maxWidth: '720px' }}>
              {children}
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
