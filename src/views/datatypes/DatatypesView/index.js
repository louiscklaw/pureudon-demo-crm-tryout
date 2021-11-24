import React, { useState } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';

import SampleData from './SampleData';

import get_all from '../../../api/datatypes/get_all';

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
  let [filter_input, setFilterInput] = useState('');

  const refreshData = () => {
    setIsLoading(true);
    get_all()
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
        <Toolbar refreshData={refreshData} setFilterInput={setFilterInput} />
        <Box mt={3}>
          <SampleData setData={setSampleData} setIsLoading={setIsLoading} />
          <Results
            filter_input={filter_input}
            customers={sample_data}
            is_loading={is_loading}
            refreshData={refreshData}
          />
        </Box>
      </Container>
    </Page>
  );
};

export default CustomerListView;
