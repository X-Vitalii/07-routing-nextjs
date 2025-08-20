'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import css from './SidebarNotes.module.css';

const TAGS = [
  { label: 'All', value: 'all', href: '/notes' },
  { label: 'Work', value: 'Work', href: '/notes/filter/Work' },
  { label: 'Personal', value: 'Personal', href: '/notes/filter/Personal' },
  { label: 'Meeting', value: 'Meeting', href: '/notes/filter/Meeting' },
  { label: 'Shopping', value: 'Shopping', href: '/notes/filter/Shopping' },
  { label: 'Todo', value: 'Todo', href: '/notes/filter/Todo' },
];

export default function SidebarNotes() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/notes') {
      // For "All" tag, check if we're at the main notes route
      return pathname === '/notes' || pathname === '/notes/';
    }
    return pathname === href;
  };

  return (
    <aside className={css.sidebar}>
      <h2 className={css.title}>Filter by Tag</h2>
      <nav className={css.navigation}>
        <ul className={css.menuList}>
          {TAGS.map((tag) => (
            <li key={tag.value} className={css.menuItem}>
              <Link 
                href={tag.href} 
                className={`${css.menuLink} ${isActive(tag.href) ? css.active : ''}`}
              >
                {tag.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
