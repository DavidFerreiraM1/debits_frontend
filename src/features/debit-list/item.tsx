import React from 'react';
import {
  IconButton,
  ListItem as MuiListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Typography
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import DeleteIcon from '@material-ui/icons/Delete';

import { styles } from './styles';
import { DialogRefProps } from './modal';
import { IClientUser, IDebit } from '../../core/interfaces';
import { formatMoney } from '../../utils/form-data-format';
import { RemoveDebit } from './service';
import { useDebitContext } from '../../context/app-context';
import { useModalContext } from './modal-context';

interface Props {
  user: IClientUser;
  debit: IDebit;
  primaryText: string;
  secondaryText?: string;
  icon: React.ReactNode;
}

export function ListItem(props: Props) {
  const { updateListDebits, setIdDebitToUpdate } = useDebitContext();

  const classes = styles();

  const [renderAlert, setRenderAlert] = React.useState({
    severity: 'success',
    text: '',
    render: false
  });

  const handleRenderAlert = (
    severity: 'success' | 'error',
    text: string,
  ) => {
    setRenderAlert({
      severity,
      text,
      render: true
    });
  }

  React.useEffect(() => {
    if (renderAlert.render) {
      setTimeout(() => {
        setRenderAlert({
          ...renderAlert,
          render: false
        })
      }, 2400);
    }
  }, [renderAlert]);

  const handlerRemoveDebit = async () => {
    const { id } = props.debit;
    if (id) {
      const { success } = await RemoveDebit(id);
      if (success) {
        updateListDebits();
        handleRenderAlert('success', 'Dívida excluída com sucesso!');
      } else {
        handleRenderAlert('error', 'Não foi possível remover a dívida!');
      }
    }
  }

  const handleIdDebitUpdate = () => {
    if (props.debit.id) {
      setIdDebitToUpdate(props.debit.id?.toString());
    }
  }

  const renderSecondaryText = () => {
    return props.secondaryText && (
      <React.Fragment>
        <Typography
          component="span"
          variant="body2"
          className={classes.textInline}
        >
          {props.secondaryText}
        </Typography>
      </React.Fragment>
    )
  }

  const { openModal } = useModalContext();

  return (
    <MuiListItem
      button
      dense
      onClick={handleIdDebitUpdate}
    >
      <ListItemIcon>
        {props.icon}
      </ListItemIcon>
      <ListItemText primary={props.primaryText}
        secondary={renderSecondaryText()}
      />
      <ListItemSecondaryAction
        onClick={() => {
          openModal(
            'Confirmar exclusão',
            `Gostaria de confirmar a exclusão da dívida de ${props.user.name} no valor de ${formatMoney(props.debit.debitValue.toString())}?`,
            handlerRemoveDebit
          );
        }}
      >
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
      <React.Fragment>
        {
        renderAlert.render && (
          <Alert className={classes.alert} severity="success">
            <AlertTitle>{renderAlert.severity ? 'Sucesso' : 'Erro'}</AlertTitle>
            {renderAlert.text}
          </Alert>
        )
      }
      </React.Fragment>
    </MuiListItem>
  )
}
