import React from 'react';

import { Dialog, Button, DialogTitle, DialogActions, DialogContent, DialogContentText } from '@material-ui/core';

import { useSnackbar } from 'notistack';

import { DATATYPES_ENDPOINT } from './config';

import useStyles from './styles';

export default ({ open, setOpen, id_to_delete, refreshData, setSnackbarOpen }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const notifyDeleteComplete = () => enqueueSnackbar('delete complete', { variant: 'success' });

  const onConfirmDeleteClick = (id_to_delete) => {
    fetch(`${DATATYPES_ENDPOINT}/${id_to_delete}`, { method: 'DELETE' })
      .then(() => notifyDeleteComplete())
      .then(() => refreshData())
      .then(() => setOpen(false))
      .catch((err) => console.error('err', err.message));
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">helloworld dialog</DialogTitle>

        <DialogContent>
          <DialogContentText className={classes.test}>are you sure delete datatypes {id_to_delete}</DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={(e) => onConfirmDeleteClick(id_to_delete)} color="primary">
            confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
