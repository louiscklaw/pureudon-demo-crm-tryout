import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Box, Button, Card, CardContent, TextField, InputAdornment, SvgIcon, makeStyles } from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import { useTranslation } from 'react-i18next';

import NewDataType from './NewDataType';

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: { marginRight: theme.spacing(1) },
  exportButton: { marginRight: theme.spacing(1) },
}));

const Toolbar = ({ setFilterInput, className, refreshData, ...rest }) => {
  const classes = useStyles();
  let [open_new_datatype, setOpenNewDatatype] = React.useState(false);

  const { t } = useTranslation();

  const onAddNewClick = () => {
    setOpenNewDatatype(true);
  };

  return (
    <>
      <NewDataType open={open_new_datatype} setOpen={setOpenNewDatatype} refreshData={refreshData} />
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
                  placeholder={`${t('search')}  datatypes`}
                  variant="outlined"
                  onChange={(e) => setFilterInput(e.target.value)}
                />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </div>
    </>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string,
};

export default Toolbar;
