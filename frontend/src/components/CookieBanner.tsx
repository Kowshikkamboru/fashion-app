'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [show, setShow] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  
  // Settings state
  const [prefs, setPrefs] = useState({
    essential: true, // always true
    analytical: true,
    personalization: true
  });

  useEffect(() => {
    const consent = localStorage.getItem('vastrie_cookie_consent');
    if (!consent) {
      setShow(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('vastrie_cookie_consent', 'accepted');
    localStorage.setItem('vastrie_cookie_prefs', JSON.stringify({ essential: true, analytical: true, personalization: true }));
    setShow(false);
  };

  const handleDecline = () => {
    localStorage.setItem('vastrie_cookie_consent', 'declined');
    localStorage.setItem('vastrie_cookie_prefs', JSON.stringify({ essential: true, analytical: false, personalization: false }));
    setShow(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('vastrie_cookie_consent', 'custom');
    localStorage.setItem('vastrie_cookie_prefs', JSON.stringify(prefs));
    setShow(false);
    setShowPreferences(false);
  };

  if (!show) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      left: '24px',
      width: '380px',
      maxWidth: 'calc(100vw - 48px)',
      background: 'var(--bg-secondary)',
      border: '1px solid var(--bg-glass-border)',
      boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
      padding: '24px',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      borderRadius: '2px',
      animation: 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
    }}>
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
      
      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '0.95rem', color: 'var(--text-primary)', fontFamily: 'var(--font-heading)', letterSpacing: '0.05em' }}>
          Your privacy
        </h4>
        <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          We use cookies to elevate your experience. By clicking "Accept All", you consent to our <Link href="/legal/cookies" style={{ color: 'var(--text-primary)', textDecoration: 'underline' }}>Cookie Policy</Link>.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <button
          onClick={handleAccept}
          style={{
            width: '100%',
            padding: '12px',
            background: 'var(--text-primary)',
            border: '1px solid var(--text-primary)',
            color: 'var(--bg-primary)',
            fontSize: '0.75rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-primary)'; }}
          onMouseOut={(e) => { e.currentTarget.style.background = 'var(--text-primary)'; e.currentTarget.style.color = 'var(--bg-primary)'; }}
        >
          Accept All
        </button>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setShowPreferences(true)}
            style={{
              flex: 1,
              padding: '10px',
              background: 'transparent',
              border: '1px solid var(--bg-glass-border)',
              color: 'var(--text-primary)',
              fontSize: '0.7rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--text-primary)'}
            onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--bg-glass-border)'}
          >
            Preferences
          </button>
          <button
            onClick={handleDecline}
            style={{
              flex: 1,
              padding: '10px',
              background: 'transparent',
              border: '1px solid var(--bg-glass-border)',
              color: 'var(--text-primary)',
              fontSize: '0.7rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--text-primary)'}
            onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--bg-glass-border)'}
          >
            Decline All
          </button>
        </div>
      </div>

      {showPreferences && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
          padding: '24px'
        }}>
          <div style={{
            background: 'var(--bg-primary)',
            border: '1px solid var(--bg-glass-border)',
            width: '100%',
            maxWidth: '500px',
            padding: '32px',
            borderRadius: '2px',
            boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
            animation: 'slideUp 0.4s ease'
          }}>
            <h3 style={{ margin: '0 0 24px', fontSize: '1.4rem', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>Cookie Preferences</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h5 style={{ margin: '0 0 4px', fontSize: '0.9rem', color: 'var(--text-primary)' }}>Strictly Necessary</h5>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Required for the website to function.</p>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase' }}>Always Active</div>
              </div>
              
              <div style={{ height: '1px', background: 'var(--bg-glass-border)' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h5 style={{ margin: '0 0 4px', fontSize: '0.9rem', color: 'var(--text-primary)' }}>Analytical Cookies</h5>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Help us improve our website by analyzing usage.</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={prefs.analytical} 
                  onChange={(e) => setPrefs({...prefs, analytical: e.target.checked})}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--text-primary)', cursor: 'pointer' }}
                />
              </div>

              <div style={{ height: '1px', background: 'var(--bg-glass-border)' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h5 style={{ margin: '0 0 4px', fontSize: '0.9rem', color: 'var(--text-primary)' }}>Personalization Cookies</h5>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Used to remember your preferences and settings.</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={prefs.personalization} 
                  onChange={(e) => setPrefs({...prefs, personalization: e.target.checked})}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--text-primary)', cursor: 'pointer' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setShowPreferences(false)}
                style={{
                  flex: 1, padding: '12px', background: 'transparent', border: '1px solid var(--text-secondary)', color: 'var(--text-primary)',
                  fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer'
                }}
              >
                Back
              </button>
              <button
                onClick={handleSavePreferences}
                style={{
                  flex: 1, padding: '12px', background: 'var(--text-primary)', border: '1px solid var(--text-primary)', color: 'var(--bg-primary)',
                  fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer'
                }}
              >
                Save My Choices
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
