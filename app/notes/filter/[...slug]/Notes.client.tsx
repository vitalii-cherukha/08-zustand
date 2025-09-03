'use client';

import { useState } from 'react';
import NoteList from '@/components/NoteList/NoteList';
import css from './page.module.css';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import { useDebouncedCallback } from 'use-debounce';
import Link from 'next/link';

interface NotesProps {
  tag: string;
}

const Notes = ({ tag }: NotesProps) => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const { data, isSuccess } = useQuery({
    queryKey: ['notes', query, page, tag],
    queryFn: () => fetchNotes(query, page, tag),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const handleSearch = useDebouncedCallback((value: string) => {
    setQuery(value);
    setPage(1);
  }, 300);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={handleSearch} />
        {isSuccess && data.totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={data.totalPages}
            currentPage={setPage}
          />
        )}
        <Link href={'/notes/action/create/'} className={css.button}>
          Create note +
        </Link>
      </header>
      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
    </div>
  );
};

export default Notes;
