import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";

interface DeleteDialogProps {
  onDelete: () => void;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({ onDelete }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Delete</Button>
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
