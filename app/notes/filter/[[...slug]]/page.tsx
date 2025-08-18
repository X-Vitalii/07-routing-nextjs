import React from 'react';
import NotesPage from './NotesPage.client';

type PageProps = {
  params: { slug?: string[] };
};

export default function NotesFilterPage({ params }: PageProps) {
  const tag = Array.isArray(params.slug) ? params.slug[0] : undefined;
  return <NotesPage perPage={12} tag={tag} />;
}
