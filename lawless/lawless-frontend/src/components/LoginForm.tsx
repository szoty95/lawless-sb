import { Button, Grid, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import * as yup from 'yup';
import CryptoJS from 'crypto-js';
import useLogin from '../hooks/useLogin';
import { LoginReq } from '../swagger';
import { useAuthToken } from '../hooks/useAuthToken';
import useUserContext from '../hooks/useUserContext';

interface Props {}

const StyledGrid = styled(Grid)`
  padding: 1.5em;
  padding-bottom: ;
`;

const schema = yup.object({
  userName: yup.string().required('Username is required'),
  password: yup.string().min(8, 'Password must be min 8 character long.').required('Password is required'),
});

const LoginForm = () => {
  const [result, login] = useLogin();
  const { setAuthToken } = useAuthToken();
  const { setUser } = useUserContext();

  const formik = useFormik({
    initialValues: { userName: '', password: '' },
    validationSchema: schema,
    onSubmit: (values) => {
      const req = new LoginReq({
        username: values.userName,
        email: '',
        password: CryptoJS.SHA256(values.password).toString(),
      });
      login({ data: req });
    },
  });

  useEffect(() => {
    if (result.data) {
      setAuthToken(result.data.token);
      setUser({
        ...result.data.userPersonalData,
        roles: result.data.roles?.map((item) => item.name?.toString()) ?? [],
      });
    }
  }, [result.data, setAuthToken, setUser]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <StyledGrid container direction="column" spacing={2} alignItems="center">
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
    </form>
  );
};

export default LoginForm;
