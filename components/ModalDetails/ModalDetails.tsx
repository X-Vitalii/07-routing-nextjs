'use client';

import { useRouter } from 'next/navigation';
import css from '../ModalCreate/Modal.module.css';

type ModalDetailsProps = {
  children: React.ReactNode;
};

const ModalDetails = ({ children }: ModalDetailsProps) => {
  const router = useRouter();

  const close = () => router.back();

  return (
    <div className={css.backdrop}>
      <div className={css.modal}>
        {children}
        <button onClick={close}>Close</button>
      </div>
    </div>
  );
};

export default ModalDetails;
