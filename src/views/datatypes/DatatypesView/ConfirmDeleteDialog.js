import React from 'react';
import { makeStyles, TextField, Dialog, Button, DialogTitle, DialogActions, DialogContent, DialogContentText } from '@material-ui/core';

import ShowDebug from 'src/components/ShowDebug';

import { DATATYPES_ENDPOINT } from './config';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    // border: '2px solid #000',
    borderRadius: '3px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  test: {
    color: 'black',
  },
}));

export default ({ open, setOpen, id_to_delete, refreshData }) => {
  const classes = useStyles();

  const onConfirmDeleteClick = (id_to_delete) => {
    fetch(`${DATATYPES_ENDPOINT}/${id_to_delete}`, { method: 'DELETE' })
      .then(() => refreshData())
      .then(() => setOpen(false))
      .catch((err) => console.error('err', err.message));
  };

  const handleClose = () => setOpen(false);

  return (
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
  );
};
