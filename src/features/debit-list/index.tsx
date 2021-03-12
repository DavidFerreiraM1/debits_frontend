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

  const [renderCondition, setRenderCondition] = React.useState(false);
  React.useEffect(() => {
    setRenderCondition(users.length > 0 && debits.length > 0);
  }, [debits, users]);

  return (
    <List textSubHeader="Devedores">
      {
        renderCondition && debits.map((deb: IDebit, key) => {
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