import NoteClient from './Notes.client';

export default function App() {
  const PER_PAGE = 12;
  return <NoteClient perPage={PER_PAGE} />;
}
