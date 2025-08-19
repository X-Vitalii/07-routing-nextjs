import NotesPage from './filter/[[...slug]]/NotesPage.client';

export default function NotesPageWrapper() {
  return <NotesPage perPage={12} />;
}
