import React from 'react';
import { PageHeader } from '@/components/ui/ui';

export default function CookiePolicyPage() {
  return (
    <div style={{ animation: 'panelIn 0.6s ease' }}>
      <h1 style={{ fontSize: '3rem', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', marginBottom: '16px', fontWeight: 400 }}>Cookie Policy</h1>
      <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '48px', lineHeight: 1.6 }}>How we use cookies to provide a personalized, seamless experience.</p>
      
      <div style={{ color: 'var(--text-primary)', lineHeight: 1.8, fontSize: '0.95rem' }}>
        <p style={{ marginBottom: '24px' }}><strong>Effective Date:</strong> October 2026</p>
        
        <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', marginTop: '40px', marginBottom: '16px' }}>1. What Are Cookies?</h3>
        <p style={{ marginBottom: '24px' }}>
          Cookies are small text files that are placed on your device when you visit our website. They are widely used to make websites work more efficiently, as well as to provide information to the owners of the site.
        </p>

        <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', marginTop: '40px', marginBottom: '16px' }}>2. How We Use Cookies</h3>
        <p style={{ marginBottom: '12px' }}>
          We use cookies for the following purposes:
        </p>
        <ul style={{ listStyleType: 'disc', paddingLeft: '24px', marginBottom: '24px' }}>
          <li style={{ marginBottom: '8px' }}><strong>Essential Cookies:</strong> These are required for the operation of VASTRIÉ. They include, for example, cookies that enable you to log into secure areas of our application.</li>
          <li style={{ marginBottom: '8px' }}><strong>Analytical Cookies:</strong> These allow us to recognize and count the number of visitors and to see how visitors move around our website when they are using it.</li>
          <li style={{ marginBottom: '8px' }}><strong>Personalization Cookies:</strong> These are used to recognize you when you return to our website. This enables us to personalize our content for you, greet you by name, and remember your preferences (e.g., your choice of language or theme).</li>
        </ul>

        <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', marginTop: '40px', marginBottom: '16px' }}>3. Managing Cookies</h3>
        <p style={{ marginBottom: '24px' }}>
          You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. If you disable or refuse cookies, please note that some parts of this website may become inaccessible or not function properly, such as maintaining your active login session to the Atelier.
        </p>

        <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', marginTop: '40px', marginBottom: '16px' }}>4. Changes to This Policy</h3>
        <p style={{ marginBottom: '24px' }}>
          We may update this Cookie Policy from time to time in order to reflect changes to the cookies we use or for other operational, legal, or regulatory reasons.
        </p>
      </div>
    </div>
  );
}
