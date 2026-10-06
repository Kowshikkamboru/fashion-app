import React from 'react';
import { PageHeader } from '@/components/ui/ui';

export default function PrivacyPolicyPage() {
  return (
    <div style={{ animation: 'panelIn 0.6s ease' }}>
      <h1 style={{ fontSize: '3rem', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', marginBottom: '16px', fontWeight: 400 }}>Privacy Policy</h1>
      <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '48px', lineHeight: 1.6 }}>How we handle, protect, and use your personal information at VASTRIÉ.</p>
      
      <div style={{ color: 'var(--text-primary)', lineHeight: 1.8, fontSize: '0.95rem' }}>
        <p style={{ marginBottom: '24px' }}><strong>Effective Date:</strong> October 2026</p>
        
        <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', marginTop: '40px', marginBottom: '16px' }}>1. Introduction</h3>
        <p style={{ marginBottom: '24px' }}>
          At VASTRIÉ ("we", "our", or "us"), your privacy is our priority. As a luxury personal styling operating system, we handle highly personal data regarding your wardrobe, measurements, and lifestyle. This Privacy Policy explains how we collect, use, and protect your data.
        </p>

        <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', marginTop: '40px', marginBottom: '16px' }}>2. Information We Collect</h3>
        <p style={{ marginBottom: '24px' }}>
          <strong>Account Information:</strong> Name, email address, and billing details.<br/>
          <strong>Style Data:</strong> Photos of your clothing, sizing, stylistic preferences, and event calendars.<br/>
          <strong>Usage Data:</strong> How you interact with the VASTRIÉ platform and AI recommendations.
        </p>

        <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', marginTop: '40px', marginBottom: '16px' }}>3. How We Use Your Data</h3>
        <p style={{ marginBottom: '24px' }}>
          Your data is used exclusively to provide you with personalized styling recommendations and to maintain your digital wardrobe. We <strong>never</strong> sell your personal data or wardrobe information to third-party advertisers or data brokers.
        </p>

        <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', marginTop: '40px', marginBottom: '16px' }}>4. Data Security</h3>
        <p style={{ marginBottom: '24px' }}>
          We employ industry-standard security measures, including end-to-end encryption for your wardrobe images and two-factor authentication (2FA) for your account, to ensure your digital closet remains private.
        </p>

        <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', marginTop: '40px', marginBottom: '16px' }}>5. Your Rights</h3>
        <p style={{ marginBottom: '24px' }}>
          You retain full ownership of your data. You may export your entire digital wardrobe or request complete deletion of your account and associated data at any time via your Account Settings.
        </p>
      </div>
    </div>
  );
}
