import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { Redirect } from 'react-router';
import { useAuthToken } from '../hooks/useAuthToken';
import useDeleteCaff from '../hooks/useDelete';
import useUserContext from '../hooks/useUserContext';
import { IDetailsCaffResp } from '../swagger';
import DeleteDialog from './DeleteDialog';
import EditCaffDialog from './EditCaffDetailForm';
import Preview from './Preview';

const ADMIN = 'ROLE_ADMIN';

type AnimationDetailProps = {
  animation: IDetailsCaffResp;
};

const AnimationDetail: React.FC<AnimationDetailProps> = ({ animation }) => {
  const { user } = useUserContext();
  const { authToken } = useAuthToken();
  const [result, deleteCaff] = useDeleteCaff();

  const handleDelete = () => {
    deleteCaff({
      data: animation.id,
      authToken: authToken as string,
    });
  };

  if (result.data) {
    return <Redirect to="/" />;
  }

  return (
    <Grid container direction="column">
      <Typography variant="h5">{animation.name}</Typography>
      <Grid container>
        <Grid item xs={12} sm={6} container direction="column">
          <Preview id={animation.id || -1} width={500} height={400} />
        </Grid>
        <Grid item xs={12} sm={6} container direction="column" spacing={2}>
          <Grid item container justify="space-between" alignItems="center">
            <Grid item xs={6}>
              <Typography variant="h6">
                {animation.userPersonalData?.firstName} {animation.userPersonalData?.lastName}
              </Typography>
              <Typography variant="subtitle1">{animation.uploaded}</Typography>
            </Grid>
            {user && (user.roles.includes(ADMIN) || user.userId === animation.userId) && (
              <Grid xs={6} item container spacing={2}>
                <Grid item>
                  <EditCaffDialog animation={animation} />
                </Grid>
                <Grid item>
                  <DeleteDialog onDelete={handleDelete} />
                </Grid>
              </Grid>
            )}
          </Grid>

          <Grid item>
            <Typography>{animation.description}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6">Price: {animation.price}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AnimationDetail;
