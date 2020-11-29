import { CircularProgress, Container, Grid, Typography } from '@material-ui/core';
import { format, parseISO } from 'date-fns';
import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components';
import AnimationDetail from '../components/AnimationDetail';
import Comment from '../components/Comment';
import CommentDialog from '../components/CommentDialog';
import { useAuthToken } from '../hooks/useAuthToken';
import useGetCaff from '../hooks/useGetCaff';
import { IComment } from '../swagger';
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
            <Typography variant="h5">Kommentek</Typography>

            {result.data.comments?.map((item: IComment) =>
              item.timeStamp && item.message ? (
                <Comment
                  key={item.id}
                  comment={{
                    text: item.message,
                    createdAt: format(parseISO(item.timeStamp.toString()), 'yyyy-mm-d'),
                  }}
                />
              ) : (
                ''
              ),
            )}
          </Grid>
          <Grid item container justify="flex-end">
            <CommentDialog caffId={result.data.id} />
          </Grid>
        </Grid>
      </StyledContainer>
    </Page>
  );
};

export default AnimationDetailPage;
