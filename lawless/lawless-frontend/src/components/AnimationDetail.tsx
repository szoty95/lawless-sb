import { Button, Chip, Grid, Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import React from 'react';

const AnimationDetail: React.FC = () => {
  return (
    <Grid container direction="column">
      <Typography variant="h5">Title</Typography>
      <Grid container>
        <Grid item xs={12} sm={6} container direction="column">
          <Skeleton variant="rect" width={500} height={400} />
        </Grid>
        <Grid item xs={12} sm={6} container direction="column" spacing={2}>
          <Grid item container justify="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h6">Kiss Pista</Typography>
              <Typography variant="subtitle1">2020. 02. 21</Typography>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary">
                Edit
              </Button>
            </Grid>
          </Grid>

          <Grid item>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Felis nam fusce urna, nec. Egestas orci molestie
              felis, amet, at enim, odio montes, ornare. Hendrerit et a sagittis id a sit nunc, congue massa. Aliquam,
              in faucibus pulvinar convallis sed tristique. Faucibus augue in duis lacus, ornare. Ipsum ac at odio
              aliquam id natoque fermentum lobortis. Massa hac tristique consectetur enim praesent egestas. Amet, nunc
              risus hac facilisis nulla vulputate. Elementum ut rhoncus scelerisque eu turpis commodo hendrerit
              interdum. Pellentesque vestibulum lectus arcu ornare ultricies. Feugiat elit feugiat nunc ut id pulvinar
              quis. Elementum lectus ornare purus sollicitudin in.
            </Typography>
          </Grid>

          <Grid item container spacing={2}>
            <Grid item>
              <Chip label="asdasdasd" />
            </Grid>
            <Grid item>
              <Chip label="asdasdasd" />
            </Grid>
            <Grid item>
              <Chip label="asdasdasd" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AnimationDetail;
