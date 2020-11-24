import { Container, Grid } from "@material-ui/core";
import React from "react";
import AnimationDetail from "../components/AnimationDetail";
import Page from "./Page";

const AnimationDetailPage: React.FC = () => {
  return (
    <Page title="Animation">
      <Container>
        <Grid container direction="column">
          <Grid item>
            <AnimationDetail />
          </Grid>
          {/* Kommentek */}
        </Grid>
      </Container>
    </Page>
  );
};

export default AnimationDetailPage;
