import React from 'react';
import { useSnackbar } from 'notistack';
import { Dialog, Button, DialogTitle, DialogActions } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import ShowDebug from 'src/components/ShowDebug';

import delete_datatypes from 'src/api/datatypes/delete';

export default ({ open, setOpen, id_to_delete, refreshData }) => {
  const { enqueueSnackbar } = useSnackbar();

  const notifyDeleteComplete = () => enqueueSnackbar(t('delete complete'), { variant: 'success' });

  const onConfirmDeleteClick = (id_to_delete) => {
    delete_datatypes(id_to_delete)
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
