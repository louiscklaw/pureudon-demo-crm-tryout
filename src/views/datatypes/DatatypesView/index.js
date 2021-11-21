import React, { useState } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';

import SampleData from './SampleData';

import { API_ENDPOINT_BASE } from './config';

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
  const [sample_data, setSampleData] = useState();

  let [is_loading, setIsLoading] = useState(true);
  let [is_updating, setIsUpdating] = useState(false);

  const refreshData = () => {
    setIsLoading(true);
    fetch(`${API_ENDPOINT_BASE}/datatypes`)
      .then((res) => res.json())
      .then((res_json) => {
        console.log('SampleData', res_json.data);
        setSampleData(res_json.data);
        setIsLoading(false);
      });
  };

  return (
    <Page className={classes.root} title="Customers">
      <Container maxWidth={false}>
        <Toolbar refreshData={refreshData} />
        <Box mt={3}>
          <SampleData setData={setSampleData} setIsLoading={setIsLoading} />
          <Results customers={sample_data} is_loading={is_loading} refreshData={refreshData} />
        </Box>
      </Container>
    </Page>
  );
};

export default CustomerListView;
