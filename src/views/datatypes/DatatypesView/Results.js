import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  makeStyles,
  Button,
  Modal,
  Fade,
} from '@material-ui/core';

import EditDatatype from './EditDataType';

import ConfirmDeleteDialog from './ConfirmDeleteDialog';
import { useTranslation } from 'react-i18next';

import Loading from './Loading';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: { marginRight: theme.spacing(2) },
}));

const Results = ({ filter_input, className, customers, is_loading, is_updating, refreshData, ...rest }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = customers.map((customer) => customer.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const onDeleteButtonClick = (id_to_delete) => {
    setIdToDelete(id_to_delete);
    setOpenConfirmDeleteDialog(true);
  };

  let [open_edit_modal, setOpenEditModal] = useState(false);
  let [id_to_edit, setIdToEdit] = useState();

  let [open_confirm_delete_dialog, setOpenConfirmDeleteDialog] = useState(false);
  let [id_to_delete, setIdToDelete] = useState();

  const onEditButtonClick = (id_to_edit) => {
    setOpenEditModal(true);
    setIdToEdit(id_to_edit);
  };

  let [snackbar_open, setSnackbarOpen] = React.useState(false);

  if (is_loading)
    return (
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Loading />
      </div>
    );

  return (
    <>
      <EditDatatype
        open={open_edit_modal}
        setOpen={setOpenEditModal}
        id_to_edit={id_to_edit}
        refreshData={refreshData}
      />
      <ConfirmDeleteDialog
        open={open_confirm_delete_dialog}
        setOpen={setOpenConfirmDeleteDialog}
        id_to_delete={id_to_delete}
        refreshData={refreshData}
        setSnackbarOpen={setSnackbarOpen}
      />
      <Card className={clsx(classes.root, className)} {...rest}>
        <PerfectScrollbar>
          <Box minWidth={1050}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.length === customers?.length}
                      color="primary"
                      indeterminate={selectedCustomerIds.length > 0 && selectedCustomerIds.length < customers.length}
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>id</TableCell>
                  <TableCell>varchartype</TableCell>
                  <TableCell>inttype</TableCell>
                  <TableCell>yeartype</TableCell>
                  <TableCell>datetype</TableCell>
                  <TableCell>datetimetype</TableCell>
                  <TableCell>action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customers
                  ?.filter((customer) => customer.varchartype.search(filter_input) > -1)
                  .slice(0, limit)
                  .map((customer) => (
                    <TableRow hover key={customer.id} selected={selectedCustomerIds.indexOf(customer.id) !== -1}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedCustomerIds.indexOf(customer.id) !== -1}
                          onChange={(event) => handleSelectOne(event, customer.id)}
                          value="true"
                        />
                      </TableCell>
                      <TableCell>{customer.id}</TableCell>
                      <TableCell>{customer.varchartype}</TableCell>
                      <TableCell>{customer.inttype}</TableCell>
                      <TableCell>{customer.yeartype}</TableCell>
                      <TableCell>{customer.datetype}</TableCell>
                      <TableCell>{customer.datetimetype}</TableCell>
                      <TableCell>
                        <Button onClick={(e) => onEditButtonClick(customer.id)}>{t('edit')}</Button>
                        <Button onClick={(e) => onDeleteButtonClick(customer.id)}>{t('delete')}</Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <TablePagination
          component="div"
          count={customers?.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
    </>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array.isRequired,
};

export default Results;
