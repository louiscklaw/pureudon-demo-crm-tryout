import React from 'react';

import { Dialog, Button, DialogTitle, DialogActions, DialogContent, DialogContentText } from '@material-ui/core';

import { useSnackbar } from 'notistack';

import { DATATYPES_ENDPOINT } from './config';

import useStyles from './styles';
import { useTranslation } from 'react-i18next';
import ShowDebug from 'src/components/ShowDebug';

export default ({ open, setOpen, id_to_delete, refreshData, setSnackbarOpen }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const notifyDeleteComplete = () => enqueueSnackbar(t('delete complete'), { variant: 'success' });

  const onConfirmDeleteClick = (id_to_delete) => {
    fetch(`${DATATYPES_ENDPOINT}/${id_to_delete}`, { method: 'DELETE' })
      .then(() => notifyDeleteComplete())
      .then(() => refreshData())
      .then(() => setOpen(false))
      .catch((err) => console.error('err', err.message));
  };

  const handleClose = () => setOpen(false);

  const { t } = useTranslation();

  return (
    <>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          {t('are you sure delete datatypes')} <ShowDebug>{id_to_delete}</ShowDebug>
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {t('cancel')}
          </Button>
          <Button onClick={(e) => onConfirmDeleteClick(id_to_delete)} color="primary" variant="contained">
            {t('confirm')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
