import { Button, Dialog, DialogActions, DialogContent, makeStyles, Typography } from '@material-ui/core';
import React, { useState } from 'react';

interface DeleteDialogProps {
  onDelete: () => void;
}

const useStyles = makeStyles({
  button: {
    padding: '4px 20px',
    borderRadius: 32,
  },
});

const DeleteDialog: React.FC<DeleteDialogProps> = ({ onDelete }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button className={classes.button} variant="contained" color="secondary" onClick={() => setOpen(true)}>
        Delete
      </Button>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <DialogContent>
          <Typography>Are you sure about delete the caff file?</Typography>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button
              variant="contained"
              onClick={() => {
                onDelete();
                setOpen(false);
              }}
            >
              Confirm
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteDialog;
