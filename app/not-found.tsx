import React from 'react';
import css from './not-found.module.css';

export default function NotFoundPage() {
  return (
    <main className={css.wrapper} aria-labelledby="not-found-title">
      <h1 id="not-found-title" className={css.title}>
        404 - Page not found
      </h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </main>
  );
}
