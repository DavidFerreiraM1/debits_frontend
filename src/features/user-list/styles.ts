import { makeStyles } from "@material-ui/core";

export const styles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxHeight: 320,
    overflow: 'scroll',
    overflowX: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  textInline: {
    display: 'inline',
  }
}))