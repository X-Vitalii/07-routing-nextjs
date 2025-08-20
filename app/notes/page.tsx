import NotesPage from './filter/[[...slug]]/NotesPage.client';

export default function NotesIndexPage() {
  return <NotesPage perPage={12} tag="all" />;
}
