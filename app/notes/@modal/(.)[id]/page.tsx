import NotePreviewModal from '@/components/NotePreview/NotePreviewModal';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function NotePreviewInterceptPage({ params }: PageProps) {
  const { id } = await params;
  return <NotePreviewModal id={id} />;
}
