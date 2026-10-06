import React from 'react';
import { PageHeader } from '@/components/ui/ui';

export default function TermsOfServicePage() {
  return (
    <div style={{ animation: 'panelIn 0.6s ease' }}>
      <h1 style={{ fontSize: '3rem', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', marginBottom: '16px', fontWeight: 400 }}>Terms of Service</h1>
      <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '48px', lineHeight: 1.6 }}>The rules and guidelines for using the VASTRIÉ platform.</p>
      
      <div style={{ color: 'var(--text-primary)', lineHeight: 1.8, fontSize: '0.95rem' }}>
        <p style={{ marginBottom: '24px' }}><strong>Effective Date:</strong> October 2026</p>
        
        <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', marginTop: '40px', marginBottom: '16px' }}>1. Acceptance of Terms</h3>
        <p style={{ marginBottom: '24px' }}>
          By accessing or using VASTRIÉ, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
        </p>

        <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', marginTop: '40px', marginBottom: '16px' }}>2. Subscription and Billing</h3>
        <p style={{ marginBottom: '24px' }}>
          VASTRIÉ operates on a subscription model ("Essentiel", "Signature", and "Maison"). You will be billed in advance on a recurring and periodic basis. You can cancel your subscription at any time through your account settings, and your access will continue until the end of your current billing cycle. No refunds are provided for partial months.
        </p>

        <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', marginTop: '40px', marginBottom: '16px' }}>3. User Conduct</h3>
        <p style={{ marginBottom: '24px' }}>
          You agree to use VASTRIÉ only for lawful purposes. You are strictly prohibited from attempting to reverse-engineer our AI styling algorithms, scraping data from the platform, or sharing your account credentials with third parties.
        </p>

        <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', marginTop: '40px', marginBottom: '16px' }}>4. Intellectual Property</h3>
        <p style={{ marginBottom: '24px' }}>
          The visual interfaces, graphics, design, compilation, information, data, computer code, and all other elements of the platform are protected by intellectual property laws. All rights are reserved by VASTRIÉ.
        </p>

        <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', marginTop: '40px', marginBottom: '16px' }}>5. Limitation of Liability</h3>
        <p style={{ marginBottom: '24px' }}>
          VASTRIÉ provides AI styling recommendations "as is". While we strive for excellence, we do not guarantee that our recommendations will meet your personal expectations or suit every occasion perfectly. We shall not be held liable for any direct or indirect damages resulting from the use of our service.
        </p>
      </div>
    </div>
  );
}
