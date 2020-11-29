import { AppBar, Box, Button, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';

import UploadCaffDialog from './UploadCaffDialog';

const useStyles = makeStyles({
  root: {
    backgroundColor: 'black',
  },

  logo: {
    fontFamily: "'Salsa', cursive",
    cursor: 'pointer',
  },

  button: {
    padding: '8px 48px',
    borderRadius: 32,
    marginLeft: 32,
  },
});

const Header: React.FC = () => {
  const styles = useStyles();
  const history = useHistory();

  return (
    <AppBar className={styles.root} position="static">
      <Toolbar>
        <Box display="flex" justifyContent="space-between" flex={1} alignItems="center">
          <Typography onClick={() => history.push('/animations')} className={styles.logo} variant="h3">
            Outlaws
          </Typography>
          <Box display="flex">
            <UploadCaffDialog />
            <Button onClick={() => history.push('/login')} className={styles.button} variant="contained">
              Login
            </Button>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
