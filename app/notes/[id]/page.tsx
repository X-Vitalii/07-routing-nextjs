import NoteDetailsClient from './NoteDetails.client';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function NoteDetailsPage({ params }: PageProps) {
  await params; // Just await to satisfy the Promise requirement
  
  return <NoteDetailsClient />;
}
