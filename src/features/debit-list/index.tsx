import React from 'react';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import { List, ListItem } from '../../components';

export function DebitList() {
  return (
    <List textSubHeader="Devedores">
      <ListItem
        icon={<LocalAtmIcon />}
        primaryText="Fulano de tal"
        secondaryText="R$ 200, 00"
      />
    </List>
  );
}