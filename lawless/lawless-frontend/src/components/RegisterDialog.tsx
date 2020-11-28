import { Button, CircularProgress, Dialog, DialogContent, Grid, TextField } from '@material-ui/core';
import CryptoJS from 'crypto-js';
import { useFormik } from 'formik';
import React from 'react';
import styled from 'styled-components';
import * as yup from 'yup';
import useRegister from '../hooks/useRegister';
import { RegisterReq, UserPersonalData } from '../swagger';

interface RegisterDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const StyledGrid = styled(Grid)`
  padding: 1.5em;
  padding-bottom: ;
`;

const schema = yup.object({
  userName: yup.string().required('Username is required'),
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email().required('Email is required'),
  password1: yup.string().min(8, 'Password must be min 8 character long.').required('Password field is required'),
  password2: yup
    .string()
    .min(8, 'Password must be min 8 character long.')
    .required('Password confirmation required')
    .equals([yup.ref('password1')], 'Passwords should match'),
});

const RegisterDialog: React.FC<RegisterDialogProps> = ({ open, setOpen }) => {
  const [result, register] = useRegister();

  const formik = useFormik({
    initialValues: {
      userName: '',
      email: '',
      firstName: '',
      lastName: '',
      password1: '',
      password2: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const personalData: UserPersonalData = new UserPersonalData({
        username: values.userName,
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
      });
      const req: RegisterReq = new RegisterReq({
        userPersonalData: personalData,
        password: CryptoJS.SHA256(values.password1).toString(),
      });
      register({ data: req });
      setOpen(false);
      formik.setValues({
        userName: '',
        email: '',
        firstName: '',
        lastName: '',
        password1: '',
        password2: '',
      });
    },
  });

  return (
    <Dialog open={open} onBackdropClick={() => setOpen(false)}>
      <DialogContent>
        {!result.isLoading ? (
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
                  label="First name"
                  variant="outlined"
                  id="firstName"
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  placeholder="First name"
                  error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                  helperText={formik.touched.firstName && formik.errors.firstName}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="Last name"
                  variant="outlined"
                  id="lastName"
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  placeholder="Last Name"
                  error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="email"
                  variant="outlined"
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  placeholder="Email address"
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="Password"
                  variant="outlined"
                  id="password1"
                  name="password1"
                  value={formik.values.password1}
                  onChange={formik.handleChange}
                  placeholder="Password"
                  type="password"
                  error={formik.touched.password1 && Boolean(formik.errors.password1)}
                  helperText={formik.touched.password1 && formik.errors.password1}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="Password again"
                  variant="outlined"
                  id="password2"
                  name="password2"
                  value={formik.values.password2}
                  onChange={formik.handleChange}
                  placeholder="Password again"
                  type="password"
                  error={formik.touched.password2 && Boolean(formik.errors.password2)}
                  helperText={formik.touched.password2 && formik.errors.password2}
                />
              </Grid>
              <Grid item container justify="space-between">
                <Button onClick={() => setOpen(false)}>CANCEL</Button>
                <Button type="submit" variant="outlined">
                  Register
                </Button>
              </Grid>
            </StyledGrid>
          </form>
        ) : (
          <CircularProgress />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RegisterDialog;
