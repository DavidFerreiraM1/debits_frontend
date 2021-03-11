import React from 'react';
import { Box, Container, Grid } from '@material-ui/core';
import { DebitList } from './features/debit-list';
import { UsersList } from './features/user-list';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box component="section">
                  <DebitList />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box component="section">
                  <UsersList />
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={8}>
            <div style={{ height: 320, width: '100%', background: 'blue' }} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
