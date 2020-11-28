import { Button, Container, Grid, Typography } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import AnimationDetail from '../components/AnimationDetail';
import Comment from '../components/Comment';
import Page from './Page';

const StyledContainer = styled(Container)`
  padding-top: 1.5em;
`;

const AnimationDetailPage: React.FC = () => {
  return (
    <Page title="Animation">
      <StyledContainer>
        <Grid container direction="column" spacing={3}>
          <Grid item>
            <AnimationDetail />
          </Grid>
          {/* Kommentek */}
          <Grid item container direction="column" spacing={2}>
            <Typography variant="h5"> Kommentek</Typography>
            <Comment
              comment={{
                text: 'asdas asda sd asd asd as das dsa ',
                createdBy: 'Teszt Elek',
                createdAt: '2020. 44. 44',
              }}
            />
          </Grid>
          <Grid item container justify="flex-end">
            <Button variant="contained">Add comment</Button>
          </Grid>
        </Grid>
      </StyledContainer>
    </Page>
  );
};

export default AnimationDetailPage;
