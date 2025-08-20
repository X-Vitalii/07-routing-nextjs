'use client';

import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal/Modal';
import NotePreview from './NotePreview';
import css from './NotePreview.module.css';

type NotePreviewModalProps = {
  id: string;
};

export default function NotePreviewModal({ id }: NotePreviewModalProps) {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return (
    <Modal onClose={handleClose}>
      <div className={css.modalContent}>
        <div className={css.header}>
          <button
            type="button"
            aria-label="Close"
            className={css.backBtn}
            onClick={handleClose}
          ></button>
        </div>

        <NotePreview id={id} />
      </div>
    </Modal>
  );
}
