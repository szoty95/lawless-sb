import { Button, Grid, Paper, TextField } from "@material-ui/core";
import { useFormik } from "formik";
import React from "react";
import styled from "styled-components";
import * as yup from "yup";

interface Props {}

const StyledGrid = styled(Grid)`
  padding: 1.5em;
  padding-bottom: ;
`;

const schema = yup.object({
  userName: yup.string().required("Username is required"),
  password: yup
    .string()
    .min(8, "Password must be min 8 character long.")
    .required("Password is required"),
});

const LoginForm = (props: Props) => {
  const formik = useFormik({
    initialValues: { userName: "", password: "" },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Paper>
        <StyledGrid
          container
          direction="column"
          spacing={2}
          alignItems="center"
        >
          <Grid item>
            <TextField
              label="Username"
              variant="outlined"
              id="userName"
              name="userName"
              value={formik.values.userName}
              onChange={formik.handleChange}
              placeholder="Username"
              error={formik.touched.userName && Boolean(formik.errors.userName)}
              helperText={formik.touched.userName && formik.errors.userName}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Password"
              variant="outlined"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              placeholder="Password"
              type="password"
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>
          <Grid item>
            <Button type="submit" variant="outlined">
              Log in
            </Button>
          </Grid>
        </StyledGrid>
      </Paper>
    </form>
  );
};

export default LoginForm;
