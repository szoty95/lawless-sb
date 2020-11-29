import { Button, Dialog, DialogContent, DialogTitle, Grid, makeStyles, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { useAuthToken } from '../hooks/useAuthToken';
import useAddComment from '../hooks/useCommentAdd';
import { ICommentAddCaffReq } from '../swagger';

type CommentDialogProps = {
  caffId?: number;
};

const useStyles = makeStyles({
  button: {
    padding: '4px 20px',
    borderRadius: 32,
  },
});

const CommentDialog: React.FC<CommentDialogProps> = ({ caffId }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [result, comment] = useAddComment();
  const { authToken } = useAuthToken();

  const formik = useFormik({
    initialValues: { message: '' },
    onSubmit: (values) => {
      const req: ICommentAddCaffReq = {
        message: values.message,
        caffId,
      };
      comment({ data: req, authToken: authToken as string });
    },
  });

  if (result.data) {
    return <Redirect to={`/animation/${caffId}`} />;
  }

  return (
    <>
      <Button className={classes.button} color="primary" variant="contained" onClick={() => setOpen(true)}>
        Add comment
      </Button>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <DialogTitle>Add comment</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <Grid container direction="column">
              <TextField
                label="Message"
                variant="outlined"
                multiline
                required
                id="message"
                name="message"
                value={formik.values.message}
                onChange={formik.handleChange}
                placeholder="Message"
              />
              <Button style={{ marginTop: '0.5em' }} color="primary" variant="contained" type="submit">
                Send
              </Button>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CommentDialog;
