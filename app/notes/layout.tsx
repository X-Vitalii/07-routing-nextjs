import { ReactNode } from 'react';
import css from './layout.module.css';

export default function NotesLayout({
  children,
  sidebar,
  modal,
}: {
  children: ReactNode;
  sidebar: ReactNode;
  modal?: ReactNode;
}) {
  return (
    <>
      <div className={css.notesFilterLayout}>
        {sidebar}
        <main className={css.notesContent}>{children}</main>
      </div>
      {modal}
    </>
  );
}
