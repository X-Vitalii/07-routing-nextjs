'use client';

import React from 'react';
import Link from 'next/link';
import css from './TagsMenu.module.css';
import { Tag } from '@/types/note';

const TAGS: { label: string; value?: Tag; href: string }[] = [
  { label: 'All notes', value: undefined, href: '/notes/filter' },
  { label: 'Work', value: 'Work', href: '/notes/filter/Work' },
  { label: 'Personal', value: 'Personal', href: '/notes/filter/Personal' },
  { label: 'Meeting', value: 'Meeting', href: '/notes/filter/Meeting' },
  { label: 'Shopping', value: 'Shopping', href: '/notes/filter/Shopping' },
  { label: 'Todo', value: 'Todo', href: '/notes/filter/Todo' },
];

export default function TagsMenu() {
  const [open, setOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  return (
    <div className={css.menuContainer} ref={menuRef}>
      <button
        type="button"
        className={css.menuButton}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        Notes ▾
      </button>

      {open && (
        <ul
          className={css.menuList}
          role="menu"
          aria-label="Filter notes by tag"
        >
          {TAGS.map((t) => (
            <li key={t.label} className={css.menuItem} role="none">
              <Link
                href={t.href}
                className={css.menuLink}
                role="menuitem"
                onClick={() => setOpen(false)}
              >
                {t.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
