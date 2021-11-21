import React from 'react';
import {
  TextField,
  Dialog,
  Button,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@material-ui/core';

import ShowDebug from 'src/components/ShowDebug';

import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';

import { DATATYPES_ENDPOINT } from './config';
import postData from '../../../api/datatypes/post';

import useStyles from './styles';

export default ({ open, setOpen, refreshData }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const notifyAddComplete = () => enqueueSnackbar('add datatypes complete', { variant: 'success' });
  const notifyAddDatatypeError = () => enqueueSnackbar('add datatypes error', { variant: 'error' });

  let formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      datetimetype: '',
      datetype: '',
      inttype: '',
      varchartype: '',
      yeartype: '',
    },
    // validationSchema: Yup.object({ }),
    onSubmit: (values) => {
      postData(`${DATATYPES_ENDPOINT}`, values)
        .then(() => notifyAddComplete())
        .then(() => refreshData())
        .then(() => setOpen(false))
        .catch((err) => {
          notifyAddDatatypeError(err.message);
          console.error('err', err.message);
        });
    },
  });

  const handleClose = () => setOpen(false);

  return (
    <>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle id="form-dialog-title">New datatype dialog</DialogTitle>

          <ShowDebug>
            <button type="button" onClick={(e) => notifyAddDatatypeError('hello error')}>
              test notifyAddDatatypeError
            </button>
          </ShowDebug>

          <DialogContent>
            <DialogContentText className={classes.test}>Basic</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="varchartype"
              label="varchartype"
              type="input"
              {...formik.getFieldProps('varchartype')}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="inttype"
              label="inttype"
              type="input"
              {...formik.getFieldProps('inttype')}
              fullWidth
            />
          </DialogContent>

          <DialogContent>
            <DialogContentText className={classes.test}>Date</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="yeartype"
              label="yeartype"
              type="input"
              {...formik.getFieldProps('yeartype')}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="datetype"
              label="datetype"
              type="input"
              {...formik.getFieldProps('datetype')}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="datetimetype"
              label="datetimetype"
              type="input"
              {...formik.getFieldProps('datetimetype')}
              fullWidth
            />
          </DialogContent>

          <DialogActions>
            <Button type="reset" onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Submit
            </Button>
          </DialogActions>

          <ShowDebug>{JSON.stringify(formik.values, null, 2)}</ShowDebug>
          <ShowDebug>{JSON.stringify(formik.errors, null, 2)}</ShowDebug>
        </form>
      </Dialog>
    </>
  );
};
