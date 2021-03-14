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

interface Props {
  primaryText: string;
  secondaryText?: string;
  icon: React.ReactNode;
}

export function ListItem(props: Props) {
  const classes = styles();

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
    <MuiListItem>
      <ListItemIcon>
        {props.icon}
      </ListItemIcon>
      <ListItemText primary={props.primaryText}
        secondary={renderSecondaryText()}
      />
      <ListItemSecondaryAction>
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
      <ListItemSecondaryAction>
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </MuiListItem>
  )
}