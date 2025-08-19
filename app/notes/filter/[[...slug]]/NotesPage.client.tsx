'use client';

import { useState, type ChangeEvent } from 'react';
import {
  keepPreviousData,
  useQuery,
} from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { Toaster } from 'react-hot-toast';

import { fetchNotes, type NotesResponse } from '../../../../lib/api';
// import type { Note } from '../../../../types/note';

import Modal from '../../../../components/Modal/Modal';
import SearchBox from '../../../../components/SearchBox/SearchBox';
import Pagination from '../../../../components/Pagination/Pagination';
import NoteList from '../../../../components/NoteList/NoteList';
import NoteForm from '../../../../components/NoteForm/NoteForm';

import css from './NotesPage.module.css';

type NotesClientProps = {
  perPage: number;
  tag?: string;
};

export default function NotesPage({ perPage, tag }: NotesClientProps) {
  return (
    <>
      <Toaster position="top-right" />
      <NotesContent perPage={perPage} tag={tag} />
    </>
  );
}

function NotesContent({ perPage, tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [debouncedValue] = useDebounce(query, 3000);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isSuccess, isLoading, isError } = useQuery<NotesResponse>({
    queryKey: ['notes', debouncedValue, page, tag],
    queryFn: () =>
      fetchNotes({
        page,
        perPage,
        query: debouncedValue,
        tag,
      }),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages ?? 0;

  const onChangeQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setPage(1);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox value={query} onChangeQuery={onChangeQuery} />

          {totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(selectedPage) => setPage(selectedPage)}
            />
          )}

          {isLoading && <p>Loading...</p>}
          {isError && <p>Failed to load notes</p>}

          <button className={css.button} onClick={openModal}>
            Create note +
          </button>
        </header>

        {isSuccess && data!.notes.length > 0 && (
          <NoteList notes={data!.notes} />
        )}

        {isModalOpen && (
          <Modal onClose={closeModal}>
            <NoteForm onClose={closeModal} />
          </Modal>
        )}
      </div>
    </>
  );
}
