import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  PaperProps
} from '@material-ui/core';

function PaperComponent(props: PaperProps) {
  return (
    <Paper {...props} />
  );
}

interface OpenFuncParam {
  title: string;
  text: string;
}

export interface DialogRefProps {
  open: (param: OpenFuncParam) => void;
  close: () => void;
}

interface Props {
  onConfirm: () => void;
}

function ModaDialogWithRef(props: Props, ref: React.Ref<DialogRefProps>) {
  const [dialog, setDialog] = React.useState({
    render: false,
    title: '',
    text: '',
    onConfirm: () => {},
  });


  const handleClose = () => {
    setDialog({
      ...dialog,
      render: false
    });
  };

  React.useImperativeHandle(ref, () => ({
    open: ({ title, text }: OpenFuncParam) => {
      setDialog({
        ...dialog,
        title,
        text,
        render: true
      });
    },
    close: () => handleClose(),
  }));

  return (
    <Dialog
      open={dialog.render}
      onClose={handleClose}
      PaperComponent={PaperComponent}
    >
      <DialogTitle id="dialog-title">
        {dialog.title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {dialog.text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          Cancelar
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={
            () => {
              handleClose();
              props.onConfirm();
            }
          }>
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export const ModalDialog = React.forwardRef<DialogRefProps, Props>(ModaDialogWithRef);
