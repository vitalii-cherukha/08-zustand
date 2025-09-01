import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import Notes from './Notes.client';
import { fetchNotes } from '@/lib/api';

interface NotesProps {
  params: Promise<{ slug: string[] }>;
}

const NotesPage = async ({ params }: NotesProps) => {
  const { slug } = await params;
  const tag = slug[0] === 'All%20notes' ? '' : slug[0];
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['notes', tag],
    queryFn: () => fetchNotes('', 1, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Notes tag={tag} />
    </HydrationBoundary>
  );
};

export default NotesPage;
