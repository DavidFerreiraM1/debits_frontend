import React from 'react';
import { AppBar, Box, Button, Container, Dialog, Grid, Hidden, IconButton, Slide, Toolbar, Typography } from '@material-ui/core';
import { DebitList } from './features/debit-list';
import { DebitForm } from './features/debit-form';
import { styles } from './styles';

import { useDebitContext } from './context/app-context';
import { TransitionProps } from '@material-ui/core/transitions';
import CloseIcon from '@material-ui/icons/Close';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function App() {
  const classes = styles();
  const { idDebitToUpdate, setIdDebitToUpdate } = useDebitContext();
  const [fullDialogRender, setFullDialogRender] = React.useState(false);

  const handleDullDialogClose = () => {
    setIdDebitToUpdate('');
    setFullDialogRender(false);
  };
  React.useEffect(() => {
    if (idDebitToUpdate) {
      
      setFullDialogRender(true);
    }
  }, [idDebitToUpdate])

  return (
    <div className={classes.root}>
      <header className={classes.headerBar} />
      <Container maxWidth="lg" className={classes.body}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={4}>  
            <Box component="section">
              <DebitList />
            </Box>
          </Grid>
          <Hidden smDown>
            <Grid item sm={12} md={8}>
              <DebitForm />
            </Grid>
          </Hidden>
          <Hidden mdUp>
            <Grid item sm={12}>
              <Box display="flex" justifyContent="flex-end">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setFullDialogRender(true)}
                >
                  Cadastrar Dívida
                </Button>
              </Box>
            </Grid>
          </Hidden>
        </Grid>
      </Container>
      <Hidden mdUp> 
        <Dialog
          fullScreen
          open={fullDialogRender}
          onClose={handleDullDialogClose}
          TransitionComponent={Transition}
        >
          <Box
            paddingTop="104px"
            paddingLeft="24px"
            paddingRight="24px"
          >
            <AppBar>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleDullDialogClose}
                  >
                  <CloseIcon />
                </IconButton>
                <Typography>
                  { idDebitToUpdate ? 'Atualizar Dívida' : 'Nova Dívida' }
                </Typography>
              </Toolbar>
            </AppBar>
            <DebitForm />
          </Box>
        </Dialog>
      </Hidden>
    </div>
  );
}

export default App;
