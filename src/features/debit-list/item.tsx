import React from 'react';
import {
  IconButton,
  ListItem as MuiListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Typography
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import { styles } from './styles';
import { IClientUser, IDebit } from '../../core/interfaces';
import { formatMoney } from '../../utils/form-data-format';
import { RemoveDebit } from './service';
import { useDebitContext } from '../../context/app-context';
import { useModalContext } from './modal-context';
import { useAlertContext } from './alert-context';

interface Props {
  user: IClientUser;
  debit: IDebit;
  primaryText: string;
  secondaryText?: string;
  icon: React.ReactNode;
}

export function ListItem(props: Props) {

  const { openModal } = useModalContext();
  const { handleRenderAlert } = useAlertContext();

  const { updateListDebits, setIdDebitToUpdate } = useDebitContext();
  const classes = styles();

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
    </MuiListItem>
  )
}
