import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import NotePreviewPage from './NotePreview.client';
import { fetchNoteById } from '@/lib/api';

interface NotePreviewPageProps {
  params: Promise<{ id: string }>;
}

const ModalPage = async ({ params }: NotePreviewPageProps) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewPage />
    </HydrationBoundary>
  );
};

export default ModalPage;
