import React, { useState } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';

import SampleData from './SampleData';

import get_all from '../../../api/datatypes/get_all';
import ReactTablePaginationHelloworld from 'src/components/ReactTablePaginationHelloworld';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const CustomerListView = () => {
  const classes = useStyles();

  const filter_input = () => {};
  const sample_data = [];
  const is_loading = false;
  const refreshData = () => {};

  return (
    <Page className={classes.root} title="Customers">
      <Container maxWidth={false}>
        <Box>
          {/* <SampleData setData={setSampleData} setIsLoading={setIsLoading} /> */}
          <Results
            filter_input={filter_input}
            customers={sample_data}
            is_loading={is_loading}
            refreshData={refreshData}
          />

          {/* <ReactTablePaginationHelloworld /> */}
        </Box>
      </Container>
    </Page>
  );
};

export default CustomerListView;
