'use client';

import { useState, type ChangeEvent } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { Toaster } from 'react-hot-toast';

import { fetchNotes } from '@/lib/api';

import Modal from '../../components/Modal/Modal';
import SearchBox from '../../components/SearchBox/SearchBox';
import Pagination from '../../components/Pagination/Pagination';
import NoteList from '../../components/NoteList/NoteList';
import NoteForm from '../../components/NoteForm/NoteForm';

import css from './NotesPage.module.css';

export default function NoteClient() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [debouncedValue] = useDebounce(query, 3000);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: ['notes', debouncedValue, page],
    queryFn: () => fetchNotes(debouncedValue, page),
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
      <Toaster position="top-right" />
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
        {isSuccess && data.notes.length > 0 && <NoteList notes={data.notes} />}
        {isModalOpen && (
          <Modal onClose={closeModal}>
            <NoteForm onClose={closeModal} />
          </Modal>
        )}
      </div>
    </>
  );
}
