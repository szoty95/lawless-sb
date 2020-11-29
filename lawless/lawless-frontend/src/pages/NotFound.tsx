import { Grid, Typography } from '@material-ui/core';
import React from 'react';

interface Props {}

const NotFound = (props: Props) => {
  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid container direction="column">
        <Grid item container justify="center">
          <Typography variant="h1">404</Typography>
        </Grid>
        <Grid item container justify="center">
          <img
            alt="Crying cat"
            width="50%"
            src="https://static.onecms.io/wp-content/uploads/sites/20/2018/05/21042210_264995290674140_8840525631411191808_n.jpg"
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default NotFound;
