import React, { useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  CircularProgress,
  makeStyles,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useAuthToken } from '../hooks/useAuthToken';
import { IDetailsCaffResp } from '../swagger';
import useUpdateCaff from '../hooks/useUpdateCaff';

type UpdateCaffDialogProps = {
  animation: IDetailsCaffResp;
};

const useStyles = makeStyles({
  dialog: {
    padding: '1em',
  },
  error: {
    color: 'red',
    fontWeight: 500,
  },

  button: {
    padding: '4px 28px',
    borderRadius: 32,
    marginLeft: 32,
  },
});

const EditCaffDialog: React.FC<UpdateCaffDialogProps> = ({ animation }) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const [formValues, setFormValues] = useState({
    title: animation.name,
    description: animation.description,
    price: animation.price,
  });

  const handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [name]: event.target.value });
  };

  const [result, updateCaff] = useUpdateCaff();
  const { authToken } = useAuthToken();

  const updateCaffData = () => {
    updateCaff({
      data: {
        caffId: animation.id,
        name: formValues.title,
        description: formValues.description,
        price: formValues.price,
      },
      authToken: authToken as string,
    });

    setFormValues({
      title: '',
      description: '',
      price: 0,
    });
  };

  return (
    <>
      <Button className={classes.button} variant="contained" color="primary" onClick={() => setOpen(true)}>
        Edit
      </Button>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        disableBackdropClick={result.isLoading}
        disableEscapeKeyDown={result.isLoading}
      >
        <DialogTitle>Update animation</DialogTitle>
        <DialogContent>
          {result.isError && <Alert severity="error">Update not successful. Try again.</Alert>}
          {result.isLoading ? (
            <Grid container justify="center">
              <CircularProgress />
            </Grid>
          ) : !result.data ? (
            <form onSubmit={updateCaffData}>
              <Grid container justify="center" spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Animation title"
                    value={formValues.title}
                    onChange={handleChange('title')}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="number"
                    label="Price"
                    value={formValues.price}
                    onChange={handleChange('price')}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    multiline
                    fullWidth
                    rowsMax="4"
                    rows="2"
                    label="Description"
                    value={formValues.description}
                    onChange={handleChange('description')}
                    margin="normal"
                  />
                </Grid>
              </Grid>
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </form>
          ) : (
            <Alert severity="success">Update successful</Alert>
          )}
          <Box marginY={3}>
            <Grid container justify="center">
              <Button
                variant="contained"
                onClick={() => {
                  setOpen(false);
                }}
                disabled={result.isLoading}
              >
                Cancel
              </Button>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditCaffDialog;
