'use client';

import { useEffect, useMemo, useState, type ChangeEvent } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { Toaster, toast } from 'react-hot-toast';

import { fetchNotes, type NotesResponse } from '../../../../lib/api';
import type { Tag } from '../../../../types/note';

import Modal from '../../../../components/Modal/Modal';
import SearchBox from '../../../../components/SearchBox/SearchBox';
import Pagination from '../../../../components/Pagination/Pagination';
import NoteList from '../../../../components/NoteList/NoteList';
import NoteForm from '../../../../components/NoteForm/NoteForm';

import css from './NotesPage.module.css';

type NotesPageProps = {
  perPage: number;
  tag?: string;
};

export default function NotesPage({ perPage, tag }: NotesPageProps) {
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, 400);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const normalizedTag = useMemo<Tag | undefined>(() => {
    if (!tag || tag.toLowerCase() === 'all') return undefined;
    return tag as Tag;
  }, [tag]);

  const onChangeQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setPage(1);
  };

  const onPageChange = (selectedPage: number) => {
    setPage(selectedPage);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { data, isLoading, isError, isSuccess } = useQuery<NotesResponse>({
    queryKey: [
      'notes',
      { page, perPage, query: debouncedQuery || undefined, tag: normalizedTag },
    ],
    queryFn: () =>
      fetchNotes({
        page,
        perPage,
        query: debouncedQuery || undefined,
        tag: normalizedTag,
      }),
    placeholderData: (prev) => prev,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  useEffect(() => {
    if (isSuccess && debouncedQuery && notes.length === 0) {
      toast('No notes found. Try a different search term.');
    }
  }, [isSuccess, debouncedQuery, notes.length]);

  const showPagination = isSuccess && totalPages > 1;

  return (
    <>
      <Toaster position="top-right" />

      <div className={css.app}>
        <div className={css.toolbar}>
          <SearchBox value={query} onChangeQuery={onChangeQuery} />

          <div
            aria-hidden={!showPagination}
            className={`${css.pagination} ${showPagination ? css.paginationVisible : ''}`}
          >
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          </div>

          <button className={css.button} onClick={openModal}>
            Create note +
          </button>
        </div>

        {isLoading && <p>Loading...</p>}
        {isError && <p>Failed to load notes.</p>}

        {isSuccess && <NoteList notes={notes} />}

        {isModalOpen && (
          <Modal onClose={closeModal}>
            <NoteForm onClose={closeModal} />
          </Modal>
        )}
      </div>
    </>
  );
}
