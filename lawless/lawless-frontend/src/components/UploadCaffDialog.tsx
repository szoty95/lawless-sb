import React, { useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  Dialog,
  DialogContent,
  makeStyles,
  DialogTitle,
  Box,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import FileUpload from './FileUpload';
import useCreateCaff from '../hooks/useCreateCaff';
import { useAuthToken } from '../hooks/useAuthToken';

const ACCEPTED_FILE_TYPES = ['caff'];

const MAX_SIZE_IN_BYTES = 10 * 1024 * 1024 * 1024;

const useStyles = makeStyles({
  dialog: {
    padding: '1em',
  },
  error: {
    color: 'red',
    fontWeight: 500,
  },
  button: {
    padding: '8px 48px',
    borderRadius: 32,
    marginLeft: 32,
  },
});

const UploadCaffDialog: React.FC = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const [file, setFile] = useState<File | null>(null);
  const [isValidFile, setIsValidFile] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const [formValues, setFormValues] = useState({
    title: '',
    description: '',
    price: 0,
  });

  const handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [name]: event.target.value });
  };

  const fileIsValid = (f: File) => {
    const fileTypeAllowed = ACCEPTED_FILE_TYPES.find((item) => {
      const type = f.name.substring(f.name.length - item.length, f.name.length);
      return type === item;
    });
    return f.size <= MAX_SIZE_IN_BYTES && fileTypeAllowed;
  };

  const handleUpload = (fileData: File) => {
    setFile(fileData);
    if (fileIsValid(fileData)) {
      setIsValidFile(true);
    } else {
      setIsValidFile(false);
    }
  };

  const [result, createCaff] = useCreateCaff();
  const { authToken } = useAuthToken();

  const uploadFile = () => {
    if (file && isValidFile) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', formValues.title);
      formData.append('price', formValues.price.toString());
      formData.append('description', formValues.description);

      createCaff({ data: formData, authToken: authToken as string });

      setFormValues({
        title: '',
        description: '',
        price: 0,
      });
      setFile(null);
      setUploaded(true);
    }
  };

  return (
    <>
      <Button className={classes.button} onClick={() => setOpen(true)} variant="contained" color="primary">
        Upload
      </Button>
      <Dialog
        open={open}
        className={classes.dialog}
        onClose={() => {
          setOpen(false);
          setUploaded(false);
        }}
        disableBackdropClick={result.isLoading}
        disableEscapeKeyDown={result.isLoading}
      >
        <DialogTitle>Upload your animation</DialogTitle>
        <DialogContent>
          {result.isError && uploaded && <Alert severity="error">Upload not successful. Try again.</Alert>}
          {result.isLoading ? (
            <Grid container justify="center">
              <CircularProgress />
            </Grid>
          ) : !result.data || !uploaded ? (
            <form onSubmit={() => uploadFile()}>
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
              <Box marginTop={2}>
                <Grid container justify="space-between">
                  <Typography variant="subtitle1">File name:</Typography>

                  <Typography variant="subtitle1">
                    {file && <>{isValidFile ? file.name : 'File too big or wrong format'}</>}
                  </Typography>
                </Grid>
              </Box>
              <Box marginY={2}>
                <Grid container justify="center" spacing={2}>
                  <Grid item>
                    <FileUpload disabled={result.isLoading} handleUpload={handleUpload} />
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      disabled={!file || !isValidFile || result.isLoading}
                      type="submit"
                      color="primary"
                    >
                      Upload
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </form>
          ) : (
            <Alert severity="success">Upload successful</Alert>
          )}
          <Box marginY={3}>
            <Grid container justify="center">
              <Button
                variant="contained"
                onClick={() => {
                  setOpen(false);
                  setUploaded(false);
                }}
                disabled={result.isLoading}
              >
                Done
              </Button>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UploadCaffDialog;
