'use client';

import { useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

type ModalProps = {
  onClose: () => void;
  children: ReactNode;
};

export default function Modal({ onClose, children }: ModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const root =
    typeof document !== 'undefined'
      ? document.getElementById('modal-root')
      : null;

  if (!root) return null;

  return createPortal(
    <div className={css.backdrop} onClick={onBackdropClick}>
      <div className={css.modal}>
        <button
          className={css.close}
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>
        {children}
      </div>
    </div>,
    root,
  );
}
