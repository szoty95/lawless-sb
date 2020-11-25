import {
  Button,
  Dialog,
  DialogContent,
  Grid,
  TextField,
} from "@material-ui/core";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import styled from "styled-components";
import * as yup from "yup";
import {
  Client,
  IClient,
  IRegisterReq,
  IUserPersonalData,
  LoginReq,
  RegisterReq,
  UserPersonalData,
} from "../swagger";

interface RegisterDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const StyledGrid = styled(Grid)`
  padding: 1.5em;
  padding-bottom: ;
`;

const schema = yup.object({
  userName: yup.string().required("Username is required"),
  password1: yup
    .string()
    .min(8, "Password must be min 8 character long.")
    .required("Password field is required"),
  password2: yup
    .string()
    .min(8, "Password must be min 8 character long.")
    .required("Password confirmation required")
    .equals(["password1"], "Passwords should match"),
});

const RegisterDialog: React.FC<RegisterDialogProps> = ({ open, setOpen }) => {
  useEffect(() => {
    const client: IClient = new Client("http://localhost:8080");
    const personalData: UserPersonalData = new UserPersonalData({
      username: "xddddasd",
      email: "asd@xdddddasd.hu",
      firstName: "xdddasd",
      lastName: "xdddasd",
    });
    const req: RegisterReq = new RegisterReq({
      userPersonalData: personalData,
      password: "12345678",
    });
    client
      .register(req)
      .then((resp) => console.log(resp))
      .catch((err) => {
        console.log(err.response);
      })
      .finally(() => console.log("yuhuuu"));
  }, []);
  /*   const loginReq: LoginReq = new LoginReq({
    username: 'asd',
    email: '',
    password: '12345678'
  });
  client.login(loginReq).then((resp) => console.log(resp)).finally(() => console.log('logged in')); */
  const formik = useFormik({
    initialValues: {
      userName: "",
      password1: "",
      password2: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values);
      setOpen(false);
    },
  });
  return (
    <Dialog open={open} onBackdropClick={() => setOpen(false)}>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
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
                error={
                  formik.touched.userName && Boolean(formik.errors.userName)
                }
                helperText={formik.touched.userName && formik.errors.userName}
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
                error={
                  formik.touched.password1 && Boolean(formik.errors.password1)
                }
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
                error={
                  formik.touched.password2 && Boolean(formik.errors.password2)
                }
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
      </DialogContent>
    </Dialog>
  );
};

export default RegisterDialog;
