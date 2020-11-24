import { Button, Grid } from "@material-ui/core";
import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterDialog from "../components/RegisterDialog";
import Page from "./Page";

interface Props {}

const LoginPage = (props: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <Page title="Login">
      <Grid container justify="center" direction="column" alignItems="center">
        <LoginForm />
        <Button onClick={() => setOpen(true)}>Register</Button>
        <RegisterDialog open={open} setOpen={setOpen} />
      </Grid>
    </Page>
  );
};

export default LoginPage;
