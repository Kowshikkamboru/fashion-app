"use client";

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Icon, { IconName } from '@/components/Icon';
import s from './ui.module.css';

export { s as ui };

export function PageHeader({
  eyebrow,
  title,
  sub,
  children,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className={s.head}>
      <div>
        <div className={s.eyebrow}>{eyebrow}</div>
        <h1 className={s.title}>{title}</h1>
        {sub && <p className={s.sub}>{sub}</p>}
      </div>
      {children && <div className={s.actions}>{children}</div>}
    </header>
  );
}

export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      className={`${s.toggle} ${checked ? s.toggleOn : ''}`}
      onClick={() => onChange(!checked)}
    />
  );
}

export function EmptyState({
  icon,
  title,
  text,
  children,
}: {
  icon: IconName;
  title: string;
  text: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={s.empty}>
      <div className={s.emptyIcon}>
        <Icon name={icon} size={26} />
      </div>
      <h3 className={s.emptyTitle}>{title}</h3>
      <p className={s.emptyText}>{text}</p>
      {children}
    </div>
  );
}

/** Returns [toastNode, show(message)] — a minimal confirmation toast. */
export function useToast(): [React.ReactNode, (msg: string) => void] {
  const [msg, setMsg] = useState('');
  const [visible, setVisible] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback((m: string) => {
    setMsg(m);
    setVisible(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setVisible(false), 2600);
  }, []);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const node = (
    <div className={`${s.toast} ${visible ? s.toastShow : ''}`} role="status" aria-live="polite">
      <Icon name="check" size={16} /> {msg}
    </div>
  );
  return [node, show];
}

export function Modal({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className={s.overlay} onClick={onClose}>
      <div className={s.modal} role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
