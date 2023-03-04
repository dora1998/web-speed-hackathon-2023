import { useContext } from 'react';

import { ModalStateContext } from './context';
import type { ModalKey } from './state';

export const useIsOpenModal = (key: ModalKey) => {
  const { state } = useContext(ModalStateContext);

  return state === key;
};

export const useOpenModal = () => {
  const { update } = useContext(ModalStateContext);

  return (key: ModalKey) => {
    update(key);
  };
};

export const useCloseModal = () => {
  const { update } = useContext(ModalStateContext);

  return () => {
    update(undefined);
  };
};
