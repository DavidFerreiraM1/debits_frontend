import React from 'react';

import PersonIcon from '@material-ui/icons/Person';

import { List, ListItem } from '../../components';
import { IClientUser } from '../../core/interfaces';
import { getAllUsers } from './service';


export function UsersList() {
  const [users, setUsers] = React.useState<IClientUser[]>([]);

  React.useEffect(() => {
    getAllUsers()
      .then(res => {
        if (res.data) {
          setUsers(res.data);
        };
      });
  }, []);

  return (
    <List textSubHeader="Usuários">
      {
        users.map((user, index) => {
          return (
            <ListItem
              key={index}
              icon={<PersonIcon />}
              primaryText={user.name}
            />
          ) 
        })
      }
    </List>
  );
}