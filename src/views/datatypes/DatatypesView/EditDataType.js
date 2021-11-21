import React from 'react';
import { makeStyles, TextField, Dialog, Button, DialogTitle, DialogActions, DialogContent, DialogContentText } from '@material-ui/core';

import ShowDebug from 'src/components/ShowDebug';

import { useFormik } from 'formik';

import putData from '../../../api/datatypes/put';

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

export default ({ open, setOpen, id_to_edit }) => {
  let [is_loading, setIsLoading] = React.useState(true);
  let [edit_content, setEditContent] = React.useState({});
  const classes = useStyles();

  React.useEffect(() => {
    fetch(`${DATATYPES_ENDPOINT}/${id_to_edit}`)
      .then((res) => res.json())
      .then((res_json) => setEditContent(res_json.data))
      .then(() => setIsLoading(false))
      .catch((err) => console.error('err', err.message));
  }, [id_to_edit]);

  let formik = useFormik({
    enableReinitialize: true,
    initialValues: edit_content,
    // validationSchema: Yup.object({
    //   username: Yup.string().required(),
    // }),
    onSubmit: (values) => {
      putData(`http://localhost/jobbook-laravel/api/datatypes/${id_to_edit}`, formik.values)
        .then(() => setOpen(false))
        .catch((err) => console.error('err', err.message));
    },
  });

  const handleClose = () => setOpen(false);

  if (is_loading)
    return (
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">helloworld dialog</DialogTitle>
        Loading
      </Dialog>
    );

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle id="form-dialog-title">helloworld dialog</DialogTitle>

        <DialogContent>
          <DialogContentText className={classes.test}>Basic</DialogContentText>
          <TextField autoFocus margin="dense" id="varchartype" label="varchartype" type="input" {...formik.getFieldProps('varchartype')} fullWidth />
          <TextField autoFocus margin="dense" id="inttype" label="inttype" type="input" {...formik.getFieldProps('inttype')} fullWidth />
        </DialogContent>

        <DialogContent>
          <DialogContentText className={classes.test}>Date</DialogContentText>
          <TextField autoFocus margin="dense" id="yeartype" label="yeartype" type="input" {...formik.getFieldProps('yeartype')} fullWidth />
          <TextField autoFocus margin="dense" id="datetype" label="datetype" type="input" {...formik.getFieldProps('datetype')} fullWidth />
          <TextField autoFocus margin="dense" id="datetimetype" label="datetimetype" type="input" {...formik.getFieldProps('datetimetype')} fullWidth />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
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
  );
};
