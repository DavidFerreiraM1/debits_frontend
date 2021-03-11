import React from 'react';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import { List, ListItem } from '../../components';
import { useDebitContext } from '../../context/app-context';
import { IClientUser, IDebit } from '../../core/interfaces';

export function DebitList() {
  const { debits, users } = useDebitContext();

  const getUser = (id: number) => {
    return users.find((usr: IClientUser) => usr.id === id);
  }


  return (
    <List textSubHeader="Devedores">
      {
        debits.map((deb: IDebit, key) => {
          const user: any = getUser(deb.userId);
          return (
            <ListItem
              key={key}
              icon={<LocalAtmIcon />}
              primaryText={user.name}
              secondaryText={deb.debitValue.toString()}
          />
        )})
      }
    </List>
  );
}