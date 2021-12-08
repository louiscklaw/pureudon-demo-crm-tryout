import React from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';

import { useStyles } from './styles';
import Toolbar from './Toolbar';
import EmployeeCards from './EmployeeCards';

export default () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Customers">
      <Container maxWidth={false}>
        <Box>
          <Toolbar
            preGlobalFilteredRows={'preGlobalFilteredRows'}
            globalFilter={'state'.globalFilter}
            setGlobalFilter={'setGlobalFilter'}
          />
          <Box mt={'1rem'}>
            <EmployeeCards />
          </Box>
        </Box>
      </Container>
    </Page>
  );
};
