import { fetchNoteById } from '@/lib/api';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import NoteDetailsClient from './NoteDetails.client';
// import { Metadata } from 'next';

interface NoteDetailsProps {
  params: Promise<{ id: string }>;
}

// export const generateMetadata = async ({
//   params,
// }: NoteDetailsProps): Promise<Metadata> => {
//   const { id } = await params;
//   const note = await fetchNoteById(id);
//   return {};
// };

const NoteDetailsPage = async ({ params }: NoteDetailsProps) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
};

export default NoteDetailsPage;
