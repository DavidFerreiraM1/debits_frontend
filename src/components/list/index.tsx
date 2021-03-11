import React from 'react';
import { List as MuiList, ListSubheader } from '@material-ui/core';
import { styles } from './styles';

interface Props {
  children?: React.ReactNode;
  textSubHeader: string;
}

export function List(props: Props) {
  const classes = styles();
  return (
    <MuiList
      subheader={<ListSubheader>{props.textSubHeader}</ListSubheader>}
      className={classes.root}
    >
      {props.children}
    </MuiList>
  );
}