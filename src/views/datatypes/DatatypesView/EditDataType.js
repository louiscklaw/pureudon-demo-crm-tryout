import React from 'react';
import {
  makeStyles,
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

import putData from '../../../api/datatypes/put';

import get_datatype from 'src/api/datatype/get';

import Loading from './Loading';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  let [is_loading, setIsLoading] = React.useState(true);
  let [edit_content, setEditContent] = React.useState({});
  const classes = useStyles();

  React.useEffect(() => {
    setIsLoading(true);
    get_datatype(id_to_edit)
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
      putData(values)
        .then(() => setOpen(false))
        .catch((err) => console.error('err', err.message));
    },
  });

  const handleClose = () => setOpen(false);

  if (is_loading)
    return (
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <Loading />
      </Dialog>
    );

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle id="form-dialog-title">
          helloworld dialog <ShowDebug>{id_to_edit}</ShowDebug>
        </DialogTitle>

        <DialogContent>
          <DialogContentText className={classes.test}>Basic</DialogContentText>
          <TextField
            margin="dense"
            id="varchartype"
            label="varchartype"
            type="input"
            {...formik.getFieldProps('varchartype')}
            fullWidth
          />
          <TextField
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
            margin="dense"
            id="yeartype"
            label="yeartype"
            type="input"
            {...formik.getFieldProps('yeartype')}
            fullWidth
          />
          <TextField
            margin="dense"
            id="datetype"
            label="datetype"
            type="input"
            {...formik.getFieldProps('datetype')}
            fullWidth
          />
          <TextField
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
            {t('cancel')}
          </Button>
          <Button type="submit" color="primary" variant="contained">
            {t('submit')}
          </Button>
        </DialogActions>

        <ShowDebug>{JSON.stringify(formik.values, null, 2)}</ShowDebug>
        <ShowDebug>{JSON.stringify(formik.errors, null, 2)}</ShowDebug>
      </form>
    </Dialog>
  );
};
