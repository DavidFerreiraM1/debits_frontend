import React from 'react';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import { List } from '../../components';
import { useDebitContext } from '../../context/app-context';
import { IClientUser, IDebit } from '../../core/interfaces';
import { ListItem as MuiListItem, ListItemText } from '@material-ui/core';
import { ListItem } from './item';
import { formatMoney } from '../../utils/form-data-format';
import { ModalContextProvider } from './modal-context';
import { AlertContextProvider } from './alert-context';

export function DebitList() {
  const { debits, users } = useDebitContext();

  const getUser = (id: number) => {
    return users.find((usr: IClientUser) => usr.id === id);
  }

  const [renderCondition, setRenderCondition] = React.useState(false);

  React.useEffect(() => {
    console.log(debits, users)
    setRenderCondition(users.length > 0 && debits.length > 0);
  }, [debits, users]);

  return (
    <AlertContextProvider>
      <ModalContextProvider>
        <List textSubHeader="Devedores">
          { renderCondition && debits.map((deb: IDebit, key) => {
            const user: any = getUser(deb.userId);
            return (
                <ListItem
                  key={key}
                  user={user}
                  debit={deb}
                  icon={<LocalAtmIcon />}
                  primaryText={user.name}
                  secondaryText={formatMoney(deb.debitValue.toString())}
                />
                )})
          }
          {
            debits.length === 0 && (
              <MuiListItem>
                <ListItemText
                  primary="Sem Dívidas para visualizar"
                />
              </MuiListItem>
            )
          }
        </List>
      </ModalContextProvider>
    </AlertContextProvider>
  );
}