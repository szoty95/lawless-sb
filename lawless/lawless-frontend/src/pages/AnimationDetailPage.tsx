import { Button, CircularProgress, Container, Grid, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components';
import AnimationDetail from '../components/AnimationDetail';
import Comment from '../components/Comment';
import { useAuthToken } from '../hooks/useAuthToken';
import useGetCaff from '../hooks/useGetCaff';
import Page from './Page';

const StyledContainer = styled(Container)`
  padding-top: 1.5em;
`;

type MatchParams = {
  caffId: string;
};

export type AnimationDetailPageProps = RouteComponentProps<MatchParams>;

const AnimationDetailPage: React.FC<AnimationDetailPageProps> = ({ match }) => {
  const [result, getCaff] = useGetCaff();
  const { authToken } = useAuthToken();

  useEffect(() => {
    if (!result.data) {
      getCaff({
        data: Number(match.params.caffId),
        authToken: authToken as string,
      });
    }
  }, [getCaff, result.data, match.params.caffId, authToken]);

  if (result.isLoading) {
    return (
      <Page title="Animation">
        <Grid container justify="center">
          <CircularProgress />
        </Grid>
      </Page>
    );
  }

  if (!result.data || result.isError) {
    return <Page title="Animation">Hiba</Page>;
  }

  return (
    <Page title="Animation">
      <StyledContainer>
        <Grid container direction="column" spacing={3}>
          <Grid item>
            <AnimationDetail animation={result.data} />
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
