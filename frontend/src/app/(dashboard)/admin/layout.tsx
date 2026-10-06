"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PageHeader, ui as s } from "@/components/ui/ui";
import x from "@/components/ui/screens.module.css";

const TABS = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/audit-log", label: "Audit log" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className={s.page}>
      <PageHeader eyebrow="Admin" title="Maison control" sub="Operational view of members, activity and system health." />
      <nav className={x.subnav} aria-label="Admin sections">
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
