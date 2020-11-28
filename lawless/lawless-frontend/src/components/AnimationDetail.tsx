import { Button, Chip, Grid, Typography } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import React from "react";
import { useUserContext } from "../hooks/useUserContext";
import { IDetailsCaffResp } from "../swagger";

const ADMIN = "ROLE_ADMIN";

type AnimationDetailProps = {
  animation: IDetailsCaffResp;
};

const AnimationDetail: React.FC<AnimationDetailProps> = ({ animation }) => {
  const { user } = useUserContext();
  console.log(user?.userId);
  console.log(animation.userId);
  return (
    <Grid container direction="column">
      <Typography variant="h5">{animation.name}</Typography>
      <Grid container>
        <Grid item xs={12} sm={6} container direction="column">
          <Skeleton variant="rect" width={500} height={400} />
        </Grid>
        <Grid item xs={12} sm={6} container direction="column" spacing={2}>
          <Grid item container justify="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h6">
                {animation.userPersonalData?.firstName}
              </Typography>
              <Typography variant="subtitle1">{animation.uploaded}</Typography>
            </Grid>
            {user &&
              (user.roles.includes(ADMIN) ||
                user.userId === animation.userId) && (
                <Grid item container>
                  <Grid item>
                    <Button variant="contained" color="primary">
                      Edit
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="primary">
                      Delete
                    </Button>
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
