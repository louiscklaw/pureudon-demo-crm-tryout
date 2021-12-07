import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Box, Button, Card, CardContent, TextField, InputAdornment, SvgIcon, makeStyles } from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import { useTranslation } from 'react-i18next';

import NewDataType from './NewDataType';

import { useTable, usePagination, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table';

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: { marginRight: theme.spacing(1) },
  exportButton: { marginRight: theme.spacing(1) },
}));

function GlobalFilter({ preGlobalFilteredRows, globalFilter, setGlobalFilter }) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => setGlobalFilter(value || undefined), 200);

  return (
    <span>
      Search:{' '}
      <input
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
        style={{
          fontSize: '1.1rem',
          border: '0',
        }}
      />
    </span>
  );
}

export default ({
  className,
  globalFilter,
  preGlobalFilteredRows,
  refreshData,
  setFilterInput,
  setGlobalFilter,
  state,
  ...rest
}) => {
  const classes = useStyles();
  const count = preGlobalFilteredRows.length;
  let [open_new_datatype, setOpenNewDatatype] = React.useState(false);
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => setGlobalFilter(value || undefined), 200);

  const { t } = useTranslation();

  const onAddNewClick = () => {
    setOpenNewDatatype(true);
  };

  return (
    <>
      {/* <NewDataType open={open_new_datatype} setOpen={setOpenNewDatatype} refreshData={refreshData} /> */}
      <div className={clsx(classes.root, className)} {...rest}>
        <Box display="flex" justifyContent="flex-end">
          <Button className={classes.importButton}>{t('import')}</Button>
          <Button className={classes.exportButton}>{t('export')}</Button>
          <Button color="primary" variant="contained" onClick={onAddNewClick}>
            {t('add_datatype')}
          </Button>
        </Box>
        <Box mt={3}>
          <Card>
            <CardContent>
              <Box maxWidth={500}>
                <TextField
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon fontSize="small" color="action">
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    ),
                  }}
                  placeholder={`${t('search')}  ${count} datatypes`}
                  variant="outlined"
                  onChange={(e) => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </div>
    </>
  );
};
