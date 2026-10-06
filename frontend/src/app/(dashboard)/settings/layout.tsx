"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PageHeader, ui as s } from "@/components/ui/ui";
import x from "@/components/ui/screens.module.css";

const TABS = [
  { href: "/settings", label: "General" },
  { href: "/settings/security", label: "Security & 2FA" },
  { href: "/settings/notifications", label: "Notifications" },
  { href: "/settings/integrations", label: "Integrations" },
  { href: "/settings/api-keys", label: "API keys" },
];

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className={s.page}>
      <PageHeader eyebrow="Settings" title="Preferences" sub="Everything about how Vastrié behaves for you." />
      <nav className={x.subnav} aria-label="Settings sections">
        {TABS.map((t) => (
          <Link key={t.href} href={t.href} className={`${x.subnavLink} ${pathname === t.href ? x.subnavActive : ""}`}>
            {t.label}
          </Link>
        ))}
      </nav>
      {children}
    </div>
  );
}
