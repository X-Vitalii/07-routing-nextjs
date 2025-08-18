import React from 'react';
import NotesPage from './NotesPage.client';

type PageParams = { slug?: string[] };

export default async function NotesFilterPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { slug } = await params;
  const tag = Array.isArray(slug) ? slug[0] : undefined;

  return <NotesPage perPage={12} tag={tag} />;
}
