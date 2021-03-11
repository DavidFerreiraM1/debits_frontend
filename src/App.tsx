import React from 'react';
import { Box, Container, Grid } from '@material-ui/core';
import { DebitList } from './features/debit-list';
import { DebitForm } from './features/debit-form';
import { styles } from './styles';

import { DebitContextProvider } from './context/app-context';

function App() {
  const classes = styles();
  return (
    <DebitContextProvider>
      <div className={classes.root}>
        <header className={classes.headerBar} />
        <Container maxWidth="lg" className={classes.body}>
          <Grid container spacing={4}>
            <Grid item xs={4}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box component="section">
                    <DebitList />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={8}>
              <DebitForm />
            </Grid>
          </Grid>
        </Container>
      </div>
    </DebitContextProvider>
  );
}

export default App;
