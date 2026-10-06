import type { IconName } from '@/components/Icon';

export type CapabilityGroup = 'Intelligence & Styling' | 'Wardrobe Management' | 'Maison & Community' | 'Atelier Services';

export interface Capability {
  label: string;
  href: string;
  icon: IconName;
  group: CapabilityGroup;
  desc: string;
}

export const CAPABILITY_GROUPS: ('All' | CapabilityGroup)[] = [
  'All',
  'Intelligence & Styling',
  'Wardrobe Management',
  'Maison & Community',
  'Atelier Services',
];

export const CAPABILITIES: Capability[] = [
  { label: 'Bespoke AI Styling', href: '/outfits', icon: 'sparkle', group: 'Intelligence & Styling', desc: 'Context-aware outfit curation tailored to your unique silhouette and palette.' },
  { label: 'High-Fidelity Digitization', href: '/wardrobe', icon: 'shirt', group: 'Wardrobe Management', desc: 'Your entire collection meticulously cataloged by fabric, season, and provenance.' },
  { label: 'Travel Capsule Planner', href: '/planner', icon: 'globe', group: 'Intelligence & Styling', desc: 'Optimized packing lists for any destination, climate, and itinerary.' },
  { label: 'Gap Analysis', href: '/analytics', icon: 'chart', group: 'Wardrobe Management', desc: 'Identify missing foundational pieces to complete your sartorial architecture.' },
  { label: 'Cost-Per-Wear Analytics', href: '/analytics', icon: 'chart', group: 'Wardrobe Management', desc: 'Actionable insights into the true value and utilization of your investments.' },
  { label: 'Private Retailer Access', href: '/discover', icon: 'tag', group: 'Maison & Community', desc: 'Exclusive sourcing from the world’s most respected sartorial houses.' },
  { label: 'Curated Inspiration', href: '/feed', icon: 'home', group: 'Maison & Community', desc: 'A restrained, elegant feed of timeless looks and editorial guidance.' },
  { label: 'Personal Concierge', href: '/concierge', icon: 'chat', group: 'Atelier Services', desc: 'Direct, discreet access to human styling expertise when AI isn’t enough.' },
  { label: 'Seasonal Audit', href: '/reports', icon: 'report', group: 'Atelier Services', desc: 'Comprehensive reviews of your wardrobe evolution every quarter.' },
  { label: 'Calendar Integration', href: '/settings/integrations', icon: 'plug', group: 'Atelier Services', desc: 'Seamless synchronization with your schedule for preemptive dressing.' },
  { label: 'Secure Architecture', href: '/settings/security', icon: 'shield', group: 'Intelligence & Styling', desc: 'Enterprise-grade encryption and 2FA to protect your personal data.' },
  { label: 'Event Dress Codes', href: '/outfits', icon: 'userCircle', group: 'Intelligence & Styling', desc: 'Decoded event protocols, from Riviera Casual to White Tie.' },
];

