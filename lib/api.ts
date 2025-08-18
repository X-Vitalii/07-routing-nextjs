import axios from 'axios';
import type { Note, AddNote, Tag } from '@/types/note';

const api = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
});

api.interceptors.request.use((config) => {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
  page: number;
  perPage: number;
  query?: string;
  tag?: Tag | string;
}

export async function fetchNotes(
  params: FetchNotesParams,
): Promise<NotesResponse> {
  const { page, perPage, query, tag } = params;

  const searchParams: Record<string, string | number> = {
    page,
    perPage,
  };
  if (query) searchParams.query = query;
  if (tag) searchParams.tag = tag;

  const { data } = await api.get<NotesResponse>('/notes', {
    params: searchParams,
  });
  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
}

export async function createNote(payload: AddNote): Promise<Note> {
  const { data } = await api.post<Note>('/notes', payload);
  return data;
}

export async function deleteNote(id: string): Promise<void> {
  await api.delete(`/notes/${id}`);
}
