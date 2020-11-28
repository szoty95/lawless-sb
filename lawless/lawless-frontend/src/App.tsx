import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import Routes from './Routes';
import { UserContextProvider } from './contexts';
import RememberMe from './components/RememberMe';

const theme = createMuiTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <UserContextProvider>
          <RememberMe>
            <Routes />
          </RememberMe>
        </UserContextProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
