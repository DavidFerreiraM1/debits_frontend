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
import { DialogRefProps, ModalDialog } from './modal';
import { IClientUser, IDebit } from '../../core/interfaces';
import { formatMoney } from '../../utils/form-data-format';
import { RemoveDebit } from './service';
import { useDebitContext } from '../../context/app-context';

interface Props {
  user: IClientUser;
  debit: IDebit;
  primaryText: string;
  secondaryText?: string;
  icon: React.ReactNode;
}

export function ListItem(props: Props) {
  const { updateListDebits } = useDebitContext();

  const classes = styles();
  const dialogRef = React.createRef<DialogRefProps>();
  
  const editDebit = () => {
    // lançar dados para o formulário
  }


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
      onClick={() => {
        // chama edição da dívida
      }}
    >
      <ListItemIcon>
        {props.icon}
      </ListItemIcon>
      <ListItemText primary={props.primaryText}
        secondary={renderSecondaryText()}
      />
      <ListItemSecondaryAction
        onClick={() => {
          dialogRef.current?.open({
            title: 'Confirmar exclusão',
            text: `Gostaria de confirmar a exclusão da dívida de ${props.user.name} no valor de ${formatMoney(props.debit.debitValue.toString())}?`
          });
        }}
      >
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
      <ModalDialog
        ref={dialogRef}
        onConfirm={() => {
          handlerRemoveDebit();
        }} />
        {
        renderAlert.render && (
          <Alert className={classes.alert} severity="success">
            <AlertTitle>{renderAlert.severity ? 'Sucesso' : 'Erro'}</AlertTitle>
            {renderAlert.text}
          </Alert>
        )
      }
    </MuiListItem>
  )
}
