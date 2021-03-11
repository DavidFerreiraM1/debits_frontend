import { makeStyles } from "@material-ui/core";

export const styles = makeStyles(() => ({
  root: {
    height: 'calc(100vh - 72px)',
    display: 'flex',
    alignItems: 'center',
    paddingTop: 72
  },
  headerBar: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 72,
  },
  body: {
    position: 'relative',
    bottom: 72,
  }
}));