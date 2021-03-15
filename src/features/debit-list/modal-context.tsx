import React from 'react';
import { DialogRefProps, ModalDialog } from './modal';

interface Props {
  children?: React.ReactNode;
}

const ModalContext = React.createContext<{
  openModal: (title: string, text: string, onConfirm: () => void) => void;
}>({
  openModal: (title: string, text: string, onConfirm: () => void) => {},
});

export function ModalContextProvider(props: Props) {
  const dialogRef = React.createRef<DialogRefProps>();

  const openModal = (title: string, text: string, onConfirm: () => void) => {
    dialogRef.current?.open({
      action: onConfirm,
      title,
      text
    });
  }

  return (
    <ModalContext.Provider value={{
      openModal,
    }}>
      {props.children}
      <React.Fragment>
        <ModalDialog
          ref={dialogRef}
        />
      </React.Fragment>
    </ModalContext.Provider>
  )
}

export const useModalContext = () => React.useContext(ModalContext);
